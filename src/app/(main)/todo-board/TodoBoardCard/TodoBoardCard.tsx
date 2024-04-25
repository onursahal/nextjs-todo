import { FC } from "react";

interface TodoBoardCardProps {
  cardTitle: string;
  cardDesc?: string;
}

const TodoBoardCard: FC<TodoBoardCardProps> = ({ cardTitle, cardDesc }) => {
  return (
    <button className="w-[calc(20%-1rem)] h-40 border border-white box-border flex flex-col rounded-md p-2">
      <div className="text-left font-semibold">{cardTitle}</div>
      <div className="w-full border border-white my-1" />
      <p className="text-sm line-clamp-5 text-left">{cardDesc}</p>
    </button>
  );
};

export default TodoBoardCard;
