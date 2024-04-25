import { FC } from "react";
import { FaRegEdit, FaRegTrashAlt, FaCheckCircle } from "react-icons/fa";

interface TodoListItemProps {
  todo: string;
  deleteTodo: () => void;
  editTodo: () => void;
}

const TodoListItem: FC<TodoListItemProps> = ({
  todo,
  deleteTodo,
  editTodo,
}) => {
  return (
    <div className="flex justify-between place-items-center border border-white rounded-md px-4 py-2">
      <div className="flex gap-x-2">
        <button>
          <FaCheckCircle />
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
