export function sumMix(xs: (string | number)[]): number {
    return xs.reduce<number>((a, x) => a + +x, 0);
  }

//  Given an array of integers as strings and numbers, return the sum of the array values as if all were numbers.
//Return your answer as a number.