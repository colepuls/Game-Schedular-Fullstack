import { useState } from 'react';
import { recordPerformance } from './api';

// list of input fields
const fields = ['gameId', 'playerId', 'points', 'rebounds', 'assists', 'steals'];

export default function RecordPerformanceForm() {
  // state for all inputs at once
  const [form, setForm] = useState(
    Object.fromEntries(fields.map((f) => [f, '']))
  );
  const [msg, setMsg] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = Object.fromEntries(fields.map((f) => [f, +form[f]]));
    const out = await recordPerformance(payload);
    setMsg(out.message || out.error);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-xs flex-col gap-4 rounded-xl border border-gray-300 bg-white p-4 shadow"
    >
      <div className="grid grid-cols-2 gap-3">
        {fields.map((k) => (
          <input
            key={k}
            name={k}
            placeholder={k}
            className="rounded border px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
            value={form[k]}
            onChange={handleChange}
          />
        ))}
      </div>

      <button
        type="submit"
        className="rounded bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Record
      </button>

      {msg && <p className="text-center text-sm font-medium">{msg}</p>}
    </form>
  );
}
