export default function getArrayOfNumbers(maxNumber: number): number[] {
  const arrayNumbers: number[] = [];
  for (let i = 1; i <= maxNumber; i += 1) {
    arrayNumbers.push(i);
  }

  return arrayNumbers;
}
