pico8parse uses a set of "features" to describe Lua versions. Here is the list of what each feature means and for the parsing of which version of Lua it is used.

 feature name                    | 5.1 | 5.2 | 5.3 | LuaJIT | 0.2.1 | 0.2.2 | 0.2.3 | 0.2.4 | 0.2.4c | 0.2.5 | description
---------------------------------|-----|-----|-----|--------|-------|-------|-------|-------|--------|-------|-------------
 noTrailingDotInHexNumeral       | x   |     |     |        |       |       |       |       |        |       | Lua &lt; 5.2 does not accept eg `0x.A`
 labels                          |     | x   | x   | x      | x     | x     | x     | x     | x      | x     | -
 emptyStatement                  |     | x   | x   |        | x     | x     | x     | x     | x      | x     | `;` is considered an empty statement
 hexEscapes                      |     | x   | x   | x      | x     | x     | x     | x     | x      | x     | `"\x42"`
 skipWhitespaceEscape            |     | x   | x   | x      | x     | x     | x     | x     | x      | x     | `"\z   "`
 strictEscapes                   |     | x   | x   | x      | x     | x     | x     | x     | x      | x     | raises an error on an unknown escape sequence
 relaxedBreak                    |     | x   | x   |        | x     | x     | x     | x     | x      | x     | `break` may not be the last statement in a block
 unicodeEscapes                  |     |     | x   | x      |       |       |       |       |        |       | `"\u{0042}"`
 bitwiseOperators                |     |     | x   |        | x     | x     | x     | x     | x      | x     | `~a`, `a | b`, `a & b`, `a << b` and `a >> b`
 integerDivision                 |     |     | x   |        |       |       |       |       |        |       | `a // b`
 contextualGoto                  |     |     |     | x      |       |       |       |       |        |       | -
 imaginaryNumbers                |     |     |     | x      |       |       |       |       |        |       | valid suffixes is `i` (case-insensitive)
 integerSuffixes                 |     |     |     | x      |       |       |       |       |        |       | valid suffixes are: `LL` and `ULL` (case-insensitive)
 strictP8FileFormat              |     |     |     |        | x     | x     | x     | x     | x      | x     | expects pico-8 header and section (eg `__lua__`)
 p8Sections                      |     |     |     |        | x     | x     | x     | x     | x      | x     | list of the section delimiters
 binLiteral                      |     |     |     |        | x     | x     | x     | x     | x      | x     | accepts eg `0b101010`
 noExponentLiteral               |     |     |     |        | x     | x     | x     | x     | x      | x     | does not accept eg `1e-1`
 singleLineIf                    |     |     |     |        | x     | x     | x     | x     | x      | x     | `if (a) print(a)`
 singleLineWhile                 |     |     |     |        | x     | x     | x     | x     | x      | x     | `while (a) print(a)`
 singleLinePrint                 |     |     |     |        | x     | x     | x     | x     | x      | x     | `?a`
 assignmentOperators             |     |     |     |        | x     | x     | x     | x     | x      | x     | `a += 1`
 traditionalNotEqual             |     |     |     |        | x     | x     | x     | x     | x      | x     | `a != b`
 traditionalComments             |     |     |     |        | x     | x     | x     | x     | x      | x     | `// this is a comment`
 noDeepLongStringComments        |     |     |     |        | x     | x     | x     | x     | x      | x     | `--[=[]=]` can not be a multiline comment
 bitshiftAdditionalOperators     |     |     |     |        | x     | x     | x     | x     | x      | x     | `a >>> b`, `a >>< b` and `a <<> b`
 peekPokeOperators               |     |     |     |        | x     | x     | x     | x     | x      | x     | `@a`, `%a` and `$a`
 backslashIntegerDivision        |     |     |     |        | x     | x     | x     | x     | x      | x     | integer division `//` is done with `\`
 smileyBitwiseXor                |     |     |     |        | x     | x     | x     | x     | x      | x     | `a ^^ b`
 p8scii                          |     |     |     |        |       | x     | x     | x     | x      | x     | additional string escape sequences
 singleLinePrintNoLineDependency |     |     |     |        |       |       | x     | x     | x      | x     | `a = 0 ?a`
 allowEmptySingleLineIf          |     |     |     |        |       |       | x     | x     | x      | x     | `if (a) ;`
 allowEmptySingleLineWhile       |     |     |     |        |       |       | x     | x     | x      | x     | `while (a) ;`
 allowAnyBeforeSingleLineIf      |     |     |     |        |       |       |       | x     | x      | x     | without, a blank or number must preceded a singleLineIf
 allowAnyBeforeSingleLineWhile   |     |     |     |        |       |       |       | x     | x      | x     | without, a blank or number must preceded a singleLinewhile
 p8MetaSections                  |     |     |     |        |       |       |       |       | x      | x     | enables additional `__meta:somestring__` sections
 alsoNormalBitwiseXor            |     |     |     |        |       |       |       |       |        | x     | re-enables `a ~ b` (xor)

<br>

_the `strictP8FileFormat` feature can be disable with the option `ignoreStrictP8FileFormat`_

---

## Unsorted Notes
.. and quite surely outdated.

### About File Format and Sections

The PICO-8 file format (.p8, text) defines a set of rules that must be followed
for a file to be correctly loaded:

   - the first line of the file must contain the mention "pico-8 cartridge"
     (16 characters, case sensitive) any character may be present before and
     after (no new-line sequence before, obviously)

   - the next line is entirely ignored (may it contain one of the sequences
     specified after, it is not parsed and is discarded)

   - there exists (as of 0.2.2) 7 sections in a p8 file each identified by a
     set sequence of character (similar to Python's dunders); a generic
     `__meta:*__` is introduced in 0.2.4c

   - a section is entered as soon as a line containing on of these sequences is
     passed; the following lines are part of said section until any next one
     of these or EOF

   - these sequences are only valid section opening if they are present at
     the very beginning of the line; any amount of any character may follow

   - outside of section (typically right after the "pico-8 cartridge" header,
     before any sequence), lines are simply discarded

   - as a section is closed by a new one, multiple section under the same
     sequence can be present within the file; section for a given sequence are
     concatenated in order of appearance

   - only within a __lua__ section may PICO-8 Lua be parsed, starting on the
     very next line

   - a __lua__ section may be closed at any point (eg. in the middle of an
     assignment) and resume in a next __lua__ section, this is still considered
     valid

   - _usually_, the first line is as bellow, the second line present a version
     number (noted VER) and each section is present once in the order of the
     list of sequences hereafter

```
pico-8 cartridge // http://www.pico-8.com
version VER
```

### About Other PICO-8 Specific Features
The added syntaxes for `singleLine[..]` are pretty broken, see this
[test](../test/scaffolding/conditional) for some kind of overview.

With singleLineIf, the following becomes valid (note the 'do'):
```bnf
   if ::= 'if' '(' exp ')' 'do' block {elif} ['else' block] 'end'
```

This snippet has an error (missing space after "name()" -- fixed above 0.2.4):
```lua
function name()if (exp) block
    block
end
```

This snippet prints "no":
```lua
if (1) do local a = "yes"
    print(a or "no")
end
```

And so does this on:
```lua
if (nil) else do local a = "yes"
    print(a or "no")
end
```

So the actual added syntax is closer to:
```bnf
   if ::= '\s' 'if' '(' exp ')'
         [ block [ 'else' [ 'do' block_else_do '\n' ]
                   block_else_then
                 ] '\n'
         | [ 'do' block_if_do '\n'
           | 'then'
           ] block_if_then {elif} ['else' block] 'end'
         ]
```
.. where `block_if_do` has for parent `block_if_then` and `block_else_do` has
for parent `block_else_then`...

`singleLineIf` and `singleLineWhile` cannot be empty; `if (1)` error,
`if (1) else` no error, `if (1) end do` no error (closing with a proper 'end')
`while (1)` error
