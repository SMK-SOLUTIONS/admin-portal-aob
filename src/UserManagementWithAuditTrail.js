
import { useState } from 'react';

const initialUsers = [
  {
    id: 1,
    name: 'John Doe',
    mobile: '9876543210',
    city: 'Bangalore',
    state: 'Karnataka',
    region: 'South',
    tcode: 'T001',
    designation: 'BDE',
    email: 'john@example.com',
    reportingCH: 'CH1',
    reportingBH: 'BH1',
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: '', mobile: '', city: '', state: '', region: '', tcode: '', designation: '', email: '', reportingCH: '', reportingBH: '' });
  const [auditTrail, setAuditTrail] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      const editedFields = Object.keys(form).filter(key => form[key] !== editingUser[key]);
      const trail = editedFields.map(field => ({
        field,
        oldValue: editingUser[field],
        newValue: form[field],
        editedBy: 'Admin',
        timestamp: new Date().toLocaleString(),
        userId: editingUser.id,
      }));
      setAuditTrail([...auditTrail, ...trail]);
      setUsers(users.map(u => u.id === editingUser.id ? { ...form, id: editingUser.id } : u));
      setEditingUser(null);
    } else {
      setUsers([...users, { ...form, id: Date.now() }]);
    }
    setForm({ name: '', mobile: '', city: '', state: '', region: '', tcode: '', designation: '', email: '', reportingCH: '', reportingBH: '' });
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditingUser(user);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">User Management</h1>
      <form onSubmit={handleSubmit} className="space-y-2 bg-gray-100 p-4 rounded mb-4">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="p-2 border w-full" />
        <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} className="p-2 border w-full" />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="p-2 border w-full" />
        <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="p-2 border w-full" />
        <input name="region" placeholder="Region" value={form.region} onChange={handleChange} className="p-2 border w-full" />
        <input name="tcode" placeholder="Territory Code" value={form.tcode} onChange={handleChange} className="p-2 border w-full" />
        <input name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} className="p-2 border w-full" />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="p-2 border w-full" />
        <input name="reportingCH" placeholder="Reporting CH" value={form.reportingCH} onChange={handleChange} className="p-2 border w-full" />
        <input name="reportingBH" placeholder="Reporting BH" value={form.reportingBH} onChange={handleChange} className="p-2 border w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingUser ? 'Update' : 'Add'} User</button>
      </form>

      <table className="w-full table-auto border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Mobile</th>
            <th className="border p-2">City</th>
            <th className="border p-2">State</th>
            <th className="border p-2">Region</th>
            <th className="border p-2">T Code</th>
            <th className="border p-2">Designation</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">CH</th>
            <th className="border p-2">BH</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.mobile}</td>
              <td className="border p-2">{u.city}</td>
              <td className="border p-2">{u.state}</td>
              <td className="border p-2">{u.region}</td>
              <td className="border p-2">{u.tcode}</td>
              <td className="border p-2">{u.designation}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.reportingCH}</td>
              <td className="border p-2">{u.reportingBH}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(u)} className="text-blue-600 mr-2">Edit</button>
                <button onClick={() => handleDelete(u.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-lg font-semibold mb-2">Audit Trail</h2>
      <ul className="text-sm bg-gray-100 p-4 rounded max-h-60 overflow-y-auto">
        {auditTrail.map((entry, idx) => (
          <li key={idx} className="mb-1">
            [{entry.timestamp}] <strong>{entry.field}</strong> changed from <em>{entry.oldValue}</em> to <em>{entry.newValue}</em> by <strong>{entry.editedBy}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
