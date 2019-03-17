
function makeCharacters(nr){
	var doc = new jsPDF({
	  orientation: 'landscape',
	  unit: 'mm',
	  format: [90, 55]
	})

	for (var i=0; i<nr; i++){
		var pc = new Character()

		doc.setFont('times', 'bold')
		doc.setFontSize(10)

		doc.text(pc.name, 5, 15)

		doc.setFontStyle('italic')
		doc.setFontSize(6)

		doc.text(pc.charclass + ', Level ' + pc.level, 5, 18)

		doc.setFontStyle('normal')

		doc.text('Max HP: ' + pc.hp, 5, 33)
		doc.text('Current HP:', 19, 33)

		doc.text('Armor: ' + pc.armor, 5, 36)

		doc.text(['STR', pc.str+''], 5, 39)
		doc.text(['DEX', pc.dex+''], 12, 39)
		doc.text(['CON', pc.con+''], 19, 39)
		doc.text(['INT', pc.inn+''], 26, 39)
		doc.text(['WIS', pc.wis+''], 33, 39)
		doc.text(['CHA', pc.cha+''], 40, 39)

		if(pc.spells.length > 0){
			doc.text('Spells: '+pc.spells.join(', '), 5, 48)
		}

		var stuff = ['Equipment:'].concat(pc.stuff)
		for (var j=0; j<stuff.length; j++){
			doc.text(stuff[j], 85, 30+j*3, 'right')
		}
		if(i < nr-1){
			doc.addPage()
		}
	}
	doc.save('businesscards.pdf')
}

