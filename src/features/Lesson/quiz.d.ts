export type FourSelects = [string, string, string, string];
export type Quiz = {
  wordId: number;
  question: string;
  answer: string;
  hint: string;
  selects: FourSelects;
};
