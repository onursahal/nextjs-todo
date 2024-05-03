"use client";

import TodoListItem from "./TodoListItem";
import { CiCircleChevUp } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { postTodo } from "@/store/features/todos/postTodo";
import { getSingleTodoList } from "@/store/features/todos/getSingleTodoList";
import { putTodo } from "@/store/features/todos/putTodo";
import { deleteTodo } from "@/store/features/todos/deleteTodo";

const TodoList = ({ params }: { params: { todoListId: string } }) => {
  const dispatch = useAppDispatch();
  const {
    data: getSingleTodoListData,
    status: getSingleTodoListStatus,
    error: getSingleTodoListError,
  } = useAppSelector((state) => state.todos.getSingleTodoList);
  const { status: postTodoStatus, error: postTodoError } = useAppSelector(
    (state) => state.todos.postTodo
  );
  const { status: putTodoStatus, error: putTodoError } = useAppSelector(
    (state) => state.todos.putTodo
  );
  const { status: deleteTodoStatus, error: deleteTodoError } = useAppSelector(
    (state) => state.todos.deleteTodo
  );

  const [todoInput, setTodoInput] = useState<string | undefined>("");
  const [isEditActive, setIsEditActive] = useState<Record<string, boolean>>({});
  const [focusedElement, setFocusedElement] = useState<Element | null>(null);

  const renderTodoList = () => {
    return getSingleTodoListData?.todos?.map((item) => {
      return (
        <TodoListItem
          id={item.id}
          key={item.id}
          todo={item.todo}
          editTodo={() => handleEditActive(item.id)}
          isEditActive={isEditActive[item.id]}
          onEditInputChange={setTodoInput}
          onSubmitEdit={handleEditRequest}
          deleteTodo={() =>
            dispatch(deleteTodo({ docId: params.todoListId, id: item.id }))
          }
          doneTodo={() =>
            dispatch(
              putTodo({
                docId: params.todoListId,
                done: !item.done,
                id: item.id,
              })
            )
          }
          done={item.done}
        />
      );
    });
  };

  const setInitialEditActive = () => {
    getSingleTodoListData &&
      setIsEditActive(
        getSingleTodoListData?.todos.reduce(
          (acc: Record<string, boolean>, item) => {
            const obj = acc;
            obj[item.id] = false;
            return obj;
          },
          {}
        )
      );
  };

  const handleEditActive = (id: string) => {
    setIsEditActive((prev) => {
      const prevKeys = Object.keys(prev);
      const newState: Record<string, boolean> = {};
      prevKeys.forEach((key) => {
        if (id === key) newState[key] = true;
        else newState[key] = false;
      });
      return newState;
    });
  };

  const handleEnterKeyPress = (event: KeyboardEvent) => {
    const focusedElementId = focusedElement?.getAttribute("id");

    if (event.keyCode === 13) {
      if (focusedElementId?.includes("todo-item")) {
        handleEditRequest();
      } else if (focusedElementId?.includes("submit-todo"))
        handleSubmitRequest();
    }
  };

  const handleFocusChanged = () => {
    const activeElementId = document.activeElement?.getAttribute("id");
    if (
      activeElementId?.includes("submit-todo") ||
      activeElementId?.includes("todo-item")
    )
      setFocusedElement(document.activeElement);
  };

  const handleEditRequest = () => {
    const id = Object.keys(isEditActive).find((key) => {
      if (isEditActive[key]) return key;
    });

    if (id && todoInput)
      dispatch(
        putTodo({
          docId: params.todoListId,
          todo: todoInput,
          id,
        })
      );
  };

  const handleSubmitRequest = () => {
    dispatch(postTodo({ docId: params.todoListId, todo: todoInput }));
  };

  useEffect(() => {
    dispatch(getSingleTodoList(params.todoListId));
  }, []);

  // UI interaction effects

  useEffect(() => {
    document.addEventListener("keypress", handleEnterKeyPress);
    document.addEventListener("focus", handleFocusChanged, true);
    document.addEventListener("mousedown", (event: any) => {
      if (!focusedElement?.contains(event.target)) {
        setInitialEditActive();
        setTodoInput("");
      }
    });

    return () => {
      document.removeEventListener("focus", handleFocusChanged);
      document.removeEventListener("keypress", handleEnterKeyPress);
    };
  }, [todoInput, focusedElement]);

  useEffect(() => {
    setTodoInput(focusedElement?.getAttribute("value") || "");

    if (focusedElement?.getAttribute("id")?.includes("submit-todo"))
      setInitialEditActive();
  }, [focusedElement]);

  // Response depended effects
  useEffect(() => {
    if (
      postTodoStatus === "succeeded" ||
      putTodoStatus === "succeeded" ||
      deleteTodoStatus === "succeeded"
    ) {
      dispatch(getSingleTodoList(params.todoListId));
    }
  }, [postTodoStatus, putTodoStatus, deleteTodoStatus]);

  useEffect(() => {
    // Handle Request Errors
    console.log({
      postTodoError,
      putTodoError,
      deleteTodoError,
      getSingleTodoListError,
    });
  }, [postTodoError, putTodoError, deleteTodoError, getSingleTodoListError]);

  useEffect(() => {
    if (getSingleTodoListStatus === "succeeded") {
      setInitialEditActive();
      setTodoInput("");
    }
  }, [getSingleTodoListStatus]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="text-2xl font-bold">{getSingleTodoListData?.title}</div>
        <div className="text-lg my-5">{getSingleTodoListData?.desc}</div>
        <div className="w-full border border-white my-5" />
        <div className="flex flex-col gap-4 h-[80%] overflow-y-auto">
          {renderTodoList()}
        </div>
      </div>
      <div className="flex relative">
        <input
          id="submit-todo-input"
          className="w-full bg-transparent border border-white rounded-md text-lg px-4 py-2"
          placeholder="Start writing your todo and smash the enter key..."
          autoComplete="off"
          value={
            focusedElement?.getAttribute("id")?.includes("submit-todo")
              ? todoInput
              : ""
          }
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button id="submit-todo-button" onClick={handleSubmitRequest}>
          <CiCircleChevUp
            size={24}
            className={`absolute right-3 top-3 ${
              todoInput ? "text-white" : "text-gray-500"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default TodoList;
