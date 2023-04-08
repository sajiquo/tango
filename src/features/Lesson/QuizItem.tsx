import { type Quiz } from "./quiz";

type Props = {
  quiz: Quiz;
  onSolved: () => void;
  onFlawed: () => void;
};
export const QuizItem = ({ quiz, onFlawed, onSolved }: Props) => {
  return (
    <div>
      <p>{JSON.stringify(quiz)}</p>
      <button onClick={onSolved}>solved</button>
      <button onClick={onFlawed}>flawed</button>
    </div>
  );
};
