import { Loader } from "@/components";
import { FC } from "react";

interface TodoDeleteModalProps {
  todoListTitle: string;
  show: boolean;
  deleteOnClick: () => void;
  loading: boolean;
  cancelOnClick: () => void;
}

const TodoDeleteModal: FC<TodoDeleteModalProps> = ({
  todoListTitle,
  show,
  deleteOnClick,
  loading,
  cancelOnClick,
}) => {
  if (!show) {
    return;
  }

  return (
    <div className="absolute p-20 top-0 right-0 h-full w-full z-1 bg-black bg-opacity-80 flex align-middle justify-center">
      <div className="w-1/4 max-h-fit absolute top-60 bg-black rounded-md border border-white p-5 flex flex-col">
        <div>Delete todo list</div>
        <div className="w-full border border-white my-2" />
        <div>Are you sure about to delete "{todoListTitle}" todo list.</div>
        <div className="flex gap-2 self-end">
          <button
            className="border border-white rounded-md px-2 py-1 mt-4"
            onClick={deleteOnClick}
          >
            {loading ? <Loader /> : "Delete"}
          </button>
          <button
            className="border border-white rounded-md px-2 py-1 mt-4"
            onClick={cancelOnClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoDeleteModal;
