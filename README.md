# OSR Character Generator
Javascript libraries for generating characters for tabletop rpgs similar to early versions of the first rpg.

## Creating a Character

Import `names.js` and `character.js` into your web page. Calling the function `Character()` returns a Character object, which contains the necessary stats for an OSR character:

- A `name`.
- `str`, `dex`, `con`, `inn` (because "int" i a javascript keyword), `wis`, `cha`. 3d6 straight down.
- A `class`: Fighter, Magic-User, Thief, Cleric, Elf, Dwarf, or Halfling. Always `level` 1.
- Hit Points (`hp`).
- Three first level spells (for Magic-Users or Elves).
- `armor` (or no armor, or armor and shield).
- Six pieces of equipment (`stuff`), the first of which is always a weapon, the second a bag of some sort, and the third a spellbook (if Magic-User or Elf).

## Printing a Character Sheet

Import `adventurerbusinesscards.js` or `adventurersheetsA5.js` into your HTML page and call `runMakeCharacters()` or `runMakeCharactersA5()` with a positive integer as argument to generate a pdf of that many characters in the chosen format. The latter library also has the function `runMakeCharactersA5forPrint()` which adds a blank page after each character, creating a pdf ready for print.

The simplest way to generate a few characters is to clone this repo and open the file demo.html in your browser.

## Dependencies

The character generation is self-sufficient, but the two libraries for creating pdfs rely on [jsPDF][].

## Known Issues

- [jsPDF][] does not embed fonts. This may cause issues with some printers.
- Some versions of [jsPDF][] seem to render the business cards horribly: distances -- especially vertically -- are completely off and the font size is most certainly *not* in points as documented. This is confirmed with at least version 1.5.3. Oddly, the A5 character sheets work just fine.

## Contribution Guidelines

Two guidelines are important to adhere to:

- Developers working in this project should not have to learn trendy frameworks to understand or contribute. The functionality is very basic. Let's not complicate it.
- It must run in the client only. A static html file on your hard drive, opened in your browser, should be enough to use this. No database or other backend. Nobody wants to have to maintain and operate that.

[jsPDF]: https://github.com/MrRio/jsPDF
