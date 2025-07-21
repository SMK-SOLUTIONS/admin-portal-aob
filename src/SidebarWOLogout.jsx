
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const linkClass = 'block px-4 py-2 hover:bg-blue-600 rounded text-white';
  const activeClass = 'bg-blue-700';

  return (
    <div className="w-60 h-screen bg-blue-900 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Admin Portal</h2>
      <nav className="flex flex-col gap-2">
        <NavLink to="/" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>Home</NavLink>
        <NavLink to="/users" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>User Management</NavLink>
        <NavLink to="/rbac" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>RBAC</NavLink>
        <NavLink to="/applications" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>Applications</NavLink>
        <NavLink to="/summary-report" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>Summary Report</NavLink>
        <NavLink to="/detailed-report" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>Detailed Report</NavLink>
        <NavLink to="/stamp-report" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>Stamp Paper Report</NavLink>
        <NavLink to="/ch-dashboard" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>CH Dashboard</NavLink>
        <NavLink to="/bh-dashboard" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>BH Dashboard</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
