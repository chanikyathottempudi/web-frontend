import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText,
  Button,
  Chip,
  IconButton
} from '@mui/material';
import { 
  PersonAdd,
  MoreVert,
  BadgeOutlined,
  AdminPanelSettings
} from '@mui/icons-material';

const UserManagement = () => {
  const users = [
    { name: 'Dr. Aris Thorne', role: 'Senior Radiologist', id: 'RAD-204', status: 'Active', color: '#38a169' },
    { name: 'Sarah Jenkins', role: 'Lead Technician', id: 'TEC-882', status: 'Active', color: '#38a169' },
    { name: 'Marcus Vane', role: 'CT Technician', id: 'TEC-104', status: 'Away', color: '#ecc94b' }
  ];

  return (
    <Box sx={{ pb: 8 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Box sx={{ p: 1, borderRadius: '8px', bgcolor: '#ebf4ff', color: '#3182ce', display: 'flex' }}>
              <AdminPanelSettings fontSize="small" />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a202c' }}>User Management</Typography>
          </Box>
          <Typography variant="body1" sx={{ color: '#a0aec0', fontWeight: 600 }}>Manage clinical staff access and role permissions</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<PersonAdd />}
          sx={{ bgcolor: '#0066ff', borderRadius: '12px', px: 3, py: 1.2, fontWeight: 800 }}
        >
          Add Staff
        </Button>
      </Box>

      <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {users.map((user, index) => (
          <Paper 
            key={index}
            sx={{ 
              borderRadius: '24px', 
              overflow: 'hidden',
              transition: 'all 0.2s',
              '&:hover': { transform: 'scale(1.01)', boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }
            }}
          >
            <ListItem sx={{ p: 3 }}>
              <ListItemAvatar>
                <Avatar sx={{ width: 64, height: 64, bgcolor: '#f7fafc', color: '#4a5568', mr: 2, border: '1px solid #edf2f7' }}>
                  {user.name.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a202c' }}>{user.name}</Typography>
                    <Chip 
                      label={user.status} 
                      size="small" 
                      sx={{ bgcolor: `${user.color}15`, color: user.color, fontWeight: 800, fontSize: '0.6rem' }} 
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ color: '#718096', fontWeight: 600 }}>{user.role}</Typography>
                    <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700 }}>• ID: {user.id}</Typography>
                  </Box>
                }
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton sx={{ bgcolor: '#f7fafc' }}>
                  <BadgeOutlined fontSize="small" />
                </IconButton>
                <IconButton sx={{ bgcolor: '#f7fafc' }}>
                  <MoreVert fontSize="small" />
                </IconButton>
              </Box>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default UserManagement;
