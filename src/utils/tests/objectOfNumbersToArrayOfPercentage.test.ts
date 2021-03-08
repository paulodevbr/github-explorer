import objectOfNumbersToArrayOfPercentage from '../objectOfNumbersToArrayOfPercentage';

const testObject = {
  C: 100,
  Python: 89,
  Java: 1129,
};

describe('objectOfNumbersToArrayOfPercentage', () => {
  it('should be able to calculate avg from object attributes, and return an array', async () => {
    const result = await objectOfNumbersToArrayOfPercentage({
      objectWithValues: testObject,
    });

    expect(result).toStrictEqual([
      { id: 'C', value: 7.59 },
      { id: 'Python', value: 6.75 },
      { id: 'Java', value: 85.66 },
    ]);
  });
});
