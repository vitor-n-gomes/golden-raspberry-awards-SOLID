export function findMinAndMaxInterval(arr: number[]): {
  min: [number, number];
  max: [number, number][];
} {
  if (arr.length < 2) throw new Error("Array must have at least two elements");

  function findMinRecursive(
    index: number,
    minInterval: number,
    minPair: [number, number]
  ): [number, [number, number]] {
    if (index >= arr.length - 1) return [minInterval, minPair];
    const currentInterval = arr[index + 1] - arr[index];
    if (currentInterval < minInterval) {
      return findMinRecursive(index + 1, currentInterval, [
        arr[index],
        arr[index + 1],
      ]);
    }
    return findMinRecursive(index + 1, minInterval, minPair);
  }

  function findMaxRecursive(
    index: number,
    maxInterval: number,
    maxPairs: [number, number][],
    arr: number[]
  ): [number, [number, number][]] {
    if (index >= arr.length - 1) return [maxInterval, maxPairs];

    const currentInterval = arr[index + 1] - arr[index];

    if (currentInterval > maxInterval) {
      return findMaxRecursive(
        index + 1,
        currentInterval,
        [[arr[index], arr[index + 1]]],
        arr
      );
    } else if (currentInterval === maxInterval) {
      return findMaxRecursive(
        index + 1,
        maxInterval,
        [...maxPairs, [arr[index], arr[index + 1]]],
        arr
      );
    }

    return findMaxRecursive(index + 1, maxInterval, maxPairs, arr);
  }

  const [minInterval, minPair] = findMinRecursive(0, Infinity, [0, 0]);
  const [maxInterval, maxPairs] = findMaxRecursive(0, 0, [], arr);

  return { min: minPair, max: maxPairs };
}
