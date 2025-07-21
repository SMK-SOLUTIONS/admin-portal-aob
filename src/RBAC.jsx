
import { useState } from 'react';

const roles = ['BDE', 'TDM', 'CH', 'BH', 'Legal', 'Channel', 'Admin', 'Finance', 'Regional Marketing Manager', 'Super Admin'];
const permissions = ['view_users', 'edit_users', 'delete_users', 'view_reports', 'edit_applications'];

const initialAssignments = [
  { role: 'CH', permissions: ['view_users', 'edit_users', 'view_reports'] },
  { role: 'BH', permissions: ['view_users', 'view_reports'] }
];

const RBAC = () => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedPerms, setSelectedPerms] = useState([]);

  const handleTogglePermission = (perm) => {
    setSelectedPerms(prev =>
      prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]
    );
  };

  const handleAssign = () => {
    if (!selectedRole) return;
    const updated = [...assignments.filter(a => a.role !== selectedRole), { role: selectedRole, permissions: selectedPerms }];
    setAssignments(updated);
    setSelectedRole('');
    setSelectedPerms([]);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Role-Based Access Control (RBAC)</h2>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Select Role</label>
        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="border px-3 py-2 rounded w-64">
          <option value="">-- Select Role --</option>
          {roles.map(role => <option key={role} value={role}>{role}</option>)}
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Assign Permissions</label>
        {permissions.map(perm => (
          <div key={perm}>
            <input
              type="checkbox"
              checked={selectedPerms.includes(perm)}
              onChange={() => handleTogglePermission(perm)}
              className="mr-2"
            />
            {perm}
          </div>
        ))}
      </div>
      <button onClick={handleAssign} className="bg-[#034ea2] text-white px-4 py-2 rounded mb-6">Assign Permissions</button>

      <h3 className="text-lg font-bold mb-2">Current Role Assignments</h3>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-[#eaf3fc]">
            <th className="border p-2">Role</th>
            <th className="border p-2">Permissions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(({ role, permissions }) => (
            <tr key={role}>
              <td className="border p-2">{role}</td>
              <td className="border p-2">{permissions.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RBAC;
