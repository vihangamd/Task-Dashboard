import { Task, ApiResponse, TaskStatus } from "../types";

let tasks: Task[] = [
  {
    id: "1",
    title: "Research project requirements",
    description:
      "Gather information about the new client project and identify key deliverables.",
    status: "todo",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Create wireframes for homepage",
    description:
      "Design initial wireframes for the client homepage based on the project brief.",
    status: "inProgress",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "Setup development environment",
    description:
      "Install necessary dependencies and configure the development environment.",
    status: "completed",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    title: "Design system components",
    description:
      "Create reusable design components that align with the brand guidelines.",
    status: "todo",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    title: "Client consultation meeting",
    description:
      "Schedule and prepare for the initial client consultation to discuss project scope.",
    status: "inProgress",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createResponse = <T>(data: T, status = 200): ApiResponse<T> => ({
  data,
  status,
  ok: status >= 200 && status < 300,
});

export const mockApi = {
  getTasks: async (): Promise<ApiResponse<Task[]>> => {
    await delay(300);
    return createResponse(tasks);
  },

  // Add a new task
  createTask: async (
    task: Omit<Task, "id" | "createdAt">
  ): Promise<ApiResponse<Task>> => {
    await delay(400);
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    tasks = [...tasks, newTask];
    return createResponse(newTask, 201);
  },

  // Update a task
  updateTask: async (
    id: string,
    updates: Partial<Task>
  ): Promise<ApiResponse<Task>> => {
    await delay(300);
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return createResponse({} as Task, 404);
    }

    const updatedTask = { ...tasks[taskIndex], ...updates };
    tasks = [
      ...tasks.slice(0, taskIndex),
      updatedTask,
      ...tasks.slice(taskIndex + 1),
    ];

    return createResponse(updatedTask);
  },

  // Update task status
  updateTaskStatus: async (
    id: string,
    status: TaskStatus
  ): Promise<ApiResponse<Task>> => {
    return mockApi.updateTask(id, { status });
  },
};
