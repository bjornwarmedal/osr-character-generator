
function makeCharacters(nr){

	let doc = new jsPDF({
	  orientation: 'landscape',
	  unit: 'mm',
	  format: [55, 90]
	})

	for (let i=0; i<nr; i++){
		// You can write your coordinates in mm if you divide by this constant right here.
		// source: https://github.com/MrRio/jsPDF/blob/ddbfc0f0250ca908f8061a72fa057116b7613e78/jspdf.js#L791
		const mm = 72 / 25.4
		let pc = new Character()

		doc.setFont('times', 'bold')
		doc.setFontSize(6)

		doc.text(pc.name, 5/mm, 11/mm)

		doc.setFontStyle('italic')
		doc.setFontSize(3)

		doc.text(pc.charclass + ', Level ' + pc.level, 5/mm, 15/mm)

		doc.setFontStyle('normal')

		doc.text('Max HP: ' + pc.hp, 5/mm, 33/mm)
		doc.text('Current HP:', 19/mm, 33/mm)

		doc.text('Armor: ' + pc.armor, 5/mm, 36/mm)

		let j = 0
		for (attribute in pc.attributes) {
			doc.text([attribute, pc.attributes[attribute]+''], (5 + j)/mm, 39/mm)
			j += 7
		}

		if(pc.spells.length > 0){
			doc.text('Spells: '+pc.spells.join(', '), 5/mm, 48/mm)
		}

		let stuff = ['Equipment:'].concat(pc.stuff)
		for (let j=0; j<stuff.length; j++){
			doc.text(stuff[j], 85/mm, (30+j*3)/mm, 'right')
		}
		if(i < nr-1){
			doc.addPage()
		}
	}
	doc.save('businesscards.pdf')
}

