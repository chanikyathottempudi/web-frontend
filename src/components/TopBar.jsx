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
  Divider
} from '@mui/material';
import { 
  Search, 
  NotificationsNone, 
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
      
      const initials = fullName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

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
      bgcolor: 'white',
      borderBottom: '1px solid #edf2f7',
      position: 'sticky',
      top: 0,
      zIndex: 1100
    }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a202c', letterSpacing: -0.5 }}>
        {title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <TextField
          placeholder="Search patients, alerts..."
          size="small"
          autoComplete="off"
          sx={{ 
            width: 400, 
            display: { xs: 'none', lg: 'block' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              bgcolor: '#f7fafc',
              height: 44,
              '& fieldset': { border: 'none' },
              '&:hover fieldset': { border: 'none' },
              '&.Mui-focused fieldset': { border: '1px solid #e2e8f0' },
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#a0aec0', fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton sx={{ color: '#4a5568', bgcolor: '#f7fafc', p: 1.2 }}>
            <Badge badgeContent={3} color="error" overlap="circular" sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem', minWidth: 16, height: 16 } }}>
              <NotificationsNone sx={{ fontSize: 24 }} />
            </Badge>
          </IconButton>
          
          <Box 
            onClick={handleMenuOpen}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 1, pl: 2, borderLeft: '1px solid #edf2f7', cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
          >
            <Avatar sx={{ width: 36, height: 36, bgcolor: '#ebf4ff', color: '#3182ce', fontSize: '0.875rem', fontWeight: 700 }}>
              {userData.initials}
            </Avatar>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography variant="caption" sx={{ color: '#a0aec0', display: 'block', lineHeight: 1 }}>
                {userData.role}
              </Typography>
              <Typography variant="caption" sx={{ color: '#1a202c', fontWeight: 600 }}>
                {userData.name}
              </Typography>
            </Box>
            <KeyboardArrowDown sx={{ color: '#a0aec0', fontSize: 20 }} />
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: { mt: 1.5, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', minWidth: 180, border: '1px solid #edf2f7' }
            }}
          >
            <MenuItem onClick={handleMenuClose} sx={{ gap: 1.5, py: 1.2 }}>
              <ListItemIcon sx={{ minWidth: 'auto !important' }}><Person fontSize="small" /></ListItemIcon>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>My Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ gap: 1.5, py: 1.2 }}>
              <ListItemIcon sx={{ minWidth: 'auto !important' }}><Settings fontSize="small" /></ListItemIcon>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>Settings</Typography>
            </MenuItem>
            <Divider sx={{ my: 1, opacity: 0.6 }} />
            <MenuItem onClick={handleLogout} sx={{ gap: 1.5, py: 1.2, color: '#e53e3e' }}>
              <ListItemIcon sx={{ minWidth: 'auto !important', color: 'inherit' }}><Logout fontSize="small" /></ListItemIcon>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default TopBar;
