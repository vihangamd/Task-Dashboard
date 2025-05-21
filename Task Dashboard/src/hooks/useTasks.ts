import { useState, useEffect, useCallback } from "react";
import { Task, TaskStatus } from "../types";
import { mockApi } from "../services/mockApi";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await mockApi.getTasks();
      if (response.ok) {
        setTasks(response.data);
      } else {
        setError("Failed to fetch tasks");
      }
    } catch (err) {
      setError("An error occurred while fetching tasks");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create a new task
  const createTask = useCallback(async (title: string, description: string) => {
    setError(null);

    try {
      const response = await mockApi.createTask({
        title,
        description,
        status: "todo",
      });

      if (response.ok) {
        setTasks((prevTasks) => [...prevTasks, response.data]);
        return response.data;
      } else {
        setError("Failed to create task");
        return null;
      }
    } catch (err) {
      setError("An error occurred while creating the task");
      console.error(err);
      return null;
    }
  }, []);

  // Update task status
  const updateTaskStatus = useCallback(
    async (taskId: string, newStatus: TaskStatus) => {
      setError(null);

      try {
        const response = await mockApi.updateTaskStatus(taskId, newStatus);

        if (response.ok) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === taskId ? { ...task, status: newStatus } : task
            )
          );
          return true;
        } else {
          setError("Failed to update task status");
          return false;
        }
      } catch (err) {
        setError("An error occurred while updating the task");
        console.error(err);
        return false;
      }
    },
    []
  );

  // Get tasks by status
  const getTasksByStatus = useCallback(
    (status: TaskStatus) => {
      return tasks.filter((task) => task.status === status);
    },
    [tasks]
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTaskStatus,
    getTasksByStatus,
    refreshTasks: fetchTasks,
  };
};
