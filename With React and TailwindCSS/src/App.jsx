import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import Filters from "./components/Filters";
import EditModal from "./components/EditModal";

export default function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter(t => {
    if (filter === "Completed") return t.completed;
    if (filter === "Active") return !t.completed;
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/10 via-transparent to-emerald-500/10 blur-3xl" />
      <h1 className="text-3xl font-bold mb-2">Task Tracker</h1>
      <p className="text-slate-400 mb-6">Stay focused. Stay productive.</p>

      <TodoForm setTasks={setTasks} />

      <Filters filter={filter} setFilter={setFilter} tasks={tasks} setTasks={setTasks} />

      <ul className="mt-8 space-y-4">
        {filteredTasks.length === 0 && (
          <p className="text-center text-slate-400 mt-10">
            No tasks yet 🚀
          </p>
        )}

        {filteredTasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            setTasks={setTasks}
            setEditing={setEditing}
          />
        ))}
      </ul>

      {editing && (
        <EditModal
          task={editing}
          setEditing={setEditing}
          setTasks={setTasks}
        />
      )}
    </div>
  );
}
