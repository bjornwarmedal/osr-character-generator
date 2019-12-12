# OSR Character Generator
Javascript libraries for generating characters for tabletop rpgs similar to early versions of the first rpg.

Try it by cloning the project and opening dist/index.html in your browser!

## Creating a Character

Import `main.js` into your web page. Calling the function `Character()` returns a Character object, which contains the necessary stats for an OSR character:

- A `name`.
- `str`, `dex`, `con`, `inn` (because "int" i a javascript keyword), `wis`, `cha`. 3d6 straight down.
- A `class`: Fighter, Magic-User, Thief, Cleric, Elf, Dwarf, or Halfling. Always `level` 1.
- Hit Points (`hp`).
- Three first level spells (for Magic-Users or Elves).
- `armor` (or no armor, or armor and shield).
- Six pieces of equipment (`stuff`), the first of which is always a weapon, the second a bag of some sort, and the third a spellbook (if Magic-User or Elf).

## Printing a Character Sheet

Importing `main.js` into your HTML page and calling `runMakeCharacters()` or `runMakeCharactersA5()` with a positive integer as argument will generate a pdf of that many characters in the chosen format. Also exposed is `runMakeCharactersA5forPrint()` which adds a blank page after each character, creating a pdf ready for print.

## Dependencies

The character generation is self-sufficient, but the two libraries for creating pdfs rely on [jsPDF][]. These are included in `main.js`.

## Known Issues

- [jsPDF][] does not embed fonts. This may cause issues with some printers.
- Some versions of [jsPDF][] seem to render the business cards horribly: distances -- especially vertically -- are completely off and the font size is most certainly *not* in points as documented. This is confirmed with at least version 1.5.3. Oddly, the A5 character sheets work just fine.

## Contribution Guidelines

Two guidelines are important to adhere to:

- Developers working in this project should not have to learn trendy frameworks to understand or contribute. The functionality is very basic. Let's not complicate it.
- It must run in the client only. A static html file on your hard drive, opened in your browser, should be enough to use this. No database or other backend. Nobody wants to have to maintain and operate that.

## Webpacker

In order to facilitate healthy growth in this project, we have implemented a Webpacker build of it. No trendy frameworks are necessary in order to contribute, but you will need [Node][] in order to run it. Here's a super short guide to getting started:

1. Install node.
1. Navigate to project folder and run `npm install`
1. After making changes to any files, run `npm run build` to transpile `main.js`
1. Manually confirm that the code is working by checking on the index.html page.
1. When committing, don't forget to commit the `main.js` file. Eventually this will be covered by CI testing, and even further down the line this step will be automatic.

---

### Todos for a better developer experience

- [x] Setup webpacker
- [ ] Guide on how to write modular js
- [ ] Setup testing
- [ ] Setup build step on GH

[jsPDF]: https://github.com/MrRio/jsPDF
[Node]: https://nodejs.org/en/
