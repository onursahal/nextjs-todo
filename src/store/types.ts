export interface CommonResponseType {
  getTodoListStatus: "idle" | "loading" | "succeeded" | "failed";
  postTodoListStatus: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}
