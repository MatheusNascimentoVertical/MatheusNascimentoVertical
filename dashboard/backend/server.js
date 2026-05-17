require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/systems', require('./routes/systems'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/trials', require('./routes/trials'));
app.use('/api/financials', require('./routes/financials'));

// Dashboard stats endpoint
app.get('/api/stats', (req, res) => {
  const db = require('./db/database');
  const stats = {
    total_systems: db.prepare('SELECT COUNT(*) as c FROM systems').get().c,
    active_systems: db.prepare("SELECT COUNT(*) as c FROM systems WHERE status='production'").get().c,
    active_trials: db.prepare("SELECT COUNT(*) as c FROM trials WHERE status='active'").get().c,
    trials_expiring_soon: db.prepare("SELECT COUNT(*) as c FROM trials WHERE status='active' AND julianday(end_date) - julianday('now') <= 7").get().c,
    total_charged: db.prepare('SELECT COALESCE(SUM(amount),0) as v FROM charges').get().v,
    total_paid: db.prepare('SELECT COALESCE(SUM(amount),0) as v FROM payments').get().v,
    total_pending: db.prepare("SELECT COALESCE(SUM(amount),0) as v FROM charges WHERE status='pending'").get().v,
    total_overdue: db.prepare("SELECT COALESCE(SUM(amount),0) as v FROM charges WHERE status='pending' AND due_date < date('now')").get().v,
    recent_systems: db.prepare('SELECT id, name, client, status FROM systems ORDER BY created_at DESC LIMIT 5').all(),
    expiring_trials: db.prepare(`
      SELECT t.*, s.name as system_name, s.client,
        CAST((julianday(t.end_date) - julianday('now')) AS INTEGER) as days_remaining
      FROM trials t JOIN systems s ON t.system_id = s.id
      WHERE t.status='active' AND julianday(t.end_date) - julianday('now') <= 7
      ORDER BY t.end_date ASC
    `).all(),
    pending_charges: db.prepare(`
      SELECT c.*, s.name as system_name FROM charges c
      JOIN systems s ON c.system_id = s.id
      WHERE c.status='pending' ORDER BY c.due_date ASC LIMIT 5
    `).all(),
  };
  res.json(stats);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
