This is a fork of the [luaparse](fstirlitz.github.io/luaparse) by Oskar Schöldström (and other).

See [the original README](README-luaparse.md) or the linked GitHub above for more information about it. If the intention is to use the present JavaScript package, the original README is probably the first thing to look at.

The intention is to add support for the PICO-8 flavour of Lua which brings a few new syntaxes, tokens and a whole file format (all described [here](README-pico8parse.md)).

> Note that in v0.2.5d, most of the pre-processor has been replaced with [z8lua](https://github.com/samhocevar/z8lua). This is probably a place to look into for better fidelity (maybe, dunno, but surely).

## A Fork of the luaparse

A few changes were made regarding the versions of Lua that were already supported by the original luaparse:

 - from Lua 5.2 onward, hex numerals may start with a dot: `a = 0x.A` is valid
 - the parser state would not be entirely reset (which had no impact until it did)
 - maybe that's wrong but longstring comments were discarding any first newline right after the last `[`
 - `TableCallExpression` nodes presented an `arguments` property (duplicate of `argument`) which was removed
 - module default export

Ideally, no breaking changes were added in regard to the parsing of Lua 5.1, 5.2, 5.3 and LuaJIT. These versions should still behave the same outside of the mentioned points above. Hopefully, this fork would stay up-to-date with its upstream.

## Other Mentions and Thanks

The [PICO-8 Wikia](https://pico-8.fandom.com/wiki/Pico-8_Wikia) proved a great help at gathering random information about the API.

As well as the [luacheck](https://github.com/mpeterv/luacheck) project and the [picotool](https://github.com/dansanderson/picotool).

And obviously zep &commat;lexaloffle and their [PICO-8](https://www.lexaloffle.com/pico-8.php) fantasy console.
