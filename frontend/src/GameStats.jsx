import { useState } from 'react';
import { getGameStats } from './api';

export default function GameStats() {
  const [gameId, setGameId] = useState('');
  const [rows, setRows] = useState(null);
  const [msg, setMsg] = useState(null);

  async function fetchStats() {
    const out = await getGameStats(+gameId);
    if (out.stats && out.stats.length) {
      setRows(out.stats);
      setMsg(null);
    } else {
      setRows(null);
      setMsg(out.message || 'No data');
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          placeholder="Game ID"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
        />
        <button
          onClick={fetchStats}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Load Stats
        </button>
      </div>

      {msg && <p className="mt-3 text-center text-sm font-medium">{msg}</p>}

      {rows && (
        <table className="mt-4 w-full border-collapse text-sm shadow-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border px-3 py-2">Player</th>
              <th className="border px-3 py-2 text-center">Team</th>
              <th className="border px-3 py-2 text-center">Pts</th>
              <th className="border px-3 py-2 text-center">Reb</th>
              <th className="border px-3 py-2 text-center">Ast</th>
              <th className="border px-3 py-2 text-center">Stl</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.PlayerID} className="odd:bg-gray-50">
                <td className="border px-3 py-2">{r.PlayerName}</td>
                <td className="border px-3 py-2 text-center">{r.TeamID}</td>
                <td className="border px-3 py-2 text-center">{r.Points}</td>
                <td className="border px-3 py-2 text-center">{r.Rebounds}</td>
                <td className="border px-3 py-2 text-center">{r.Assists}</td>
                <td className="border px-3 py-2 text-center">{r.Steals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
