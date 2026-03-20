import React, { useState, useEffect } from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  Divider,
  Avatar,
  Button
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  MonitorHeart,
  Analytics,
  People,
  Notifications,
  Psychology,
  Logout,
  LocalHospital,
  Timeline,
  History,
  PersonAdd,
  NotificationsActive
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({ name: 'Administrator', role: 'Staff', initials: 'AD' });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const fullName = user.first_name || user.last_name 
        ? `${user.first_name} ${user.last_name}`.trim() 
        : (user.username === 'Admin999' || ['Hospital Admin', 'Administrator', 'Staff'].includes(user.role) ? 'Chanikya' : user.username);
      
      const initials = fullName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

      setUserData({
        name: fullName,
        role: user.role || 'Administrator',
        initials: initials || 'CH'
      });
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', category: 'MAIN' },
    { text: 'Live Monitor', icon: <MonitorHeart />, path: '/real-time', category: 'MAIN' },
    { text: 'ICU Monitoring', icon: <LocalHospital />, path: '/dose-stats', category: 'MAIN' },
    { text: 'Analytics', icon: <Timeline />, path: '/ai-risk', category: 'MAIN' },
    
    { text: 'Patient List', icon: <People />, path: '/patients', category: 'PATIENTS' },
    { text: 'Patient Summary', icon: <History />, path: '/patient/1', category: 'PATIENTS' },
    { text: 'Add Patient', icon: <PersonAdd />, path: '/register-patient', category: 'PATIENTS' },
    
    { text: 'Alerts Overview', icon: <Notifications />, path: '/system-logs', category: 'ALERTS' },
    { text: 'Active Alerts', icon: <NotificationsActive />, path: '/system-logs', category: 'ALERTS' },
    { text: 'Notifications', icon: <Notifications />, path: '/system-logs', category: 'ALERTS' },
    
    { text: 'AI Assistant', icon: <Psychology />, path: '/detect-anomalies', category: 'AI FEATURES' },
  ];

  const categories = ['MAIN', 'PATIENTS', 'ALERTS', 'AI FEATURES'];

  return (
    <Box sx={{ 
      width: 260, 
      height: '100vh', 
      bgcolor: 'white', 
      borderRight: '1px solid #edf2f7',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      zIndex: 1200
    }}>
      <Box 
        onClick={() => navigate('/dashboard')}
        sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
      >
        <MonitorHeart sx={{ color: '#0066ff', fontSize: 28 }} />
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a202c', letterSpacing: -0.5, fontSize: '1.25rem' }}>
          VentGuard
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2, mt: 1 }}>
        {categories.map((cat) => (
          <Box key={cat} sx={{ mb: 3 }}>
            <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700, ml: 2, mb: 1, display: 'block', letterSpacing: 1 }}>
              {cat}
            </Typography>
            <List disablePadding>
              {menuItems.filter(item => item.category === cat).map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <ListItem 
                    button 
                    key={item.text}
                    onClick={() => navigate(item.path)}
                    sx={{ 
                      borderRadius: '12px',
                      mb: 0.5,
                      bgcolor: isActive ? '#f0f7ff' : 'transparent',
                      color: isActive ? '#0066ff' : '#4a5568',
                      '&:hover': { bgcolor: '#f7fafc' },
                      transition: 'all 0.2s'
                    }}
                  >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 38 }}>
                      {React.cloneElement(item.icon, { sx: { fontSize: 22 } })}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: isActive ? 600 : 500 }} 
                    />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>

      <Divider sx={{ mx: 2, opacity: 0.6 }} />

      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: '#ebf4ff', color: '#3182ce', fontWeight: 'bold', fontSize: '0.875rem' }}>
            {userData.initials}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a202c', fontSize: '0.875rem', lineHeight: 1.2 }}>
              {userData.role}
            </Typography>
            <Typography variant="caption" sx={{ color: '#718096', fontWeight: 600 }}>
              {userData.name}
            </Typography>
          </Box>
        </Box>
        <Button 
          fullWidth 
          startIcon={<Logout />} 
          variant="text" 
          sx={{ 
            color: '#4a5568', 
            justifyContent: 'flex-start', 
            textTransform: 'none',
            fontSize: '0.875rem',
            fontWeight: 600,
            '&:hover': { bgcolor: '#fff5f5', color: '#e53e3e' }
          }}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
