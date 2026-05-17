import { NavLink } from 'react-router-dom';

const nav = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/systems', label: 'Sistemas', icon: '🖥️' },
  { to: '/trials', label: 'Períodos de Trial', icon: '⏱️' },
  { to: '/financial', label: 'Financeiro', icon: '💰' },
];

export default function Sidebar() {
  return (
    <aside className="w-60 bg-slate-900 text-slate-300 flex flex-col min-h-screen shrink-0">
      <div className="px-5 py-6 border-b border-slate-700">
        <h1 className="text-white font-bold text-lg leading-tight">Gestão de<br />Sistemas</h1>
        <p className="text-slate-500 text-xs mt-1">Painel de Controle</p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span className="text-base">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-5 py-4 border-t border-slate-700 text-xs text-slate-500">
        v1.0.0
      </div>
    </aside>
  );
}
