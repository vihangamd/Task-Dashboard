export type TaskStatus = "todo" | "inProgress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  ok: boolean;
}
