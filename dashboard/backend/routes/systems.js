const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  const systems = db.prepare(`
    SELECT s.*,
      (SELECT COUNT(*) FROM tasks WHERE system_id = s.id AND status != 'done') AS pending_tasks,
      (SELECT COUNT(*) FROM tasks WHERE system_id = s.id) AS total_tasks,
      (SELECT SUM(amount) FROM charges WHERE system_id = s.id) AS total_charged,
      (SELECT SUM(amount) FROM payments WHERE system_id = s.id) AS total_paid,
      (SELECT status FROM trials WHERE system_id = s.id ORDER BY id DESC LIMIT 1) AS trial_status,
      (SELECT end_date FROM trials WHERE system_id = s.id ORDER BY id DESC LIMIT 1) AS trial_end_date
    FROM systems s ORDER BY s.created_at DESC
  `).all();
  res.json(systems);
});

router.get('/:id', (req, res) => {
  const system = db.prepare(`
    SELECT s.*,
      (SELECT SUM(amount) FROM charges WHERE system_id = s.id) AS total_charged,
      (SELECT SUM(amount) FROM payments WHERE system_id = s.id) AS total_paid
    FROM systems s WHERE s.id = ?
  `).get(req.params.id);
  if (!system) return res.status(404).json({ error: 'Sistema não encontrado' });
  res.json(system);
});

router.post('/', (req, res) => {
  const { name, client, description, status, tech_stack, repository_url, deploy_url, monthly_value, deployed_at } = req.body;
  if (!name) return res.status(400).json({ error: 'Nome é obrigatório' });
  const result = db.prepare(`
    INSERT INTO systems (name, client, description, status, tech_stack, repository_url, deploy_url, monthly_value, deployed_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(name, client, description, status || 'planning', tech_stack, repository_url, deploy_url, monthly_value || 0, deployed_at);
  const system = db.prepare('SELECT * FROM systems WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(system);
});

router.put('/:id', (req, res) => {
  const { name, client, description, status, tech_stack, repository_url, deploy_url, monthly_value, deployed_at } = req.body;
  const system = db.prepare('SELECT * FROM systems WHERE id = ?').get(req.params.id);
  if (!system) return res.status(404).json({ error: 'Sistema não encontrado' });
  db.prepare(`
    UPDATE systems SET name=?, client=?, description=?, status=?, tech_stack=?, repository_url=?, deploy_url=?, monthly_value=?, deployed_at=?
    WHERE id=?
  `).run(name ?? system.name, client ?? system.client, description ?? system.description, status ?? system.status,
    tech_stack ?? system.tech_stack, repository_url ?? system.repository_url, deploy_url ?? system.deploy_url,
    monthly_value ?? system.monthly_value, deployed_at ?? system.deployed_at, req.params.id);
  res.json(db.prepare('SELECT * FROM systems WHERE id = ?').get(req.params.id));
});

router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM systems WHERE id = ?').run(req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Sistema não encontrado' });
  res.json({ success: true });
});

module.exports = router;
