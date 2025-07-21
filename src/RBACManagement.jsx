
import { useState } from 'react';

const roles = [
  'BDE', 'TDM', 'CH', 'BH', 'Legal', 'Channel',
  'Admin', 'Finance', 'Regional Marketing Manager', 'Super Admin'
];

const permissions = [
  'view_applications', 'edit_applications', 'delete_users',
  'view_reports', 'export_data', 'manage_roles'
];

const RBACManagement = () => {
  const [assignments, setAssignments] = useState({});
  const [selectedRole, setSelectedRole] = useState('');
  const [rolePermissions, setRolePermissions] = useState([]);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setRolePermissions(assignments[role] || []);
  };

  const togglePermission = (perm) => {
    const updated = rolePermissions.includes(perm)
      ? rolePermissions.filter(p => p !== perm)
      : [...rolePermissions, perm];
    setRolePermissions(updated);
    setAssignments({ ...assignments, [selectedRole]: updated });
  };

  return (
    <div className="p-6">
      <Typography variant="h5" mb={3}>
        Role-Based Access Control (RBAC)
      </h2>
      <div className="flex mb-4 gap-4">
        <select
          value={selectedRole}
          onChange={(e) => handleRoleChange(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      {selectedRole && (
        <div className="grid grid-cols-2 gap-4">
          {permissions.map((perm) => (
            <label key={perm} className="flex items-center">
              <input
                type="checkbox"
                checked={rolePermissions.includes(perm)}
                onChange={() => togglePermission(perm)}
                className="mr-2"
              />
              {perm}
            </label>
          ))}
        </div>
      )}

      {selectedRole && (
        <div className="mt-6">
          <h3 className="font-semibold">Assigned Permissions:</h3>
          <ul className="list-disc pl-5 mt-2 text-sm">
            {(assignments[selectedRole] || []).map((perm) => (
              <li key={perm}>{perm}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RBACManagement;
