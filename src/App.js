import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import PatientSummary from './pages/PatientSummary';
import PatientRegister from './pages/PatientRegister';
import RealTimeMonitor from './pages/RealTimeMonitor';
import DoseStatistics from './pages/DoseStatistics';
import DoseStatisticsPatientDetails from './pages/DoseStatisticsPatientDetails';
import AdminControlCenter from './pages/AdminControlCenter';
import UserManagement from './pages/UserManagement';
import AiRiskScore from './pages/AiRiskScore';
import SystemLogs from './pages/SystemLogs';
import ForgotPassword from './pages/ForgotPassword';
import PredictDose from './pages/PredictDose';
import DetectAnomalies from './pages/DetectAnomalies';
import DailyDoseTrend from './pages/DailyDoseTrend';
import MonthlyDoseTrend from './pages/MonthlyDoseTrend';
import Layout from './components/Layout';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0066ff' },
    secondary: { main: '#00ccff' },
    background: {
      default: '#f0f2f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
          border: '1px solid #edf2f7',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Dashboard and other pages wrapped in Layout */}
          <Route path="/dashboard" element={<Layout title="Dashboard"><Dashboard /></Layout>} />
          <Route path="/patients" element={<Layout title="Patient List"><PatientList /></Layout>} />
          <Route path="/patient/:id" element={<Layout title="Patient Summary"><PatientSummary /></Layout>} />
          <Route path="/register-patient" element={<Layout title="Add Patient"><PatientRegister /></Layout>} />
          <Route path="/real-time" element={<Layout title="Live Monitor"><RealTimeMonitor /></Layout>} />
          <Route path="/dose-stats" element={<Layout title="Dose Statistics"><DoseStatistics /></Layout>} />
          <Route path="/dose-stats-patient/:id" element={<Layout title="Patient Dose Details"><DoseStatisticsPatientDetails /></Layout>} />
          <Route path="/admin" element={<Layout title="Admin Control Center"><AdminControlCenter /></Layout>} />
          <Route path="/user-management" element={<Layout title="User Management"><UserManagement /></Layout>} />
          <Route path="/system-logs" element={<Layout title="System Logs"><SystemLogs /></Layout>} />
          <Route path="/predict-dose" element={<Layout title="Dose Prediction"><PredictDose /></Layout>} />
          <Route path="/detect-anomalies" element={<Layout title="Anomaly Detection"><DetectAnomalies /></Layout>} />
          <Route path="/ai-risk" element={<Layout title="AI Risk Score"><AiRiskScore /></Layout>} />
          <Route path="/daily-dose-trend" element={<Layout title="Daily Dose Trend"><DailyDoseTrend /></Layout>} />
          <Route path="/monthly-dose-trend" element={<Layout title="Monthly Dose Trend"><MonthlyDoseTrend /></Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
