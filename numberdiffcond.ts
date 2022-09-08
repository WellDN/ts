export const makeNegative = (num: number): number => {
   return -Math.abs(num);    //you have to put a negative operator in each number but you have 1 negative ex: 1,-1,2 number at it.
  };                         //the -Math.abs will ignore the negative numbers and just put an '-' on the numbers that are not negative.