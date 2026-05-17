import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { trialsApi, systemsApi } from '../api/api';
import { TrialStatusBadge } from '../components/StatusBadge';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';

function TrialCountdown({ days, status }) {
  if (status !== 'active') return null;
  const color = days <= 0 ? 'text-red-600' : days <= 3 ? 'text-orange-600' : days <= 7 ? 'text-amber-600' : 'text-emerald-600';
  return (
    <div className={`text-center ${color}`}>
      <p className="text-3xl font-bold">{days <= 0 ? '0' : days}</p>
      <p className="text-xs">{days <= 0 ? 'VENCEU!' : 'dias restantes'}</p>
    </div>
  );
}

function ProgressBar({ days, total }) {
  const used = Math.min(total - Math.max(days, 0), total);
  const pct = Math.round((used / total) * 100);
  const color = pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-amber-500' : 'bg-emerald-500';
  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs text-slate-400 mb-1">
        <span>Dia {used} de {total}</span>
        <span>{pct}% utilizado</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function Trials() {
  const [trials, setTrials] = useState([]);
  const [systems, setSystems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState(false);

  const load = () => Promise.all([trialsApi.list(), systemsApi.list()])
    .then(([t, s]) => { setTrials(t); setSystems(s); })
    .finally(() => setLoading(false));

  useEffect(() => {
    trialsApi.sync().then(load);
  }, []);

  const filtered = filter === 'all' ? trials : trials.filter(t => t.status === filter);

  const handleCreate = async (data) => {
    try {
      await trialsApi.create(data);
      toast.success('Trial criado!');
      setModal(false);
      load();
    } catch { toast.error('Erro ao criar trial'); }
  };

  const handleConvert = async (trial) => {
    try {
      await trialsApi.update(trial.id, { status: 'converted' });
      toast.success('Convertido para cliente pago!');
      load();
    } catch { toast.error('Erro'); }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Períodos de Trial</h1>
          <p className="text-slate-500 text-sm">{trials.filter(t => t.status === 'active').length} trial(s) ativo(s)</p>
        </div>
        <button className="btn-primary" onClick={() => setModal(true)}>+ Novo Trial</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { key: 'all', label: 'Todos', count: trials.length, color: 'bg-slate-100 text-slate-700' },
          { key: 'active', label: 'Ativos', count: trials.filter(t => t.status === 'active').length, color: 'bg-emerald-100 text-emerald-700' },
          { key: 'expired', label: 'Expirados', count: trials.filter(t => t.status === 'expired').length, color: 'bg-red-100 text-red-700' },
          { key: 'converted', label: 'Convertidos', count: trials.filter(t => t.status === 'converted').length, color: 'bg-indigo-100 text-indigo-700' },
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`card text-center cursor-pointer transition-all ${filter === f.key ? 'ring-2 ring-indigo-500' : ''}`}>
            <p className={`badge ${f.color} mb-1`}>{f.label}</p>
            <p className="text-2xl font-bold text-slate-800">{f.count}</p>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-8 text-slate-400">Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-400">
              <p className="text-4xl mb-2">⏱️</p>
              <p>Nenhum trial encontrado</p>
            </div>
          )}
          {filtered.map(t => (
            <div key={t.id} className={`card border-l-4 ${t.status === 'active' && t.days_remaining <= 7 ? 'border-l-amber-500' : t.status === 'active' ? 'border-l-emerald-500' : t.status === 'converted' ? 'border-l-indigo-500' : 'border-l-slate-300'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <Link to={`/systems/${t.system_id}`} className="font-semibold text-slate-800 hover:text-indigo-600 text-base truncate block">
                    {t.system_name}
                  </Link>
                  {t.client && <p className="text-slate-500 text-xs">👤 {t.client}</p>}
                  <div className="flex items-center gap-2 mt-1">
                    <TrialStatusBadge status={t.status} />
                    <span className="text-xs text-slate-400">{t.trial_days} dias</span>
                  </div>
                </div>
                <TrialCountdown days={t.days_remaining} status={t.status} />
              </div>

              <div className="mt-3 text-xs text-slate-500 space-y-0.5">
                <p>Início: <span className="text-slate-700">{t.start_date}</span></p>
                <p>Fim: <span className="text-slate-700">{t.end_date}</span></p>
              </div>

              {t.status === 'active' && (
                <ProgressBar days={t.days_remaining} total={t.trial_days} />
              )}

              {t.notes && <p className="text-xs text-slate-400 mt-2 italic">{t.notes}</p>}

              {t.status === 'active' && (
                <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                  <button className="btn-success flex-1 justify-center text-xs" onClick={() => handleConvert(t)}>
                    ✅ Converter
                  </button>
                  <button className="btn text-xs text-slate-500 border border-slate-200 hover:bg-slate-50" onClick={async () => {
                    await trialsApi.update(t.id, { status: 'cancelled' });
                    toast.success('Trial cancelado');
                    load();
                  }}>Cancelar</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal title="Novo Trial" onClose={() => setModal(false)}>
          <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.target); handleCreate(Object.fromEntries(fd)); }} className="space-y-3">
            <div>
              <label className="label">Sistema *</label>
              <select name="system_id" className="input" required>
                <option value="">Selecione...</option>
                {systems.map(s => <option key={s.id} value={s.id}>{s.name}{s.client ? ` — ${s.client}` : ''}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Dias de Trial</label>
                <input name="trial_days" className="input" type="number" min="1" defaultValue="30" required />
              </div>
              <div>
                <label className="label">Data de Início</label>
                <input name="start_date" className="input" type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
              </div>
            </div>
            <div>
              <label className="label">Observações</label>
              <textarea name="notes" className="input" rows={2} />
            </div>
            <div className="flex gap-2 justify-end">
              <button type="button" className="btn-secondary" onClick={() => setModal(false)}>Cancelar</button>
              <button type="submit" className="btn-primary">Criar Trial</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
