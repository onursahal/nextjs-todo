import { Loader } from "@/components";
import { FC } from "react";

interface TodoBoardCreateModalProps {
  show: boolean;
  onCreate: () => void;
  createLoading?: boolean;
  onCancel: () => void;
  title: (val: string) => void;
  desc: (val: string) => void;
}

const TodoBoardCreateModal: FC<TodoBoardCreateModalProps> = ({
  show,
  onCreate,
  createLoading,
  onCancel,
  title,
  desc,
}) => {
  if (!show) {
    return;
  }

  return (
    <div className="absolute p-20 top-0 right-0 h-full w-full z-1 bg-black bg-opacity-80 flex align-middle justify-center">
      <div className="w-1/4 max-h-fit absolute top-60 bg-black rounded-md border border-white p-5 flex flex-col">
        <div>Create a new to do list</div>
        <div className="w-full border border-white my-2" />
        <div className="flex flex-col gap-2">
          <div>Title</div>
          <input
            className="w-full bg-transparent border border-white rounded-md text-md px-2 py-1"
            onChange={(e) => title(e.target.value)}
          />
          <div>Description</div>
          <textarea
            rows={4}
            className="w-full bg-transparent border border-white rounded-md text-md px-2 py-1 resize-none"
            onChange={(e) => desc(e.target.value)}
          />
        </div>
        <div className="flex gap-2 self-end">
          <button
            className="border border-white rounded-md px-2 py-1 mt-4"
            onClick={onCreate}
          >
            {createLoading ? <Loader /> : "Create"}
          </button>
          <button
            className="border border-white rounded-md px-2 py-1 mt-4"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoBoardCreateModal;
