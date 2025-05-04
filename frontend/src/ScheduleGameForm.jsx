import { useState } from 'react';
import { scheduleGame } from './api';

export default function ScheduleGameForm() {
  const [arenaId, setArenaId]   = useState('');
  const [date,    setDate]      = useState('');
  const [start,   setStart]     = useState('');
  const [end,     setEnd]       = useState('');
  const [msg,     setMsg]       = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const out = await scheduleGame({
      arenaId:  +arenaId,
      gameDate: date,
      startTime: start,
      endTime:   end
    });
    setMsg(out.message || out.error);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-xs flex-col gap-3 rounded-xl border border-gray-300 bg-white p-4 shadow"
    >
      <input
        className="rounded border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        placeholder="Arena ID"
        value={arenaId}
        onChange={(e) => setArenaId(e.target.value)}
      />
      <input
        type="date"
        className="rounded border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        className="rounded border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="time"
        className="rounded border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <button
        type="submit"
        className="mt-2 rounded bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Schedule
      </button>

      {msg && <p className="text-center text-sm font-medium">{msg}</p>}
    </form>
  );
}
