export const digitize = (n: number): number[] => {
    return [...n.toString()].map(Number).reverse();
  };