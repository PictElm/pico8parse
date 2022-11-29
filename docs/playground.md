<script src="../pico8parse.js"></script>

Input Lua code on the left side and press the Parse button to generate the AST as a JSON on the right.

<form class="text-center form-inline">
  <select name="version"></select>
  <button onclick="event.preventDefault();parseInput()" class="btn">Parse</button>
  <details>
    <summary>Parsing options</summary>
    <input type="checkbox" id="ignoreStrictP8FileFormat" name="ignoreStrictP8FileFormat" checked>
    <label for="ignoreStrictP8FileFormat">Ignore P8 file format (eg. header)</label>
    &middot;
    <select id="encodingMode" name="encodingMode">
      <option value="pseudo-latin1">pseudo-latin1</option>
      <option value="x-user-defined">x-user-defined</option>
      <option value="none" selected>none (discard)</option>
    </select>
    <label for="encodingMode">Encoding mode</label>
    &middot;
    <input type="checkbox" id="comments" name="comments" checked>
    <label for="comments">Store comments</label>
    &middot;
    <input type="checkbox" id="scope" name="scope" checked>
    <label for="scope">Store scope</label>
    &middot;
    <input type="checkbox" id="locations" name="locations" checked>
    <label for="locations">Store locations</label>
    &middot;
    <input type="checkbox" id="ranges" name="ranges" checked>
    <label for="ranges">Store ranges</label>
  </details>
</form>

<div class="text-center">
  <textarea name="input" class="editor" spellcheck="false" autocomplete="off" placeholder="Input Lua code" autofocus></textarea>
  <textarea name="output" class="editor" spellcheck="false" autocomplete="off" placeholder="Output JSON AST"></textarea>
</div>

<style>
  .editor {
    min-width: 42%;
    max-width: 42%;
    min-height: 120px;
    height: 42vh;
    font-family: monospace;
    resize: none;
    white-space: pre;
    overflow: auto;
  }
  input[type=checkbox] { margin-bottom: revert; }
  /* colors are shamelessly stolen from VSCode's "Light+" and "Dark+" */
  .comment { color: #008000 }
  .punctuation { color: #000000 }
  .function { color: #795E26 }
  .identifier { color: #001080 }
  .constant { color: #0000FF }
  .keyword { color: #AF00DB }
  .number { color: #098658 }
  .string { color: #A31515 }
  .special { color: #267F99 }
  body.dark .comment { color: #6A9955 }
  body.dark .punctuation { color: #D4D4D4 }
  body.dark .function { color: #DCDCAA }
  body.dark .identifier { color: #9CDCFE }
  body.dark .constant { color: #569CD6 }
  body.dark .keyword { color: #C586C0 }
  body.dark .number { color: #B5CEA8 }
  body.dark .string { color: #CE9178 }
  body.dark .special { color: #4EC9B0 }
</style>

<script src="util/cta.js"></script>

<script>
  var ast = {}
    , err = null
    , parseInput = function(directInput, directOptions) {};

  (function() {
    function _get(name) { return document.getElementsByName(name)[0]; }
    var inputEditor = makeColoredTextarea(_get('input'), _makeLexerPico8)
      , outputEditor = makeColoredTextarea(_get('output'), _makeLexerJSON)
      , version = _get('version')
      , ignoreStrictP8FileFormat = _get('ignoreStrictP8FileFormat')
      , encodingMode = _get('encodingMode')
      , comments = _get('comments')
      , scope = _get('scope')
      , locations = _get('locations')
      , ranges = _get('ranges')
      ;

    var lst = []
      , ver, k;
    for (ver in pico8parse.versionFeatures) lst.push(ver); lst.sort();
    for (k = 0, ver = lst[0]; k < lst.length; ver = lst[++k])
      version.add(new Option(ver, ver));
    version.value = lst[lst.length-1]; //pico8parse.defaultOptions.luaVersion;

    version.addEventListener('change', inputEditor.redraw);
    ignoreStrictP8FileFormat.addEventListener('change', function() {
      var ta = inputEditor.textarea
        , m = ta.value.match(/^.*pico-8 cartridge.*\n(.*\n__lua__.*\n)?/);
      if (ignoreStrictP8FileFormat.checked) {
        if (m) ta.setRangeText("", 0, m[0].length);
      } else {
        if (!m) ta.setRangeText("pico-8 cartridge\n\n__lua__\n", 0, 0);
        else if (m[0].indexOf("__lua__") < 0) ta.setRangeText("\n__lua__\n", m[0].length, m[0].length);
      }
      inputEditor.redraw();
    });

    parseInput = function(directInput, directOptions) {
      var input = directInput || inputEditor.textarea.value
        , options = (Object.assign || _assign)({
              luaVersion: version.value
            , ignoreStrictP8FileFormat: ignoreStrictP8FileFormat.checked
            , encodingMode: encodingMode.value
            , comments: comments.checked
            , scope: scope.checked
            , locations: locations.checked
            , ranges: ranges.checked
          }, directOptions);
      try {
        ast = pico8parse.parse(input, options);
        console.log("ast =");
        console.dir(ast);
        outputEditor.textarea.value = JSON.stringify(ast, null, 2);
        outputEditor.redraw();
        return ast;
      } catch (e) {
        err = e;
        console.log("err =");
        console.dir(err);
        outputEditor.textarea.value = JSON.stringify({ index: e.index, column: e.column, line: e.line, message: e.message }, null, 2);
        outputEditor.redraw();
        return null;
      }
    };

    function _assign(dest) {
      var args = slice.call(arguments, 1)
        , src, prop;

      for (var i = 0, length = args.length; i < length; ++i) {
        src = args[i];
        for (prop in src)
          if (Object.prototype.hasOwnProperty.call(src, prop))
            dest[prop] = src[prop];
      }

      return dest;
    }

    function _makeLexerPico8() {
      var firstLine = true
        , pico8Mode = version.value.startsWith("PICO-8")
        , expectsHeader = !ignoreStrictP8FileFormat.checked;
      return function(stream) {
        if (pico8Mode && firstLine && expectsHeader && stream.next(/^.*pico-8 cartridge.*/)) {
          firstLine = false;
          return 'keyword';
        }
        stream.skip(/^\s*/);
        if (stream.next(/^(0[bx])?[0-9]+(.[0-9]*)?/)) return 'number';
        if (stream.next(/^(0[bx])?.[0-9]+/)) return 'number';
        if (stream.next(/^(['"])(?:\\\1|.)*?\1/)) return 'string';
        if (stream.next(/^\[(=*)\[(.|\n)*?]\1]/)) return 'string';
        if (stream.next(/^--\[\[(.|\n)*?]]/)) return 'comment';
        if (stream.next(/^--.*/)) return 'comment';
        if (pico8Mode && stream.next(/^\/\/.*/)) return 'comment';
        if (!pico8Mode && stream.next(/^--\[(=*)\[(.|\n)*?]\1]/)) return 'comment';
        if (stream.next(/^\b(and|or|not)\b/)) return 'operator';
        if (stream.next(/^\b(false|nil|true|\.\.\.)\b/)) return 'constant';
        if (stream.next(/^\b(break|do|else|elseif|end|for|function|goto|if|in|local|repeat|return|then|until|while)\b/)) return 'keyword';
        if (stream.next(/^\b(_draw|_init|_update|_update60|abs|add|all|assert|atan2|band|bnot|bor|btn|btnp|bxor|camera|cartdata|cd|ceil|chr|circ|circfill|clip|cls|cocreate|color|coresume|cos|costatus|count|cstore|cursor|del|deli|dget|dir|dset|exit|export|extcmd|fget|fillp|flip|flr|folder|foreach|fset|getmetatable|help|holdframe|import|info|install_demos|install_games|keyconfig|line|load|ls|map|mapdraw|max|memcpy|memset|menuitem|mget|mid|min|mkdir|mset|music|ord|oval|ovalfill|pack|pairs|pal|palt|peek|pget|poke|print|printh|pset|rawequal|rawget|rawlen|rawset|reboot|rect|rectfill|reload|resume|rnd|run|save|select|setmetatable|sfx|sget|sgn|shl|shr|shutdown|sin|split|splore|spr|sqrt|srand|sset|sspr|stat|stop|sub|time|tline|tonum|tostr|trace|type|unpack|yield)\b/)) return 'special';
        if (stream.next("?")) return 'special';
        if (pico8Mode && stream.next(/^__(lua|gfx|gff|label|map|sfx|music)__/)) return 'keyword';
        if (stream.next(/^[A-Z_a-z\u0080-\uffff][0-9A-Z_a-z\u0080-\uffff]*/)) return stream.peek(/^\s*\(/) ? 'function' : 'identifier';
        if (stream.next(/^[-+*/\\^|&#~=:.;,@$%<>()[\]{}]/)) return 'punctuation';
        //if (stream.skip(/^./)) return true;
      };
    }

    function _makeLexerJSON() {
      var shouldBeValue = true
        , isWithinObject = [];
      return function(stream) {
        stream.skip(/^\s*/);
        if (stream.next("[")) {
          isWithinObject.push(false);
          return 'punctuation';
        }
        if (stream.next("]")) {
          isWithinObject.pop();
          return 'punctuation';
        }
        if (stream.next("{")) {
          isWithinObject.push(true);
          shouldBeValue = false;
          return 'punctuation';
        }
        if (stream.next("}")) {
          isWithinObject.pop();
          return 'punctuation';
        }
        if (stream.next(",")) {
          shouldBeValue = !isWithinObject[isWithinObject.length-1];
          return 'punctuation';
        }
        if (stream.next(":")) {
          shouldBeValue = true;
          return 'punctuation';
        }
        if (stream.next(/^(true|false|null)/)) return 'constant';
        if (stream.next(/^-?[0-9]+/)) return 'number';
        if (stream.next(/^"(?:\\"|.)*?"/)) return shouldBeValue ? 'string' : 'identifier';
      };
    }
  })();
</script>
