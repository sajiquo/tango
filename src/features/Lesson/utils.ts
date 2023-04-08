export const randomize = <T>(array: readonly T[]): T[] =>
  array.slice().sort(() => Math.random() - 0.5);
