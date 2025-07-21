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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    audit: [
      {
        field: 'email',
        oldValue: 'john@old.com',
        newValue: 'john@example.com',
        editedBy: 'admin',
        timestamp: '2025-07-21 10:12 AM'
      }
    ]
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
      const original = users.find(u => u.id === selectedId);
      const changes = Object.keys(form).reduce((acc, key) => {
        if (form[key] !== original[key]) {
          acc.push({
            field: key,
            oldValue: original[key],
            newValue: form[key],
            editedBy: 'admin',
            timestamp: new Date().toLocaleString(),
          });
        }
        return acc;
      }, []);

      setUsers(users.map(u =>
        u.id === selectedId
          ? { ...form, id: selectedId, audit: [...(u.audit || []), ...changes] }
          : u
      ));
    } else {
      setUsers([...users, { ...form, id: Date.now(), audit: [] }]);
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
      <Typography variant="h5" mb={3}>
        User Management
      </Typography>
      <Button variant="contained" sx={{ mb: 2, mr: 2, bgcolor: '#034ea2' }} onClick={() => handleOpen()}>Add User</Button>
      <Button variant="outlined" sx={{ mb: 2, color: '#034ea2', borderColor: '#034ea2'  }} onClick={exportToExcel}>Export to Excel</Button>
      <Paper style={{ height: 500 }}>
        <DataGrid rows={users} columns={columns} pageSize={10} getRowHeight={() => 'auto'} />
      </Paper>

      <Box mt={4}>
        <Typography variant="h6" mb={1}>Audit Trail</Typography>
        {users.map(user => (
          <Accordion key={user.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{user.name} ({user.designation})</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {(user.audit || []).length === 0 ? (
                <Typography variant="body2">No edits recorded.</Typography>
              ) : (
                <ul>
                  {user.audit.map((a, idx) => (
                    <li key={idx}>
                      <strong>{a.field}:</strong> "{a.oldValue}" → "{a.newValue}" by {a.editedBy} on {a.timestamp}
                    </li>
                  ))}
                </ul>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

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
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
