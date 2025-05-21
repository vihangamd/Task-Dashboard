import React from "react";
import { Task } from "../types";
import { Clock, CheckCircle2, Circle } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart }) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case "todo":
        return <Circle className="w-4 h-4 text-gray-400" />;
      case "inProgress":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      default:
        return null;
    }
  };

  const getStatusLabel = () => {
    switch (task.status) {
      case "todo":
        return "To Do";
      case "inProgress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = () => {
    switch (task.status) {
      case "todo":
        return "border-l-gray-400";
      case "inProgress":
        return "border-l-blue-500";
      case "completed":
        return "border-l-emerald-500";
      default:
        return "border-l-gray-300";
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className={`bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 ${getStatusColor()} cursor-move hover:shadow-md transition-shadow duration-200 group`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
          {getStatusIcon()}
          <span>{task.title}</span>
        </h3>
      </div>

      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {task.description}
      </p>

      <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
        <span>{getStatusLabel()}</span>
      </div>
    </div>
  );
};

export default TaskCard;
