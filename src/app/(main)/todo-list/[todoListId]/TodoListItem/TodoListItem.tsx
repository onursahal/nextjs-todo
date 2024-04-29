import { FC } from "react";
import {
  FaRegEdit,
  FaRegTrashAlt,
  FaRegCheckCircle,
  FaRegCircle,
} from "react-icons/fa";

import { CiEdit, CiCircleCheck, CiTrash } from "react-icons/ci";
import { PiCircleLight } from "react-icons/pi";

interface TodoListItemProps {
  todo: string;
  deleteTodo: () => void;
  editTodo: () => void;
  doneTodo: () => void;
  done?: boolean;
}

const TodoListItem: FC<TodoListItemProps> = ({
  todo,
  deleteTodo,
  editTodo,
  doneTodo,
  done,
}) => {
  return (
    <div
      className={`flex justify-between place-items-center border border-white rounded-md px-4 py-2 ${
        done && "bg-green-500"
      }`}
    >
      <div className="flex gap-x-2">
        <button onClick={doneTodo}>
          {done ? (
            <CiCircleCheck size={24} className="bg-green-500" />
          ) : (
            <PiCircleLight size={24} />
          )}
        </button>
        {todo}
      </div>
      <div className="flex gap-x-4 place-items-center">
        <button onClick={editTodo}>
          <CiEdit size={24} />
        </button>
        <button onClick={deleteTodo}>
          <CiTrash size={24} />
        </button>
      </div>
    </div>
  );
};

export default TodoListItem;
