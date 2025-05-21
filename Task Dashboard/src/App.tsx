import { useTasks } from "./hooks/useTasks";
import TaskBoard from "./components/TaskBoard";
import Header from "./components/Header";

function App() {
  const {
    tasks,
    isLoading,
    error,
    createTask,
    updateTaskStatus,
    getTasksByStatus,
  } = useTasks();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-md">
              {error}
            </div>
          )}

          <TaskBoard
            tasks={tasks}
            isLoading={isLoading}
            onAddTask={createTask}
            onUpdateTaskStatus={updateTaskStatus}
            getTasksByStatus={getTasksByStatus}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
