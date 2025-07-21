import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import LoginPage from './LoginPage';
import Home from './Home';
import UserManagement from './UserManagement';
import RBAC from './RBAC';
import ApplicationAccess from './ApplicationAccess';
import SummaryReport from './SummaryReport';
import DetailedApplicationReport from './DetailedApplicationReport';
import StampPaperReport from './StampPaperReport';
import CHDashboard from './CHDashboard';
import BHDashboard from './BHDashboard';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
  }, []);

  const handleLogin = (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    navigate('/');
  };

  if (!user) return <LoginPage onLogin={handleLogin} />;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar onLogout={handleLogout} isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          bgcolor: 'background.default',
          minHeight: '100vh',
          marginLeft: isSidebarOpen ? '240px' : 0,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/rbac" element={<RBAC />} />
          <Route path="/applications" element={<ApplicationAccess />} />
          <Route path="/summary-report" element={<SummaryReport />} />
          <Route path="/detailed-report" element={<DetailedApplicationReport />} />
          <Route path="/stamp-report" element={<StampPaperReport />} />
          <Route path="/ch-dashboard" element={<CHDashboard />} />
          <Route path="/bh-dashboard" element={<BHDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
