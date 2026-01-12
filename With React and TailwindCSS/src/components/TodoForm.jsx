import { useState } from "react";

export default function TodoForm({ setTasks }) {
  const [text, setText] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState("normal");

  const addTask = e => {
    e.preventDefault();

    if (!text.trim()) return;

    setTasks(prev => [
      ...prev,
      {
        id: Date.now(),
        text,
        due,
        priority,
        completed: false,
      },
    ]);

    setText("");
    setDue("");
    setPriority("normal");
  };

  return (
    <form
      onSubmit={addTask}
      className="flex flex-col gap-4"
    >
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="flex gap-3 flex-wrap">
        <input
          type="date"
          value={due}
          onChange={e => setDue(e.target.value)}
          className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2"
        />

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2"
        >
          <option value="normal">Normal</option>
          <option value="mild">Mild</option>
          <option value="urgent">Urgent</option>
        </select>

        <button
          type="submit"
          className="ml-auto rounded-xl bg-indigo-600 px-6 py-2 font-semibold hover:bg-indigo-500 transition"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
