
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const defaultUsers = [
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
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    name: '', mobile: '', city: '', state: '', region: '', tcode: '', designation: '',
    email: '', reportingCH: '', reportingBH: ''
  });
  const [auditTrail, setAuditTrail] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || defaultUsers;
    setUsers(savedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      const editedFields = Object.keys(form).filter(k => form[k] !== editingUser[k]);
      const newAudit = editedFields.map(field => ({
        field,
        oldValue: editingUser[field],
        newValue: form[field],
        editedBy: 'Admin',
        timestamp: new Date().toLocaleString(),
        userId: editingUser.id
      }));
      setAuditTrail([...auditTrail, ...newAudit]);
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

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, 'UserList.xlsx');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-800">
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-white p-4 rounded shadow mb-6">
        {['name', 'mobile', 'city', 'state', 'region', 'tcode', 'designation', 'email', 'reportingCH', 'reportingBH'].map(field => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        ))}
        <button type="submit" className="col-span-2 bg-[#034ea2] text-white py-2 px-4 rounded hover:bg-gray-600">
          {editingUser ? 'Update' : 'Add'} User
        </button>
      </form>

      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">User List</h2>
        <button onClick={exportToExcel} className="bg-[#034ea2] text-white px-4 py-2 rounded hover:bg-[#034da296]">Export to Excel</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-[#eaf3fc]">
            <tr>
              {['Name', 'Mobile', 'City', 'State', 'Region', 'T Code', 'Designation', 'Email', 'CH', 'BH', 'Actions'].map(h => (
                <th key={h} className="border p-2 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="bg-white border-t">
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
      </div>

      <h2 className="mt-8 text-lg font-semibold">Audit Trail</h2>
      <div className="bg-white p-4 mt-2 rounded shadow max-h-60 overflow-y-auto text-sm">
        {auditTrail.length === 0 ? (
          <p>No edits recorded yet.</p>
        ) : (
          <ul className="list-disc ml-4 space-y-1">
            {auditTrail.map((entry, idx) => (
              <li key={idx}>
                [{entry.timestamp}] <strong>{entry.field}</strong> changed from <em>{entry.oldValue}</em> to <em>{entry.newValue}</em> by <strong>{entry.editedBy}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
