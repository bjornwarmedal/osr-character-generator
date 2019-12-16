// Returns a random integer x such that 1 <= x <= sides (simulating the roll of a die)
export function d(sides) {
	return Math.ceil(Math.random() * sides)
}

// 3d6
export function tds() {
	return d(6) + d(6) + d(6)
}