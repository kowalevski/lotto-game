import { getRandomInt, getNamedNumbersWithLongName } from '../utils';

it('returns correct number', () => {
  const result = getRandomInt(0, 3, [2]);
  expect(typeof result === 'number').toBe(true);
  expect(result).toBeGreaterThanOrEqual(0);
  expect(result).toBeLessThanOrEqual(3);
  expect(result).not.toBe(2);
});

// useless test for useless function
it('returns named numbers with long names', () => {
  const namedNumbers = getNamedNumbersWithLongName();

  expect(namedNumbers).toMatchSnapshot();
});
