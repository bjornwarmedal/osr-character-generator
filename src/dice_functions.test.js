import { d } from './dice_functions';

test('gives a random result between 1 and sides', () => {
  const result = d(6)
  expect(result).toBeGreaterThan(0)
  expect(result).toBeLessThanOrEqual(6)
})
