const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  const { system_id } = req.query;
  const tasks = system_id
    ? db.prepare('SELECT * FROM tasks WHERE system_id = ? ORDER BY position, created_at').all(system_id)
    : db.prepare('SELECT t.*, s.name as system_name FROM tasks t JOIN systems s ON t.system_id = s.id ORDER BY t.created_at DESC').all();
  res.json(tasks);
});

router.post('/', (req, res) => {
  const { system_id, title, description, status, priority } = req.body;
  if (!system_id || !title) return res.status(400).json({ error: 'system_id e title são obrigatórios' });
  const maxPos = db.prepare('SELECT MAX(position) as mp FROM tasks WHERE system_id = ? AND status = ?').get(system_id, status || 'todo');
  const position = (maxPos?.mp ?? -1) + 1;
  const result = db.prepare(`
    INSERT INTO tasks (system_id, title, description, status, priority, position)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(system_id, title, description, status || 'todo', priority || 'medium', position);
  res.status(201).json(db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid));
});

router.put('/:id', (req, res) => {
  const { title, description, status, priority, position } = req.body;
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
  db.prepare(`
    UPDATE tasks SET title=?, description=?, status=?, priority=?, position=?, updated_at=CURRENT_TIMESTAMP
    WHERE id=?
  `).run(title ?? task.title, description ?? task.description, status ?? task.status,
    priority ?? task.priority, position ?? task.position, req.params.id);
  res.json(db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id));
});

router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id);
  if (!result.changes) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.json({ success: true });
});

module.exports = router;
