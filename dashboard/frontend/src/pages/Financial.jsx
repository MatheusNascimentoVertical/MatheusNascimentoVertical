import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { financialsApi, systemsApi } from '../api/api';
import { ChargeStatusBadge } from '../components/StatusBadge';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const fmt = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);

export default function Financial() {
  const [summary, setSummary] = useState(null);
  const [charges, setCharges] = useState([]);
  const [payments, setPayments] = useState([]);
  const [systems, setSystems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const [modal, setModal] = useState(null);
  const [filter, setFilter] = useState('all');

  const load = () => Promise.all([
    financialsApi.summary(),
    financialsApi.charges(),
    financialsApi.payments(),
    systemsApi.list(),
  ]).then(([s, c, p, sys]) => { setSummary(s); setCharges(c); setPayments(p); setSystems(sys); })
    .finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const filteredCharges = filter === 'all' ? charges : charges.filter(c => c.status === filter);

  const handleCreateCharge = async (data) => {
    try { await financialsApi.createCharge(data); toast.success('Cobrança criada!'); setModal(null); load(); }
    catch { toast.error('Erro ao criar cobrança'); }
  };

  const handleCreatePayment = async (data) => {
    try { await financialsApi.createPayment(data); toast.success('Pagamento registrado!'); setModal(null); load(); }
    catch { toast.error('Erro ao registrar pagamento'); }
  };

  const handleDeleteCharge = async (id) => {
    if (!confirm('Remover esta cobrança?')) return;
    try { await financialsApi.deleteCharge(id); toast.success('Removida!'); load(); }
    catch { toast.error('Erro'); }
  };

  const handleDeletePayment = async (id) => {
    if (!confirm('Remover este pagamento?')) return;
    try { await financialsApi.deletePayment(id); toast.success('Removido!'); load(); }
    catch { toast.error('Erro'); }
  };

  if (loading) return <div className="p-8 text-slate-400">Carregando...</div>;

  const chartData = (summary?.by_system || []).slice(0, 8).map(s => ({
    name: s.name.length > 12 ? s.name.substring(0, 12) + '...' : s.name,
    Cobrado: s.total_charged,
    Recebido: s.total_paid,
  }));

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Financeiro</h1>
          <p className="text-slate-500 text-sm">Controle de cobranças e pagamentos</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={() => setModal('payment')}>+ Pagamento</button>
          <button className="btn-primary" onClick={() => setModal('charge')}>+ Cobrança</button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Cobrado', value: fmt(summary?.total_charged), color: 'bg-blue-50', icon: '📋' },
          { label: 'Total Recebido', value: fmt(summary?.total_paid), color: 'bg-emerald-50', icon: '✅' },
          { label: 'Pendente', value: fmt(summary?.total_pending), color: 'bg-amber-50', icon: '⏳' },
          { label: 'Em Atraso', value: fmt(summary?.total_overdue), color: 'bg-red-50', icon: '🔴' },
        ].map(s => (
          <div key={s.label} className="card">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{s.icon}</span>
              <span className="text-xs text-slate-500 font-medium">{s.label}</span>
            </div>
            <p className="text-xl font-bold text-slate-800">{s.value}</p>
          </div>
        ))}
      </div>

      {chartData.length > 0 && (
        <div className="card">
          <h2 className="font-semibold text-slate-800 mb-4">Cobrado vs Recebido por Sistema</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `R$${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => fmt(v)} />
              <Bar dataKey="Cobrado" fill="#6366f1" radius={[4,4,0,0]} />
              <Bar dataKey="Recebido" fill="#10b981" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="flex gap-1 border-b border-slate-200">
        {['Cobranças', 'Pagamentos', 'Por Sistema'].map((t, i) => (
          <button key={t} onClick={() => setTab(i)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === i ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 0 && (
        <div className="card">
          <div className="flex gap-2 mb-4 flex-wrap">
            {['all', 'pending', 'paid'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${filter === f ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendentes' : 'Pagas'}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                <th className="pb-2">Sistema</th><th className="pb-2">Descrição</th><th className="pb-2">Valor</th>
                <th className="pb-2">Cobrança</th><th className="pb-2">Vencimento</th><th className="pb-2">Status</th><th className="pb-2"></th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCharges.length === 0 && <tr><td colSpan={7} className="py-6 text-center text-slate-400">Nenhuma cobrança</td></tr>}
                {filteredCharges.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="py-2">
                      <Link to={`/systems/${c.system_id}`} className="text-indigo-600 hover:underline text-xs">{c.system_name}</Link>
                    </td>
                    <td className="py-2 text-slate-700">{c.description}</td>
                    <td className="py-2 font-medium">{fmt(c.amount)}</td>
                    <td className="py-2 text-slate-500">{c.charged_at}</td>
                    <td className={`py-2 text-sm ${c.due_date && new Date(c.due_date) < new Date() && c.status === 'pending' ? 'text-red-500 font-medium' : 'text-slate-500'}`}>
                      {c.due_date || '-'}
                    </td>
                    <td className="py-2"><ChargeStatusBadge status={c.status} /></td>
                    <td className="py-2">
                      <button onClick={() => handleDeleteCharge(c.id)} className="text-slate-300 hover:text-red-500 text-xs">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 1 && (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-xs text-slate-400 border-b border-slate-100">
              <th className="pb-2">Sistema</th><th className="pb-2">Referência</th><th className="pb-2">Valor</th>
              <th className="pb-2">Data</th><th className="pb-2">Método</th><th className="pb-2"></th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {payments.length === 0 && <tr><td colSpan={6} className="py-6 text-center text-slate-400">Nenhum pagamento registrado</td></tr>}
              {payments.map(p => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-2">
                    <Link to={`/systems/${p.system_id}`} className="text-indigo-600 hover:underline text-xs">{p.system_name}</Link>
                  </td>
                  <td className="py-2 text-slate-700">{p.charge_description || 'Avulso'}</td>
                  <td className="py-2 font-medium text-emerald-600">{fmt(p.amount)}</td>
                  <td className="py-2 text-slate-500">{p.paid_at}</td>
                  <td className="py-2 text-slate-500 capitalize">{p.method}</td>
                  <td className="py-2">
                    <button onClick={() => handleDeletePayment(p.id)} className="text-slate-300 hover:text-red-500 text-xs">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 2 && (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-xs text-slate-400 border-b border-slate-100">
              <th className="pb-2">Sistema</th><th className="pb-2">Cliente</th>
              <th className="pb-2">Cobrado</th><th className="pb-2">Recebido</th><th className="pb-2">Pendente</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {(summary?.by_system || []).length === 0 && <tr><td colSpan={5} className="py-6 text-center text-slate-400">Nenhum dado</td></tr>}
              {(summary?.by_system || []).map(s => {
                const pending = s.total_charged - s.total_paid;
                return (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="py-2">
                      <Link to={`/systems/${s.id}`} className="text-indigo-600 hover:underline">{s.name}</Link>
                    </td>
                    <td className="py-2 text-slate-500">{s.client || '-'}</td>
                    <td className="py-2 font-medium">{fmt(s.total_charged)}</td>
                    <td className="py-2 font-medium text-emerald-600">{fmt(s.total_paid)}</td>
                    <td className={`py-2 font-medium ${pending > 0 ? 'text-red-500' : 'text-slate-400'}`}>{fmt(pending)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {modal === 'charge' && (
        <Modal title="Nova Cobrança" onClose={() => setModal(null)}>
          <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.target); const data = Object.fromEntries(fd); handleCreateCharge({ ...data, amount: Number(data.amount) }); }} className="space-y-3">
            <div>
              <label className="label">Sistema *</label>
              <select name="system_id" className="input" required>
                <option value="">Selecione...</option>
                {systems.map(s => <option key={s.id} value={s.id}>{s.name}{s.client ? ` — ${s.client}` : ''}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Descrição *</label>
              <input name="description" className="input" required placeholder="Ex: Mensalidade Maio/2025" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Valor (R$) *</label>
                <input name="amount" className="input" type="number" step="0.01" min="0" required />
              </div>
              <div>
                <label className="label">Data da Cobrança</label>
                <input name="charged_at" className="input" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
            <div>
              <label className="label">Vencimento</label>
              <input name="due_date" className="input" type="date" />
            </div>
            <div className="flex gap-2 justify-end">
              <button type="button" className="btn-secondary" onClick={() => setModal(null)}>Cancelar</button>
              <button type="submit" className="btn-primary">Salvar</button>
            </div>
          </form>
        </Modal>
      )}

      {modal === 'payment' && (
        <Modal title="Registrar Pagamento" onClose={() => setModal(null)}>
          <form onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            const data = Object.fromEntries(fd);
            handleCreatePayment({ ...data, amount: Number(data.amount), charge_id: data.charge_id || null });
          }} className="space-y-3">
            <div>
              <label className="label">Sistema *</label>
              <select name="system_id" className="input" required>
                <option value="">Selecione...</option>
                {systems.map(s => <option key={s.id} value={s.id}>{s.name}{s.client ? ` — ${s.client}` : ''}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Valor (R$) *</label>
                <input name="amount" className="input" type="number" step="0.01" min="0" required />
              </div>
              <div>
                <label className="label">Data *</label>
                <input name="paid_at" className="input" type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
              </div>
            </div>
            <div>
              <label className="label">Método</label>
              <select name="method" className="input">
                <option value="pix">PIX</option>
                <option value="transfer">Transferência</option>
                <option value="credit_card">Cartão</option>
                <option value="cash">Dinheiro</option>
                <option value="other">Outro</option>
              </select>
            </div>
            <div>
              <label className="label">Observações</label>
              <textarea name="notes" className="input" rows={2} />
            </div>
            <div className="flex gap-2 justify-end">
              <button type="button" className="btn-secondary" onClick={() => setModal(null)}>Cancelar</button>
              <button type="submit" className="btn-success">Registrar</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
