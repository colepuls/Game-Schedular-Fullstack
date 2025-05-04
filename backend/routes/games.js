const router = require('express').Router();
const pool   = require('../db');

// ---------- Schedule_New_Game ----------
router.post('/', async (req, res) => {
  const { arenaId, gameDate, startTime, endTime } = req.body;

  try {
    const [arena] = await pool.execute(
      'SELECT 1 FROM Arena WHERE ArenaID = ?', [arenaId]
    );
    if (!arena.length) return res.status(404).json({ error: 'Arena not found' });

    const [r] = await pool.execute(
      `INSERT INTO Game (ArenaID, GameDate, StartTime, EndTime)
       VALUES (?,?,?,?)`,
      [arenaId, gameDate, startTime, endTime]
    );
    res.status(201).json({ message: 'Game scheduled', gameId: r.insertId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

// ---------- Assign_Teams_To_Game ----------
router.post('/:id/teams', async (req, res) => {
  const gameId = req.params.id;
  const { teamIds } = req.body;   // e.g. [1,2]

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [g] = await conn.execute('SELECT 1 FROM Game WHERE GameID = ?', [gameId]);
    if (!g.length) throw { status: 404, msg: 'Game not found' };

    for (const teamId of teamIds) {
      const [t] = await conn.execute('SELECT 1 FROM Team WHERE TeamID = ?', [teamId]);
      if (!t.length) throw { status: 404, msg: `Team ${teamId} not found` };

      await conn.execute(
        'INSERT IGNORE INTO CompetesIn (GameID, TeamID) VALUES (?,?)',
        [gameId, teamId]
      );
    }

    await conn.commit();
    res.json({ message: 'Teams assigned' });
  } catch (e) {
    await conn.rollback();
    res.status(e.status || 500).json({ error: e.msg || 'Server error' });
  } finally {
    conn.release();
  }
});

// ---------- Display_Game_Stats ----------
router.get('/:id/stats', async (req, res) => {
  const gameId = req.params.id;

  const [exists] = await pool.execute('SELECT 1 FROM Game WHERE GameID = ?', [gameId]);
  if (!exists.length) return res.status(404).json({ error: 'Game not found' });

  const [rows] = await pool.execute(
    `SELECT pl.PlayerID,
            p.PlayerName,
            p.TeamID,
            pl.Points,
            pl.Rebounds,
            pl.Assists,
            pl.Steals
       FROM Performance pl
       JOIN Player p ON p.PlayerID = pl.PlayerID
      WHERE pl.GameID = ?`,
    [gameId]
  );

  if (!rows.length) return res.json({ message: 'No performance data yet', stats: [] });
  res.json({ stats: rows });
});

module.exports = router;
