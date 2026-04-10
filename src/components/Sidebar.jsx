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
  People,
  Notifications,
  Psychology,
  Logout,
  LocalHospital,
  Timeline,
  PersonAdd,
  NotificationsActive,
  TrendingUp
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
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', category: 'MAIN NAVIGATION' },
    { text: 'Patients', icon: <People />, path: '/patients', category: 'MAIN NAVIGATION' },
    { text: 'Scans', icon: <MonitorHeart />, path: '/real-time', category: 'MAIN NAVIGATION' },
    { text: 'Alerts', icon: <NotificationsActive />, path: '/system-logs', category: 'MAIN NAVIGATION' },
    { text: 'Admin', icon: <LocalHospital />, path: '/admin', category: 'MAIN NAVIGATION' },
    { text: 'AI Analytics', icon: <Psychology />, path: '/ai-risk', category: 'MAIN NAVIGATION' },
  ];

  const categories = ['MAIN NAVIGATION'];

  return (
    <Box sx={{ 
      width: 260, 
      height: '100vh', 
      bgcolor: 'rgba(255, 255, 255, 0.95)', 
      backdropFilter: 'blur(24px)',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      zIndex: 1200,
      color: '#1e293b',
      boxShadow: '10px 0 30px rgba(0,0,0,0.02)'
    }}>
      <Box 
        onClick={() => navigate('/dashboard')}
        sx={{ p: 3, mb: 1, display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}
      >
        <Box sx={{ 
          p: 1, 
          borderRadius: '12px', 
          bgcolor: 'rgba(37, 99, 235, 0.08)',
          border: '1px solid rgba(37, 99, 235, 0.1)'
        }}>
          <MonitorHeart sx={{ color: '#2563eb', fontSize: 24 }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: -0.5 }}>
          CT DOSE
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2 }}>
        {categories.map((cat) => (
          <Box key={cat} sx={{ mb: 3 }}>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, ml: 2, mb: 1.5, display: 'block', letterSpacing: 1.5 }}>
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
                      borderRadius: '16px',
                      mb: 0.75,
                      py: 1.25,
                      px: 2,
                      bgcolor: isActive ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                      color: isActive ? '#2563eb' : '#64748b',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.02)', color: '#0f172a' },
                      transition: 'all 0.3s ease',
                      border: isActive ? '1px solid rgba(37, 99, 235, 0.1)' : '1px solid transparent'
                    }}
                  >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 38 }}>
                      {React.cloneElement(item.icon, { sx: { fontSize: 22 } })}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: isActive ? 700 : 600 }} 
                    />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>

      <Box sx={{ p: 2, mt: 'auto' }}>
        <Box sx={{ 
          p: 2, 
          borderRadius: '20px', 
          bgcolor: '#f8fafc', 
          border: '1px solid #e2e8f0',
          mb: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Avatar sx={{ 
              width: 38, 
              height: 38, 
              bgcolor: 'rgba(37, 99, 235, 0.1)', 
              color: '#2563eb', 
              fontWeight: 800, 
              fontSize: '0.8rem',
              border: '1px solid rgba(37, 99, 235, 0.2)'
            }}>
              {userData.initials}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a', fontSize: '0.8rem', lineHeight: 1.2 }}>
                {userData.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>
                {userData.role}
              </Typography>
            </Box>
          </Box>
          <Button 
            fullWidth 
            startIcon={<Logout />} 
            onClick={handleLogout}
            sx={{ 
              color: '#64748b', 
              justifyContent: 'center', 
              textTransform: 'none',
              fontSize: '0.75rem',
              fontWeight: 800,
              bgcolor: '#ffffff',
              borderRadius: '12px',
              py: 1,
              '&:hover': { bgcolor: '#fff1f2', color: '#e11d48' }
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
