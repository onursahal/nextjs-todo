import { Button } from "@/components";
import { FC } from "react";
import { CiCirclePlus, CiEdit, CiTrash } from "react-icons/ci";

interface TodoBoardCardProps {
  cardTitle?: string;
  cardDesc?: string;
  onClick?: () => void;
  createButton?: boolean;
  editOnClick?: () => void;
  deleteOnClick?: () => void;
}

const TodoBoardCard: FC<TodoBoardCardProps> = ({
  cardTitle,
  cardDesc,
  onClick,
  createButton,
  editOnClick,
  deleteOnClick,
}) => {
  return (
    <button
      className="w-[calc(20%-1rem)] h-40 border border-white box-border flex flex-col rounded-md p-2"
      onClick={onClick}
    >
      {createButton ? (
        <div className="flex place-items-center justify-center h-full w-full">
          <CiCirclePlus size={32} />
        </div>
      ) : (
        <>
          <div className="text-left font-semibold flex justify-between w-full">
            <div>{cardTitle}</div>
            <div className="flex gap-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  editOnClick?.();
                }}
              >
                <CiEdit size={24} />
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteOnClick?.();
                }}
              >
                <CiTrash size={24} />
              </Button>
            </div>
          </div>
          <div className="w-full border border-white my-1" />
          <p className="text-sm line-clamp-5 text-left">{cardDesc}</p>
        </>
      )}
    </button>
  );
};

export default TodoBoardCard;
