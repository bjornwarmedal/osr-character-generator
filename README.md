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

## Testing and Modular javascript
We've added testing to the project. We're using [Jest][]

Testing verifies that what we're writing meets the requirements. It gives us, after tests are written, the option to refactor without fear of breaking anything.

In order to test efficiently, we need to start breaking the software up into smaller, more modular pieces. It'd be awesome to test `Character`, but as of this writing that is a god class, so we can't start there. For this guide's purpose, we will test the functionality of our dice functions. Small, maybe, but it will highlight the necessary steps, as well as showing future developers (or current!) how to write modular js.

First we create a new file, `dice_functions.js` and move our two functions (`d(sides)` and `tds()` into it.)

```javascript
export function d(sides) {
	return Math.ceil(Math.random() * sides)
}
```
The syntax `export function name...` means that we expose this function outside of the file itself. That is, we can use it elsewhere in our code. This is good, because it means we can test it. For that, we create `dice_functions.test.js`; this is a convention: it both tells us what file we're testing, as well as telling `Jest` that it's a test file.

```
import { d } from './dice_functions';

test('gives a random result between 1 and sides', () => {
  const result = d(6)
  expect(result).toBeGreaterThan(0)
  expect(result).toBeLessThanOrEqual(6)
})
```
Generally, you only want to test one thing in one test, but in this case (where we're not mocking out random results, which is another chapter), we can test that the result falls within a range, like so.

We then run the test(s): `npm test`, and observe the output:
```bash
PASS  src/dice_functions.test.js
  ✓ gives a random result between 1 and sides (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.953s
Ran all test suites.
```

That looks okay.

As a last step, we import the functions we moved from `character.js` into `character.js`:
`import { d, tds } from './dice_functions'`
# Then we manually verify that our solution still works in the browser.
---

### Todos for a better developer experience

- [x] Setup webpacker
- [x] Guide on how to write modular js
- [x] Setup testing
- [ ] Setup build step on GH

[jsPDF]: https://github.com/MrRio/jsPDF
[Node]: https://nodejs.org/en/
[Jest]: https://jestjs.io/docs/en/using-matchers
