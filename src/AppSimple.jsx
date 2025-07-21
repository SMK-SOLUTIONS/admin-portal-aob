
import { Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  const isLoggedIn = false; // Replace with auth logic if needed

  if (!isLoggedIn) return <LoginPage />;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
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
      </div>
    </div>
  );
}

export default App;
