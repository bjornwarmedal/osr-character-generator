import Character from './character';

const checkAttributes = (attributes) => {
  const attributeNames = ["STR", "CON", "DEX", "INT", "WIS", "CHA"]

  attributeNames.forEach(name => {
    expect(attributes[name]).toBeGreaterThanOrEqual(3)
    expect(attributes[name]).toBeLessThanOrEqual(18)
  })
}

test('a character has attributes', () => {
  const character = new Character()

  expect(character.attributes).toHaveProperty('STR')
  expect(character.attributes).toHaveProperty('CON')
  expect(character.attributes).toHaveProperty('DEX')
  expect(character.attributes).toHaveProperty('INT')
  expect(character.attributes).toHaveProperty('WIS')
  expect(character.attributes).toHaveProperty('CHA')
})

test("a character's attributes are between 3 and 18", () => {
  const attributes = new Character().attributes

  checkAttributes(attributes)
})
