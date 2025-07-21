import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar({ onLogout, isOpen, setIsOpen }) {
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/users', label: 'User Management' },
    { path: '/rbac', label: 'RBAC' },
    { path: '/applications', label: 'Applications' },
    { path: '/summary-report', label: 'Summary Report' },
    { path: '/detailed-report', label: 'Detailed Report' },
    { path: '/stamp-report', label: 'Stamp Report' },
    { path: '/ch-dashboard', label: 'CH Dashboard' },
    { path: '/bh-dashboard', label: 'BH Dashboard' },
  ];

  return (
    <>
      {!isOpen && (
        <IconButton
          onClick={toggleDrawer}
          sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300, color: 'white', bgcolor: '#034ea2', '&:hover': { bgcolor: '#eaf3fc' } }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Box component="nav">
        <Drawer
          variant="persistent"
          anchor="left"
          open={isOpen}
          PaperProps={{ sx: { width: 240, bgcolor: '#034ea2', color: 'white' } }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', bgcolor: '#034ea2' }}>
            <Typography variant="h6" noWrap component="div">
              Admin Portal
            </Typography>
            <IconButton onClick={toggleDrawer} sx={{ color: 'white' }}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Divider sx={{ borderColor: 'white', opacity: 0.2 }} />
          <List>
            {navItems.map(({ path, label }) => (
              <ListItem
                button
                key={label}
                component={NavLink}
                to={path}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? '#eaf3fc' : 'transparent',
                  color: isActive ? '#034ea2' : 'white',
                  textDecoration: 'none',
                })}
                sx={{ pl: 2 }}
              >
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 'auto', p: 2 }}>
            <IconButton
              onClick={onLogout}
              sx={{ color: 'white', width: '100%', borderRadius: '2px' }}
            >
              <LogoutIcon sx={{ mr: 1 }} /> Logout
            </IconButton>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

Sidebar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Sidebar;
