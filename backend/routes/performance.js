const router = require('express').Router();
const pool   = require('../db');

router.post('/', async (req, res) => {
  const { gameId, playerId, points, rebounds, assists, steals } = req.body;

  async function exists(table, col, id) {
    const [r] = await pool.execute(`SELECT 1 FROM ${table} WHERE ${col}=?`, [id]);
    return !!r.length;
  }

  try {
    if (!await exists('Game',   'GameID',   gameId))  return res.status(404).json({ error:'Game not found' });
    if (!await exists('Player', 'PlayerID', playerId)) return res.status(404).json({ error:'Player not found' });

    const [ok] = await pool.execute(
      `SELECT 1 FROM CompetesIn c
        JOIN Player p ON p.TeamID = c.TeamID
       WHERE c.GameID = ? AND p.PlayerID = ?`,
      [gameId, playerId]
    );
    if (!ok.length) return res.status(400).json({ error:'Player not in this game' });

    await pool.execute(
      `INSERT INTO Performance (GameID, PlayerID, Points, Rebounds, Assists, Steals)
       VALUES (?,?,?,?,?,?)
       ON DUPLICATE KEY UPDATE
         Points=VALUES(Points), Rebounds=VALUES(Rebounds),
         Assists=VALUES(Assists), Steals=VALUES(Steals)`,
      [gameId, playerId, points, rebounds, assists, steals]
    );

    res.json({ message: 'Stats recorded' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error:'Server error' });
  }
});

module.exports = router;
