import isEqual from "lodash.isequal";

export function useObjectDiff<A, B>(from: A = {} as A, to: B = {} as B) {
  const objectDiffReturn = objectDiff<A, B>(from, to);

  return {
    ...objectDiffReturn,
    objectDiff,
  };
}

function objectDiff<A, B>(from: A, to: B) {
  const diff = Object.keys(to).reduce((acc, key) => {
    const keyB = key as keyof B;
    if (!isEqual(from[key as keyof A], to[keyB])) {
      acc[keyB] = to[keyB];
    }
    return acc;
  }, {} as Partial<B>);

  return {
    diff,
    hasDiff: !!Object.keys(diff).length,
  };
}
