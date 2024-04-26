import { FC } from "react";
import {
  FaRegEdit,
  FaRegTrashAlt,
  FaRegCheckCircle,
  FaRegCircle,
} from "react-icons/fa";

interface TodoListItemProps {
  todo: string;
  deleteTodo: () => void;
  editTodo: () => void;
  checked?: boolean;
}

const TodoListItem: FC<TodoListItemProps> = ({
  todo,
  deleteTodo,
  editTodo,
  checked,
}) => {
  return (
    <div className="flex justify-between place-items-center border border-white rounded-md px-4 py-2">
      <div className="flex gap-x-2">
        <button>
          {checked ? <FaRegCheckCircle size={24} /> : <FaRegCircle size={24} />}
        </button>
        {todo}
      </div>
      <div className="flex gap-x-2 place-items-center">
        <button onClick={editTodo}>
          <FaRegEdit size={20} />
        </button>
        <button onClick={deleteTodo}>
          <FaRegTrashAlt size={20} />
        </button>
      </div>
    </div>
  );
};

export default TodoListItem;
