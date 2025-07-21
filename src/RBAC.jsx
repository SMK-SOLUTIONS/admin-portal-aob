import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { useState } from 'react';

const roles = [
  'BDE', 'TDM', 'CH', 'BH', 'Legal', 'Channel',
  'Admin', 'Finance', 'Regional Marketing Manager', 'Super Admin'
];

const permissions = [
  'View Users', 'Edit Users', 'Delete Users',
  'View Reports', 'Edit Applications'
];

const initialAssignments = [
  { role: 'CH', permissions: ['View Users', 'Edit Users', 'View Reports'] },
  { role: 'BH', permissions: ['View Users', 'View Reports'] }
];

const RBAC = () => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedPerms, setSelectedPerms] = useState([]);

  const handleTogglePermission = (perm) => {
    setSelectedPerms((prev) =>
      prev.includes(perm)
        ? prev.filter((p) => p !== perm)
        : [...prev, perm]
    );
  };

  const handleAssign = () => {
    if (!selectedRole) return;
    const updated = [
      ...assignments.filter((a) => a.role !== selectedRole),
      { role: selectedRole, permissions: selectedPerms },
    ];
    setAssignments(updated);
    setSelectedRole('');
    setSelectedPerms([]);
  };

  return (
    <Box p={4}>
      <Typography variant="h5" mb={3}>
        Role-Based Access Control (RBAC)
      </Typography>

      <Box mb={3}>
        <FormControl fullWidth sx={{ maxWidth: 300 }}>
          <InputLabel>Select Role</InputLabel>
          <Select
            value={selectedRole}
            label="Select Role"
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <MenuItem value="">-- Select Role --</MenuItem>
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mb={3}>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          Assign Permissions
        </Typography>
        <FormGroup>
          {permissions.map((perm) => (
            <FormControlLabel
              key={perm}
              control={
                <Checkbox
                  checked={selectedPerms.includes(perm)}
                  onChange={() => handleTogglePermission(perm)}
                />
              }
              label={perm}
            />
          ))}
        </FormGroup>
      </Box>

      <Button
        variant="contained"
        sx={{ backgroundColor: '#034ea2', mb: 4 }}
        onClick={handleAssign}
      >
        Assign Permissions
      </Button>

      <Typography variant="h6" mb={2}>
        Current Role Assignments
      </Typography>

      <Paper>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#eaf3fc' }}>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Permissions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map(({ role, permissions }) => (
              <TableRow key={role}>
                <TableCell>{role}</TableCell>
                <TableCell>{permissions.join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default RBAC;
