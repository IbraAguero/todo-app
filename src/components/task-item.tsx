import type { Task } from "../App";
import TrashIcon from "./trash-icon";

interface Props {
  task: Task;
  deleteTask: (id: string) => void;
  completedTask: (id: string, status: boolean) => void;
}

function TaskItem({ task, deleteTask, completedTask }: Props) {
  const { completed, title } = task;

  return (
    <div
      onClick={() => completedTask(task._id, completed)}
      className="p-3 px-4 bg-neutral-800 rounded-lg flex items-center justify-between gap-4 cursor-pointer"
    >
      <div
        className={`rounded w-6 h-6 border-2 border-blue-400 text-white hover:outline-blue-400 transition-all cursor-pointer ${
          completed && "border-none"
        }`}
      >
        {completed && "✔"}
      </div>
      <span
        className={`text-lg font-medium flex-1 ${
          completed && "line-through text-neutral-600"
        }`}
      >
        {title}
      </span>
      <button onClick={() => deleteTask(task._id)} className="cursor-pointer">
        <TrashIcon />
      </button>
    </div>
  );
}
export default TaskItem;
