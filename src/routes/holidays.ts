// ✅ Backend Routes: src/routes/holidays.ts

import express from 'express';
import pool from '../config/db';
import { ResultSetHeader } from 'mysql2';

const router = express.Router();

// Get all holidays
router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM USHHOLI ORDER BY date ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch holidays' });
  }
});

// Add a holiday
router.post('/', async (req, res) => {
  const { date, description } = req.body;
  if (!date || !description) return res.status(400).json({ error: 'Missing date or description' });

  try {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO USHHOLI (date, description) VALUES (?, ?)',
      [date, description]
    );
    res.status(201).json({ id: result.insertId, date, description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add holiday' });
  }
});

// Delete a holiday by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM USHHOLI WHERE id = ?', [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete holiday' });
  }
});

export default router;


// ✅ Sample Table Schema
// CREATE TABLE USHHOLI (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   date DATE NOT NULL,
//   description VARCHAR(255) NOT NULL
// );
