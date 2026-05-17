import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { systemsApi, tasksApi, trialsApi, financialsApi } from '../api/api';
import { SystemStatusBadge, TrialStatusBadge, ChargeStatusBadge } from '../components/StatusBadge';
import KanbanBoard from '../components/KanbanBoard';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';

const fmt = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);

const TABS = ['Visão Geral', 'Tarefas', 'Financeiro', 'Trial'];

export default function SystemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [system, setSystem] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [trials, setTrials] = useState([]);
  const [charges, setCharges] = useState([]);
  const [payments, setPayments] = useState([]);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);

  const loadAll = async () => {
    try {
      const [sys, t, tr, ch, pay] = await Promise.all([
        systemsApi.get(id),
        tasksApi.list(id),
        trialsApi.list(id),
        financialsApi.charges(id),
        financialsApi.payments(id),
      ]);
      setSystem(sys);
      setTasks(t);
      setTrials(tr);
      setCharges(ch);
      setPayments(pay);
    } catch { toast.error('Erro ao carregar'); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadAll(); }, [id]);

  if (loading) return <div className="p-8 text-slate-400">Carregando...</div>;
  if (!system) return <div className="p-8 text-red-500">Sistema não encontrado</div>;

  const activeTrial = trials.find(t => t.status === 'active');
  const totalCharged = charges.reduce((a, c) => a + c.amount, 0);
  const totalPaid = payments.reduce((a, p) => a + p.amount, 0);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
        <Link to="/systems" className="hover:text-indigo-600">Sistemas</Link>
        <span>›</span>
        <span className="text-slate-800 font-medium">{system.name}</span>
      </div>

      <div className="card">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-800">{system.name}</h1>
              <SystemStatusBadge status={system.status} />
              {activeTrial && (
                <span className="badge bg-amber-100 text-amber-700">
                  Trial: {activeTrial.days_remaining > 0 ? `${activeTrial.days_remaining} dias` : 'Venceu!'}
                </span>
              )}
            </div>
            {system.client && <p className="text-slate-500 mt-1">👤 {system.client}</p>}
            {system.description && <p className="text-slate-600 mt-2 text-sm max-w-xl">{system.description}</p>}
          </div>
          <div className="flex gap-2">
            {system.deploy_url && <a href={system.deploy_url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs">🔗 Ver Sistema</a>}
            {system.repository_url && <a href={system.repository_url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs">📦 Repositório</a>}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-700">{tasks.length}</p>
            <p className="text-xs text-slate-400">Tarefas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-700">{tasks.filter(t => t.status === 'done').length}</p>
            <p className="text-xs text-slate-400">Concluídas</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-slate-700">{fmt(totalCharged)}</p>
            <p className="text-xs text-slate-400">Cobrado</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-emerald-600">{fmt(totalPaid)}</p>
            <p className="text-xs text-slate-400">Recebido</p>
          </div>
        </div>
      </div>

      <div className="flex gap-1 border-b border-slate-200">
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === i ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card">
            <h2 className="font-semibold text-slate-800 mb-3">Informações</h2>
            <dl className="space-y-2 text-sm">
              {system.tech_stack && <><dt className="text-slate-400">Stack</dt><dd className="text-slate-700">{system.tech_stack}</dd></>}
              {system.monthly_value > 0 && <><dt className="text-slate-400">Valor Mensal</dt><dd className="text-slate-700 font-medium">{fmt(system.monthly_value)}</dd></>}
              {system.deployed_at && <><dt className="text-slate-400">Colocado em Produção</dt><dd className="text-slate-700">{system.deployed_at?.split('T')[0]}</dd></>}
              <dt className="text-slate-400">Criado em</dt><dd className="text-slate-700">{system.created_at?.split('T')[0]}</dd>
            </dl>
          </div>
          <div className="card">
            <h2 className="font-semibold text-slate-800 mb-3">Resumo Financeiro</h2>
            <div className="space-y-2">
              <div className="flex justify-between"><span className="text-slate-500 text-sm">Cobrado:</span><span className="font-medium">{fmt(totalCharged)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 text-sm">Recebido:</span><span className="font-medium text-emerald-600">{fmt(totalPaid)}</span></div>
              <div className="flex justify-between border-t border-slate-100 pt-2"><span className="text-slate-500 text-sm">Pendente:</span><span className={`font-medium ${totalCharged - totalPaid > 0 ? 'text-red-500' : 'text-emerald-600'}`}>{fmt(totalCharged - totalPaid)}</span></div>
            </div>
          </div>
        </div>
      )}

      {tab === 1 && (
        <div className="card">
          <KanbanBoard systemId={id} tasks={tasks} onTasksChange={() => tasksApi.list(id).then(setTasks)} />
        </div>
      )}

      {tab === 2 && (
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800">Cobranças</h2>
              <button className="btn-primary text-xs" onClick={() => setModal('charge')}>+ Cobrança</button>
            </div>
            <table className="w-full text-sm">
              <thead><tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                <th className="pb-2">Descrição</th><th className="pb-2">Valor</th><th className="pb-2">Vencimento</th><th className="pb-2">Status</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {charges.length === 0 && <tr><td colSpan={4} className="py-4 text-center text-slate-400">Nenhuma cobrança</td></tr>}
                {charges.map(c => (
                  <tr key={c.id}>
                    <td className="py-2 text-slate-700">{c.description}</td>
                    <td className="py-2 font-medium">{fmt(c.amount)}</td>
                    <td className="py-2 text-slate-500">{c.due_date || '-'}</td>
                    <td className="py-2"><ChargeStatusBadge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800">Pagamentos Recebidos</h2>
              <button className="btn-success text-xs" onClick={() => setModal('payment')}>+ Pagamento</button>
            </div>
            <table className="w-full text-sm">
              <thead><tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                <th className="pb-2">Referência</th><th className="pb-2">Valor</th><th className="pb-2">Data</th><th className="pb-2">Método</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {payments.length === 0 && <tr><td colSpan={4} className="py-4 text-center text-slate-400">Nenhum pagamento</td></tr>}
                {payments.map(p => (
                  <tr key={p.id}>
                    <td className="py-2 text-slate-700">{p.charge_description || 'Pagamento avulso'}</td>
                    <td className="py-2 font-medium text-emerald-600">{fmt(p.amount)}</td>
                    <td className="py-2 text-slate-500">{p.paid_at}</td>
                    <td className="py-2 text-slate-500">{p.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 3 && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">Períodos de Trial</h2>
            <button className="btn-primary text-xs" onClick={() => setModal('trial')}>+ Novo Trial</button>
          </div>
          <div className="space-y-3">
            {trials.length === 0 && <p className="text-center text-slate-400 py-4">Nenhum trial cadastrado</p>}
            {trials.map(t => (
              <div key={t.id} className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <TrialStatusBadge status={t.status} />
                      <span className="text-sm text-slate-600">{t.trial_days} dias</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">Início: {t.start_date} · Fim: {t.end_date}</p>
                    {t.notes && <p className="text-xs text-slate-400 mt-1">{t.notes}</p>}
                  </div>
                  {t.status === 'active' && (
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${t.days_remaining <= 3 ? 'text-red-600' : t.days_remaining <= 7 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {t.days_remaining > 0 ? t.days_remaining : 0}
                      </p>
                      <p className="text-xs text-slate-400">dias restantes</p>
                    </div>
                  )}
                </div>
                {t.status === 'active' && (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                    <button className="btn-success text-xs" onClick={async () => {
                      await trialsApi.update(t.id, { status: 'converted' });
                      toast.success('Trial convertido para pago!');
                      loadAll();
                    }}>✅ Converter para Pago</button>
                    <button className="btn text-xs text-slate-500 border border-slate-200 hover:bg-slate-50" onClick={async () => {
                      await trialsApi.update(t.id, { status: 'cancelled' });
                      toast.success('Trial cancelado');
                      loadAll();
                    }}>Cancelar Trial</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {modal === 'trial' && (
        <Modal title="Novo Trial" onClose={() => setModal(null)}>
          <TrialForm systemId={id} onSubmit={async (data) => {
            try { await trialsApi.create({ ...data, system_id: id }); toast.success('Trial criado!'); setModal(null); loadAll(); }
            catch { toast.error('Erro ao criar trial'); }
          }} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal === 'charge' && (
        <Modal title="Nova Cobrança" onClose={() => setModal(null)}>
          <ChargeForm systemId={id} onSubmit={async (data) => {
            try { await financialsApi.createCharge({ ...data, system_id: id }); toast.success('Cobrança criada!'); setModal(null); loadAll(); }
            catch { toast.error('Erro ao criar cobrança'); }
          }} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal === 'payment' && (
        <Modal title="Registrar Pagamento" onClose={() => setModal(null)}>
          <PaymentForm systemId={id} charges={charges.filter(c => c.status === 'pending')} onSubmit={async (data) => {
            try { await financialsApi.createPayment({ ...data, system_id: id }); toast.success('Pagamento registrado!'); setModal(null); loadAll(); }
            catch { toast.error('Erro ao registrar'); }
          }} onClose={() => setModal(null)} />
        </Modal>
      )}
    </div>
  );
}

function TrialForm({ onSubmit, onClose }) {
  const [form, setForm] = useState({ trial_days: 30, start_date: new Date().toISOString().split('T')[0], notes: '' });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Dias de Trial</label>
          <input className="input" type="number" min="1" required value={form.trial_days} onChange={set('trial_days')} />
        </div>
        <div>
          <label className="label">Data de Início</label>
          <input className="input" type="date" required value={form.start_date} onChange={set('start_date')} />
        </div>
      </div>
      <div>
        <label className="label">Observações</label>
        <textarea className="input" rows={2} value={form.notes} onChange={set('notes')} />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
        <button type="submit" className="btn-primary">Criar Trial</button>
      </div>
    </form>
  );
}

function ChargeForm({ onSubmit, onClose }) {
  const [form, setForm] = useState({ description: '', amount: '', due_date: '', charged_at: new Date().toISOString().split('T')[0], notes: '' });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ ...form, amount: Number(form.amount) }); }} className="space-y-3">
      <div>
        <label className="label">Descrição *</label>
        <input className="input" required value={form.description} onChange={set('description')} placeholder="Ex: Mensalidade Janeiro" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Valor (R$) *</label>
          <input className="input" type="number" step="0.01" min="0" required value={form.amount} onChange={set('amount')} />
        </div>
        <div>
          <label className="label">Data da Cobrança</label>
          <input className="input" type="date" value={form.charged_at} onChange={set('charged_at')} />
        </div>
      </div>
      <div>
        <label className="label">Vencimento</label>
        <input className="input" type="date" value={form.due_date} onChange={set('due_date')} />
      </div>
      <div>
        <label className="label">Observações</label>
        <textarea className="input" rows={2} value={form.notes} onChange={set('notes')} />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
        <button type="submit" className="btn-primary">Salvar</button>
      </div>
    </form>
  );
}

function PaymentForm({ charges, onSubmit, onClose }) {
  const [form, setForm] = useState({ charge_id: '', amount: '', paid_at: new Date().toISOString().split('T')[0], method: 'pix', notes: '' });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ ...form, amount: Number(form.amount), charge_id: form.charge_id || null }); }} className="space-y-3">
      {charges.length > 0 && (
        <div>
          <label className="label">Vincular à Cobrança (opcional)</label>
          <select className="input" value={form.charge_id} onChange={(e) => {
            const c = charges.find(c => String(c.id) === e.target.value);
            setForm(f => ({ ...f, charge_id: e.target.value, amount: c ? String(c.amount) : f.amount }));
          }}>
            <option value="">Pagamento avulso</option>
            {charges.map(c => <option key={c.id} value={c.id}>{c.description} — {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(c.amount)}</option>)}
          </select>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Valor (R$) *</label>
          <input className="input" type="number" step="0.01" min="0" required value={form.amount} onChange={set('amount')} />
        </div>
        <div>
          <label className="label">Data do Pagamento *</label>
          <input className="input" type="date" required value={form.paid_at} onChange={set('paid_at')} />
        </div>
      </div>
      <div>
        <label className="label">Método</label>
        <select className="input" value={form.method} onChange={set('method')}>
          <option value="pix">PIX</option>
          <option value="transfer">Transferência</option>
          <option value="credit_card">Cartão de Crédito</option>
          <option value="cash">Dinheiro</option>
          <option value="other">Outro</option>
        </select>
      </div>
      <div>
        <label className="label">Observações</label>
        <textarea className="input" rows={2} value={form.notes} onChange={set('notes')} />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
        <button type="submit" className="btn-success">Registrar Pagamento</button>
      </div>
    </form>
  );
}
