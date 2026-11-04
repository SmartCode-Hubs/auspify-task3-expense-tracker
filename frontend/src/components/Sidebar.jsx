import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiPieChart, FiSettings, FiLogOut, FiTrendingUp } from 'react-icons/fi';

const Sidebar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
    window.location.reload(); 
  };

  const linkClass = ({ isActive }) => 
    `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`;

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0">
      <div className="h-20 flex items-center px-6 border-b border-slate-800">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-900 font-bold text-xl mr-3">
          <FiTrendingUp />
        </div>
        <h1 className="text-xl font-bold text-white tracking-wide">Tracker</h1>
      </div>

      <div className="px-6 py-4 border-b border-slate-800">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Logged in as</p>
        <p className="text-sm font-medium text-white truncate">{userName}</p>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        <NavLink to="/" className={linkClass}>
          <FiHome className="mr-3" size={20} /> Dashboard
        </NavLink>
        <NavLink to="/reports" className={linkClass}>
          <FiPieChart className="mr-3" size={20} /> Reports
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          <FiSettings className="mr-3" size={20} /> Settings
        </NavLink>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
          <FiLogOut className="mr-3" size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;