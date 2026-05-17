const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  const { system_id } = req.query;
  const query = system_id
    ? `SELECT t.*, s.name as system_name, s.client,
        CAST((julianday(t.end_date) - julianday('now')) AS INTEGER) as days_remaining
       FROM trials t JOIN systems s ON t.system_id = s.id
       WHERE t.system_id = ? ORDER BY t.created_at DESC`
    : `SELECT t.*, s.name as system_name, s.client,
        CAST((julianday(t.end_date) - julianday('now')) AS INTEGER) as days_remaining
       FROM trials t JOIN systems s ON t.system_id = s.id
       ORDER BY t.end_date ASC`;
  const trials = system_id ? db.prepare(query).all(system_id) : db.prepare(query).all();
  res.json(trials);
});

router.post('/', (req, res) => {
  const { system_id, trial_days, start_date, notes } = req.body;
  if (!system_id || !start_date) return res.status(400).json({ error: 'system_id e start_date são obrigatórios' });
  const days = trial_days || 30;
  const end_date = new Date(start_date);
  end_date.setDate(end_date.getDate() + days);
  const end_date_str = end_date.toISOString().split('T')[0];
  // Expire previous active trial for this system
  db.prepare("UPDATE trials SET status='expired' WHERE system_id = ? AND status = 'active'").run(system_id);
  const result = db.prepare(`
    INSERT INTO trials (system_id, trial_days, start_date, end_date, notes)
    VALUES (?, ?, ?, ?, ?)
  `).run(system_id, days, start_date, end_date_str, notes);
  res.status(201).json(db.prepare(`
    SELECT t.*, s.name as system_name, CAST((julianday(t.end_date) - julianday('now')) AS INTEGER) as days_remaining
    FROM trials t JOIN systems s ON t.system_id = s.id WHERE t.id = ?
  `).get(result.lastInsertRowid));
});

router.put('/:id', (req, res) => {
  const { status, notes } = req.body;
  const trial = db.prepare('SELECT * FROM trials WHERE id = ?').get(req.params.id);
  if (!trial) return res.status(404).json({ error: 'Trial não encontrado' });
  db.prepare('UPDATE trials SET status=?, notes=? WHERE id=?')
    .run(status ?? trial.status, notes ?? trial.notes, req.params.id);
  res.json(db.prepare(`
    SELECT t.*, s.name as system_name, CAST((julianday(t.end_date) - julianday('now')) AS INTEGER) as days_remaining
    FROM trials t JOIN systems s ON t.system_id = s.id WHERE t.id = ?
  `).get(req.params.id));
});

router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM trials WHERE id = ?').run(req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Trial não encontrado' });
  res.json({ success: true });
});

// Auto-update expired trials
router.post('/sync', (req, res) => {
  const updated = db.prepare(`
    UPDATE trials SET status='expired'
    WHERE status='active' AND end_date < date('now')
  `).run();
  res.json({ updated: updated.changes });
});

module.exports = router;
