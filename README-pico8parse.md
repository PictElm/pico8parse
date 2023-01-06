# Support for the PICO-8 Flavour of Lua

The PICO-8 Lua is based of the 5.2 version of the Lua language, a such most 5.2 syntaxes and behavior are present in PICO-8 Lua.

The values added for the parser `luaVersion` option are:

 - `'PICO-8'` (should not be used, just for feature inheritance)
 - `'PICO-8-0.2.1'`
 - `'PICO-8-0.2.2'` (adds support for some escape sequences)
 - `'PICO-8-0.2.3'` (empty `if`/`while`, `?` on same line)
 - `'PICO-8-0.2.4'` (any character before `if`/`while`)
 - `'PICO-8-0.2.4c'` (special `__meta:` sections)
 - `'PICO-8-0.2.5'` (normal bitwise xor)

If the targeted version is not in this list, the closest preceding version should have the same syntaxes.

> TL;DR: PICO-8 Lua differs from standard Lua because it is preprocessed; for example the `'?'` "operator" is simply replaced with `' print('`. The way this is done introduces many cursed syntaxes (and I don't want to maintain a list of these). To see the result of this preprocessing you can use [this same trick](https://gist.github.com/naclsn/b85467b379d676481e6a4483ee2ef5a0) (until fixed) with a cartridge containing exactly:
> ```
> pico-8 cartridge
> 
> __lua__
> printh[=[
> #include file_with_code_to_inspect
> ]=]
> ```

## Miscellaneous

### Not Covered / Inaccuracies

These changes (specific to PICO-8's Lua) have been considered out of scope:

 - the `#include ..` directive
 - edge cases like ending the `__lua__` section with `local a,`

Differences with the official interpreter for PICO-8 version 0.2.1:

 - "preprocessor can not handle form `::_::a+=1`" (gives a funny `syntax error expected near '+'`)
 - "preprocessor: self assignment with quoted function calls on RHS `a+=1+cos"0"`" (`runtime error attempt to perform arithmetic on global 'cos' [...]`)
 - ... and other unexpected behaviors (mainly around `+=` and such, stare at PICO-8's changelogs for more of these)

### Comments

PICO-8 Lua reads `//` as a single line comment (similarly to C-inspired languages). Do note that this is not a simple alias for `--` as it will not start a longstring comment:

<!-- 'js' just for colors -->
```js
// comment

//[[ comment
  not comment,
  but syntax error
]]
```

Adding to the list of changes to comments, longstring comments cannot use the `=` as depth:

```
--[==[ comment
  not comment but syntax error
  (no MD highlight to show that)
]==]
```

This syntax is kept for actual strings:

```lua
local text = [==[hey
how's it going?]==]
print(text)
```

## Numerals

### Binary Literal

PICO-8 accepts binary notation for numeral the same way Lua 5.2+ does for hexadecimal:

 - `0b101010`: 42
 - `0b0.1`: 0.5
 - `0b10.`: 2.
 - `0b.01`: .125

### No Exponent, no Complex, no Unsigned nor Long

Lua numerals can consist of trailing "U", "I" and "L"s, none of which is a supported notation for PICO-8. The same way, the exponential and binary exponential notations are seen as error:

 - `2.1i`
 - `4U`
 - `0xB0p99`
 - `0.31416E1`
 - and so on...

## Operators

### Unary Operators

The following are unary operators on a number (with the same precedence as `-`, `~` and `not`):

 - `@` example `@0x2000`
 - `$` example `$-1`
 - `%` example `%100`

### Binary Operators

Here is a set of bitwise operators (so on numbers)

 - logical shift right: `>>>` (ignores the sign)
 - rotate left: `<<>`
 - rotate right: `>><`
 - the bitwise xor from Lua (`~`) is replaced with the token `^^`

The Lua integer division (usually written `//`) represents a single line comment in PICO-8 so the `\` is used instead.

This flavour also implement the `!=` as an alias for `~=`.

The shift and rotates have the same precedence as Lua's shift operators `<<` and `>>`. The exclusive or, not-equal and integer division keep the same precedence.

### Assignment Operations

Every binary operator that is not a comparison have an assignment syntax. The full list is:

 assignment | equivalent
------------|---------------
 `a += b`   | `a = a + b`
 `a -= b`   | `a = a - b`
 `a *= b`   | `a = a * b`
 `a /= b`   | `a = a / b`
 `a \= b`   | `a = a \ b`
 `a %= b`   | `a = a % b`
 `a ^= b`   | `a = a ^ b`
 `a ..= b`  | `a = a .. b`
 `a \|= b`  | `a = a \| b` <!-- the back-slash is only here because it breaks the table otherwise -->
 `a &= b`   | `a = a & b`
 `a ^^= b`  | `a = a ^^ b`
 `a <<= b`  | `a = a << b`
 `a >>= b`  | `a = a >> b`
 `a >>>= b` | `a = a >>> b`
 `a <<>= b` | `a = a <<> b`
 `a >><= b` | `a = a >>< b`

It must be noted that for this syntax to be implemented, a new type of AST node was added under the name of `'AssignmentOperatorStatement'`. These present the properties `variables` and `init` of an `'AssignmentStatement'` as well as the `operator` of a `'BinaryExpression'` node.

## Single Line Statements

> Important notice: this feature introduces a meaning to a new-line sequence, which is a blank character and get ignored by Lua.

### Idea

This syntax introduce the possibility to write certain block without having to specify its bounds using tokens, similarly to some other languages (for example an `if` statement in JavaScript do no need curly brackets when its body consists of only one "line" of instructions).

```lua
if (condition) instruction1()
instruction2()

-- is semantically the same as

if condition then instruction1() end instruction2()
```

```lua
if (condition) instruction1() else instruction2()

-- is semantically the same as

if condition then instruction1() else instruction2() end
```

```lua
while (condition) instruction()

-- is semantically the same as

while condition do instruction() end
```

Notice how:

 - the parenthesis enclosing the condition are necessary
 - this syntax of the `if` statement cannot present an `elseif` clause
 - no instruction are present after the syntax _on the same line_

### Quirks

While this change initially only apply to the `if` and `while` statements, its actual implementation in the PICO-8 Lua runtime leads to unexpectedly correct or incorrect syntaxes which also impacts the standard `do`, `function` and `for` amongst other things.

Without any evidences to back the following claims as to how PICO-8 parses its Lua, testings have shown that the behavior of the actual implementation are similar to applying the following preprocessing to the raw script:

If a line contains an `if` token (resp. `while`) which does not present an associated `then` token (resp. `do`) right after its condition, the very next new-line sequence (or if lack thereof, end-of-file) is treated as an `end` token. This `end` token is in no way associated with the opened `if .. then` statement's body block (resp. `do .. while`) and essentially gives any end-of-lines _potentially_ the meaning of an `end` token.

This gives rise to a bunch of cursed valid syntaxes (try to guess the scopes):

<table>
<tr><th>PICO-8 Syntax</th><th>Result of Preprocess</th></tr>
<tr>
<td>

```lua
if (cdt) do
end
```

</td>
<td>

```lua
if cdt then do end
end
```

</td>
</tr>
<tr>
<td>

```lua
if (cdt) end do
```

</td>
<td>

```lua
if cdt then end do end
```

</td>
</tr>
<tr>
<td>

```lua
if (cdt) end function fun()
```

</td>
<td>

```lua
if cdt then end function fun() end
```

</td>
</tr>
<tr>
<td>

```lua
-- incorrect!
if (cdt1) end while (cdt2) instr() do

-- correct!
if (cdt1) end while (cdt2) do instr()
```

</td>
<td>

```lua
-- indeed... weird
if cdt1 then end while cdt2 instr() do end

-- correct!
if cdt1 then end while cdt2 do instr() end
```

</td>
</tr>
</table>

> Note for slimmer screens: outside of the first row, all are on a single line.

### Additionally

This syntax of "single line" statements also comes with an arbitrary rule that the character preceding the `if` (or `while`) token must be either:

 - a blank character (whitespace, tabulation, newline sequence)
 - a numeral: `a = 0xfif (cdt) instr()` is valid (and `a` is 15)
 - a multiline comment **only** if one of these 2 points is valid before it

```lua
-- invalid
instr()--[[]]if (cdt) instr()
instr()--[[]]--[[]]if (cdt) instr()
instr() --[[]]--[[]]if (cdt) instr()

-- valid
instr() --[[]]if (cdt) instr()
instr()--[[]] if (cdt) instr()
a = 0xf--[[]]if (cdt) instr()
```

This dependency on the preceding character/token was removed in version 0.2.4 (making every lines above valid, even without comments).

Finally, it is important to notice that the body of the clause cannot be empty. Or maybe just sometimes. To be more specific, a single line `if` or `while` with no instruction following (before end-of-line) is not considered valid, but a single line `if` containing an `else` clause (albeit empty) is valid.

```lua
-- invalid
while (cdt)
if (cdt)

-- valid
while (cdt) instr()
if (cdt) instr()
if (cdt) else instr()

-- also valid
if (cdt) else
```

This was changed in version 0.2.3, above which the following is made possible:

```lua
-- valid
while (cdt) ;

-- still invalid
while (cdt)
```

## Print Shorthand

The special character `?` acts as a short hand for the `print` function. As such, it does expect a parameter list as its following tokens

Example: `? "text", 1, 2, 3` is equivalent to `print("text", 1, 2, 3)`.

However the implementation of it is somewhat capricious and very new-line dependent:

 - nothing can precede the `?` character except a multiline comment
 - the rest of the line past the `?` must be a valid parameter list
 - it does not expect the parameter list to be enclosed in parenthesis

```lua
-- invalid
instr() ?"text"
?"text" ; instr()
?("text", 1)

-- still invalid
instr()    --[[]]    ?"text"

-- valid
?"text"
--[[]]?"text"
?("text"), (1)
```

Although from version 0.2.3 onward, this was changed to allow the `?` "operator" to appear on the same line as a single line `if`/`while`, making the following valid:

```lua
-- valid
if (cdt) ?"text"
instr() ?"text"

-- also valid
??"text") -- what?
```

The actual behavior of the preprocessor regarding the `?` is rather simple and explains that last line:

 - a valid `?` is replaced with exactly ` print(`
 - this marks the end of the line for _a single parenthesis_

Therefor `?"text"` translates to ` print("text")` and `??"text"` would only translate to ` print( print("text")` (only one closing parenthesis).

## P8SCII

> Remark: this feature is only available when specifying a version above `'PICO-8-0.2.2'` and might be erroneous in some places.

A new set of escape sequences become valid in PICO-8:

 - `\*`
 - `\+`
 - `\-`
 - `\|`
 - `\#`
 - `\^`

The following sequence are already valid in Lua 5.2 and thus are not modified, but they get a mention as their meaning was changed (and maybe their validation pattern too):

 - `\a` "audio"
 - `\v` decorate previous character
 - `\f` set foreground colour
 - `\014` switch to font defined at 0x5600
 - `\015` switch to default font

# Support for the PICO-8 Associated File Format (.p8, text)

Scripts in the PICO-8 Lua flavour are usually part of .p8 files. The convoluted definition for this file format is described bellow. Only 'PICO-8-x.y.z' `luaVersion`s are expected to be .p8 files (via the `strictP8FileFormat` feature inherited from the abstract version 'PICO-8'). Despite that, the `ignoreStrictP8FileFormat` parser option may be used to ignore some behaviors.

> Uh.. note: as per the current implementation of `ignoreStrictP8FileFormat`, only the header check is ignored and the stream is assumed to start in a `'__lua__'` section; but further section-starting sequences **are still accounted for**.

## Overall Format

A typical .p8 file starts with the following 2-lines header:

```
pico-8 cartridge // http://www.pico-8.com
version VER
```

Where `VER` is a numeric version (decimal integer, no leading sign or zeros).

It may then consists of up to 7 sections all introduced in order by their respective sequence:

```
__lua__
__gfx__
__gff__
__label__
__map__
__sfx__
__music__
```

The sequence is usually found alone on its line, with no other character (except for EOL). The associated section then starts from the following line until the next section or EOF.

Of these 7 section, only the `'__lua__'` one consists of actual valid Lua code.

### More About the Header

The exact definition that makes a .p8 file's header valid is looser than introduced above: as long as the string `"pico-8 cartridge"` (16 characters, case sensitive) is present on the first line, the rest of the file is parsed fine.

But in addition to checking the first line, the very next one is entirely discarded (it typically contains the `version VER` mention). This behavior makes it so if it contains one of the 7 sequences presented above, it will not count as staring a section.

Past these 2 lines, any character is discarded until a valid section starts (se bellow).

### More About Sections

> As shown above, all section-starting sequences are similar in syntax to Python's dunder, `'__xyz__'` and `'__abc__'` are used here to specify any of those.

When reading a .p8 file line-be-line, a new section starts when a line starts by a sequence from the list above. This lines is then silently discarded. Because only these first few characters are checked:

 - any character after the `'__xyz__'` but _before_ the EOL are effectively discarded
 - any character before the `'__xyz__'` invalidates the check, no new section is started
 - this check for a section stating **is not context-aware** (neither what sections is, nor what section were)

The various sections of a .p8 files does not have to be present in the same order as listed above. Beyond that, they do no have to be present at all as much as they can be present multiple times:

```
__xyz__
content of section xyz

__abc__
content of section abc

__xyz__
content AGAIN of section xyz
```

When a file presents multiple sections under the same `'__xyz__'`, their content is essentially concatenated (line-wise). The snippet above is equivalent to this (note the newlines):

```
__xyz__
content of section xyz

content AGAIN of section xyz
__abc__
content of section abc

```

> Although the section `'__xyz__'` now shows an empty line, it is important to note that each section also have their own set of internal rules, to which empty lines may be removed.

Coming back to parsing Lua, all this means that the following sources get effectively parsed somewhat unexpectedly:

<table>
<tr><th>Actual File Content</th><th>Result of Preprocess</th></tr>
<tr>
<td>

```
pico-8 cartridge
__lua__
a = [[
__gfx__
bonjour
]]
__lua__
]]
```

</td>
<td>

```
pico-8 cartridge
__lua__
a = [[
]]
```

</td>
</tr>
<tr>
<td>

```
pico-8 cartridge
__lua__
__lua__ = 42
print(__lua__)
```

</td>
<td>

```
pico-8 cartridge
__lua__
print(__lua__)
```

</td>
</tr>
<tr>
<td>

```
pico-8 cartridge
--[[ how to write
documentation for
__lua__ PICO-8? ]]
print("coucou")
```

</td>
<td>

```
pico-8 cartridge
__lua__
print("coucou")
```

</td>
</tr>
<tr>
<td>

```
pico-8 cartridge
with no section
at all
```

</td>
<td>

```
pico-8 cartridge

```

</td>
</tr>
</table>
