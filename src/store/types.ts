export interface CommonResponseType {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}
