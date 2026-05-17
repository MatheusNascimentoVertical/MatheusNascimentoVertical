import { useState } from 'react';
import { tasksApi } from '../api/api';
import { PriorityBadge } from './StatusBadge';
import toast from 'react-hot-toast';

const COLUMNS = [
  { id: 'todo', label: 'A Fazer', color: 'border-slate-300' },
  { id: 'in_progress', label: 'Em Progresso', color: 'border-blue-400' },
  { id: 'done', label: 'Concluído', color: 'border-emerald-400' },
];

function TaskCard({ task, onEdit, onDelete, onMove }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-slate-800 leading-tight flex-1">{task.title}</p>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button onClick={() => onEdit(task)} className="text-slate-400 hover:text-indigo-600 text-xs px-1">✏️</button>
          <button onClick={() => onDelete(task)} className="text-slate-400 hover:text-red-500 text-xs px-1">🗑️</button>
        </div>
      </div>
      {task.description && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{task.description}</p>}
      <div className="flex items-center justify-between mt-2">
        <PriorityBadge priority={task.priority} />
        <div className="flex gap-1">
          {task.status !== 'todo' && (
            <button onClick={() => onMove(task, COLUMNS[COLUMNS.findIndex(c => c.id === task.status) - 1]?.id)} className="text-xs text-slate-400 hover:text-slate-600">◀</button>
          )}
          {task.status !== 'done' && (
            <button onClick={() => onMove(task, COLUMNS[COLUMNS.findIndex(c => c.id === task.status) + 1]?.id)} className="text-xs text-slate-400 hover:text-slate-600">▶</button>
          )}
        </div>
      </div>
    </div>
  );
}

function TaskForm({ initial, systemId, onSubmit, onClose }) {
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium', status: 'todo', ...initial });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-3">
      <div>
        <label className="label">Título *</label>
        <input className="input" required value={form.title} onChange={set('title')} placeholder="Descreva a tarefa..." />
      </div>
      <div>
        <label className="label">Descrição</label>
        <textarea className="input" rows={2} value={form.description} onChange={set('description')} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Prioridade</label>
          <select className="input" value={form.priority} onChange={set('priority')}>
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>
        <div>
          <label className="label">Status</label>
          <select className="input" value={form.status} onChange={set('status')}>
            <option value="todo">A Fazer</option>
            <option value="in_progress">Em Progresso</option>
            <option value="done">Concluído</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
        <button type="submit" className="btn-primary">Salvar</button>
      </div>
    </form>
  );
}

export default function KanbanBoard({ systemId, tasks, onTasksChange }) {
  const [modal, setModal] = useState(null);

  const byStatus = (status) => tasks.filter(t => t.status === status);

  const handleCreate = async (data) => {
    try {
      await tasksApi.create({ ...data, system_id: systemId });
      toast.success('Tarefa criada!');
      setModal(null);
      onTasksChange();
    } catch { toast.error('Erro ao criar tarefa'); }
  };

  const handleEdit = async (data) => {
    try {
      await tasksApi.update(modal.task.id, data);
      toast.success('Tarefa atualizada!');
      setModal(null);
      onTasksChange();
    } catch { toast.error('Erro ao atualizar'); }
  };

  const handleDelete = async (task) => {
    if (!confirm(`Remover "${task.title}"?`)) return;
    try {
      await tasksApi.delete(task.id);
      toast.success('Tarefa removida!');
      onTasksChange();
    } catch { toast.error('Erro ao remover'); }
  };

  const handleMove = async (task, newStatus) => {
    if (!newStatus) return;
    try {
      await tasksApi.update(task.id, { status: newStatus });
      onTasksChange();
    } catch { toast.error('Erro ao mover tarefa'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4 text-sm text-slate-500">
          <span>Total: <b className="text-slate-700">{tasks.length}</b></span>
          <span>A Fazer: <b className="text-slate-700">{byStatus('todo').length}</b></span>
          <span>Progresso: <b className="text-blue-600">{byStatus('in_progress').length}</b></span>
          <span>Feito: <b className="text-emerald-600">{byStatus('done').length}</b></span>
        </div>
        <button className="btn-primary text-xs" onClick={() => setModal({ type: 'create' })}>+ Tarefa</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {COLUMNS.map(col => (
          <div key={col.id} className={`bg-slate-50 rounded-xl border-t-4 ${col.color} p-3 kanban-col`}>
            <h3 className="font-semibold text-slate-700 text-sm mb-3 flex items-center justify-between">
              {col.label}
              <span className="bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-slate-500 shadow-sm">
                {byStatus(col.id).length}
              </span>
            </h3>
            <div className="space-y-2">
              {byStatus(col.id).map(task => (
                <TaskCard key={task.id} task={task} onEdit={(t) => setModal({ type: 'edit', task: t })} onDelete={handleDelete} onMove={handleMove} />
              ))}
              {byStatus(col.id).length === 0 && (
                <p className="text-xs text-slate-400 text-center py-4">Vazio</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {modal?.type === 'create' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setModal(null)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="font-semibold text-slate-800 mb-4">Nova Tarefa</h2>
            <TaskForm systemId={systemId} onSubmit={handleCreate} onClose={() => setModal(null)} />
          </div>
        </div>
      )}
      {modal?.type === 'edit' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setModal(null)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="font-semibold text-slate-800 mb-4">Editar Tarefa</h2>
            <TaskForm initial={modal.task} systemId={systemId} onSubmit={handleEdit} onClose={() => setModal(null)} />
          </div>
        </div>
      )}
    </div>
  );
}
