interface ObjectKeyValue {
  [key: string]: number;
}

interface Props {
  arrayOfObjects: ObjectKeyValue[];
}

export default async function mergeAndSumObjectAttributes({
  arrayOfObjects,
}: Props): Promise<ObjectKeyValue> {
  return arrayOfObjects.reduce((previous, current) => {
    const keysPrevious = Object.keys(previous);
    const keysCurrent = Object.keys(current);

    let result: ObjectKeyValue = {};

    keysPrevious.forEach(keyPrevious =>
      keysCurrent.forEach(keyCurrent => {
        result = {
          ...result,
          [keyPrevious]:
            (previous[keyPrevious] || 0) + (current[keyPrevious] || 0),
          [keyCurrent]:
            (previous[keyCurrent] || 0) + (current[keyCurrent] || 0),
        };
      }),
    );

    return result;
  });
}
