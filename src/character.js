import firstnames from './firstnames'
import lastnames from './lastnames'

// Returns an array consisting of a random selection of elements from "array"
function choice(array, nrOfElements) {
	var arrayclone = array.slice(0)
	var choices = []
	var randomindex = 0

	for (var i = 0; i < nrOfElements; i++) {
		randomindex = rand(arrayclone.length)
		choices.push(arrayclone[randomindex])
		arrayclone.splice(randomindex, 1)
	}

	return choices
}

// Returns a random integer x such that 0 <= x < max
function rand(max) {
	return Math.floor(Math.random() * max)
}

// Returns a random integer x such that 1 <= x <= sides (simulating the roll of a die)
function d(sides) {
	return Math.ceil(Math.random() * sides)
}

// Returns a string "Firstname Lastname"
function getName() {
	return firstnames[rand(firstnames.length)] + " " + lastnames[rand(lastnames.length)]
}

// 3d6
function tds() {
	return d(6) + d(6) + d(6)
}

function setCharacterClass(character) {
	let characterClasses = [
		{
			className: 'Fighter',
			primeRequisites: ['STR']
		},
		{
			className: 'Cleric',
			primeRequisites: ['WIS']
		},
		{
			className: 'Thief',
			primeRequisites: ['DEX']
		},
		{
			className: 'Magic-User',
			primeRequisites: ['INT']
		},
		{
			className: 'Elf',
			primeRequisites: ['STR', 'INT'],
			requirements: [
				{
					attribute: 'INT',
					minimumValue: 9
				}
			]
		},
		{
			className: 'Dwarf',
			primeRequisites: ['STR'],
			requirements: [
				{
					attribute: 'CON',
					minimumValue: 9
				}
			]
		},
		{
			className: 'Halfling',
			primeRequisites: ['STR', 'DEX'],
			requirements: [
				{
					attribute: 'DEX',
					minimumValue: 9
				},
				{
					attribute: 'CON',
					minimumValue: 9
				}
			]
		},
	]

	character.charclass = choice(characterClasses, 1)[0].className
}

export default function Character() {
	this.name = getName()

	this.attributes = {}
	for (const attribute of ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']) {
		this.attributes[attribute] = tds()
	}

	setCharacterClass(this)

	switch (this.charclass) {
		case 'Fighter': this.hd = 8; break;
		case 'Dwarf': this.hd = 8; break;
		case 'Cleric': this.hd = 6; break;
		case 'Magic-User': this.hd = 4; break;
		case 'Thief': this.hd = 4; break;
		case 'Elf': this.hd = 6; break;
		case 'Halfling': this.hd = 6; break;
		default: this.hd = 6; break; // should never end up here
	}

	this.level = 1 // only support this for now

	if (this.attributes['CON'] == 3) {
		this.hp = Math.max(1, d(this.hd) - 3)
	} else if (this.attributes['CON'] < 6) {
		this.hp = Math.max(1, d(this.hd) - 2)
	} else if (this.attributes['CON'] < 9) {
		this.hp = Math.max(1, d(this.hd) - 1)
	} else if (this.attributes['CON'] < 13) {
		this.hp = d(this.hd)
	} else if (this.attributes['CON'] < 16) {
		this.hp = d(this.hd) + 1
	} else if (this.attributes['CON'] < 18) {
		this.hp = d(this.hd) + 2
	} else {
		this.hp = d(this.hd) + 3
	}

	this.spells = []
	if (this.charclass == 'Elf' || this.charclass == 'Magic-User') {
		this.spells.push('Read Magic') // everybody gets read magic, lotfp style!
		this.spells = this.spells.concat(choice(['Charm Person', 'Detect Magic', 'Floating Disc', 'Hold Portal', 'Light', 'Magic Missile', 'Protection from Evil', 'Read Languages', 'Shield', 'Sleep', 'Ventriloquism'], 2)) // add another two random first level spells
	}

	var lightweapons = ['Club (1d4 dmg)', 'Dagger (1d4 dmg)', 'Darts, 10 (1d4 dmg)', 'Hammer (1d4 dmg)', 'Sling, 10 bullets (1d4 dmg)']
	var mediumweapons = ['Axe (1d6 dmg)', 'Warhammer (1d6 dmg)', 'Javelin (1d6 dmg)', 'Mace (1d6 dmg)', 'Pick (1d6 dmg)', 'Scimitar (1d8 dmg)', 'Shortsword (1d6 dmg)', 'Spear (1d6 dmg)']
	var twohandedforeveryoneweapons = ['Heavy Crossbow, 10 quarrels (1d8 dmg)', 'Light Crossbow, 10 quarrels (1d6 dmg)', 'Shortbow, 20 arrows (1d6 dmg)']
	var tallpeopleonlyweapons = ['Battleaxe (1d8 dmg)*', 'Warhammer (1d6 dmg)*', 'Morningstar (1d6 dmg)*', 'Heavy Pick (1d8 dmg)*', 'Pole Arm (1d10 dmg)*', 'Quarterstaff (1d6 dmg)*', 'Longsword (1d8 dmg)*', 'Greatsword (1d10 dmg)*']

	var lightarmor = ['Leather', 'Padded', 'Studded Leather']
	var heavyarmor = ['Plate Mail', 'Banded Mail', 'Splint Mail', 'Chain Mail', 'Scale Mail']

	this.stuff = []
	this.armor = 'Unarmored'
	if (this.charclass == 'Magic-User' || this.charclass == 'Thief') { // light weapons and armor only, no shield
		this.stuff = this.stuff.concat(choice(lightweapons, 1))
		// these guys get a four in five chance of having some armor
		if (d(5) < 5) {
			this.armor = choice(lightarmor, 1).toString()
		}
	} else if (this.charclass == 'Dwarf' || this.charclass == 'Halfling') { // light weapons and maybe a shield *or* medium weapons, any armor either way
		// a four in five chance of armor seems reasonable here too
		if (d(5) < 5) {
			this.armor = choice(lightarmor.concat(heavyarmor), 1).toString()
		}
		if (rand(lightweapons.length + mediumweapons.length + twohandedforeveryoneweapons.length) < lightweapons.length + mediumweapons.length) {
			// apparently using a one-handed weapon, so has a chance of having a shield
			this.stuff = this.stuff.concat(choice(lightweapons.concat(mediumweapons), 1))
			// a one in three chance of shield
			if (d(3) < 2) {
				this.armor = this.armor + ", Shield"
			}
		} else {
			// using a twohanded weapon, but not a tallpersononly weapon
			this.stuff = this.stuff.concat(choice(twohandedforeveryoneweapons, 1))
		}
	} else { // any weapon, chance of shield if not heavy weapon, any armor
		// a four in five chance of armor seems reasonable here too
		if (d(5) < 5) {
			this.armor = choice(lightarmor.concat(heavyarmor), 1).toString()
		}
		if (rand(lightweapons.length + mediumweapons.length + twohandedforeveryoneweapons.length + tallpeopleonlyweapons.length) < lightweapons.length + mediumweapons.length) {
			// apparently using a one-handed weapon, so has a chance of having a shield
			this.stuff = this.stuff.concat(choice(lightweapons.concat(mediumweapons), 1))
			// a one in three chance of shield
			if (d(3) < 2) {
				this.armor = this.armor + ", Shield"
			}
		} else {
			// using a twohanded weapon, any kind
			this.stuff = this.stuff.concat(choice(twohandedforeveryoneweapons.concat(tallpeopleonlyweapons), 1))
		}
	}

	// add a bag of some kind, and four more random items
	var items = ['Warm Blanket', 'Block and Tackle', 'Bottle of Wine', 'Candles (10)', 'Chain (10 feet)', 'Crowbar', 'Flask (empty)', 'Flint and Steel', 'Garlic (3 cloves)', 'Grappling Hook', 'Hammer, 5 iron spikes', 'Holy Symbol (silver)', 'Holy Water (flask)', 'Ink and Quill', 'Ladder (10 feet)', 'Lantern', 'Padlock, key', 'Manacles', 'Small Mirror', 'Oil (1 pint)', 'Paper (10 sheets)', 'Parchment (10 sheets)', 'Miner\'s Pick', 'Pole (10 feet)', 'Rations (5 days)', 'Rope (50 feet)', 'Spade', 'Shovel', 'Iron Spikes (12)', 'Spyglass', 'Torches (8)', 'Waterskin', 'Wolfsbane (fistfull)', 'Lard (1lbs)', 'Acid (1 vial)', 'Flour (2 lbs)']
	this.stuff.push(choice(['Backpack', 'Small Sack', 'Large Sack', 'Saddle Bag', 'Messenger Bag'], 1).toString() + ', Bedroll')
	if (this.charclass == 'Elf' || this.charclass == 'Magic-User') {
		this.stuff.push('Spellbook')
		this.stuff = this.stuff.concat(choice(items, 3))
	} else if (this.charclass == 'Thief') {
		this.stuff.push('Thieves\' Tools')
		this.stuff = this.stuff.concat(choice(items, 3))
	} else {
		this.stuff = this.stuff.concat(choice(items, 4))
	}

	this.money = (d(8) + d(8) + d(8)) * 10 // Starting capital in gp
}
