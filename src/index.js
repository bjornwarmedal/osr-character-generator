import makeCharacters from './adventurerbusinesscards.js'
import makeCharactersA5 from './adventurersheetsA5.js'

window.runMakeCharacters = function() {
  makeCharacters(document.getElementById('nr').value)
}
window.runMakeCharactersA5 = function() {
  makeCharactersA5(document.getElementById('nr').value, false)
}
window.runMakeCharactersA5forPrint = function() {
  makeCharactersA5(document.getElementById('nr').value, true)
}

