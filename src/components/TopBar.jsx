import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Badge, 
  Avatar, 
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Stack
} from '@mui/material';
import { 
  Search, 
  KeyboardArrowDown,
  Person,
  Settings,
  Logout
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ title }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: 'Admin', role: 'Staff', initials: 'AD' });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const fullName = user.first_name || user.last_name 
        ? `${user.first_name} ${user.last_name}`.trim() 
        : (user.username === 'Admin999' || ['Hospital Admin', 'Administrator', 'Staff'].includes(user.role) ? 'Chanikya' : user.username);
      
      const shortName = fullName.split(' ')[0];
      const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

      setUserData({
        name: shortName,
        role: user.role || 'Staff',
        initials: initials || 'CH'
      });
    }
  }, []);

  return (
    <Box sx={{ 
      height: 80, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      px: 4, 
      bgcolor: 'rgba(255, 255, 255, 0.8)', 
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 1100,
      color: '#0f172a'
    }}>
      <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: -0.5 }}>
        {title || "Dashboard"}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <TextField
          placeholder="Search patients, alerts..."
          size="small"
          autoComplete="off"
          sx={{ 
            width: 380, 
            display: { xs: 'none', lg: 'block' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '16px',
              bgcolor: '#f1f5f9',
              color: '#0f172a',
              height: 44,
              border: '1px solid #e2e8f0',
              '& fieldset': { border: 'none' },
              '&:hover': { bgcolor: '#e2e8f0' },
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#94a3b8', fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          
          <Box 
            onClick={handleMenuOpen}
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5, 
                ml: 1, 
                pl: 2, 
                borderLeft: '1px solid #e2e8f0', 
                cursor: 'pointer', 
                '&:hover': { opacity: 0.8 } 
            }}
          >
            <Avatar sx={{ 
                width: 38, 
                height: 38, 
                bgcolor: 'rgba(37, 99, 235, 0.1)', 
                color: '#2563eb', 
                fontSize: '0.875rem', 
                fontWeight: 800,
                border: '1px solid rgba(37, 99, 235, 0.2)'
            }}>
              {userData.initials}
            </Avatar>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', lineHeight: 1, fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>
                {userData.role}
              </Typography>
              <Typography variant="body2" sx={{ color: '#0f172a', fontWeight: 800 }}>
                {userData.name}
              </Typography>
            </Box>
            <KeyboardArrowDown sx={{ color: '#94a3b8', fontSize: 20 }} />
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: { 
                  mt: 1.5, 
                  borderRadius: '16px', 
                  bgcolor: 'white',
                  color: '#0f172a',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)', 
                  minWidth: 200, 
                  border: '1px solid #e2e8f0',
                  p: 1
              }
            }}
          >
            <MenuItem onClick={handleMenuClose} sx={{ gap: 1.5, py: 1.2, borderRadius: '12px', '&:hover': { bgcolor: '#f1f5f9' } }}>
              <ListItemIcon sx={{ minWidth: 'auto !important', color: '#64748b' }}><Person fontSize="small" /></ListItemIcon>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>My Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ gap: 1.5, py: 1.2, borderRadius: '12px', '&:hover': { bgcolor: '#f1f5f9' } }}>
              <ListItemIcon sx={{ minWidth: 'auto !important', color: '#64748b' }}><Settings fontSize="small" /></ListItemIcon>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>Settings</Typography>
            </MenuItem>
            <Divider sx={{ my: 1, opacity: 0.5 }} />
            <MenuItem onClick={handleLogout} sx={{ gap: 1.5, py: 1.2, borderRadius: '12px', color: '#e11d48', '&:hover': { bgcolor: '#fff1f2' } }}>
              <ListItemIcon sx={{ minWidth: 'auto !important', color: 'inherit' }}><Logout fontSize="small" /></ListItemIcon>
              <Typography variant="body2" sx={{ fontWeight: 800 }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default TopBar;
