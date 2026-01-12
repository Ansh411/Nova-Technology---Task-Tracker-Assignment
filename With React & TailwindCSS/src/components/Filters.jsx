export default function Filters({ filter, setFilter, tasks, setTasks }) {
  const completed = tasks.filter(t => t.completed).length;

  return (
    <div className="flex items-center justify-between mt-8 gap-4 flex-wrap">
      <div className="flex bg-slate-900 rounded-full p-1">
        {["All", "Active", "Completed"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              filter === f
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <button
        onClick={() => setTasks(tasks.filter(t => !t.completed))}
        className="text-sm text-slate-400 hover:text-white"
      >
        Clear completed ({completed})
      </button>
    </div>
  );
}
