import { Button, Loader } from "@/components";
import { FC } from "react";

interface TodoBoardCreateModalProps {
  show: boolean;
  onAction: () => void;
  actionLoading?: boolean;
  onCancel: () => void;
  titleOnChange: (val: string) => void;
  titleDefaultVal?: string;
  descOnChange: (val: string) => void;
  descDefaultVal?: string;
  modalTitle: string;
  actionButtonText: string;
}

const TodoBoardCreateModal: FC<TodoBoardCreateModalProps> = ({
  show,
  onAction,
  actionLoading,
  onCancel,
  titleOnChange,
  titleDefaultVal,
  descOnChange,
  descDefaultVal,
  modalTitle,
  actionButtonText,
}) => {
  if (!show) {
    return;
  }

  return (
    <div className="absolute p-20 top-0 right-0 h-full w-full z-1 bg-black bg-opacity-80 flex align-middle justify-center">
      <div className="w-1/4 max-h-fit absolute top-60 bg-black rounded-md border border-white p-5 flex flex-col">
        <div>{modalTitle}</div>
        <div className="w-full border border-white my-2" />
        <div className="flex flex-col gap-2">
          <div>Title</div>
          <input
            className="w-full bg-transparent border border-white rounded-md text-md px-2 py-1"
            defaultValue={titleDefaultVal}
            onChange={(e) => titleOnChange(e.target.value)}
          />
          <div>Description</div>
          <textarea
            rows={4}
            className="w-full bg-transparent border border-white rounded-md text-md px-2 py-1 resize-none"
            defaultValue={descDefaultVal}
            onChange={(e) => descOnChange(e.target.value)}
          />
        </div>
        <div className="flex gap-2 self-end">
          <Button
            intent="primary"
            className="px-2 py-1 mt-4"
            onClick={onAction}
          >
            {actionLoading ? <Loader /> : actionButtonText}
          </Button>
          <Button
            intent="primary"
            className="px-2 py-1 mt-4"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoBoardCreateModal;
