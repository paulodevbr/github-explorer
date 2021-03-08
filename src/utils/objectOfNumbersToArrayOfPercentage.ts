interface ObjectValueNumber {
  [key: string]: number;
}

interface ArrayItem {
  id: string;
  value: number;
}

interface Props {
  objectWithValues: ObjectValueNumber;
}

export default async function objectOfNumbersToArrayOfPercentage({
  objectWithValues,
}: Props): Promise<ArrayItem[]> {
  const values: number[] = Object.values(objectWithValues);
  const keys: string[] = Object.keys(objectWithValues);

  const total = values.reduce((previous, current) => previous + current);

  const getAvgFormatted = (value: number): number =>
    parseFloat((Math.round((value / total) * 100 * 100) / 100).toFixed(2));

  return keys.map(key => ({
    id: key,
    value: getAvgFormatted(objectWithValues[key]),
  }));
}
