interface ArrayItem {
  id: string;
  value: number;
}

interface Props {
  arrayWithValues: ArrayItem[];
}

export default async function fromValuesToPercentage({
  arrayWithValues,
}: Props): Promise<ArrayItem[]> {
  const total = arrayWithValues
    .map(item => item.value)
    .reduce((previous, current) => previous + current);

  const getAvgFormatted = (value: number): number =>
    parseFloat((Math.round((value / total) * 100 * 100) / 100).toFixed(2));

  return arrayWithValues
    .map(item => ({
      id: item.id,
      value: getAvgFormatted(item.value),
    }))
    .sort(item => item.value);
}
