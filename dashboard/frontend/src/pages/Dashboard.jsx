import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { statsApi } from '../api/api';
import { SystemStatusBadge } from '../components/StatusBadge';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const fmt = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);

function StatCard({ label, value, sub, color, icon }) {
  return (
    <div className="card flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}>{icon}</div>
      <div>
        <p className="text-slate-500 text-xs font-medium">{label}</p>
        <p className="text-2xl font-bold text-slate-800 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    statsApi.get().then(setStats).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-slate-400">Carregando...</div>;
  if (!stats) return <div className="p-8 text-red-500">Erro ao carregar dados</div>;

  const balance = (stats.total_paid || 0) - (stats.total_charged || 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Visão geral de todos os sistemas</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total de Sistemas" value={stats.total_systems} sub={`${stats.active_systems} em produção`} color="bg-indigo-50" icon="🖥️" />
        <StatCard label="Trials Ativos" value={stats.active_trials} sub={`${stats.trials_expiring_soon} vencem em 7 dias`} color="bg-amber-50" icon="⏱️" />
        <StatCard label="Total Cobrado" value={fmt(stats.total_charged)} sub={`Pendente: ${fmt(stats.total_pending)}`} color="bg-blue-50" icon="📋" />
        <StatCard label="Total Recebido" value={fmt(stats.total_paid)} sub={balance >= 0 ? `Saldo: ${fmt(balance)}` : `Em aberto: ${fmt(Math.abs(balance))}`} color="bg-emerald-50" icon="💰" />
      </div>

      {stats.trials_expiring_soon > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h3 className="font-semibold text-amber-800 mb-3">⚠️ Trials vencendo em breve</h3>
          <div className="space-y-2">
            {stats.expiring_trials.map(t => (
              <div key={t.id} className="flex items-center justify-between bg-white rounded-lg px-4 py-2.5 border border-amber-100">
                <div>
                  <span className="font-medium text-slate-800">{t.system_name}</span>
                  {t.client && <span className="text-slate-500 text-sm ml-2">· {t.client}</span>}
                </div>
                <div className="text-right">
                  <span className={`font-bold text-sm ${t.days_remaining <= 0 ? 'text-red-600' : t.days_remaining <= 3 ? 'text-orange-600' : 'text-amber-600'}`}>
                    {t.days_remaining <= 0 ? 'Venceu hoje!' : `${t.days_remaining} dias restantes`}
                  </span>
                  <p className="text-xs text-slate-400">Vence em {t.end_date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.total_overdue > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h3 className="font-semibold text-red-800">🔴 Cobranças em atraso: {fmt(stats.total_overdue)}</h3>
          <p className="text-sm text-red-600 mt-1">
            <Link to="/financial" className="underline">Ver cobranças pendentes</Link>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">Sistemas Recentes</h2>
            <Link to="/systems" className="text-indigo-600 text-sm hover:underline">Ver todos</Link>
          </div>
          <div className="space-y-2">
            {stats.recent_systems.length === 0 && (
              <p className="text-slate-400 text-sm text-center py-4">Nenhum sistema cadastrado</p>
            )}
            {stats.recent_systems.map(s => (
              <Link key={s.id} to={`/systems/${s.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div>
                  <p className="font-medium text-slate-800 text-sm">{s.name}</p>
                  {s.client && <p className="text-xs text-slate-500">{s.client}</p>}
                </div>
                <SystemStatusBadge status={s.status} />
              </Link>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">Cobranças Pendentes</h2>
            <Link to="/financial" className="text-indigo-600 text-sm hover:underline">Ver todas</Link>
          </div>
          <div className="space-y-2">
            {stats.pending_charges.length === 0 && (
              <p className="text-slate-400 text-sm text-center py-4">Nenhuma cobrança pendente</p>
            )}
            {stats.pending_charges.map(c => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
                <div>
                  <p className="font-medium text-slate-800 text-sm">{c.description}</p>
                  <p className="text-xs text-slate-500">{c.system_name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-800 text-sm">{fmt(c.amount)}</p>
                  {c.due_date && (
                    <p className={`text-xs ${new Date(c.due_date) < new Date() ? 'text-red-500' : 'text-slate-400'}`}>
                      Vence: {c.due_date}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
