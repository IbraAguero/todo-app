import { useEffect, useState } from "react";
import TaskItem from "./components/task-item";

export type Task = {
  id: number;
  title: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  const saveToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const addTask = () => {
    if (input.trim()) {
      const newTasks = [...tasks, { id: Date.now(), title: input.trim() }];
      setTasks(newTasks);
      saveToLocalStorage(newTasks);
      setInput("");
    }
  };

  const deleteTask = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    saveToLocalStorage(newTasks);
  };

  return (
    <section className="flex flex-col items-center bg-neutral-950 h-screen text-white">
      <div>
        <h1 className="font-extrabold text-5xl mt-10 text-center text-blue-400 ">
          TODO APP
        </h1>
        <div className="mt-10 flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="border border-blue-400 border-r-0 p-2 px-4 rounded-l-lg sm:min-w-md focus:outline-none"
            placeholder="Escribe una tarea..."
          />
          <button
            onClick={addTask}
            className="bg-blue-400 text-white p-2 px-4 rounded-r-lg font-bold hover:bg-blue-400/90 transition-colors cursor-pointer"
          >
            Agregar
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-10">
          {tasks.map((task) => (
            <TaskItem task={task} key={task.id} deleteTask={deleteTask} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;
