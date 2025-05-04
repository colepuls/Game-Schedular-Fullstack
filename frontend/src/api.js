const API = 'http://localhost:3001';          // Express base URL

export async function scheduleGame(payload) {
  const res = await fetch(`${API}/games`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();                          // { message, gameId }  OR { error }
}

export async function assignTeams(gameId, teamIds) {
  const res = await fetch(`${API}/games/${gameId}/teams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ teamIds })
  });
  return res.json();            // { message }  OR { error }
}

export async function recordPerformance(payload) {
  const res = await fetch(`${API}/performance`, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(payload)
  });
  return res.json();                 // { message }  OR { error }
}

export async function getGameStats(gameId) {
  const res = await fetch(`${API}/games/${gameId}/stats`);
  return res.json();                // { message?, stats:[] }
}