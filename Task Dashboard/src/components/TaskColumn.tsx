import React from "react";
import { Task, TaskStatus } from "../types";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: TaskStatus) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  status,
  tasks,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  // background color based on status
  const getColumnColor = () => {
    switch (status) {
      case "todo":
        return "bg-gray-50";
      case "inProgress":
        return "bg-blue-50";
      case "completed":
        return "bg-green-50";
      default:
        return "bg-gray-50";
    }
  };

  // header color based on status
  const getHeaderColor = () => {
    switch (status) {
      case "todo":
        return "text-gray-700 border-gray-400";
      case "inProgress":
        return "text-blue-700 border-blue-500";
      case "completed":
        return "text-emerald-700 border-emerald-500";
      default:
        return "text-gray-700 border-gray-400";
    }
  };

  return (
    <div
      className={`flex flex-col rounded-lg ${getColumnColor()} h-full`}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, status)}
    >
      <div className={`p-4 border-b ${getHeaderColor()} mb-2`}>
        <h2 className="font-semibold flex items-center justify-between">
          <span>{title}</span>
          <span className="bg-white text-sm py-1 px-2 rounded-full">
            {tasks.length}
          </span>
        </h2>
      </div>
      <div className="p-3 flex-grow overflow-y-auto max-h-[calc(100vh-220px)]">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-400 italic text-sm border-2 border-dashed rounded-lg">
            No tasks yet
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
