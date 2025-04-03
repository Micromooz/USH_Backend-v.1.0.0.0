// ✅ Unified Backend Routes: src/routes/timeslots.ts

import express from 'express';
import pool from '../config/db';

const router = express.Router();

// GET blocked slots by type and date
router.get('/blocked', async (req, res) => {
  const { date, type } = req.query;
  if (!date || !type) return res.status(400).json({ error: 'Missing date or type' });

  try {
    const [rows] = await pool.query(
      'SELECT time_slot FROM USHBKSL WHERE date = ? AND booking_type = ?',
      [date, type]
    );
    const timeSlots = (rows as any[]).map(row => row.time_slot);
    res.json(timeSlots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST block slots by type
router.post('/block', async (req, res) => {
  const { date, timeSlots, type } = req.body;
  if (!date || !Array.isArray(timeSlots) || !type) return res.status(400).json({ error: 'Invalid payload' });

  try {
    const values = timeSlots.map(slot => [date, slot, type]);
    await pool.query('INSERT INTO USHBKSL (date, time_slot, type) VALUES ?', [values]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST unblock slots by type
router.post('/unblock', async (req, res) => {
  const { date, timeSlots, type } = req.body;
  if (!date || !Array.isArray(timeSlots) || !type) return res.status(400).json({ error: 'Invalid payload' });

  try {
    const placeholders = timeSlots.map(() => '?').join(',');
    const params = [date, type, ...timeSlots];
    await pool.query(
      `DELETE FROM USHBKSL WHERE date = ? AND booking_type = ? AND time_slot IN (${placeholders})`,
      params
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
