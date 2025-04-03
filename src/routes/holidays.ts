import express from 'express';
import pool from '../config/db';
import { ResultSetHeader } from 'mysql2';

const router = express.Router();

// ✅ GET /api/holidays
router.get('/holidays', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM USHHOLI ORDER BY date ASC');
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching holidays:", err);
    res.status(500).json({ error: 'Failed to fetch holidays' });
  }
});

// ✅ POST /api/holidays
router.post('/holidays', async (req, res) => {
  const { date, description } = req.body;
  if (!date || !description) {
    return res.status(400).json({ error: 'Missing date or description' });
  }

  try {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO USHHOLI (date, description) VALUES (?, ?)',
      [date, description]
    );
    res.status(201).json({ id: result.insertId, date, description });
  } catch (err) {
    console.error("❌ Error adding holiday:", err);
    res.status(500).json({ error: 'Failed to add holiday' });
  }
});

// ✅ DELETE /api/holidays/:id
router.delete('/holidays/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM USHHOLI WHERE id = ?', [id]);
    res.sendStatus(204); // No content
  } catch (err) {
    console.error("❌ Error deleting holiday:", err);
    res.status(500).json({ error: 'Failed to delete holiday' });
  }
});

export default router;
