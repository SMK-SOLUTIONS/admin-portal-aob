import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import AgilusLogoBlue from './Agilus Logo-blue-bg.jpg';

function Sidebar({ onLogout }) {
  const getLinkClasses = ({ isActive }) =>
    `p-2 rounded ${
      isActive
        ? 'bg-[#eaf3fc] text-[#034ea2] font-semibold'
        : 'hover:bg-[#0256b5]'
    }`;

  return (
    <div className="w-52 min-h-screen bg-[#0076bc] text-white p-4 flex flex-col justify-between">
      <div>
        <img src={AgilusLogoBlue} alt="Logo" className="mb-6 w-40" />
        <h2 className="text-xl font-bold mb-6">Admin Portal</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="/" className={getLinkClasses}>Home</NavLink>
          <NavLink to="/users" className={getLinkClasses}>User Management</NavLink>
          <NavLink to="/rbac" className={getLinkClasses}>RBAC</NavLink>
          <NavLink to="/applications" className={getLinkClasses}>Applications</NavLink>
          <NavLink to="/summary-report" className={getLinkClasses}>Summary Report</NavLink>
          <NavLink to="/detailed-report" className={getLinkClasses}>Detailed Report</NavLink>
          <NavLink to="/stamp-report" className={getLinkClasses}>Stamp Report</NavLink>
          <NavLink to="/ch-dashboard" className={getLinkClasses}>CH Dashboard</NavLink>
          <NavLink to="/bh-dashboard" className={getLinkClasses}>BH Dashboard</NavLink>
        </nav>
      </div>
      <button
        onClick={onLogout}
        className="mt-6 bg-white hover:bg-[#eaf3fc] p-2 rounded text-[#034ea2]"
      >
        Logout
      </button>
    </div>
  );
}

Sidebar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Sidebar;
