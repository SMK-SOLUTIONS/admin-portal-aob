
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import LoginPage from './LoginPage';
import Home from './Home';
import UserManagement from './UserManagement';
import Rbac from './RBAC';
import ApplicationAccess from './ApplicationAccess';
import SummaryReport from './SummaryReport';
import DetailedApplicationReport from './DetailedApplicationReport';
import StampPaperReport from './StampPaperReport';
import CHDashboard from './CHDashboard';
import BHDashboard from './BHDashboard';
import './LayoutScroll.css';

function App() {
  const [user, setUser] = useState(null);
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
    <div className="flex layout-container">
      <div className="sidebar-scroll">
        <Sidebar onLogout={handleLogout} />
      </div>
      <div className="flex-1 p-4 bg-gray-50 min-h-screen main-scroll">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/rbac" element={<Rbac />} />
          <Route path="/applications" element={<ApplicationAccess />} />
          <Route path="/summary-report" element={<SummaryReport />} />
          <Route path="/detailed-report" element={<DetailedApplicationReport />} />
          <Route path="/stamp-report" element={<StampPaperReport />} />
          <Route path="/ch-dashboard" element={<CHDashboard />} />
          <Route path="/bh-dashboard" element={<BHDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
