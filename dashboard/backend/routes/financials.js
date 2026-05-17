const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Summary
router.get('/summary', (req, res) => {
  const summary = db.prepare(`
    SELECT
      (SELECT COALESCE(SUM(amount),0) FROM charges) as total_charged,
      (SELECT COALESCE(SUM(amount),0) FROM payments) as total_paid,
      (SELECT COALESCE(SUM(amount),0) FROM charges WHERE status='pending') as total_pending,
      (SELECT COALESCE(SUM(amount),0) FROM charges WHERE due_date < date('now') AND status='pending') as total_overdue
  `).get();
  const by_system = db.prepare(`
    SELECT s.id, s.name, s.client,
      COALESCE(SUM(c.amount),0) as total_charged,
      COALESCE((SELECT SUM(p.amount) FROM payments p WHERE p.system_id = s.id),0) as total_paid
    FROM systems s
    LEFT JOIN charges c ON c.system_id = s.id
    GROUP BY s.id ORDER BY total_charged DESC
  `).all();
  res.json({ ...summary, by_system });
});

// Charges
router.get('/charges', (req, res) => {
  const { system_id } = req.query;
  const charges = system_id
    ? db.prepare('SELECT c.*, s.name as system_name FROM charges c JOIN systems s ON c.system_id = s.id WHERE c.system_id = ? ORDER BY c.charged_at DESC').all(system_id)
    : db.prepare('SELECT c.*, s.name as system_name, s.client FROM charges c JOIN systems s ON c.system_id = s.id ORDER BY c.charged_at DESC').all();
  res.json(charges);
});

router.post('/charges', (req, res) => {
  const { system_id, description, amount, due_date, charged_at, notes } = req.body;
  if (!system_id || !amount || !description) return res.status(400).json({ error: 'system_id, description e amount são obrigatórios' });
  const result = db.prepare(`
    INSERT INTO charges (system_id, description, amount, due_date, charged_at, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(system_id, description, amount, due_date, charged_at || new Date().toISOString().split('T')[0], notes);
  res.status(201).json(db.prepare('SELECT c.*, s.name as system_name FROM charges c JOIN systems s ON c.system_id = s.id WHERE c.id = ?').get(result.lastInsertRowid));
});

router.put('/charges/:id', (req, res) => {
  const { description, amount, due_date, status, notes } = req.body;
  const charge = db.prepare('SELECT * FROM charges WHERE id = ?').get(req.params.id);
  if (!charge) return res.status(404).json({ error: 'Cobrança não encontrada' });
  db.prepare('UPDATE charges SET description=?, amount=?, due_date=?, status=?, notes=? WHERE id=?')
    .run(description ?? charge.description, amount ?? charge.amount, due_date ?? charge.due_date, status ?? charge.status, notes ?? charge.notes, req.params.id);
  res.json(db.prepare('SELECT * FROM charges WHERE id = ?').get(req.params.id));
});

router.delete('/charges/:id', (req, res) => {
  const result = db.prepare('DELETE FROM charges WHERE id = ?').run(req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Cobrança não encontrada' });
  res.json({ success: true });
});

// Payments
router.get('/payments', (req, res) => {
  const { system_id } = req.query;
  const payments = system_id
    ? db.prepare('SELECT p.*, s.name as system_name, c.description as charge_description FROM payments p JOIN systems s ON p.system_id = s.id LEFT JOIN charges c ON p.charge_id = c.id WHERE p.system_id = ? ORDER BY p.paid_at DESC').all(system_id)
    : db.prepare('SELECT p.*, s.name as system_name, s.client, c.description as charge_description FROM payments p JOIN systems s ON p.system_id = s.id LEFT JOIN charges c ON p.charge_id = c.id ORDER BY p.paid_at DESC').all();
  res.json(payments);
});

router.post('/payments', (req, res) => {
  const { system_id, charge_id, amount, paid_at, method, notes } = req.body;
  if (!system_id || !amount || !paid_at) return res.status(400).json({ error: 'system_id, amount e paid_at são obrigatórios' });
  const result = db.prepare(`
    INSERT INTO payments (system_id, charge_id, amount, paid_at, method, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(system_id, charge_id, amount, paid_at, method || 'pix', notes);
  // Mark charge as paid if charge_id provided
  if (charge_id) {
    db.prepare("UPDATE charges SET status='paid' WHERE id=?").run(charge_id);
  }
  res.status(201).json(db.prepare('SELECT * FROM payments WHERE id = ?').get(result.lastInsertRowid));
});

router.delete('/payments/:id', (req, res) => {
  const result = db.prepare('DELETE FROM payments WHERE id = ?').run(req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Pagamento não encontrado' });
  res.json({ success: true });
});

module.exports = router;
