import { useState } from 'react';
import { assignTeams } from './api';

export default function AssignTeamsForm() {
  const [gameId, setGameId]   = useState('');
  const [teams,  setTeams]    = useState('');   // comma‑separated IDs
  const [msg,    setMsg]      = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const ids = teams.split(',').map(s => +s.trim()).filter(Boolean);
    const out = await assignTeams(+gameId, ids);
    setMsg(out.message || out.error);
  }

  return (
      <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-xs flex-col gap-3 rounded-xl border border-gray-300 bg-white p-4 shadow"
    >
      <input
        className="rounded border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        placeholder="Game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
      />
      <input
        className="rounded border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        placeholder="Team IDs (e.g. 1,2)"
        value={teams}
        onChange={(e) => setTeams(e.target.value)}
      />
      <button
        type="submit"
        className="mt-2 rounded bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Assign
      </button>
      {msg && <p className="text-center text-sm font-medium">{msg}</p>}
    </form>
  );
}
