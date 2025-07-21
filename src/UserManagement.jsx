import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Paper,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';

const initialUsers = [
  {
    id: 1,
    name: 'John Doe',
    mobile: '9876543210',
    city: 'Mumbai',
    state: 'MH',
    region: 'West',
    tcode: 'T123',
    designation: 'CH',
    email: 'john@example.com',
    ch: 'CH Name',
    bh: 'BH Name',
  },
];

const designations = ['BDE', 'TDM', 'CH', 'BH', 'Legal', 'Channel', 'Admin', 'Finance', 'Regional Marketing Manager', 'Super Admin'];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  const handleOpen = (user = {}) => {
    setForm(user);
    setSelectedId(user.id || null);
    setOpen(true);
  };

  const handleClose = () => {
    setForm({});
    setSelectedId(null);
    setOpen(false);
  };

  const handleSave = () => {
    if (selectedId) {
      setUsers(users.map(u => (u.id === selectedId ? { ...form, id: selectedId } : u)));
    } else {
      setUsers([...users, { ...form, id: Date.now() }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'user-management.xlsx');
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'mobile', headerName: 'Mobile', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    { field: 'region', headerName: 'Region', flex: 1 },
    { field: 'tcode', headerName: 'T Code', flex: 1 },
    { field: 'designation', headerName: 'Designation', flex: 1 },
    { field: 'email', headerName: 'Email ID', flex: 1 },
    { field: 'ch', headerName: 'Reporting CH', flex: 1 },
    { field: 'bh', headerName: 'Reporting BH', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <>
          <Button size="small" onClick={() => handleOpen(params.row)}>Edit</Button>
          <Button size="small" color="error" onClick={() => handleDelete(params.row.id)}>Delete</Button>
        </>
      ),
      flex: 1
    }
  ];

  return (
    <Box p={2}>
      <Typography variant="h6" mb={2}>User Management</Typography>
      <Button variant="contained" sx={{ mb: 2, mr: 2, bgcolor: '#034ea2' }} onClick={() => handleOpen()}>Add User</Button>
      <Button variant="outlined" sx={{ mb: 2, color: '#034ea2', borderColor: '#034ea2' }} onClick={exportToExcel}>Export to Excel</Button>
      <Paper style={{ height: 500 }}>
        <DataGrid rows={users} columns={columns} pageSize={10} />
      </Paper>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{selectedId ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          {['name', 'mobile', 'city', 'state', 'region', 'tcode', 'email', 'ch', 'bh'].map((field) => (
            <TextField
              key={field}
              margin="dense"
              label={field.toUpperCase()}
              fullWidth
              value={form[field] || ''}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          ))}
          <TextField
            margin="dense"
            select
            label="Designation"
            fullWidth
            value={form.designation || ''}
            onChange={(e) => setForm({ ...form, designation: e.target.value })}
          >
            {designations.map((d) => (
              <MenuItem key={d} value={d}>{d}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#034ea2', borderColor: '#034ea2' }}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: '#034ea2' }} onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
