import React from 'react';
import { 
  Paper, 
  BottomNavigation, 
  BottomNavigationAction, 
  Box 
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  People, 
  MonitorHeart, 
  NotificationsActive, 
  LocalHospital 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Map paths to index
  const getIndex = (path) => {
    switch (path) {
      case '/dashboard': return 0;
      case '/patients': return 1;
      case '/real-time': return 2;
      case '/system-logs': return 3;
      case '/admin': return 4;
      default: return 0;
    }
  };

  const value = getIndex(location.pathname);

  return (
    <Box sx={{ 
      display: { xs: 'block', md: 'none' }, // Only show on mobile
      position: 'fixed', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      zIndex: 1300 
    }}>
      <Paper elevation={3} sx={{ borderRadius: '20px 20px 0 0', overflow: 'hidden' }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            const paths = ['/dashboard', '/patients', '/real-time', '/system-logs', '/admin'];
            navigate(paths[newValue]);
          }}
          sx={{ 
            height: 70,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            '& .MuiBottomNavigationAction-root': {
              color: '#64748b',
              '&.Mui-selected': {
                color: '#2563eb',
              }
            },
            '& .MuiBottomNavigationAction-label': {
              fontWeight: 800,
              fontSize: '0.65rem',
              '&.Mui-selected': {
                fontSize: '0.75rem',
              }
            }
          }}
        >
          <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} />
          <BottomNavigationAction label="Patients" icon={<People />} />
          <BottomNavigationAction label="Scans" icon={<MonitorHeart />} />
          <BottomNavigationAction label="Alerts" icon={<NotificationsActive />} />
          <BottomNavigationAction label="Admin" icon={<LocalHospital />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNav;
