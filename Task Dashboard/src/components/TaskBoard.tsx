import React, { useState } from "react";
import { Task, TaskStatus } from "../types";
import TaskColumn from "./TaskColumn";
import TaskForm from "./TaskForm";

interface TaskBoardProps {
  tasks: Task[];
  isLoading: boolean;
  onAddTask: (title: string, description: string) => Promise<Task | null>;
  onUpdateTaskStatus: (
    taskId: string,
    newStatus: TaskStatus
  ) => Promise<boolean>;
  getTasksByStatus: (status: TaskStatus) => Task[];
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  isLoading,
  onAddTask,
  onUpdateTaskStatus,
  getTasksByStatus,
}) => {
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  // handle drag start
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggingTaskId(taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  // handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // handle drop
  const handleDrop = async (e: React.DragEvent, targetStatus: TaskStatus) => {
    e.preventDefault();

    if (draggingTaskId) {
      const task = tasks.find((t) => t.id === draggingTaskId);

      if (task && task.status !== targetStatus) {
        await onUpdateTaskStatus(draggingTaskId, targetStatus);
      }

      setDraggingTaskId(null);
    }
  };

  const columns = [
    { title: "To Do", status: "todo" as TaskStatus },
    { title: "In Progress", status: "inProgress" as TaskStatus },
    { title: "Completed", status: "completed" as TaskStatus },
  ];

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-200 rounded-full mb-4"></div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2.5"></div>
          <div className="h-3 w-36 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <TaskForm
          onAddTask={async (title, description) => {
            await onAddTask(title, description);
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
        {columns.map((column) => (
          <TaskColumn
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={getTasksByStatus(column.status)}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
