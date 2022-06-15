/* global exports:true, module:true, require:true, define:true, global:true */

(function (root, name, factory) {
  'use strict';

  // Used to determine if values are of the language type `Object`
  var objectTypes = {
        'function': true
      , 'object': true
    }
    // Detect free variable `exports`
    , freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports
    // Detect free variable `module`
    , freeModule = objectTypes[typeof module] && module && !module.nodeType && module
    // Detect free variable `global`, from Node.js or Browserified code, and
    // use it as `window`
    , freeGlobal = freeExports && freeModule && typeof global === 'object' && global
    // Detect the popular CommonJS extension `module.exports`
    , moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  /* istanbul ignore else */
  if (freeGlobal && (freeGlobal.global === freeGlobal ||
                     /* istanbul ignore next */ freeGlobal.window === freeGlobal ||
                     /* istanbul ignore next */ freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  // Some AMD build optimizers, like r.js, check for specific condition
  // patterns like the following:
  /* istanbul ignore if */
  if (typeof define === 'function' &&
      /* istanbul ignore next */ typeof define.amd === 'object' &&
      /* istanbul ignore next */ define.amd) {
    // defined as an anonymous module.
    define(['exports'], factory);
    // In case the source has been processed and wrapped in a define module use
    // the supplied `exports` object.
    if (freeExports && moduleExports) factory(freeModule.exports);
  }
  // check for `exports` after `define` in case a build optimizer adds an
  // `exports` object
  else /* istanbul ignore else */ if (freeExports && freeModule) {
    // in Node.js or RingoJS v0.8.0+
    /* istanbul ignore else */
    if (moduleExports) factory(freeModule.exports);
    // in RingoJS v0.7.0-
    else factory(freeExports);
  }
  // in a browser or Rhino
  else {
    factory((root[name] = {}));
  }
}(this, 'pico8parse', function (exports) {
  'use strict';

  exports.version = "0.4.0";

  var input, options, length, features, encodingMode;

  // Options can be set either globally on the parser object through
  // defaultOptions, or during the parse call.
  var defaultOptions = exports.defaultOptions = {
    // Explicitly tell the parser when the input ends.
      wait: false
    // Store comments as an array in the chunk object.
    , comments: true
    // Track identifier scopes by adding an isLocal attribute to each
    // identifier-node.
    , scope: false
    // Store location information on each syntax node as
    // `loc: { start: { line, column }, end: { line, column } }`.
    , locations: false
    // Store the start and end character locations on each syntax node as
    // `range: [start, end]`.
    , ranges: false
    // A callback which will be invoked when a syntax node has been completed.
    // The node which has been created will be passed as the only parameter.
    , onCreateNode: null
    // A callback which will be invoked when a new scope is created.
    , onCreateScope: null
    // A callback which will be invoked when the current scope is destroyed.
    , onDestroyScope: null
    // A callback which will be invoked when a local variable is declared in the current scope.
    // The variable's name will be passed as the only parameter
    , onLocalDeclaration: null
    // The version of Lua targeted by the parser (string; allowed values are
    // '5.1', '5.2', '5.3', 'LuaJIT', 'PICO-8', 'PICO-8-0.2.1'..'PICO-8-0.2.4').
    , luaVersion: '5.1'
    // Encoding mode: how to interpret code units higher than U+007F in input.
    , encodingMode: 'none'
    // This option overrides the `strictP8FileFormat` feature, making it possible to parse
    // snippets lacking the proper header and sections.
    , ignoreStrictP8FileFormat: false
    // Ignore "P8SCII" string escape sequences.
    , ignoreP8scii: false
  };

  function encodeUTF8(codepoint, highMask) {
    highMask = highMask || 0;

    if (codepoint < 0x80) {
      return String.fromCharCode(codepoint);
    } else if (codepoint < 0x800) {
      return String.fromCharCode(
        highMask | 0xc0 |  (codepoint >>  6)        ,
        highMask | 0x80 | ( codepoint        & 0x3f)
      );
    } else if (codepoint < 0x10000) {
      return String.fromCharCode(
        highMask | 0xe0 |  (codepoint >> 12)        ,
        highMask | 0x80 | ((codepoint >>  6) & 0x3f),
        highMask | 0x80 | ( codepoint        & 0x3f)
      );
    } else /* istanbul ignore else */ if (codepoint < 0x110000) {
      return String.fromCharCode(
        highMask | 0xf0 |  (codepoint >> 18)        ,
        highMask | 0x80 | ((codepoint >> 12) & 0x3f),
        highMask | 0x80 | ((codepoint >>  6) & 0x3f),
        highMask | 0x80 | ( codepoint        & 0x3f)
      );
    } else {
      // TODO: Lua 5.4 allows up to six-byte sequences, as in UTF-8:1993
      return null;
    }
  }

  function toHex(num, digits) {
    var result = num.toString(16);
    while (result.length < digits)
      result = '0' + result;
    return result;
  }

  function checkChars(rx) {
    return function (s) {
      var m = rx.exec(s);
      if (!m)
        return s;
      raise(null, errors.invalidCodeUnit, toHex(m[0].charCodeAt(0), 4).toUpperCase());
    };
  }

  var encodingModes = {
    // `pseudo-latin1` encoding mode: assume the input was decoded with the latin1 encoding
    // WARNING: latin1 does **NOT** mean cp1252 here like in the bone-headed WHATWG standard;
    // it means true ISO/IEC 8859-1 identity-mapped to Basic Latin and Latin-1 Supplement blocks
    'pseudo-latin1': {
      fixup: checkChars(/[^\x00-\xff]/),
      encodeByte: function (value) {
        if (value === null)
          return '';
        return String.fromCharCode(value);
      },
      encodeUTF8: function (codepoint) {
        return encodeUTF8(codepoint);
      },
    },

    // `x-user-defined` encoding mode: assume the input was decoded with the WHATWG `x-user-defined` encoding
    'x-user-defined': {
      fixup: checkChars(/[^\x00-\x7f\uf780-\uf7ff]/),
      encodeByte: function (value) {
        if (value === null)
          return '';
        if (value >= 0x80)
          return String.fromCharCode(value | 0xf700);
        return String.fromCharCode(value);
      },
      encodeUTF8: function (codepoint) {
        return encodeUTF8(codepoint, 0xf700);
      }
    },

    // `none` encoding mode: disregard interpretation of string literals, leave identifiers as-is
    'none': {
      discardStrings: true,
      fixup: function (s) {
        return s;
      },
      encodeByte: function (value) {
        return '';
      },
      encodeUTF8: function (codepoint) {
        return '';
      }
    }
  };

  // The available tokens expressed as enum flags so they can be checked with
  // bitwise operations.

  var EOF = 1, StringLiteral = 2, Keyword = 4, Identifier = 8
    , NumericLiteral = 16, Punctuator = 32, BooleanLiteral = 64
    , NilLiteral = 128, VarargLiteral = 256;

  exports.tokenTypes = { EOF: EOF, StringLiteral: StringLiteral
    , Keyword: Keyword, Identifier: Identifier, NumericLiteral: NumericLiteral
    , Punctuator: Punctuator, BooleanLiteral: BooleanLiteral
    , NilLiteral: NilLiteral, VarargLiteral: VarargLiteral
  };

  // As this parser is a bit different from luas own, the error messages
  // will be different in some situations.

  var errors = exports.errors = {
      unexpected: 'unexpected %1 \'%2\' near \'%3\''
    , unexpectedEOF: 'unexpected symbol near \'<eof>\''
    , expected: '\'%1\' expected near \'%2\''
    , expectedToken: '%1 expected near \'%2\''
    , unfinishedString: 'unfinished string near \'%1\''
    , malformedNumber: 'malformed number near \'%1\''
    , decimalEscapeTooLarge: 'decimal escape too large near \'%1\''
    , invalidEscape: 'invalid escape sequence near \'%1\''
    , hexadecimalDigitExpected: 'hexadecimal digit expected near \'%1\''
    , braceExpected: 'missing \'%1\' near \'%2\''
    , tooLargeCodepoint: 'UTF-8 value too large near \'%1\''
    , unfinishedLongString: 'unfinished long string (starting at line %1) near \'%2\''
    , unfinishedLongComment: 'unfinished long comment (starting at line %1) near \'%2\''
    , ambiguousSyntax: 'ambiguous syntax (function call x new statement) near \'%1\''
    , noLoopToBreak: 'no loop to break near \'%1\''
    , labelAlreadyDefined: 'label \'%1\' already defined on line %2'
    , labelNotVisible: 'no visible label \'%1\' for <goto>'
    , gotoJumpInLocalScope: '<goto %1> jumps into the scope of local \'%2\''
    , cannotUseVararg: 'cannot use \'...\' outside a vararg function near \'%1\''
    , invalidCodeUnit: 'code unit U+%1 is not allowed in the current encoding mode'
    , missingHeader: 'missing header \'%1\''
  };

  // ### Abstract Syntax Tree
  //
  // The default AST structure is inspired by the Mozilla Parser API but can
  // easily be customized by overriding these functions.

  var ast = exports.ast = {
      labelStatement: function(label) {
      return {
          type: 'LabelStatement'
        , label: label
      };
    }

    , breakStatement: function() {
      return {
          type: 'BreakStatement'
      };
    }

    , gotoStatement: function(label) {
      return {
          type: 'GotoStatement'
        , label: label
      };
    }

    , returnStatement: function(args) {
      return {
          type: 'ReturnStatement'
        , 'arguments': args
      };
    }

    , ifStatement: function(clauses) {
      return {
          type: 'IfStatement'
        , clauses: clauses
      };
    }
    , ifClause: function(condition, body) {
      return {
          type: 'IfClause'
        , condition: condition
        , body: body
      };
    }
    , elseifClause: function(condition, body) {
      return {
          type: 'ElseifClause'
        , condition: condition
        , body: body
      };
    }
    , elseClause: function(body) {
      return {
          type: 'ElseClause'
        , body: body
      };
    }

    , whileStatement: function(condition, body) {
      return {
          type: 'WhileStatement'
        , condition: condition
        , body: body
      };
    }

    , doStatement: function(body) {
      return {
          type: 'DoStatement'
        , body: body
      };
    }

    , repeatStatement: function(condition, body) {
      return {
          type: 'RepeatStatement'
        , condition: condition
        , body: body
      };
    }

    , localStatement: function(variables, init) {
      return {
          type: 'LocalStatement'
        , variables: variables
        , init: init
      };
    }

    , assignmentStatement: function(variables, init) {
      return {
          type: 'AssignmentStatement'
        , variables: variables
        , init: init
      };
    }

    , assignmentOperatorStatement: function(operator, variables, init) {
      return {
          type: 'AssignmentOperatorStatement'
        , operator: operator
        , variables: variables
        , init: init
      };
    }

    , callStatement: function(expression) {
      return {
          type: 'CallStatement'
        , expression: expression
      };
    }

    , functionStatement: function(identifier, parameters, isLocal, body) {
      return {
          type: 'FunctionDeclaration'
        , identifier: identifier
        , isLocal: isLocal
        , parameters: parameters
        , body: body
      };
    }

    , forNumericStatement: function(variable, start, end, step, body) {
      return {
          type: 'ForNumericStatement'
        , variable: variable
        , start: start
        , end: end
        , step: step
        , body: body
      };
    }

    , forGenericStatement: function(variables, iterators, body) {
      return {
          type: 'ForGenericStatement'
        , variables: variables
        , iterators: iterators
        , body: body
      };
    }

    , chunk: function(body) {
      return {
          type: 'Chunk'
        , body: body
      };
    }

    , identifier: function(name) {
      return {
          type: 'Identifier'
        , name: name
      };
    }

    // `rawInterrupted`: when a longstring was interrupted by other section(s),
    // contains the actual content seen as raw in PICO-8 Lua.
    , literal: function(type, value, raw, rawInterrupted) {
      type = (type === StringLiteral) ? 'StringLiteral'
        : (type === NumericLiteral) ? 'NumericLiteral'
        : (type === BooleanLiteral) ? 'BooleanLiteral'
        : (type === NilLiteral) ? 'NilLiteral'
        : 'VarargLiteral';

      var r = {
          type: type
        , value: value
        , raw: raw
      };
      if (rawInterrupted) r.rawInterrupted = rawInterrupted;
      return r;
    }

    , tableKey: function(key, value) {
      return {
          type: 'TableKey'
        , key: key
        , value: value
      };
    }
    , tableKeyString: function(key, value) {
      return {
          type: 'TableKeyString'
        , key: key
        , value: value
      };
    }
    , tableValue: function(value) {
      return {
          type: 'TableValue'
        , value: value
      };
    }


    , tableConstructorExpression: function(fields) {
      return {
          type: 'TableConstructorExpression'
        , fields: fields
      };
    }
    , binaryExpression: function(operator, left, right) {
      var type = ('and' === operator || 'or' === operator) ?
        'LogicalExpression' :
        'BinaryExpression';

      return {
          type: type
        , operator: operator
        , left: left
        , right: right
      };
    }
    , unaryExpression: function(operator, argument) {
      return {
          type: 'UnaryExpression'
        , operator: operator
        , argument: argument
      };
    }
    , memberExpression: function(base, indexer, identifier) {
      return {
          type: 'MemberExpression'
        , indexer: indexer
        , identifier: identifier
        , base: base
      };
    }

    , indexExpression: function(base, index) {
      return {
          type: 'IndexExpression'
        , base: base
        , index: index
      };
    }

    , callExpression: function(base, args) {
      return {
          type: 'CallExpression'
        , base: base
        , 'arguments': args
      };
    }

    , tableCallExpression: function(base, argument) {
      return {
          type: 'TableCallExpression'
        , base: base
        , argument: argument
      };
    }

    , stringCallExpression: function(base, argument) {
      return {
          type: 'StringCallExpression'
        , base: base
        , argument: argument
      };
    }

    // `rawInterrupted`: when a longstring was interrupted by other section(s),
    // contains the actual content seen as raw in PICO-8 Lua.
    , comment: function(value, raw, rawInterrupted) {
      var r = {
          type: 'Comment'
        , value: value
        , raw: raw
      };
      if (rawInterrupted) r.rawInterrupted = rawInterrupted;
      return r;
    }
  };

  // Wrap up the node object.

  function finishNode(node) {
    // Pop a `Marker` off the location-array and attach its location data.
    if (trackLocations) {
      var location = locations.pop();
      location.complete();
      location.bless(node);
    }
    if (options.onCreateNode) options.onCreateNode(node);
    return node;
  }


  // Helpers
  // -------

  var slice = Array.prototype.slice
    , toString = Object.prototype.toString
    ;

  var indexOf = /* istanbul ignore next */ function (array, element) {
    for (var i = 0, length = array.length; i < length; ++i) {
      if (array[i] === element) return i;
    }
    return -1;
  };

  /* istanbul ignore else */
  if (Array.prototype.indexOf)
    indexOf = function (array, element) {
      return array.indexOf(element);
    };

  // From https://github.com/behnammodi/polyfill/blob/master/array.polyfill.js

  var isArray = /* istanbul ignore next */ function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };

  /* istanbul ignore else */
  if (Array.isArray)
    isArray = function (arg) {
      return Array.isArray(arg);
    };

  // Iterate through an array of objects and return the index of an object
  // with a matching property.

  function indexOfObject(array, property, element) {
    for (var i = 0, length = array.length; i < length; ++i) {
      if (array[i][property] === element) return i;
    }
    return -1;
  }

  // A sprintf implementation using %index (beginning at 1) to input
  // arguments in the format string.
  //
  // Example:
  //
  //     // Unexpected function in token
  //     sprintf('Unexpected %2 in %1.', 'token', 'function');

  function sprintf(format) {
    var args = slice.call(arguments, 1);
    format = format.replace(/%(\d)/g, function (match, index) {
      return '' + args[index - 1] || /* istanbul ignore next */ '';
    });
    return format;
  }

  // Polyfill for `Object.assign`.

  var assign = /* istanbul ignore next */ function (dest) {
    var args = slice.call(arguments, 1)
      , src, prop;

    for (var i = 0, length = args.length; i < length; ++i) {
      src = args[i];
      for (prop in src)
        /* istanbul ignore else */
        if (Object.prototype.hasOwnProperty.call(src, prop)) {
          dest[prop] = src[prop];
        }
    }

    return dest;
  };

  /* istanbul ignore else */
  if (Object.assign)
    assign = Object.assign;

  // ### Error functions

  exports.SyntaxError = SyntaxError;

  // XXX: Eliminate this function and change the error type to be different from SyntaxError.
  // This will unfortunately be a breaking change, because some downstream users depend
  // on the error thrown being an instance of SyntaxError. For example, the Ace editor:
  // <https://github.com/ajaxorg/ace/blob/4c7e5eb3f5d5ca9434847be51834a4e41661b852/lib/ace/mode/lua_worker.js#L55>

  function fixupError(e) {
    /* istanbul ignore if */
    if (!Object.create)
      return e;
    return Object.create(e, {
      'line': { 'writable': true, value: e.line },
      'index': { 'writable': true, value: e.index },
      'column': { 'writable': true, value: e.column }
    });
  }

  // #### Raise an exception.
  //
  // Raise an exception by passing a token, a string format and its paramters.
  //
  // The passed tokens location will automatically be added to the error
  // message if it exists, if not it will default to the lexers current
  // position.
  //
  // Example:
  //
  //     // [1:0] expected [ near (
  //     raise(token, "expected %1 near %2", '[', token.value);

  function raise(token) {
    var message = sprintf.apply(null, slice.call(arguments, 1))
      , error, col;

    if (token === null || typeof token.line === 'undefined') {
      col = index - lineStart + 1;
      error = fixupError(new SyntaxError(sprintf('[%1:%2] %3', line, col, message)));
      error.index = index;
      error.line = line;
      error.column = col;
    } else {
      col = token.range[0] - token.lineStart;
      error = fixupError(new SyntaxError(sprintf('[%1:%2] %3', token.line, col, message)));
      error.line = token.line;
      error.index = token.range[0];
      error.column = col;
    }
    throw error;
  }

  function tokenValue(token) {
    var raw = input.slice(token.range[0], token.range[1]);
    if (raw)
      return raw;
    return token.value;
  }

  // #### Raise an unexpected token error.
  //
  // Example:
  //
  //     // expected <name> near '0'
  //     raiseUnexpectedToken('<name>', token);

  function raiseUnexpectedToken(type, token) {
    raise(token, errors.expectedToken, type, tokenValue(token));
  }

  // #### Raise a general unexpected error
  //
  // Usage should pass either a token object or a symbol string which was
  // expected. We can also specify a nearby token such as <eof>, this will
  // default to the currently active token.
  //
  // Example:
  //
  //     // Unexpected symbol 'end' near '<eof>'
  //     unexpected(token);
  //
  // If there's no token in the buffer it means we have reached <eof>.

  function unexpected(found) {
    var near = 'undefined' !== typeof lookahead ?
      tokenValue(lookahead) : '<bof>';
    if ('undefined' !== typeof found.type) {
      var type;
      switch (found.type) {
        case StringLiteral:   type = 'string';      break;
        case Keyword:         type = 'keyword';     break;
        case Identifier:      type = 'identifier';  break;
        case NumericLiteral:  type = 'number';      break;
        case Punctuator:      type = 'symbol';      break;
        case BooleanLiteral:  type = 'boolean';     break;
        case NilLiteral:
          return raise(found, errors.unexpected, 'symbol', 'nil', near);
        case EOF:
          return raise(found, errors.unexpectedEOF);
      }
      return raise(found, errors.unexpected, type, tokenValue(found), near);
    }
    return raise(found, errors.unexpected, 'symbol', found, near);
  }

  // Lexer
  // -----
  //
  // The lexer, or the tokenizer reads the input string character by character
  // and derives a token left-right. To be as efficient as possible the lexer
  // prioritizes the common cases such as identifiers. It also works with
  // character codes instead of characters as string comparisons was the
  // biggest bottleneck of the parser.
  //
  // If `options.comments` is enabled, all comments encountered will be stored
  // in an array which later will be appended to the chunk object. If disabled,
  // they will simply be disregarded.
  //
  // When the lexer has derived a valid token, it will be returned as an object
  // containing its value and as well as its position in the input string (this
  // is always enabled to provide proper debug messages).
  //
  // `lex()` starts lexing and returns the following token in the stream.

  var index
    , token
    , previousToken
    , lookahead
    , fakeToken
    , comments
    , tokenStart
    , line
    , lineStart
    , currentP8Section
    , newLineIsEnd
    , foundEndIsNewLine
    , newLineIsClose;

  exports.lex = lex;

  function lex() {
    skipWhiteSpace();

    if (features.strictP8FileFormat && '__lua__' !== currentP8Section) {
      do {
        skipP8Section();
      } while ('__lua__' !== currentP8Section && index < length);
      skipWhiteSpace();
    }

    var charCode = input.charCodeAt(index)
      , next = input.charCodeAt(index + 1);

    // Skip comments beginning with -- and, if the feature is enabled, with //
    while (45 === charCode && 45 === next ||
           features.traditionalComments &&
           47 === charCode && 47 === next) {
      scanComment();
      skipWhiteSpace();
      charCode = input.charCodeAt(index);
      next = input.charCodeAt(index + 1);
    }
    if (index >= length && !fakeToken) return consumeEOF();

    // Memorize the range index where the token begins.
    tokenStart = index;
    if (features.strictP8FileFormat &&
        95 === charCode && 95 === next &&
        isLineTerminator(input.charCodeAt(index - 1))) {
      var sequence = scanP8SectionStart();
      if (null !== sequence) {
        currentP8Section = sequence;
        return lex();
      }
    }
    if (isIdentifierStart(charCode)) return scanIdentifierOrKeyword();
    if (isStringQuote(charCode)) return scanStringLiteral();
    if (isDecDigit(charCode) || 46 === charCode && isDecDigit(next)) return scanNumericLiteral();

    // Will try to scan for VarargLiteral, Punctuator and the '?' "operator";
    // if it does not appear to match any, returns null.
    var other = scanOther(charCode, next);
    if (null !== other) return other;

    return unexpected(input.charAt(index));
  }

  // Whitespace has no semantic meaning in lua so simply skip ahead while
  // tracking the encountered newlines. Any kind of eol sequence is counted as a
  // single line.

  function consumeEOL() {
    var charCode = input.charCodeAt(index)
      , peekCharCode = input.charCodeAt(index + 1);

    if (isLineTerminator(charCode)) {
      // Count \n\r and \r\n as one newline.
      if (10 === charCode && 13 === peekCharCode) ++index;
      if (13 === charCode && 10 === peekCharCode) ++index;
      ++line;
      lineStart = ++index;

      return true;
    }
    return false;
  }

  function consumeEOF() {
    // From a single line statement, any dangling `newLineIsEnd`
    // makes the EOF a valid 'end' token, but this is not optional
    // and will be an syntax error under certain circumstances.
    if (newLineIsEnd && token && EOF === token.type) {
      newLineIsEnd = false;
      token = {
          type: Keyword
        , value: 'end'
        , line: line
        , lineStart: lineStart
        , range: [index, index]
      };
    }
    return {
        type : EOF
      , value: '<eof>'
      , line: line
      , lineStart: lineStart
      , range: [index, index]
    };
  }

  // "Whitespace has no semantic meaning in lua..." except when it is given one,
  // see comments above the following functions:
  //  - skipWhiteSpace
  //  - isBlockFollow
  //  - isEnd
  //
  // This will deal well enough with any dangling `newLineIsEnd`.

  function consumeEnd() {
    if (isEnd(token)) {
      if (foundEndIsNewLine) {
        // "consumes" the newline (which sits between the previousToken and current token)
        newLineIsEnd = false;
        return true;
      }
      // Consumes an actual 'end' character sequence
      return consume('end');
    }
    return false;
  }

  // Skips until the next section-starting sequence or EOF

  function skipP8Section() {
    var sequence;
    while (index < length) {
      while (isLineTerminator(input.charCodeAt(index))) consumeEOL();
      if (isLineTerminator(input.charCodeAt(index-1)) && '_' === input.charAt(lineStart)) {
        sequence = scanP8SectionStart();
        if (null !== sequence) break;
      }
      index++;
    }
    currentP8Section = sequence;
  }

  // XXX: (move to appropriate doc please)
  // Lua PICO-8 introduced 3 (janky) whitespace-dependent syntaxes: singleLineIf,
  // singleLineWhile and singleLinePrint (P.S. and #include). While they all require an ending newline,
  // singleLineIf and singleLineWhile may start with any blank character, singleLinePrint
  // must be on its own line (so starts with a newline sequence).
  //
  // singleLineIf and singleLineWhile actually have a more complicated relation with
  // leading blank character; if the token preceding the 'if' or 'while' keyword is
  // a numeral (not just a digit character, hex is fine too) then the blank character
  // is not necessary (notice how 7 to 10 behave):
  //
  //     1 -    a = 0xFFif (a) print(a)
  //     2 -    a = "42"if (a) print(a)             -- FAIL
  //     3 -    a = "42" if (a) print(a)
  //     4 -    a = 0xFF;if (a) print(a)            -- FAIL
  //     5 -    a = 0xFF; if (a) print(a)
  //     6 -    a = 0xFF.if (a) print(a)
  //     7 -    a = 10--[[..]]if (a) print(a)
  //     8 -    a = ""--[[..]]if (a) print(a)       -- FAIL
  //     9 -    a = "" --[[..]]if (a) print(a)      -- FAIL
  //    10 -    a = ""--[[..]] if (a) print(a)

  function skipWhiteSpace() {
    while (index < length) {
      var charCode = input.charCodeAt(index);
      if (isWhiteSpace(charCode)) {
        ++index;
      } else if (!consumeEOL()) {
        break;
      }
    }
  }

  // Identifiers, keywords, booleans and nil all look the same syntax wise. We
  // simply go through them one by one and defaulting to an identifier if no
  // previous case matched.

  function scanIdentifierOrKeyword() {
    var value, type;

    // Slicing the input string is preferred before string concatenation in a
    // loop for performance reasons.
    while (isIdentifierPart(input.charCodeAt(++index)));
    value = encodingMode.fixup(input.slice(tokenStart, index));

    // Decide on the token type and possibly cast the value.
    if (isKeyword(value)) {
      type = Keyword;
    } else if ('true' === value || 'false' === value) {
      type = BooleanLiteral;
      value = ('true' === value);
    } else if ('nil' === value) {
      type = NilLiteral;
      value = null;
    } else {
      type = Identifier;
    }

    return {
        type: type
      , value: value
      , line: line
      , lineStart: lineStart
      , range: [tokenStart, index]
    };
  }

  // Will also consume until the next EOL/EOF and increase line accordingly.
  // It should be ensured when this is called that this can indeed be a valid p8
  // section start (specifically must be preceded by an EOL)

  function scanP8SectionStart() {
    for (var k = 0; k < features.p8Sections.length; k++) {
      var section = features.p8Sections[k];
      if (input.slice(index, index+section.length) === section) {
        index += section.length;
        while (index < length && !isLineTerminator(input.charCodeAt(index))) index++;
        if (isLineTerminator(input.charCodeAt(index))) consumeEOL();
        return section;
      }
    }
    return null;
  }

  // Will try to scan for VarargLiteral and Punctuator;
  // if it does not appear to match any, returns null.
  //
  // charCode = input.charCodeAt(index);
  // next = input.charCodeAt(index + 1);

  function scanOther(charCode, next) {
    switch (charCode) {
      case 46: // .
        if (46 === next) {
          if (46 === input.charCodeAt(index + 2)) return scanVarargLiteral();
          return scanPunctuatorMaybeAssignmentOperator('..');
        }
        return scanPunctuator('.');

      case 61: // =
        if (61 === next) return scanPunctuator('==');
        return scanPunctuator('=');

      case 62: // >
        if (features.bitwiseOperators && 62 === next) {
          if (features.bitshiftAdditionalOperators) {
            switch (input.charCodeAt(index + 2)) {
              case 62: return scanPunctuatorMaybeAssignmentOperator('>>>');
              case 60: return scanPunctuatorMaybeAssignmentOperator('>><');
            }
          }
          return scanPunctuatorMaybeAssignmentOperator('>>');
        }
        if (61 === next) return scanPunctuator('>=');
        return scanPunctuator('>');

      case 60: // <
        if (features.bitwiseOperators && 60 === next) {
          if (features.bitshiftAdditionalOperators && 62 === input.charCodeAt(index + 2))
            return scanPunctuatorMaybeAssignmentOperator('<<>');
          return scanPunctuatorMaybeAssignmentOperator('<<');
        }
        if (61 === next) return scanPunctuator('<=');
        return scanPunctuator('<');

      case 126: // ~
        if (61 === next) return scanPunctuator('~=');
        if (!features.bitwiseOperators)
          break;
        return scanPunctuator('~');

      case 33: // !
        // when traditionalNotEqual is truthy, both syntaxes are accepted:
        // "!=" token are disguised as "~=" (takes advantage of the fact
        // that scanPunctuator does not care about what's actually there
        // and most importantly that they are the same length)
        if (features.traditionalNotEqual && 61 === next) return scanPunctuator('~=');
        break;

      case 58: // :
        if (features.labels && 58 === next) return scanPunctuator('::');
        return scanPunctuator(':');

      case 91: // [
        // Check for a multiline string, they begin with [= or [[
        if (91 === next || 61 === next) return scanLongStringLiteral();
        return scanPunctuator('[');

      case 47: // /
        // Check for integer division op (//)
        if (features.integerDivision && 47 === next)
          return scanPunctuator('//');
        return scanPunctuatorMaybeAssignmentOperator('/');

      case 92: // \
        if (!features.backslashIntegerDivision)
          break;
        return scanPunctuatorMaybeAssignmentOperator('\\');

      case 94: // ^
        if (features.smileyBitwiseXor && 94 === next)
          return scanPunctuatorMaybeAssignmentOperator('^^');
        return scanPunctuatorMaybeAssignmentOperator('^');

      case 38: case 124: // & |
        if (!features.bitwiseOperators)
          break;
        return scanPunctuatorMaybeAssignmentOperator(input.charAt(index));

      case 64: case 36: // @ $
        if (!features.peekPokeOperators)
          break;
        return scanPunctuator(input.charAt(index));

      case 42: case 37: case 45: case 43: // * % - +
        return scanPunctuatorMaybeAssignmentOperator(input.charAt(index));

      case 63: // ?
        if (!features.singleLinePrint)
          break;
        // The '?' "operator" must be preceded by no token on the same
        // line, otherwise it is not recognized (prior to PICO-8-0.2.3).
        if (!features.singleLinePrintNoLineDependency && token && token.line === line)
          break;
        // The '?' token essentially correspond to 2 token directly
        // and 1 more later: the identifier 'print', a '(' punctuator
        // and eventually a ')' punctuator on line end.
        fakeToken = {
            type: Punctuator
          , value: '('
          , line: line
          , lineStart: lineStart
          , range: [tokenStart, index]
        };
        newLineIsClose = true;
        return {
            type: Identifier
          , value: 'print'
          , line: line
          , lineStart: lineStart
          , range: [tokenStart, index++]
        };

      case 44: case 123: case 125: case 93:
      case 40: case 41: case 59: case 35: // , { } ] ( ) ; #
        return scanPunctuator(input.charAt(index));
    }
    return null;
  }

  // Once a punctuator reaches this function it should already have been
  // validated so we simply return it as a token.

  function scanPunctuator(value) {
    index += value.length;
    return {
        type: Punctuator
      , value: value
      , line: line
      , lineStart: lineStart
      , range: [tokenStart, index]
    };
  }

  // If the reached punctuator can also be the beginning of an assignment
  // operators (and if they are enabled in the features) this tests for the
  // ending '='; if such is found the punctuator is 1 longer, otherwise
  // defaults to `scanPunctuator()`.

  function scanPunctuatorMaybeAssignmentOperator(valuePunctuator) {
    if (features.assignmentOperators) {
      if (61 === input.charCodeAt(index + valuePunctuator.length)) // op=
        return scanPunctuator(valuePunctuator + '=');
    }
    return scanPunctuator(valuePunctuator);
  }

  // A vararg literal consists of three dots.

  function scanVarargLiteral() {
    index += 3;
    return {
        type: VarargLiteral
      , value: '...'
      , line: line
      , lineStart: lineStart
      , range: [tokenStart, index]
    };
  }

  // Find the string literal by matching the delimiter marks used.

  function scanStringLiteral() {
    var delimiter = input.charCodeAt(index++)
      , beginLine = line
      , beginLineStart = lineStart
      , stringStart = index
      , string = encodingMode.discardStrings ? null : ''
      , charCode;

    for (;;) {
      charCode = input.charCodeAt(index++);
      if (delimiter === charCode) break;
      // EOF or `\n` terminates a string literal. If we haven't found the
      // ending delimiter by now, raise an exception.
      if (index > length || isLineTerminator(charCode)) {
        string += input.slice(stringStart, index - 1);
        raise(null, errors.unfinishedString, input.slice(tokenStart, index - 1));
      }
      if (92 === charCode) { // backslash
        if (!encodingMode.discardStrings) {
          var beforeEscape = input.slice(stringStart, index - 1);
          string += encodingMode.fixup(beforeEscape);
        }
        var escapeValue = readEscapeSequence();
        if (!encodingMode.discardStrings)
          string += escapeValue;
        stringStart = index;
      }
    }
    if (!encodingMode.discardStrings) {
      string += encodingMode.encodeByte(null);
      string += encodingMode.fixup(input.slice(stringStart, index - 1));
    }

    return {
        type: StringLiteral
      , value: string
      , line: beginLine
      , lineStart: beginLineStart
      , lastLine: line
      , lastLineStart: lineStart
      , range: [tokenStart, index]
    };
  }

  // Expect a multiline string literal and return it as a regular string
  // literal, if it doesn't validate into a valid multiline string, throw an
  // exception.

  function scanLongStringLiteral() {
    var beginLine = line
      , beginLineStart = lineStart
      , string = readLongString(false);
    // Fail if it's not a multiline literal.
    if (false === string) raise(token, errors.expected, '[', tokenValue(token));

    var r = {
        type: StringLiteral
      , value: encodingMode.discardStrings ? null : encodingMode.fixup(string)
      , line: beginLine
      , lineStart: beginLineStart
      , lastLine: line
      , lastLineStart: lineStart
      , range: [tokenStart, index]
    };

    if (features.strictP8FileFormat) {  //      v
      var delimLength = tokenStart + 1; // a = [==[content]==]
      while ('[' !== input.charAt(delimLength)) delimLength++;
      delimLength = delimLength-tokenStart + 1;
      // This can only be true when a longstring was interrupted by one (or more)
      // non-lua sections; but in this case, 'raw' of the node is not really
      // the slice of input defined by the range... _somehow_
      if (string.length !== index - tokenStart - 2*delimLength)
        r.rawInterrupted = input.slice(tokenStart, tokenStart + delimLength) +
                           string +
                           input.slice(index - delimLength, index);
    }

    return r;
  }

  // Numeric literals will be returned as floating-point numbers instead of
  // strings. The raw value should be retrieved from slicing the input string
  // later on in the process.
  //
  // If a hexadecimal number is encountered, it will be converted.

  function scanNumericLiteral() {
    var character = input.charAt(index)
      , next = input.charAt(index + 1);

    var literal = (features.binLiteral && '0' === character && 'bB'.indexOf(next || null) >= 0) ?
      readBinLiteral() : ('0' === character && 'xX'.indexOf(next || null) >= 0) ?
      readHexLiteral() : readDecLiteral();

    var foundImaginaryUnit = readImaginaryUnitSuffix()
      , foundInt64Suffix = readInt64Suffix();

    if (foundInt64Suffix && (foundImaginaryUnit || literal.hasFractionPart)) {
      raise(null, errors.malformedNumber, input.slice(tokenStart, index));
    }

    return {
        type: NumericLiteral
      , value: literal.value
      , line: line
      , lineStart: lineStart
      , range: [tokenStart, index]
    };
  }

  function readImaginaryUnitSuffix() {
    if (!features.imaginaryNumbers) return;

    // Imaginary unit number suffix is optional.
    // See http://luajit.org/ext_ffi_api.html#literals
    if ('iI'.indexOf(input.charAt(index) || null) >= 0) {
      ++index;
      return true;
    } else {
      return false;
    }
  }

  function readInt64Suffix() {
    if (!features.integerSuffixes) return;

    // Int64/uint64 number suffix is optional.
    // See http://luajit.org/ext_ffi_api.html#literals

    if ('uU'.indexOf(input.charAt(index) || null) >= 0) {
      ++index;
      if ('lL'.indexOf(input.charAt(index) || null) >= 0) {
        ++index;
        if ('lL'.indexOf(input.charAt(index) || null) >= 0) {
          ++index;
          return 'ULL';
        } else {
          // UL but no L
          raise(null, errors.malformedNumber, input.slice(tokenStart, index));
        }
      } else {
        // U but no L
        raise(null, errors.malformedNumber, input.slice(tokenStart, index));
      }
    } else if ('lL'.indexOf(input.charAt(index) || null) >= 0) {
        ++index;
        if ('lL'.indexOf(input.charAt(index) || null) >= 0) {
          ++index;
          return 'LL';
        } else {
          // First L but no second L
          raise(null, errors.malformedNumber, input.slice(tokenStart, index));
        }
    }
  }

  // Lua hexadecimals have an optional fraction part and an optional binary
  // exponent part. These are not included in JavaScript so we will compute
  // all three parts separately and then sum them up at the end of the function
  // with the following algorithm.
  //
  //     Digit := toDec(digit)
  //     Fraction := toDec(fraction) / 16 ^ fractionCount
  //     BinaryExp := 2 ^ binaryExp
  //     Number := ( Digit + Fraction ) * BinaryExp

  function readHexLiteral() {
    var fraction = 0 // defaults to 0 as it gets summed
      , binaryExponent = 1 // defaults to 1 as it gets multiplied
      , binarySign = 1 // positive
      , digit, fractionStart, exponentStart, digitStart;

    digitStart = index += 2; // Skip 0x part

    // A minimum of one hex digit is required.
    // "0x.A" is valid if noTrailingDotInHexNumeral (from Lua 5.2 onward)
    if (!isHexDigit(input.charCodeAt(index)))
      if (features.noTrailingDotInHexNumeral || '.' !== input.charAt(index))
        raise(null, errors.malformedNumber, input.slice(tokenStart, index));

    while (isHexDigit(input.charCodeAt(index))) ++index;
    // Convert the hexadecimal digit to base 10.
    if (digitStart < index)
      digit = parseInt(input.slice(digitStart, index), 16);
    else digit = 0; // No decimal part.

    // Fraction part is optional.
    var foundFraction = false;
    if ('.' === input.charAt(index)) {
      foundFraction = true;
      fractionStart = ++index;

      while (isHexDigit(input.charCodeAt(index))) ++index;
      fraction = input.slice(fractionStart, index);

      // Empty fraction parts should default to 0, others should be converted
      // 0.x form so we can use summation at the end.
      fraction = (fractionStart === index) ? 0
        : parseInt(fraction, 16) / Math.pow(16, index - fractionStart);
    }

    // Binary exponents are optional
    //
    // Things like "a = 0x1p = 16" are valid in Lua PICO-8 in which case this just return normally
    // (yes it assumes noExponentLiteral implies this behavior above...)
    var foundBinaryExponent = false;
    if (!features.noExponentLiteral && 'pP'.indexOf(input.charAt(index) || null) >= 0) {
      foundBinaryExponent = true;
      ++index;

      // Sign part is optional and defaults to 1 (positive).
      if ('+-'.indexOf(input.charAt(index) || null) >= 0)
        binarySign = ('+' === input.charAt(index++)) ? 1 : -1;

      exponentStart = index;

      // The binary exponent sign requires a decimal digit.
      if (!isDecDigit(input.charCodeAt(index)))
        raise(null, errors.malformedNumber, input.slice(tokenStart, index));

      while (isDecDigit(input.charCodeAt(index))) ++index;
      binaryExponent = input.slice(exponentStart, index);

      // Calculate the binary exponent of the number.
      binaryExponent = Math.pow(2, binaryExponent * binarySign);
    }

    return {
      value: (digit + fraction) * binaryExponent,
      hasFractionPart: foundFraction || foundBinaryExponent,
      hasExponentPart: foundBinaryExponent
    };
  }

  // PICO-8 binaries acts similarly to hexadecimals (optional fraction part).
  // Because this is only used by PICO-8 which does not support number suffixes,
  // this is a simplified algorithm (eg. no BinaryExp, assumes !noTrailingDotInBinNumeral..).
  //
  //     Digit := toDec(digit)
  //     Fraction := toDec(fraction) / 2 ^ fractionCount
  //     Number := Digit + Fraction

  function readBinLiteral() {
    var fraction = 0 // defaults to 0 as it gets summed
      , digit, fractionStart, digitStart;

    digitStart = index += 2; // Skip 0b part

    // A minimum of one bin digit is required.
    // "0x.1" is valid (will assume so as only PICO-8-xyz get there)
    if (!isBinDigit(input.charCodeAt(index)) && '.' !== input.charAt(index))
      raise(null, errors.malformedNumber, input.slice(tokenStart, index));

    while (isBinDigit(input.charCodeAt(index))) ++index;
    // Convert the binary digit to base 10.
    if (digitStart < index)
      digit = parseInt(input.slice(digitStart, index), 2);
    else digit = 0; // No decimal part.

    // Fraction part is optional.
    var foundFraction = false;
    if ('.' === input.charAt(index)) {
      foundFraction = true;
      fractionStart = ++index;

      while (isBinDigit(input.charCodeAt(index))) ++index;
      fraction = input.slice(fractionStart, index);

      // Empty fraction parts should default to 0, others should be converted
      // 0.x form so we can use summation at the end.
      fraction = (fractionStart === index) ? 0
        : parseInt(fraction, 2) / Math.pow(2, index - fractionStart);
    }

    // No binary exponents.

    return {
      value: digit + fraction,
      hasFractionPart: foundFraction,
      hasExponentPart: false
    };
  }

  // Decimal numbers are exactly the same in Lua and in JavaScript, because of
  // this we check where the token ends and then parse it with native
  // functions.

  function readDecLiteral() {
    while (isDecDigit(input.charCodeAt(index))) ++index;
    // Fraction part is optional
    var foundFraction = false;
    if ('.' === input.charAt(index)) {
      foundFraction = true;
      ++index;
      // Fraction part defaults to 0
      while (isDecDigit(input.charCodeAt(index))) ++index;
    }

    // Exponent part is optional.
    //
    // Things like "a = 1e = 5" are valid in Lua PICO-8 in which case this just return normally
    // (yes it assumes noExponentLiteral implies this behavior above...)
    var foundExponent = false;
    if (!features.noExponentLiteral && 'eE'.indexOf(input.charAt(index) || null) >= 0) {
      foundExponent = true;
      ++index;
      // Sign part is optional.
      if ('+-'.indexOf(input.charAt(index) || null) >= 0) ++index;
      // An exponent is required to contain at least one decimal digit.
      if (!isDecDigit(input.charCodeAt(index)))
        raise(null, errors.malformedNumber, input.slice(tokenStart, index));

      while (isDecDigit(input.charCodeAt(index))) ++index;
    }

    return {
      value: parseFloat(input.slice(tokenStart, index)),
      hasFractionPart: foundFraction || foundExponent,
      hasExponentPart: foundExponent
    };
  }

  function readUnicodeEscapeSequence() {
    var sequenceStart = index++;

    if (input.charAt(index++) !== '{')
      raise(null, errors.braceExpected, '{', '\\' + input.slice(sequenceStart, index));
    if (!isHexDigit(input.charCodeAt(index)))
      raise(null, errors.hexadecimalDigitExpected, '\\' + input.slice(sequenceStart, index));

    while (input.charCodeAt(index) === 0x30) ++index;
    var escStart = index;

    while (isHexDigit(input.charCodeAt(index))) {
      ++index;
      if (index - escStart > 6)
        raise(null, errors.tooLargeCodepoint, '\\' + input.slice(sequenceStart, index));
    }

    var b = input.charAt(index++);
    if (b !== '}') {
      if ((b === '"') || (b === "'"))
        raise(null, errors.braceExpected, '}', '\\' + input.slice(sequenceStart, index--));
      else
        raise(null, errors.hexadecimalDigitExpected, '\\' + input.slice(sequenceStart, index));
    }

    var codepoint = parseInt(input.slice(escStart, index - 1) || '0', 16);
    var frag = '\\' + input.slice(sequenceStart, index);

    if (codepoint > 0x10ffff) {
      raise(null, errors.tooLargeCodepoint, frag);
    }

    return encodingMode.encodeUTF8(codepoint, frag);
  }

  // Translate escape sequences to the actual characters.
  function readEscapeSequence() {
    var sequenceStart = index
      , escapedChar = input.charAt(index);
    switch (escapedChar) {
      // Lua allow the following escape sequences.
      case 'a': ++index; return '\x07';
      case 'n': ++index; return '\n';
      case 'r': ++index; return '\r';
      case 't': ++index; return '\t';
      case 'v': ++index; return '\x0b';
      case 'b': ++index; return '\b';
      case 'f': ++index; return '\f';

      // Backslash at the end of the line. We treat all line endings as equivalent,
      // and as representing the [LF] character (code 10). Lua 5.1 through 5.3
      // have been verified to behave the same way.
      case '\r':
      case '\n':
        consumeEOL();
        return '\n';

      case '0': case '1': case '2': case '3': case '4':
      case '5': case '6': case '7': case '8': case '9':
        // \ddd, where ddd is a sequence of up to three decimal digits.
        while (isDecDigit(input.charCodeAt(index)) && index - sequenceStart < 3) ++index;

        var frag = input.slice(sequenceStart, index);
        var ddd = parseInt(frag, 10);
        if (ddd > 255) {
          raise(null, errors.decimalEscapeTooLarge, '\\' + ddd);
        }
        return encodingMode.encodeByte(ddd, '\\' + frag);

      case 'z':
        if (features.skipWhitespaceEscape) {
          ++index;
          skipWhiteSpace();
          return '';
        }
        break;

      case 'x':
        if (features.hexEscapes) {
          // \xXX, where XX is a sequence of exactly two hexadecimal digits
          if (isHexDigit(input.charCodeAt(index + 1)) &&
              isHexDigit(input.charCodeAt(index + 2))) {
            index += 3;
            return encodingMode.encodeByte(parseInt(input.slice(sequenceStart + 1, index), 16), '\\' + input.slice(sequenceStart, index));
          }
          raise(null, errors.hexadecimalDigitExpected, '\\' + input.slice(sequenceStart, index + 2));
        }
        break;

      case 'u':
        if (features.unicodeEscapes)
          return readUnicodeEscapeSequence();
        break;

      case '\\': case '"': case "'":
        return input.charAt(index++);
    }
    if (features.p8scii) {
      if (options.ignoreP8scii) return '';
      var sequence = readEscapeSequenceP8scii(escapedChar, sequenceStart);
      if (null !== sequence) return sequence;
    }

    if (features.strictEscapes)
      raise(null, errors.invalidEscape, '\\' + input.slice(sequenceStart, index + 1));
    return input.charAt(index++);
  }

  function readEscapeSequenceP8scii(escapedChar, sequenceStart) {
    // Some escape sequences might be wrongly parsed/modified/replaced
    // be it here or in the switch above (maybe)

    var p0 = index+1 < length ? input.charAt(++index) : null
      , p1 = index+1 < length ? input.charAt(++index) : null
      , p0CharCode = null === p0 ? -1 : p0.charCodeAt(0)
      , p1CharCode = null === p1 ? -1 : p1.charCodeAt(0)
      , params = p0;

    switch (escapedChar) {
      case '*': // Repeat next character P0 times. ?"\*3a" --> aaa
        // This escape sequence needs something after P0 (maybe) (but what?)
        if ('"' === p0 || -1 === p1CharCode || isLineTerminator(p1CharCode)) break;
        /* fall through */
      case '+': // Shift cursor by P0-16, P1-16 pixels
        if ('+' === escapedChar && !isValidEscapeParam(p1CharCode)) break;
        params += p1;
        /* fall through */
      case '-': // Shift cursor horizontally by P0-16 pixels
      case '|': // Shift cursor vertically by P0-16 pixels
      case '#': // Draw solid background with colour P0
        // Valid parameter should be a number or lower case character (maybe)
        if (!isValidEscapeParam(p0CharCode)) break;

        return '\\' + escapedChar + params;

      case '^': // Special command
        // Special commands param are shifter by 1 (because of the command itself)
        if (-1 === p0CharCode || '"' === p0) break;
        index = sequenceStart + 1;
        var command = input.charAt(index++);
        p0 = p1;
        p1 = index+1 < length ? input.charAt(++index) : null;
        p0CharCode = p1CharCode;
        p1CharCode = null === p1 ? -1 : p1.charCodeAt(0);
        // 1..9  -- Skip 1,2,4,8,16,32..256 frames
        // c -- Cls to colour P0, set cursor to 0,0
        // g -- Set cursor position to home
        // h -- Set home to cursor position
        // j -- Jump to absolute P0*4, P1*4 (in screen pixels)
        // s -- Set tab stop width to P0 pixels (used by "\t")
        // x -- Set character width  (default: 4)
        // y -- Set character height (default: 6)
        if ("123456789cghjsxy".indexOf(command) >= 0) {
          // Check parameter for some commands;
          // Valid parameter should be a number or lower case character (maybe)
          if ('c' === command || 'j' === command || 's' === command) {
            if (!isValidEscapeParam(p0CharCode)) break;
            params += p0;
            if ('j' === command) {
              if (!isValidEscapeParam(p1CharCode)) break;
              params += p1;
            }
          } else index--;

          return '\\^' + command + params;
        }
    }
    return null;
  }

  // Comments begin with -- after which it will be decided if they are
  // multiline comments or not.
  //
  // The multiline functionality works the exact same way as with string
  // literals so we reuse the functionality.
  //
  // If the feature `traditionalComments` is on, this kind of comment cannot
  // be multiline.
  //
  // If the feature `noDeepLongStringComments` is on, a sequence like '--[=*['
  // does not start a multiline comment.

  function scanComment() {
    var canBeMultiline = '-' === input.charAt(index);
    tokenStart = index;
    index += 2; // --

    var character = input.charAt(index)
      , content = ''
      , isLong = false
      , commentStart = index
      , lineStartComment = lineStart
      , lineComment = line;

    if (canBeMultiline && '[' === character) {
      content = readLongString(true);
      // This wasn't a multiline comment after all.
      if (false === content) content = character;
      else isLong = true;
    }
    // Scan until next line as long as it's not a multiline comment.
    if (!isLong) {
      while (index < length) {
        if (isLineTerminator(input.charCodeAt(index))) break;
        ++index;
      }
      if (options.comments) content = input.slice(commentStart, index);
    }

    if (options.comments) {
      var rawInterrupted;
      if (isLong && features.strictP8FileFormat) {  //    v
        var delimLength = tokenStart + 3;           // --[==[comment]==]
        // XXX: "ignore next": because ony PICO-8 version get here and all have
        // both `strictP8FileFormat` and `noDeepLongStringComments`;
        // this will need to be change if one can be present without the other
        /* istanbul ignore next */ while ('[' !== input.charAt(delimLength)) delimLength++;
        delimLength = delimLength-(tokenStart+2) + 1;
        // This can only be true when a longstring was interrupted by one (or more)
        // non-lua sections; but in this case, 'raw' of the node is not really
        // the slice of input defined by the range... _somehow_
        if (content.length !== index - tokenStart - 2*delimLength-2) // -2 here and +2 bellow: the '--'
          rawInterrupted = input.slice(tokenStart, tokenStart + delimLength+2) +
                           content +
                           input.slice(index - delimLength, index);
      }

      var node = ast.comment(content, input.slice(tokenStart, index), rawInterrupted);

      // `Marker`s depend on tokens available in the parser and as comments are
      // intercepted in the lexer all location data is set manually.
      if (options.locations) {
        node.loc = {
            start: { line: lineComment, column: tokenStart - lineStartComment }
          , end: { line: line, column: index - lineStart }
        };
      }
      if (options.ranges) {
        node.range = [tokenStart, index];
      }
      if (options.onCreateNode) options.onCreateNode(node);
      comments.push(node);
    }
  }

  // Read a multiline string by calculating the depth of `=` characters and
  // then appending until an equal depth is found.

  function readLongString(isComment) {
    var level = 0
      , content = ''
      , terminator = false
      , character, stringStart, firstLine = line
      , sequence
      , interruptions = []
      , interruptionStartIndex = index
      , interruptionRange;

    ++index; // [

    // Calculate the depth of the comment.
    while ('=' === input.charAt(index + level)) ++level;
    // Exit, this is not a long string afterall.
    if ('[' !== input.charAt(index + level)) return false;

    // Exit, this cannot be a longstring comment.
    if (isComment && features.noDeepLongStringComments && 0 !== level)
      return false;

    index += level + 1;

    stringStart = index;
    while (index < length) {
      character = input.charAt(index++);

      // If a line starts with a '_' (and the feature is on), look ahead for a
      // section-starting sequence and skip what's needed
      if (features.strictP8FileFormat && '_' === character &&
          isLineTerminator(input.charCodeAt(index-2))) {
        interruptionStartIndex = --index;
        sequence = scanP8SectionStart();
        // The lua section is interrupted
        if (null !== sequence) {
          currentP8Section = sequence;
          // Note: if at this point, even if the `currentP8Section` is still '__lua__',
          // it is indeed discarded (ie. in a longstring, a line cannot start with
          // any sequence from the `features.p8Sections`)
          while ('__lua__' !== currentP8Section && index < length) {
            skipP8Section();
            interruptionRange = [interruptionStartIndex, index];
          }
          if (isArray(interruptionRange)) {
            interruptions.push(interruptionRange);
            interruptionRange = undefined;
          }
          character = input.charAt(index++);
        } else index++; // Fausse alerte
      }

      // Once the delimiter is found, iterate through the depth count and see
      // if it matches.
      if (']' === character) {
        terminator = true;
        for (var i = 0; i < level; ++i) {
          if ('=' !== input.charAt(index + i)) terminator = false;
        }
        if (']' !== input.charAt(index + level)) terminator = false;

        // We reached the end of the multiline string. Get out now.
        if (terminator) {
          if (!features.strictP8FileFormat)
            content += input.slice(stringStart, index - 1);
          else {
            // Need to discard everything between indexes interruptions[k][0] and
            // interruptions[k][1] as it is part of some other(s) section(s).
            var jumpingIndex = stringStart;
            for (var k = 0; k < interruptions.length; k++) {
              content += input.slice(jumpingIndex, interruptions[k][0]);
              jumpingIndex = interruptions[k][1];
            }
            content += input.slice(jumpingIndex, index - 1);
          }
          index += level + 1;
          return content;
        }
      }

      // To keep track of line numbers run the `consumeEOL()` which increments
      // its counter.
      if (isLineTerminator(character.charCodeAt(0))) { index--; consumeEOL(); }
      while (isLineTerminator(input.charCodeAt(index))) consumeEOL();
    }

    raise(null, isComment ?
                errors.unfinishedLongComment :
                errors.unfinishedLongString,
          firstLine, '<eof>');
  }

  // ## Lex functions and helpers.

  // Read the next token.
  //
  // This is actually done by setting the current token to the lookahead and
  // reading in the new lookahead token.

  function next() {
    previousToken = token;
    token = lookahead;

    if (fakeToken) {
      lookahead = fakeToken;
      fakeToken = undefined;
    } else {
      var pline = line
        , newLineWasClose = newLineIsClose;
      lookahead = lex();

      if (newLineWasClose && (pline !== line || EOF === lookahead.type)) {
        newLineIsClose = false;
        fakeToken = lookahead;
        lookahead = {
            type: Punctuator
          , value: ')'
          , line: token.line
          , lineStart: token.lineStart
          , range: [tokenStart, tokenStart]
        };
      }
    }
  }

  // Consume a token if its value matches. Once consumed or not, return the
  // success of the operation.

  function consume(value) {
    if (value === token.value) {
      next();
      return true;
    }
    return false;
  }

  // Expect the next token value to match. If not, throw an exception.

  function expect(value) {
    if (value === token.value) next();
    else raise(token, errors.expected, value, tokenValue(token));
  }

  // ### Validation functions

  function isWhiteSpace(charCode) {
    return 9 === charCode || 32 === charCode || 0xB === charCode || 0xC === charCode;
  }

  function isLineTerminator(charCode) {
    return 10 === charCode || 13 === charCode;
  }

  function isStringQuote(charCode) {
    return 39 === charCode || 34 === charCode;
  }

  function isDecDigit(charCode) {
    return charCode >= 48 && charCode <= 57;
  }

  function isHexDigit(charCode) {
    return (charCode >= 48 && charCode <= 57) || (charCode >= 97 && charCode <= 102) || (charCode >= 65 && charCode <= 70);
  }

  function isBinDigit(charCode) {
    return 48 === charCode || 49 === charCode;
  }

  // This is used in the `readEscapeSequence()` function when the `feature.p8scii`
  // is enabled. It asserts that the given character (pX and its charCode pXCharCode)
  // following certain escape sequences is a valid P0/P1.

  function isValidEscapeParam(charCode) {
    // Valid parameter should be a number or lower case character (maybe)
    return charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 122;
  }

  // From [Lua 5.2](http://www.lua.org/manual/5.2/manual.html#8.1) onwards
  // identifiers cannot use 'locale-dependent' letters (i.e. dependent on the C locale).
  // On the other hand, LuaJIT allows arbitrary octets ≥ 128 in identifiers.

  function isIdentifierStart(charCode) {
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || 95 === charCode)
      return true;
    if (features.extendedIdentifiers && charCode >= 128)
      return true;
    return false;
  }

  function isIdentifierPart(charCode) {
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || 95 === charCode || (charCode >= 48 && charCode <= 57))
      return true;
    if (features.extendedIdentifiers && charCode >= 128)
      return true;
    return false;
  }

  // [3.1 Lexical Conventions](http://www.lua.org/manual/5.2/manual.html#3.1)
  //
  // `true`, `false` and `nil` will not be considered keywords, but literals.

  function isKeyword(id) {
    switch (id.length) {
      case 2:
        return 'do' === id || 'if' === id || 'in' === id || 'or' === id;
      case 3:
        return 'and' === id || 'end' === id || 'for' === id || 'not' === id;
      case 4:
        if ('else' === id || 'then' === id)
          return true;
        if (features.labels && !features.contextualGoto)
          return ('goto' === id);
        return false;
      case 5:
        return 'break' === id || 'local' === id || 'until' === id || 'while' === id;
      case 6:
        return 'elseif' === id || 'repeat' === id || 'return' === id;
      case 8:
        return 'function' === id;
    }
    return false;
  }

  function isUnary(token) {
    if (Punctuator === token.type) {
      if (features.peekPokeOperators) return '#-~@%$'.indexOf(token.value) >= 0;
      return '#-~'.indexOf(token.value) >= 0;
    }
    if (Keyword === token.type) return 'not' === token.value;
    return false;
  }

  // Check if the punctuator is a valid assignment operator.
  // (eg. excludes '<=', '>=')
  //
  // No, this is not quite optimized as would only get called every so ofter
  // and will most of the time hit for '<=', '>=' as returning false and
  // potentially some '+=', '-=', .. (the first list) as returning true

  function isAssignmentOperator(token) {
    if (1 === token.value.length) return false;

    if (Punctuator === token.type && '=' === token.value.charAt(token.value.length-1)) {
      // Most common
      if ('<=' === token.value || '>=' === token.value) return false;
      // Feature independents
      if (indexOf(['+=', '-=', '*=', '/=', '%=', '^=', '..='], token.value) >= 0) return true;
      // Least common
      return indexOf([
          features.backslashIntegerDivision && '\\='
        , features.bitwiseOperators && '|='
        , features.bitwiseOperators && '&='
        , features.bitwiseOperators && '<<='
        , features.bitwiseOperators && '>>='
        , features.bitshiftAdditionalOperators && '>>>='
        , features.bitshiftAdditionalOperators && '<<>='
        , features.bitshiftAdditionalOperators && '>><='
        , features.smileyBitwiseXor && '^^='
      ], token.value) >= 0;
    }
    return false;
  }

  // Check if the token syntactically closes a block.
  //
  // When the block (or one of its parent) is from a single line
  // 'if's or 'while's, and no new line has been reached yet, then
  // a new line (or EOF) is essentially a 'end' token.

  function isBlockFollow(token) {
    if (EOF === token.type) return true;
    // Sadly with the singleLine syntax, an Identifier token may by
    // right after a newline character that should count as a 'end'
    //if (Keyword !== token.type) return false;
    switch (token.value) {
      case 'else': case 'elseif': case 'until':
        return true;
      default:
        return isEnd(token);
    }
  }

  // Complementing the comment above the `isBlockFollow()` function,
  // `expect('end')` should never be called as is because under some
  // conditions a '<EOL>' is considered as a valid 'end' token
  // (despite not beeing one initially).
  //
  // Prefer using something along
  //    if (!consumeEnd()) expect('end');
  //
  // The flag `newLineIsEnd` is set when a potential single line statement
  // is encountered and trigger the `isEnd()` and `consumeEnd()`
  // function to consider a newline character as a valid 'end' token.
  //
  // The flag `foundEndIsNewLine` is used in `consumeEnd()` to assess whether
  // the found 'end' token was actually a newline character
  // (in which case, reset `newLineIsEnd`, any next newline
  // character should not be counted as 'end' token until told
  // otherwise)

  function isEnd(token) {
    foundEndIsNewLine = false;
    if (true === newLineIsEnd) {
      // If previousToken is not on the same line as the current token,
      // there is a newline sequence in between (and there can't be a token
      // between the 2).
      if (EOF === token.type || previousToken && token.line !== previousToken.line) {
        // In that case, this test is enough to say that a valid 'end' "token"
        // was found (and passed! the `foundEndIsNewLine` flag is set
        // not to discard the current token)
        foundEndIsNewLine = true;
        return true;
      }
    }
    if ('end' === token.value) return true;

    return false;
  }

  // Scope
  // -----

  // Store each block scope as a an array of identifier names. Each scope is
  // stored in an FILO-array.
  var scopes
    // The current scope index
    , scopeDepth
    // A list of all global identifier nodes.
    , globals;

  // Create a new scope inheriting all declarations from the previous scope.
  function createScope() {
    var scope = scopes[scopeDepth++].slice();
    scopes.push(scope);
    if (options.onCreateScope) options.onCreateScope();
  }

  // Exit and remove the current scope.
  function destroyScope() {
    var scope = scopes.pop();
    --scopeDepth;
    if (options.onDestroyScope) options.onDestroyScope();
  }

  // Add identifier name to the current scope if it doesn't already exist.
  function scopeIdentifierName(name) {
    if (options.onLocalDeclaration) options.onLocalDeclaration(name);
    if (-1 !== indexOf(scopes[scopeDepth], name)) return;
    scopes[scopeDepth].push(name);
  }

  // Add identifier to the current scope
  function scopeIdentifier(node) {
    scopeIdentifierName(node.name);
    attachScope(node, true);
  }

  // Attach scope information to node. If the node is global, store it in the
  // globals array so we can return the information to the user.
  function attachScope(node, isLocal) {
    if (!isLocal && -1 === indexOfObject(globals, 'name', node.name))
      globals.push(node);

    node.isLocal = isLocal;
  }

  // Is the identifier name available in this scope.
  function scopeHasName(name) {
    return (-1 !== indexOf(scopes[scopeDepth], name));
  }

  // Location tracking
  // -----------------
  //
  // Locations are stored in FILO-array as a `Marker` object consisting of both
  // `loc` and `range` data. Once a `Marker` is popped off the list an end
  // location is added and the data is attached to a syntax node.

  var locations = []
    , trackLocations;

  function createLocationMarker() {
    return new Marker(token);
  }

  function Marker(token) {
    if (options.locations) {
      this.loc = {
          start: {
            line: token.line
          , column: token.range[0] - token.lineStart
        }
        , end: {
            line: 0
          , column: 0
        }
      };
    }
    if (options.ranges) this.range = [token.range[0], 0];
  }

  // Complete the location data stored in the `Marker` by adding the location
  // of the *previous token* as an end location.
  //
  // If there is no previousToken as of yet, it is assumed to be BOF
  Marker.prototype.complete = function() {
    if (options.locations) {
      this.loc.end.line = previousToken.lastLine || previousToken.line;
      this.loc.end.column = previousToken.range[1] - (previousToken.lastLineStart || previousToken.lineStart);
    }
    if (options.ranges) {
      this.range[1] = previousToken.range[1];
    }
  };

  Marker.prototype.bless = function (node) {
    if (this.loc) {
      var loc = this.loc;
      node.loc = {
        start: {
          line: loc.start.line,
          column: loc.start.column
        },
        end: {
          line: loc.end.line,
          column: loc.end.column
        }
      };
    }
    if (this.range) {
      node.range = [
        this.range[0],
        this.range[1]
      ];
    }
  };

  // Create a new `Marker` and add it to the FILO-array.
  function markLocation() {
    if (trackLocations) locations.push(createLocationMarker());
  }

  // Push an arbitrary `Marker` object onto the FILO-array.
  function pushLocation(marker) {
    if (trackLocations) locations.push(marker);
  }

  // Control flow tracking
  // ---------------------
  // A context object that validates loop breaks and `goto`-based control flow.

  function FullFlowContext() {
    this.scopes = [];
    this.pendingGotos = [];
  }

  FullFlowContext.prototype.isInLoop = function () {
    var i = this.scopes.length;
    while (i --> 0) {
      if (this.scopes[i].isLoop)
        return true;
    }
    return false;
  };

  FullFlowContext.prototype.pushScope = function (isLoop) {
    var scope = {
      labels: {},
      locals: [],
      deferredGotos: [],
      isLoop: !!isLoop
    };
    this.scopes.push(scope);
  };

  FullFlowContext.prototype.popScope = function () {
    for (var i = 0; i < this.pendingGotos.length; ++i) {
      var theGoto = this.pendingGotos[i];
      if (theGoto.maxDepth >= this.scopes.length)
        if (--theGoto.maxDepth <= 0)
          raise(theGoto.token, errors.labelNotVisible, theGoto.target);
    }

    this.scopes.pop();
  };

  FullFlowContext.prototype.addGoto = function (target, token) {
    var localCounts = [];

    for (var i = 0; i < this.scopes.length; ++i) {
      var scope = this.scopes[i];
      localCounts.push(scope.locals.length);
      if (Object.prototype.hasOwnProperty.call(scope.labels, target))
        return;
    }

    this.pendingGotos.push({
      maxDepth: this.scopes.length,
      target: target,
      token: token,
      localCounts: localCounts
    });
  };

  FullFlowContext.prototype.addLabel = function (name, token) {
    var scope = this.currentScope();

    if (Object.prototype.hasOwnProperty.call(scope.labels, name)) {
      raise(token, errors.labelAlreadyDefined, name, scope.labels[name].line);
    } else {
      var newGotos = [];

      for (var i = 0; i < this.pendingGotos.length; ++i) {
        var theGoto = this.pendingGotos[i];

        if (theGoto.maxDepth >= this.scopes.length && theGoto.target === name) {
          if (theGoto.localCounts[this.scopes.length - 1] < scope.locals.length) {
            scope.deferredGotos.push(theGoto);
          }
          continue;
        }

        newGotos.push(theGoto);
      }

      this.pendingGotos = newGotos;
    }

    scope.labels[name] = {
      localCount: scope.locals.length,
      line: token.line
    };
  };

  FullFlowContext.prototype.addLocal = function (name, token) {
    this.currentScope().locals.push({
      name: name,
      token: token
    });
  };

  FullFlowContext.prototype.currentScope = function () {
    return this.scopes[this.scopes.length - 1];
  };

  FullFlowContext.prototype.raiseDeferredErrors = function () {
    var scope = this.currentScope();
    var bads = scope.deferredGotos;
    for (var i = 0; i < bads.length; ++i) {
      var theGoto = bads[i];
      raise(theGoto.token, errors.gotoJumpInLocalScope, theGoto.target, scope.locals[theGoto.localCounts[this.scopes.length - 1]].name);
    }
    // Would be dead code currently, but may be useful later
    // if (bads.length)
    //   scope.deferredGotos = [];
  };

  // Simplified context that only checks the validity of loop breaks.

  function LoopFlowContext() {
    this.level = 0;
    this.loopLevels = [];
  }

  LoopFlowContext.prototype.isInLoop = function () {
    return !!this.loopLevels.length;
  };

  LoopFlowContext.prototype.pushScope = function (isLoop) {
    ++this.level;
    if (isLoop)
      this.loopLevels.push(this.level);
  };

  LoopFlowContext.prototype.popScope = function () {
    var levels = this.loopLevels;
    var levlen = levels.length;
    if (levlen) {
      if (levels[levlen - 1] === this.level)
        levels.pop();
    }
    --this.level;
  };

  LoopFlowContext.prototype.addGoto =
  LoopFlowContext.prototype.addLabel =
  /* istanbul ignore next */
  function () { throw new Error('This should never happen'); };

  LoopFlowContext.prototype.addLocal =
  LoopFlowContext.prototype.raiseDeferredErrors =
  function () {};

  function makeFlowContext() {
    return features.labels ? new FullFlowContext() : new LoopFlowContext();
  }

  // Parse functions
  // ---------------

  // Chunk is the main program object. Syntactically it's the same as a block.
  //
  //     chunk ::= block

  function parseChunk() {
    next();
    markLocation();
    if (options.scope) createScope();
    var flowContext = makeFlowContext();
    flowContext.allowVararg = true;
    flowContext.pushScope();
    var body = parseBlock(flowContext);
    flowContext.popScope();
    if (options.scope) destroyScope();
    if (EOF !== token.type) unexpected(token);
    // If the body is empty no previousToken exists when finishNode runs.
    if (trackLocations && !body.length) previousToken = token;
    return finishNode(ast.chunk(body));
  }

  // A block contains a list of statements with an optional return statement
  // as its last statement.
  //
  //     block ::= {stat} [retstat]

  function parseBlock(flowContext) {
    var block = []
      , statement;

    while (!isBlockFollow(token)) {
      // Return has to be the last statement in a block.
      // Likewise 'break' in Lua older than 5.2
      if ('return' === token.value || (!features.relaxedBreak && 'break' === token.value)) {
        block.push(parseStatement(flowContext));
        break;
      }
      statement = parseStatement(flowContext);
      consume(';');
      // Statements are only added if they are returned, this allows us to
      // ignore some statements, such as EmptyStatement.
      if (statement) block.push(statement);
    }

    // Doesn't really need an ast node
    return block;
  }

  // There are two types of statements, simple and compound.
  //
  //     statement ::= break | goto | do | while | repeat | return
  //          | if | for | function | local | label | assignment
  //          | functioncall | ';'

  function parseStatement(flowContext) {
    markLocation();

    if (Punctuator === token.type) {
      if (consume('::')) return parseLabelStatement(flowContext);
    }

    // When a `;` is encountered, simply eat it without storing it.
    if (features.emptyStatement) {
      if (consume(';')) {
        if (trackLocations) locations.pop();
        return;
      }
    }

    flowContext.raiseDeferredErrors();

    // XXX: can't find any "good" way of doing it so this will have to;
    // due to the note above `skipWhiteSpace()`, the if and while handlers
    // need to be aware of the leading token and the leading character
    // (prior to the 'if' or 'while' itself)
    //
    // The taken approach is to not `next()` before calling any handler
    // (after all, the 'local' is part of the LocalStatement and so on...)

    if (Keyword === token.type) {
      switch (token.value) {
        case 'local':    return parseLocalStatement(flowContext);
        case 'if':       return parseIfStatement(flowContext);
        case 'return':   return parseReturnStatement(flowContext);
        case 'function':
          next();
          var name = parseFunctionName();
          return parseFunctionDeclaration(name);
        case 'while':    return parseWhileStatement(flowContext);
        case 'for':      return parseForStatement(flowContext);
        case 'repeat':   return parseRepeatStatement(flowContext);
        case 'break':    return parseBreakStatement(flowContext);
        case 'do':       return parseDoStatement(flowContext);
        case 'goto':     return parseGotoStatement(flowContext);
      }
    }

    if (features.contextualGoto &&
        token.type === Identifier && token.value === 'goto' &&
        lookahead.type === Identifier && lookahead.value !== 'goto') {
      return parseGotoStatement(flowContext);
    }

    // Assignments memorizes the location and pushes it manually for wrapper nodes.
    if (trackLocations) locations.pop();

    return parseAssignmentOrCallStatement(flowContext);
  }

  // ## Statements

  //     label ::= '::' Name '::'

  function parseLabelStatement(flowContext) {
    var nameToken = token
      , label = parseIdentifier();

    if (options.scope) {
      scopeIdentifierName('::' + nameToken.value + '::');
      attachScope(label, true);
    }

    expect('::');

    flowContext.addLabel(nameToken.value, nameToken);
    return finishNode(ast.labelStatement(label));
  }

  //     break ::= 'break' [';']

  function parseBreakStatement(flowContext) {
    expect('break');
    if (!flowContext.isInLoop())
      raise(token, errors.noLoopToBreak, token.value);
    consume(';');
    return finishNode(ast.breakStatement());
  }

  //     goto ::= 'goto' Name

  function parseGotoStatement(flowContext) {
    expect('goto');

    var name = token.value
      , gotoToken = previousToken
      , label = parseIdentifier();

    flowContext.addGoto(name, gotoToken);
    return finishNode(ast.gotoStatement(label));
  }

  //     do ::= 'do' block 'end'

  function parseDoStatement(flowContext) {
    expect('do');

    if (options.scope) createScope();
    flowContext.pushScope();
    var body = parseBlock(flowContext);
    flowContext.popScope();
    if (options.scope) destroyScope();

    if (!consumeEnd()) expect('end');
    return finishNode(ast.doStatement(body));
  }

  //     while ::= 'while' exp 'do' block 'end'

  function parseWhileStatement(flowContext) {
    var canBeSingleLineWhile = features.singleLineWhile
      , mustBeSingleLineWhile = false
      , canBeEmptySingleLineWhile = features.allowEmptySingleLineWhile;

    // Here it _can_ if either:
    //  - no dangling `newLineIsEnd` (not within a single line statement)
    //  - no previous token
    //  - previous token is numeral
    //  - no character before statement
    //  - character before statement is whitespace or lineterminator
    //  - >= PICO-8-0.2.4
    if (canBeSingleLineWhile) {
      canBeSingleLineWhile = features.allowAnyBeforeSingleLineWhile || !previousToken || NumericLiteral === previousToken.type;
      // If the previous token is not a numeral (or beginning of stream), scan backward
      // 1 character expecting a blank character (whitespace or lineterminator)
      if (!canBeSingleLineWhile) {
        var previousCharCode = input.charCodeAt(token.range[0]-1);
        canBeSingleLineWhile = isWhiteSpace(previousCharCode) || isLineTerminator(previousCharCode);
      }
    }

    expect('while');

    // Here it _can_ if: - the condition is in parentheses
    if (canBeSingleLineWhile)
      canBeSingleLineWhile = consume('(');
    var condition = parseExpectedExpression(flowContext);
    if (canBeSingleLineWhile) {
      expect(')');
      // Here it **must** if: - no 'do' token were found past the condition
      mustBeSingleLineWhile = !consume('do');
    } else expect('do');

    // No 'do' were found: the scope of the 'while' is implicitly opened
    if (mustBeSingleLineWhile) {
      // The very next EOL is syntactically equivalent to a 'end'
      newLineIsEnd = true;
      // If the first token of the block is the punctuator ';', it can be the only statement
      canBeEmptySingleLineWhile = canBeEmptySingleLineWhile && Punctuator === token.type && ';' === token.value;
    }

    if (options.scope) createScope();
    flowContext.pushScope(true);
    var body = parseBlock(flowContext);
    flowContext.popScope();
    if (options.scope) destroyScope();

    // Single line 'while' cannot be empty, except:
    //    - if it contains a ';' (>= PICO-8-0.2.3)
    if (mustBeSingleLineWhile && 0 === body.length && !canBeEmptySingleLineWhile)
      raise(token, errors.expected, 'do', tokenValue(previousToken));

    if (!consumeEnd()) expect('end');
    return finishNode(ast.whileStatement(condition, body));
  }

  //     repeat ::= 'repeat' block 'until' exp

  function parseRepeatStatement(flowContext) {
    expect('repeat');

    if (options.scope) createScope();
    flowContext.pushScope(true);
    var body = parseBlock(flowContext);
    expect('until');
    flowContext.raiseDeferredErrors();
    var condition = parseExpectedExpression(flowContext);
    flowContext.popScope();
    if (options.scope) destroyScope();
    return finishNode(ast.repeatStatement(condition, body));
  }

  //     retstat ::= 'return' [exp {',' exp}] [';']

  function parseReturnStatement(flowContext) {
    expect('return');

    var expressions = [];

    if (!isEnd(token)) {
      var expression = parseExpression(flowContext);
      if (null != expression) {
        expressions.push(expression);
        while (!isEnd(token) && consume(',')) {
          if (isEnd(token)) raiseUnexpectedToken('<expression>', previousToken);
          expression = parseExpectedExpression(flowContext);
          expressions.push(expression);
        }
      }
      consume(';'); // grammar tells us ; is optional here.
    }
    return finishNode(ast.returnStatement(expressions));
  }

  //     if ::= 'if' exp 'then' block {elif} ['else' block] 'end'
  //     elif ::= 'elseif' exp 'then' block

  function parseIfStatement(flowContext) {
    var canBeSingleLineIf = features.singleLineIf
      , mustBeSingleLineIf = false
      , canBeEmptySingleLineIf = features.allowEmptySingleLineIf;

    // Here it _can_ if either:
    //  - no dangling `newLineIsEnd` (not within a single line statement)
    //  - no previous token
    //  - previous token is numeral
    //  - no character before statement
    //  - character before statement is whitespace or lineterminator
    //  - >= PICO-8-0.2.4
    if (canBeSingleLineIf) {
      canBeSingleLineIf = features.allowAnyBeforeSingleLineIf || !previousToken || NumericLiteral === previousToken.type;
      // If the previous token is not a numeral (or beginning of stream), scan 1 character
      // past the previous token expecting a blank character (whitespace or lineterminator)
      if (!canBeSingleLineIf) {
        var previousCharCode = input.charCodeAt(token.range[0]-1);
        canBeSingleLineIf = isWhiteSpace(previousCharCode) || isLineTerminator(previousCharCode);
      }
    }

    expect('if');

    var clauses = []
      , condition
      , body
      , marker;

    // IfClauses begin at the same location as the parent IfStatement.
    // It ends at the start of `end`, `else`, or `elseif`.
    if (trackLocations) {
      marker = locations[locations.length - 1];
      locations.push(marker);
    }

    // Here it _can_ if: - the condition is in parentheses
    if (canBeSingleLineIf)
      canBeSingleLineIf = consume('(');
    condition = parseExpectedExpression(flowContext);
    if (canBeSingleLineIf) {
      expect(')');
      // Here it **must** if: - no 'then' token were found past the condition
      mustBeSingleLineIf = !consume('then');
    } else expect('then');

    // No 'then' were found: the scope of the 'if' is implicitly opened
    if (mustBeSingleLineIf) {
      // The very next EOL is syntactically equivalent to a 'end'
      newLineIsEnd = true;
      // If the first token of the block is the punctuator ';', it can be the only statement
      canBeEmptySingleLineIf = canBeEmptySingleLineIf && Punctuator === token.type && ';' === token.value;
    }

    if (options.scope) createScope();
    flowContext.pushScope();
    body = parseBlock(flowContext);
    flowContext.popScope();
    if (options.scope) destroyScope();
    clauses.push(finishNode(ast.ifClause(condition, body)));

    // Single line 'if' does not accept 'elseif' clause.
    if (mustBeSingleLineIf && 'elseif' === token.value) unexpected('elseif');

    if (trackLocations) marker = createLocationMarker();
    while (consume('elseif')) {
      pushLocation(marker);
      condition = parseExpectedExpression(flowContext);
      expect('then');
      if (options.scope) createScope();
      flowContext.pushScope();
      body = parseBlock(flowContext);
      flowContext.popScope();
      if (options.scope) destroyScope();
      clauses.push(finishNode(ast.elseifClause(condition, body)));
      if (trackLocations) marker = createLocationMarker();
    }

    if (consume('else')) {
      // Include the `else` in the location of ElseClause.
      if (trackLocations) {
        marker = new Marker(previousToken);
        locations.push(marker);
      }
      if (options.scope) createScope();
      flowContext.pushScope();
      body = parseBlock(flowContext);
      flowContext.popScope();
      if (options.scope) destroyScope();
      clauses.push(finishNode(ast.elseClause(body)));
    }

    // Single line 'if' cannot be empty, except:
    //    - if an 'else' clause is present, then it is ok (even if both are empty)
    //    - if the 'if' clause is closed by a proper 'end', then it may be empty
    //    - if the 'if' clause contains a ';' (>= PICO-8-0.2.3)
    if (mustBeSingleLineIf && 0 === clauses[0].body.length && 1 === clauses.length && !canBeEmptySingleLineIf) {
      var validEndToken = 'end' === token.value && index < length;
      // This last index check is because `consumeEOF` sends an artificial 'end' token in case
      // of dangling `newLineIsEnd`; though it does not count as a valid end here
      if (!validEndToken)
        raise(token, errors.expected, 'then', tokenValue(previousToken));
    }

    if (!consumeEnd()) expect('end');
    return finishNode(ast.ifStatement(clauses));
  }

  // There are two types of for statements, generic and numeric.
  //
  //     for ::= 'for' Name '=' exp ',' exp [',' exp] 'do' block 'end'
  //     for ::= 'for' namelist 'in' explist 'do' block 'end'
  //     namelist ::= Name {',' Name}
  //     explist ::= exp {',' exp}

  function parseForStatement(flowContext) {
    expect('for');

    var variable = parseIdentifier()
      , body;

    // The start-identifier is local.

    if (options.scope) {
      createScope();
      scopeIdentifier(variable);
    }

    // If the first expression is followed by a `=` punctuator, this is a
    // Numeric For Statement.
    if (consume('=')) {
      // Start expression
      var start = parseExpectedExpression(flowContext);
      expect(',');
      // End expression
      var end = parseExpectedExpression(flowContext);
      // Optional step expression
      var step = consume(',') ? parseExpectedExpression(flowContext) : null;

      expect('do');
      flowContext.pushScope(true);
      body = parseBlock(flowContext);
      flowContext.popScope();
      if (!consumeEnd()) expect('end');
      if (options.scope) destroyScope();

      return finishNode(ast.forNumericStatement(variable, start, end, step, body));
    }
    // If not, it's a Generic For Statement
    else {
      // The namelist can contain one or more identifiers.
      var variables = [variable];
      while (consume(',')) {
        variable = parseIdentifier();
        // Each variable in the namelist is locally scoped.
        if (options.scope) scopeIdentifier(variable);
        variables.push(variable);
      }
      expect('in');
      var iterators = [];

      // One or more expressions in the explist.
      do {
        var expression = parseExpectedExpression(flowContext);
        iterators.push(expression);
      } while (consume(','));

      expect('do');
      flowContext.pushScope(true);
      body = parseBlock(flowContext);
      flowContext.popScope();
      if (!consumeEnd()) expect('end');
      if (options.scope) destroyScope();

      return finishNode(ast.forGenericStatement(variables, iterators, body));
    }
  }

  // Local statements can either be variable assignments or function
  // definitions. If a function definition is found, it will be delegated to
  // `parseFunctionDeclaration()` with the isLocal flag.
  //
  // This AST structure might change into a local assignment with a function
  // child.
  //
  //     local ::= 'local' 'function' Name funcdecl
  //        | 'local' Name {',' Name} ['=' exp {',' exp}]

  function parseLocalStatement(flowContext) {
    expect('local');

    var name
      , declToken = previousToken;

    if (Identifier === token.type) {
      var variables = []
        , init = [];

      do {
        name = parseIdentifier();

        variables.push(name);
        flowContext.addLocal(name.name, declToken);
      } while (consume(','));

      if (consume('=')) {
        do {
          var expression = parseExpectedExpression(flowContext);
          init.push(expression);
        } while (consume(','));
      }

      // Declarations doesn't exist before the statement has been evaluated.
      // Therefore assignments can't use their declarator. And the identifiers
      // shouldn't be added to the scope until the statement is complete.
      if (options.scope) {
        for (var i = 0, l = variables.length; i < l; ++i) {
          scopeIdentifier(variables[i]);
        }
      }

      return finishNode(ast.localStatement(variables, init));
    }
    if (consume('function')) {
      name = parseIdentifier();
      flowContext.addLocal(name.name, declToken);

      if (options.scope) {
        scopeIdentifier(name);
        createScope();
      }

      // MemberExpressions are not allowed in local function statements.
      return parseFunctionDeclaration(name, true);
    } else {
      raiseUnexpectedToken('<name>', token);
    }
  }

  //     assignment ::= varlist '=' explist
  //     var ::= Name | prefixexp '[' exp ']' | prefixexp '.' Name
  //     varlist ::= var {',' var}
  //     explist ::= exp {',' exp}
  //
  //     call ::= callexp
  //     callexp ::= prefixexp args | prefixexp ':' Name args

  function parseAssignmentOrCallStatement(flowContext) {
    // Keep a reference to the previous token for better error messages in case
    // of invalid statement
    var previous = token
      , marker, startMarker;
    var lvalue, base, name;

    var targets = [];

    if (trackLocations) startMarker = createLocationMarker();

    do {
      if (trackLocations) marker = createLocationMarker();

      if (Identifier === token.type) {
        name = token.value;
        base = parseIdentifier();
        // Set the parent scope.
        if (options.scope) attachScope(base, scopeHasName(name));
        lvalue = true;
      } else if ('(' === token.value) {
        next();
        base = parseExpectedExpression(flowContext);
        expect(')');
        lvalue = false;
      } else {
        return unexpected(token);
      }

      both: for (;;) {
        var newBase;

        switch (StringLiteral === token.type ? '"' : token.value) {
        case '.':
        case '[':
          lvalue = true;
          break;
        case ':':
        case '(':
        case '{':
        case '"':
          lvalue = null;
          break;
        default:
          break both;
        }

        base = parsePrefixExpressionPart(base, marker, flowContext);
      }

      targets.push(base);

      if (',' !== token.value)
        break;

      if (!lvalue) {
        return unexpected(token);
      }

      next();
    } while (true);

    if (targets.length === 1 && lvalue === null) {
      pushLocation(marker);
      return finishNode(ast.callStatement(targets[0]));
    } else if (!lvalue) {
      return unexpected(token);
    }

    var assignmentOperator = false;

    // Try to find the operator if this is really an assignment operator statement
    // XXX: not sure this should be done like this...
    if (features.assignmentOperators && isAssignmentOperator(token)) {
      assignmentOperator = token.value.slice(0, token.value.length-1);
      next();
    } else expect('=');

    var values = [];

    do {
      values.push(parseExpectedExpression(flowContext));
    } while (consume(','));

    pushLocation(startMarker);
    var assignmentNode = assignmentOperator ?
      ast.assignmentOperatorStatement(assignmentOperator, targets, values)
      : ast.assignmentStatement(targets, values);
    return finishNode(assignmentNode);
  }

  // ### Non-statements

  //     Identifier ::= Name

  function parseIdentifier() {
    markLocation();
    var identifier = token.value;
    if (Identifier !== token.type) raiseUnexpectedToken('<name>', token);
    next();
    return finishNode(ast.identifier(identifier));
  }

  // Parse the functions parameters and body block. The name should already
  // have been parsed and passed to this declaration function. By separating
  // this we allow for anonymous functions in expressions.
  //
  // For local functions there's a boolean parameter which needs to be set
  // when parsing the declaration.
  //
  //     funcdecl ::= '(' [parlist] ')' block 'end'
  //     parlist ::= Name {',' Name} | [',' '...'] | '...'

  function parseFunctionDeclaration(name, isLocal) {
    var flowContext = makeFlowContext();
    flowContext.pushScope();

    var parameters = [];
    expect('(');

    // The declaration has arguments
    if (!consume(')')) {
      // Arguments are a comma separated list of identifiers, optionally ending
      // with a vararg.
      while (true) {
        if (Identifier === token.type) {
          var parameter = parseIdentifier();
          // Function parameters are local.
          if (options.scope) scopeIdentifier(parameter);

          parameters.push(parameter);

          if (consume(',')) continue;
        }
        // No arguments are allowed after a vararg.
        else if (VarargLiteral === token.type) {
          flowContext.allowVararg = true;
          parameters.push(parsePrimaryExpression(flowContext));
        } else {
          raiseUnexpectedToken('<name> or \'...\'', token);
        }
        expect(')');
        break;
      }
    }

    var body = parseBlock(flowContext);
    flowContext.popScope();
    if (!consumeEnd()) expect('end');
    if (options.scope) destroyScope();

    isLocal = isLocal || false;
    return finishNode(ast.functionStatement(name, parameters, isLocal, body));
  }

  // Parse the function name as identifiers and member expressions.
  //
  //     Name {'.' Name} [':' Name]

  function parseFunctionName() {
    var base, name, marker;

    if (trackLocations) marker = createLocationMarker();
    base = parseIdentifier();

    if (options.scope) {
      attachScope(base, scopeHasName(base.name));
      createScope();
    }

    while (consume('.')) {
      pushLocation(marker);
      name = parseIdentifier();
      base = finishNode(ast.memberExpression(base, '.', name));
    }

    if (consume(':')) {
      pushLocation(marker);
      name = parseIdentifier();
      base = finishNode(ast.memberExpression(base, ':', name));
      if (options.scope) scopeIdentifierName('self');
    }

    return base;
  }

  //     tableconstructor ::= '{' [fieldlist] '}'
  //     fieldlist ::= field {fieldsep field} fieldsep
  //     field ::= '[' exp ']' '=' exp | Name = 'exp' | exp
  //
  //     fieldsep ::= ',' | ';'

  function parseTableConstructor(flowContext) {
    var fields = []
      , key, value;

    while (true) {
      markLocation();
      if (Punctuator === token.type && consume('[')) {
        key = parseExpectedExpression(flowContext);
        expect(']');
        expect('=');
        value = parseExpectedExpression(flowContext);
        fields.push(finishNode(ast.tableKey(key, value)));
      } else if (Identifier === token.type) {
        if ('=' === lookahead.value) {
          key = parseIdentifier();
          next();
          value = parseExpectedExpression(flowContext);
          fields.push(finishNode(ast.tableKeyString(key, value)));
        } else {
          value = parseExpectedExpression(flowContext);
          fields.push(finishNode(ast.tableValue(value)));
        }
      } else {
        if (null == (value = parseExpression(flowContext))) {
          locations.pop();
          break;
        }
        fields.push(finishNode(ast.tableValue(value)));
      }
      if (',;'.indexOf(token.value) >= 0) {
        next();
        continue;
      }
      break;
    }
    expect('}');
    return finishNode(ast.tableConstructorExpression(fields));
  }

  // Expression parser
  // -----------------
  //
  // Expressions are evaluated and always return a value. If nothing is
  // matched null will be returned.
  //
  //     exp ::= (unop exp | primary | prefixexp ) { binop exp }
  //
  //     primary ::= nil | false | true | Number | String | '...'
  //          | functiondef | tableconstructor
  //
  //     prefixexp ::= (Name | '(' exp ')' ) { '[' exp ']'
  //          | '.' Name | ':' Name args | args }
  //

  function parseExpression(flowContext) {
    var expression = parseSubExpression(0, flowContext);
    return expression;
  }

  // Parse an expression expecting it to be valid.

  function parseExpectedExpression(flowContext) {
    var expression = parseExpression(flowContext);
    if (null == expression) raiseUnexpectedToken('<expression>', token);
    else return expression;
  }


  // Return the precedence priority of the operator.
  //
  // As unary `-` can't be distinguished from binary `-`, unary precedence
  // isn't described in this table but in `parseSubExpression()` itself.
  //
  // As this function gets hit on every expression it's been optimized due to
  // the expensive CompareICStub which took ~8% of the parse time.

  function binaryPrecedence(operator) {
    var charCode = operator.charCodeAt(0)
      , length = operator.length;

    if (1 === length) {
      switch (charCode) {
        case 94: return 12; // ^
        case 92: return 10; // \
        case 42: case 47: case 37: return 10; // * / %
        case 43: case 45: return 9; // + -
        case 38: return 6; // &
        case 126: return features.smileyBitwiseXor ? 0 : 5; // ~
        case 124: return 4; // |
        case 60: case 62: return 3; // < >
      }
    } else if (2 === length) {
      switch (charCode) {
        case 47: return 10; // //
        case 46: return 8; // ..
        case 60: case 62:
          if ('<<' === operator || '>>' === operator) return 7; // << >>
          return 3; // <= >=
        case 94: return 12; // ^^
        case 61: case 126: return 3; // == ~=
        case 111: return 1; // or
      }       // Other 3-length token that can get here: 'end', 'and'
    } else if (3 === length && (60 === charCode || 62 === charCode)) {
      // The only operators that can make it here are '>>>', '<<>' and '>><'
      return 7;
    } else if (97 === charCode && 'and' === operator) return 2;
    return 0;
  }

  // Implement an operator-precedence parser to handle binary operator
  // precedence.
  //
  // We use this algorithm because it's compact, it's fast and Lua core uses
  // the same so we can be sure our expressions are parsed in the same manner
  // without excessive amounts of tests.
  //
  //     exp ::= (unop exp | primary | prefixexp ) { binop exp }

  function parseSubExpression(minPrecedence, flowContext) {
    var operator = token.value
    // The left-hand side in binary operations.
      , expression, marker;

    if (trackLocations) marker = createLocationMarker();

    // UnaryExpression
    if (isUnary(token)) {
      markLocation();
      next();
      var argument = parseSubExpression(10, flowContext);
      if (argument == null) raiseUnexpectedToken('<expression>', token);
      expression = finishNode(ast.unaryExpression(operator, argument));
    }
    if (null == expression) {
      // PrimaryExpression
      expression = parsePrimaryExpression(flowContext);

      // PrefixExpression
      if (null == expression) {
        expression = parsePrefixExpression(flowContext);
      }
    }
    // This is not a valid left hand expression.
    if (null == expression) return null;

    var precedence;
    while (true) {
      operator = token.value;

      precedence = (Punctuator === token.type || Keyword === token.type) ?
        binaryPrecedence(operator) : 0;

      if (precedence === 0 || precedence <= minPrecedence) break;
      // Right-hand precedence operators
      if ('^' === operator || '..' === operator) --precedence;
      next();
      var right = parseSubExpression(precedence, flowContext);
      if (null == right) raiseUnexpectedToken('<expression>', token);
      // Push in the marker created before the loop to wrap its entirety.
      if (trackLocations) locations.push(marker);
      expression = finishNode(ast.binaryExpression(operator, expression, right));

    }
    return expression;
  }

  //     prefixexp ::= prefix {suffix}
  //     prefix ::= Name | '(' exp ')'
  //     suffix ::= '[' exp ']' | '.' Name | ':' Name args | args
  //
  //     args ::= '(' [explist] ')' | tableconstructor | String

  function parsePrefixExpressionPart(base, marker, flowContext) {
    var expression, identifier;

    if (Punctuator === token.type) {
      switch (token.value) {
        case '[':
          pushLocation(marker);
          next();
          expression = parseExpectedExpression(flowContext);
          expect(']');
          return finishNode(ast.indexExpression(base, expression));
        case '.':
          pushLocation(marker);
          next();
          identifier = parseIdentifier();
          return finishNode(ast.memberExpression(base, '.', identifier));
        case ':':
          pushLocation(marker);
          next();
          identifier = parseIdentifier();
          base = finishNode(ast.memberExpression(base, ':', identifier));
          // Once a : is found, this has to be a CallExpression, otherwise
          // throw an error.
          pushLocation(marker);
          return parseCallExpression(base, flowContext);
        case '(': case '{': // args
          pushLocation(marker);
          return parseCallExpression(base, flowContext);
      }
    } else if (StringLiteral === token.type) {
      pushLocation(marker);
      return parseCallExpression(base, flowContext);
    }

    return null;
  }

  function parsePrefixExpression(flowContext) {
    var base, name, marker;

    if (trackLocations) marker = createLocationMarker();

    // The prefix
    if (Identifier === token.type) {
      name = token.value;
      base = parseIdentifier();
      // Set the parent scope.
      if (options.scope) attachScope(base, scopeHasName(name));
    } else if (consume('(')) {
      base = parseExpectedExpression(flowContext);
      expect(')');
    } else {
      return null;
    }

    // The suffix
    for (;;) {
      var newBase = parsePrefixExpressionPart(base, marker, flowContext);
      if (newBase === null)
        break;
      base = newBase;
    }

    return base;
  }

  //     args ::= '(' [explist] ')' | tableconstructor | String

  function parseCallExpression(base, flowContext) {
    if (Punctuator === token.type) {
      switch (token.value) {
        case '(':
          if (!features.emptyStatement) {
            if (token.line !== previousToken.line)
              raise(null, errors.ambiguousSyntax, token.value);
          }
          next();

          // List of expressions
          var expressions = [];
          var expression = parseExpression(flowContext);
          if (null != expression) {
            expressions.push(expression);
            while (consume(',')) {
              expression = parseExpectedExpression(flowContext);
              expressions.push(expression);
            }
          }

          expect(')');
          return finishNode(ast.callExpression(base, expressions));

        case '{':
          markLocation();
          next();
          var table = parseTableConstructor(flowContext);
          return finishNode(ast.tableCallExpression(base, table));
      }
    } else if (StringLiteral === token.type) {
      return finishNode(ast.stringCallExpression(base, parsePrimaryExpression(flowContext)));
    }

    raiseUnexpectedToken('function arguments', token);
  }

  //     primary ::= String | Numeric | nil | true | false
  //          | functiondef | tableconstructor | '...'

  function parsePrimaryExpression(flowContext) {
    var literals = StringLiteral | NumericLiteral | BooleanLiteral | NilLiteral | VarargLiteral
      , value = token.value
      , type = token.type
      , marker;

    if (trackLocations) marker = createLocationMarker();

    if (type === VarargLiteral && !flowContext.allowVararg) {
      raise(token, errors.cannotUseVararg, token.value);
    }

    if (type & literals) {
      pushLocation(marker);
      var raw = input.slice(token.range[0], token.range[1])
        , rawInterrupted = token.rawInterrupted;
      next();
      return finishNode(ast.literal(type, value, raw, rawInterrupted));
    } else if (Keyword === type && 'function' === value) {
      pushLocation(marker);
      next();
      if (options.scope) createScope();
      return parseFunctionDeclaration(null);
    } else if (consume('{')) {
      pushLocation(marker);
      return parseTableConstructor(flowContext);
    }
  }

  // Parser
  // ------

  // Export the main parser.
  //
  //   - `wait` Hold parsing until end() is called. Defaults to false
  //   - `comments` Store comments. Defaults to true.
  //   - `scope` Track identifier scope. Defaults to false.
  //   - `locations` Store location information. Defaults to false.
  //   - `ranges` Store the start and end character locations. Defaults to
  //     false.
  //   - `onCreateNode` Callback which will be invoked when a syntax node is
  //     created.
  //   - `onCreateScope` Callback which will be invoked when a new scope is
  //     created.
  //   - `onDestroyScope` Callback which will be invoked when the current scope
  //     is destroyed.
  //
  // Example:
  //
  //     var parser = require('pico8parse');
  //     parser.parse('i = 0');

  exports.parse = parse;

  var versionFeatures = {
      '5.1': {
      // Lua supports trailing "." in hex numerals from 5.2 onward; this "feature" keep
      // from parsing that as correct for Lua 5.1
        noTrailingDotInHexNumeral: true
    }
    , '5.2': {
        labels: true
      , emptyStatement: true
      , hexEscapes: true
      , skipWhitespaceEscape: true
      , strictEscapes: true
      , relaxedBreak: true
    }
    , '5.3': {
        _inherits: ['5.2']
      , unicodeEscapes: true
      , bitwiseOperators: true
      , integerDivision: true
    }
    , 'LuaJIT': {
      // XXX: LuaJIT language features may depend on compilation options; may need to
      // rethink how to handle this. Specifically, there is a LUAJIT_ENABLE_LUA52COMPAT
      // that removes contextual goto. Maybe add 'LuaJIT-5.2compat' as well?
        labels: true
      , hexEscapes: true
      , skipWhitespaceEscape: true
      , strictEscapes: true
      , unicodeEscapes: true
      , contextualGoto: true
      , imaginaryNumbers: true
      , integerSuffixes: true
    }
    // NOTE: p8 file format layout (not the png.p8 but the text p8)
    , 'PICO-8': {
        strictP8FileFormat: true
      , p8Sections: [
          '__lua__'
        , '__gfx__'
        , '__gff__'
        , '__label__'
        , '__map__'
        , '__sfx__'
        , '__music__'
      ]
    }
    // NOTE: first implemented version (some features may have existed before 0.2.1)
    , 'PICO-8-0.2.1': {
        _inherits: ['5.2', 'PICO-8']
      , integerSuffixes: false
      , imaginaryNumbers: false
      , bitwiseOperators: true
      , integerDivision: false
      // Below rules were added for PICO-8
      , binLiteral: true           // eg. 0b101010
      , noExponentLiteral: true    // eg. 1e-1
      , singleLineIf: true         // if ::= 'if' '(' exp ')' block ['else' block] '\n'
      , singleLineWhile: true      // while ::= 'while' '(' exp ')' block '\n'
      , singleLinePrint: true      // slprint ::= '\n' '?' [explist] '\n'   the result is a CallStatement node
      , assignmentOperators: true  // a += b
      , traditionalNotEqual: true  // a != b
      , traditionalComments: true  // '//' is a comment (this would take precedence on the int div)
      , noDeepLongStringComments: true // '--[=*[' does not start a multiline (longstring) comment
      , bitshiftAdditionalOperators: true // a >>> b   a <<> b   a >>< b (there assignment operators are added by "assignmentOperators: true")
      , peekPokeOperators: true    // @a   %a   $a
      , backslashIntegerDivision: true // a \ b (also disables a // b ie. **makes it invalid** (maybe -- see "integerDivision: false" above), same about assignment operators)
      , smileyBitwiseXor: true     // a ^^ b (also disables a ~ b ie. **makes it invalid** (maybe), same about assignment operators)
    }
    , 'PICO-8-0.2.2': {
        _inherits: ['PICO-8-0.2.1']
      , p8scii: true // additional string escape sequences
    }
    , 'PICO-8-0.2.3': {
        _inherits: ['PICO-8-0.2.2']
      , singleLinePrintNoLineDependency: true // '?' shorthand can appear same line as an single line if/while
      , allowEmptySingleLineIf: true // 'if' single line syntax may be empty of statement using a ';'
      , allowEmptySingleLineWhile: true // 'while' single line syntax may be empty of statement using a ';'
    }
    , 'PICO-8-0.2.4': {
        _inherits: ['PICO-8-0.2.3']
      , allowAnyBeforeSingleLineIf: true // 'if' single line no longer needs to be preceded by a blank or number
      , allowAnyBeforeSingleLineWhile: true // 'while' single line no longer needs to be preceded by a blank or number
    }
    , 'PICO-8-0.2.4c': {
        _inherits: ['PICO-8-0.2.4']
      , p8Sections: [
          '__lua__'
        , '__gfx__'
        , '__gff__'
        , '__label__'
        , '__map__'
        , '__sfx__'
        , '__music__'
        , '__meta:' // (officially:) << with a heading of '__meta:somestring__' are preserved by, but not (yet?) utilised by PICO-8 itself >>
      ]
    }
  };

  // Expand the '_inherits' of each version (recursively).

  /* istanbul ignore next */ function expandInherited(_versionId) {
    if ('undefined' !== typeof _versionId) {
      var features = versionFeatures[_versionId];

      if (Object.hasOwnProperty.call(features, '_inherits') && isArray(features._inherits)) {
        for (var k = 0; k < features._inherits.length; k++) {
          var inherited = expandInherited(features._inherits[k]);
          // Entries in "features" (child) will override inherited ones (that are in "inherited")
          features = assign({}, inherited, features);
        }

        features._inherits = [];
      }

      return features;
    }

    // No version provided, expand all inplace
    for (var versionId in versionFeatures)
      if (Object.hasOwnProperty.call(versionFeatures, versionId))
        versionFeatures[versionId] = expandInherited(versionId);
  }

  expandInherited();
  exports.versionFeatures = versionFeatures;

  function parse(_input, _options) {
    if ('undefined' === typeof _options && 'object' === typeof _input) {
      _options = _input;
      _input = undefined;
    }
    if (!_options) _options = {};

    input = _input || '';
    options = assign({}, defaultOptions, _options);

    // Rewind the lexer
    index = 0;
    line = 1;
    lineStart = 0;
    length = input.length;
    previousToken = undefined;
    token = undefined;
    lookahead = undefined;
    fakeToken = undefined;
    comments = undefined;
    tokenStart = undefined;
    currentP8Section = undefined;
    newLineIsEnd = false;
    foundEndIsNewLine = false;
    newLineIsClose = false;
    // When tracking identifier scope, initialize with an empty scope.
    scopes = [[]];
    scopeDepth = 0;
    globals = [];
    locations = [];

    if (!Object.prototype.hasOwnProperty.call(versionFeatures, options.luaVersion)) {
      throw new Error(sprintf("Lua version '%1' not supported", options.luaVersion));
    }

    features = assign({}, versionFeatures[options.luaVersion]);
    if (options.extendedIdentifiers !== void 0)
      features.extendedIdentifiers = !!options.extendedIdentifiers;

    if (!Object.prototype.hasOwnProperty.call(encodingModes, options.encodingMode)) {
      throw new Error(sprintf("Encoding mode '%1' not supported", options.encodingMode));
    }

    encodingMode = encodingModes[options.encodingMode];

    if (options.comments) comments = [];
    if (!options.wait) return end();
    return exports;
  }

  // Write to the source code buffer without beginning the parse.
  exports.write = write;

  function write(_input) {
    input += String(_input);
    length = input.length;
    return exports;
  }

  // Send an EOF and begin parsing.
  exports.end = end;

  function end(_input) {
    if ('undefined' !== typeof _input) write(_input);

    var revertStrictP8FileFormat = false;

    if (!features.strictP8FileFormat) {
      // Ignore shebangs.
      if (input && input.substr(0, 2) === '#!')
        while (index < length && !isLineTerminator(input.charCodeAt(++index)));
    } else {
      if (!options.ignoreStrictP8FileFormat) {
        // Check for header
        index = input.indexOf("pico-8 cartridge");
        if (index < 0) raise(null, errors.missingHeader, "pico-8 cartridge");
        index += 15;
        // Ignore the header line
        while (index < length && !isLineTerminator(input.charCodeAt(++index)));
        consumeEOL();
        // Ignore the following line
        while (index < length && !isLineTerminator(input.charCodeAt(index))) index++;
        // Ignore until first valid p8Section
        var match;
        do {
          match = input.slice(++index).match(/^__.*?__/m);
          if (null === match) break;
          index += match.index;
          currentP8Section = scanP8SectionStart();
        } while (null === currentP8Section);
        // Reaching the end of stream before finding anything is fine (content is just discarded)
        if (!match) index = input.length;
        // Count any newline that were passed (the slice [0:index] ends with a EOL)
        else line = input.slice(0, index).split('\n').length;
      } else {
        revertStrictP8FileFormat = true;
        features.strictP8FileFormat = false;
      }
      if (!currentP8Section) currentP8Section = '__lua__';
    }

    length = input.length;
    trackLocations = options.locations || options.ranges;
    // Initialize with a lookahead token.
    lookahead = lex();

    var chunk = parseChunk();
    if (options.comments) chunk.comments = comments;
    if (options.scope) chunk.globals = globals;

    if (revertStrictP8FileFormat) features.strictP8FileFormat = true;

    /* istanbul ignore if */
    if (locations.length > 0)
      throw new Error('Location tracking failed. This is most likely a bug in pico8parse.');

    return chunk;
  }

  exports['default'] = exports;
}));
/* vim: set sw=2 ts=2 et tw=79 : */
