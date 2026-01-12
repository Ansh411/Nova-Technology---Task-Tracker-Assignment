export default function TodoItem({ task, setTasks, setEditing }) {
  const toggle = () => {
    setTasks(prev =>
      prev.map(t =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const remove = () => {
    setTasks(prev => prev.filter(t => t.id !== task.id));
  };

  const priorityDot = {
    normal: "bg-sky-400",
    mild: "bg-amber-400",
    urgent: "bg-rose-500",
  };

  return (
    <li
      className={`relative rounded-2xl border p-5 transition-all duration-300
        ${
          task.completed
            ? "border-emerald-500/40 bg-emerald-500/5 shadow-[0_0_0_1px_rgba(16,185,129,0.15)]"
            : "border-slate-200/10 bg-white/5 hover:-translate-y-1 hover:shadow-xl"
        }
      `}
    >
      {/* Left status bar */}
      <div
        className={`absolute left-0 top-4 h-[calc(100%-2rem)] w-1 rounded-full
          ${task.completed ? "bg-emerald-500" : priorityDot[task.priority]}
        `}
      />

      <div className="flex justify-between items-start gap-4">
        <div className="pl-3 space-y-1">
          {/* Title */}
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {task.text}
          </h3>

          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <span>{task.due || "No deadline"}</span>

            {task.completed && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-400 text-xs font-medium">
                ✓ Completed
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={toggle}
            className={`h-9 w-9 rounded-full flex items-center justify-center transition
              ${
                task.completed
                  ? "bg-emerald-500 text-white"
                  : "bg-white/10 hover:bg-white/20"
              }
            `}
          >
            ✓
          </button>

          <button
            onClick={() => setEditing(task)}
            className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            ✎
          </button>

          <button
            onClick={remove}
            className="h-9 w-9 rounded-full bg-white/10 hover:bg-rose-500/20 flex items-center justify-center"
          >
            ✖
          </button>
        </div>
      </div>
    </li>
  );
}
