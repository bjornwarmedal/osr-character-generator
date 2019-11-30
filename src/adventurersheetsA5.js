import * as jsPDF from 'jspdf'
import Character from './Character'

function writeCharacterInfo(doc, pc) {
	doc.setFont('times', 'bold')
	doc.setFontSize(20)

	doc.text(pc.name, 2, 2)

	doc.setFontStyle('italic')
	doc.setFontSize(14)

	doc.text(pc.charclass + ', Level ' + pc.level, 2, 2.7)
	doc.text("XP:", 2, 3.5)
	doc.setFontStyle('normal')
}

function isSpellcaster(pc) {
	return pc.spells.length > 0;
}

function writeCharacterAttributes(doc, pc) {
	let j = 0
	for (const attribute in pc.attributes) {
		doc.text(attribute, 10, 1.8 + j * 0.8)
		doc.text(pc.attributes[attribute] + '', 12, 1.8 + j * 0.8, 'right')
		j++
	}
}

function writeEquipment(doc, pc) {
	doc.setFontStyle('bold')
	doc.text("Equipment:", 2, 8.8)
	doc.setFontStyle('normal')

	for (var j = 0; j < pc.stuff.length; j++) {
		doc.text(pc.stuff[j], 2, 9.6 + j * 0.8)
	}
}

function writeSpells(doc, pc) {
	doc.setFontStyle('bold')
	doc.text('Spells:', 2, 15.2)
	doc.setFontStyle('normal')
	for (var j = 0; j < pc.spells.length; j++) {
		doc.text(pc.spells[j], 2, 16 + j * 0.8)
	}
}

export default function makeCharactersA5(nr, blankbackpage) {
	var doc = new jsPDF({
		orientation: 'portrait',
		unit: 'cm',
		format: 'a5'
	})

	for (var i = 0; i < nr; i++) {
		var pc = new Character()
		writeCharacterInfo(doc, pc)

		doc.text('Max HP: ' + pc.hp, 2, 5)
		doc.text('Current HP:', 5, 5)

		doc.text('Armor: ' + pc.armor, 2, 5.8)
		doc.text('Weapon: ' + pc.stuff.shift(), 2, 6.6)

		writeCharacterAttributes(doc, pc)
		writeEquipment(doc, pc)

		if (isSpellcaster(pc)) { writeSpells(doc, pc) }

		if (blankbackpage) { doc.addPage() }

		if (i < nr - 1) { doc.addPage() }
	}
	doc.save('characterA5sheets.pdf')
}
