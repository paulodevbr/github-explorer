import getArrayOfNumbers from '../getArrayOfNumbers';

describe('getArrayOfNumbers', () => {
  it('should be able to return an array of numbers, first number must be 1', async () => {
    expect(getArrayOfNumbers(10)).toHaveLength(10);
    expect(getArrayOfNumbers(140)).toHaveLength(140);
    expect(getArrayOfNumbers(10)[0]).toBe(1);
  });
});
