import { useEffect, useState } from "react";
import TaskItem from "./components/task-item";

export type Task = {
  _id: string;
  title: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const getTask = async () => {
      const res = await fetch("http://localhost:3001/tasks");
      const data = await res.json();

      if (data) {
        setTasks(data);
      }
    };
    getTask();
  }, []);

  const addTask = async () => {
    if (!input.trim()) return;
    try {
      const res = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: input.trim(), completed: false }),
      });
      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
      setInput("");
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch(`http://localhost:3001/tasks/${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const completedTask = async (id: string, status: boolean) => {
    try {
      const res = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !status }),
      });
      const updatedTask = await res.json();

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, completed: updatedTask.completed } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
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
            <TaskItem
              task={task}
              key={task._id}
              deleteTask={deleteTask}
              completedTask={completedTask}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;
