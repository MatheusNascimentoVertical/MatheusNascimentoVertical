import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Systems from './pages/Systems';
import SystemDetail from './pages/SystemDetail';
import Trials from './pages/Trials';
import Financial from './pages/Financial';

export default function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/systems/:id" element={<SystemDetail />} />
          <Route path="/trials" element={<Trials />} />
          <Route path="/financial" element={<Financial />} />
        </Routes>
      </main>
    </div>
  );
}
