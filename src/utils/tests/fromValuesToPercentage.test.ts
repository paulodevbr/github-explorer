import fromValuesToPercentage from '../fromValuesToPercentage';

const testObject = [
  {
    id: 'C',
    value: 5,
  },
  {
    id: 'Python',
    value: 1,
  },
  {
    id: 'Java',
    value: 3,
  },
  {
    id: 'Typescript',
    value: 6,
  },
];

describe('fromValuesToPercentage', () => {
  it('should be able to calculate avg from all object of array', async () => {
    const result = await fromValuesToPercentage({
      arrayWithValues: testObject,
    });

    expect(result).toStrictEqual([
      { id: 'C', value: 33.33 },
      { id: 'Python', value: 6.67 },
      { id: 'Java', value: 20 },
      { id: 'Typescript', value: 40 },
    ]);
  });
});
