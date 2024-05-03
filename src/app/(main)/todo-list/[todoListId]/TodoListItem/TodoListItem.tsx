import { FC, Key, useEffect, useRef } from "react";

import { CiEdit, CiCircleCheck, CiTrash, CiCircleChevUp } from "react-icons/ci";
import { PiCircleLight } from "react-icons/pi";

interface TodoListItemProps {
  todo?: string | null;
  deleteTodo: () => void;
  editTodo: () => void;
  isEditActive?: boolean;
  onEditInputChange?: (val: string) => void;
  onSubmitEdit?: () => void;
  doneTodo: () => void;
  done?: boolean;
  id: string;
}

const TodoListItem: FC<TodoListItemProps> = ({
  todo,
  deleteTodo,
  editTodo,
  isEditActive,
  onEditInputChange,
  onSubmitEdit,
  doneTodo,
  done,
  id,
}) => {
  const editInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [isEditActive]);

  return (
    <div
      className={`flex justify-between place-items-center border border-white rounded-md px-4 py-2 mr-8 ${
        done && "bg-green-500"
      }`}
    >
      <div className="flex gap-x-2 w-full">
        <button onClick={doneTodo}>
          {done ? (
            <CiCircleCheck size={24} className="bg-green-500" />
          ) : (
            <PiCircleLight size={24} />
          )}
        </button>
        {isEditActive ? (
          <input
            id="todo-item-edit-input"
            ref={editInputRef}
            autoComplete="off"
            className="bg-transparent w-full pl-2 mr-2 border border-white rounded-md"
            defaultValue={todo || ""}
            onChange={(e) => onEditInputChange?.(e.target.value)}
          />
        ) : (
          <button
            id={`todo-item-button-${id}`}
            className="flex w-full"
            onClick={editTodo}
          >
            {todo}
          </button>
        )}
      </div>
      <div className="flex gap-x-4 place-items-center">
        <button onClick={isEditActive ? onSubmitEdit : editTodo}>
          {isEditActive ? (
            <CiCircleChevUp size={24} className={`text-white`} />
          ) : (
            <CiEdit size={24} />
          )}
        </button>
        <button onClick={deleteTodo}>
          <CiTrash size={24} />
        </button>
      </div>
    </div>
  );
};

export default TodoListItem;
