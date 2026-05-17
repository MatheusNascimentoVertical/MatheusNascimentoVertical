const systemStatus = {
  planning:    { label: 'Planejamento', color: 'bg-slate-100 text-slate-600' },
  development: { label: 'Em Desenvolvimento', color: 'bg-blue-100 text-blue-700' },
  testing:     { label: 'Em Teste', color: 'bg-yellow-100 text-yellow-700' },
  production:  { label: 'Em Produção', color: 'bg-emerald-100 text-emerald-700' },
  paused:      { label: 'Pausado', color: 'bg-orange-100 text-orange-700' },
};

const trialStatus = {
  active:    { label: 'Ativo', color: 'bg-emerald-100 text-emerald-700' },
  expired:   { label: 'Expirado', color: 'bg-red-100 text-red-700' },
  converted: { label: 'Convertido', color: 'bg-indigo-100 text-indigo-700' },
  cancelled: { label: 'Cancelado', color: 'bg-slate-100 text-slate-600' },
};

const chargeStatus = {
  pending: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700' },
  paid:    { label: 'Pago', color: 'bg-emerald-100 text-emerald-700' },
  overdue: { label: 'Em Atraso', color: 'bg-red-100 text-red-700' },
};

const priority = {
  low:    { label: 'Baixa', color: 'bg-slate-100 text-slate-600' },
  medium: { label: 'Média', color: 'bg-blue-100 text-blue-700' },
  high:   { label: 'Alta', color: 'bg-red-100 text-red-700' },
};

export function SystemStatusBadge({ status }) {
  const s = systemStatus[status] || { label: status, color: 'bg-slate-100 text-slate-600' };
  return <span className={`badge ${s.color}`}>{s.label}</span>;
}

export function TrialStatusBadge({ status }) {
  const s = trialStatus[status] || { label: status, color: 'bg-slate-100 text-slate-600' };
  return <span className={`badge ${s.color}`}>{s.label}</span>;
}

export function ChargeStatusBadge({ status }) {
  const s = chargeStatus[status] || { label: status, color: 'bg-slate-100 text-slate-600' };
  return <span className={`badge ${s.color}`}>{s.label}</span>;
}

export function PriorityBadge({ priority: p }) {
  const s = priority[p] || { label: p, color: 'bg-slate-100 text-slate-600' };
  return <span className={`badge ${s.color}`}>{s.label}</span>;
}
