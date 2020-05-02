import utils from '../utils';

it('returns correct number', () => {
  const result = utils.getRandomInt(0, 3, [2]);
  expect(typeof result === 'number').toBe(true);
  expect(result).toBeGreaterThanOrEqual(0);
  expect(result).toBeLessThanOrEqual(3);
  expect(result).not.toBe(2);
});
