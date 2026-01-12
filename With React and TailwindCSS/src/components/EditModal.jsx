export default function EditModal({ task, setEditing, setTasks }) {
  const save = e => {
    e.preventDefault();
    const form = e.target;

    setTasks(prev =>
      prev.map(t =>
        t.id === task.id
          ? {
              ...t,
              text: form.text.value,
              due: form.due.value,
              priority: form.priority.value,
            }
          : t
      )
    );

    setEditing(null);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={save}
        className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4"
      >
        <h3 className="text-xl font-semibold">Edit Task</h3>

        <input
          name="text"
          defaultValue={task.text}
          className="w-full rounded-lg bg-slate-800 px-4 py-3"
        />

        <input
          type="date"
          name="due"
          defaultValue={task.due}
          className="w-full rounded-lg bg-slate-800 px-4 py-3"
        />

        <select
          name="priority"
          defaultValue={task.priority}
          className="w-full rounded-lg bg-slate-800 px-4 py-3"
        >
          <option value="normal">Normal</option>
          <option value="mild">Mild</option>
          <option value="urgent">Urgent</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setEditing(null)}
            className="text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button className="bg-indigo-600 px-5 py-2 rounded-lg font-semibold">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
