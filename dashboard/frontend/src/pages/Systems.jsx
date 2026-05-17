import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { systemsApi } from '../api/api';
import { SystemStatusBadge } from '../components/StatusBadge';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';

const fmt = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);

const STATUS_OPTIONS = ['planning', 'development', 'testing', 'production', 'paused'];

function SystemForm({ initial, onSubmit, onClose }) {
  const [form, setForm] = useState({
    name: '', client: '', description: '', status: 'planning',
    tech_stack: '', repository_url: '', deploy_url: '', monthly_value: '',
    deployed_at: '', ...initial,
  });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, monthly_value: Number(form.monthly_value) || 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Nome do Sistema *</label>
          <input className="input" required value={form.name} onChange={set('name')} placeholder="Ex: ERP do Cliente X" />
        </div>
        <div>
          <label className="label">Cliente</label>
          <input className="input" value={form.client} onChange={set('client')} placeholder="Nome do cliente" />
        </div>
      </div>
      <div>
        <label className="label">Descrição</label>
        <textarea className="input" rows={3} value={form.description} onChange={set('description')} placeholder="Descreva o sistema..." />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Status</label>
          <select className="input" value={form.status} onChange={set('status')}>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Valor Mensal (R$)</label>
          <input className="input" type="number" step="0.01" min="0" value={form.monthly_value} onChange={set('monthly_value')} placeholder="0,00" />
        </div>
      </div>
      <div>
        <label className="label">Stack Tecnológica</label>
        <input className="input" value={form.tech_stack} onChange={set('tech_stack')} placeholder="Ex: React, Node.js, PostgreSQL" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">URL do Repositório</label>
          <input className="input" value={form.repository_url} onChange={set('repository_url')} placeholder="https://github.com/..." />
        </div>
        <div>
          <label className="label">URL de Deploy</label>
          <input className="input" value={form.deploy_url} onChange={set('deploy_url')} placeholder="https://..." />
        </div>
      </div>
      {form.status === 'production' && (
        <div>
          <label className="label">Data de Deploy</label>
          <input className="input" type="date" value={form.deployed_at?.split('T')[0] || ''} onChange={set('deployed_at')} />
        </div>
      )}
      <div className="flex gap-2 justify-end pt-2">
        <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
        <button type="submit" className="btn-primary">Salvar</button>
      </div>
    </form>
  );
}

export default function Systems() {
  const [systems, setSystems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modal, setModal] = useState(null); // null | 'create' | { edit: system }

  const load = () => systemsApi.list().then(setSystems).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const filtered = systems.filter(s => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || (s.client || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleCreate = async (data) => {
    try {
      await systemsApi.create(data);
      toast.success('Sistema criado!');
      setModal(null);
      load();
    } catch { toast.error('Erro ao criar sistema'); }
  };

  const handleEdit = async (data) => {
    try {
      await systemsApi.update(modal.edit.id, data);
      toast.success('Sistema atualizado!');
      setModal(null);
      load();
    } catch { toast.error('Erro ao atualizar sistema'); }
  };

  const handleDelete = async (s) => {
    if (!confirm(`Deletar "${s.name}"? Isso removerá tarefas, trials e financeiros.`)) return;
    try {
      await systemsApi.delete(s.id);
      toast.success('Sistema removido!');
      load();
    } catch { toast.error('Erro ao remover'); }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Sistemas</h1>
          <p className="text-slate-500 text-sm">{systems.length} sistema(s) cadastrado(s)</p>
        </div>
        <button className="btn-primary" onClick={() => setModal('create')}>+ Novo Sistema</button>
      </div>

      <div className="flex gap-3 flex-wrap">
        <input className="input max-w-xs" placeholder="Buscar por nome ou cliente..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="input w-auto" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">Todos os status</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="text-slate-400 py-8 text-center">Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-400">
              <p className="text-4xl mb-2">🖥️</p>
              <p>Nenhum sistema encontrado</p>
              <button className="btn-primary mt-4" onClick={() => setModal('create')}>Cadastrar primeiro sistema</button>
            </div>
          )}
          {filtered.map(s => (
            <div key={s.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <Link to={`/systems/${s.id}`} className="font-semibold text-slate-800 hover:text-indigo-600 text-base leading-tight">
                  {s.name}
                </Link>
                <SystemStatusBadge status={s.status} />
              </div>
              {s.client && <p className="text-sm text-slate-500 mb-2">👤 {s.client}</p>}
              {s.description && <p className="text-xs text-slate-500 mb-3 line-clamp-2">{s.description}</p>}
              {s.tech_stack && <p className="text-xs text-slate-400 mb-3">⚙️ {s.tech_stack}</p>}

              <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                <div className="bg-slate-50 rounded-lg p-2">
                  <p className="text-lg font-bold text-slate-700">{s.total_tasks || 0}</p>
                  <p className="text-xs text-slate-400">Tarefas</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                  <p className="text-sm font-bold text-slate-700">{fmt(s.total_charged)}</p>
                  <p className="text-xs text-slate-400">Cobrado</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                  <p className="text-sm font-bold text-emerald-600">{fmt(s.total_paid)}</p>
                  <p className="text-xs text-slate-400">Recebido</p>
                </div>
              </div>

              {s.trial_status && (
                <div className={`text-xs px-2 py-1 rounded-lg mb-3 ${s.trial_status === 'active' ? 'bg-amber-50 text-amber-700' : 'bg-slate-50 text-slate-500'}`}>
                  Trial: {s.trial_status === 'active' ? `Ativo até ${s.trial_end_date}` : s.trial_status}
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <Link to={`/systems/${s.id}`} className="btn-secondary flex-1 justify-center text-xs">Detalhes</Link>
                <button className="btn-secondary text-xs" onClick={() => setModal({ edit: s })}>Editar</button>
                <button className="btn text-xs text-red-500 hover:bg-red-50 border border-slate-200" onClick={() => handleDelete(s)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal === 'create' && (
        <Modal title="Novo Sistema" onClose={() => setModal(null)}>
          <SystemForm onSubmit={handleCreate} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal?.edit && (
        <Modal title="Editar Sistema" onClose={() => setModal(null)}>
          <SystemForm initial={modal.edit} onSubmit={handleEdit} onClose={() => setModal(null)} />
        </Modal>
      )}
    </div>
  );
}
