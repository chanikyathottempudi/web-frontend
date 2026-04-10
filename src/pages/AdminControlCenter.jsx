import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Divider,
  Stack
} from '@mui/material';
import { 
  ArrowBack,
  Group,
  Security,
  SettingsInputComponent,
  History,
  Assessment,
  Settings
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminControlCenter = () => {
  const navigate = useNavigate();

  const adminOptions = [
    { 
      title: 'User Management', 
      desc: 'Manage roles, permissions, and staff credentials', 
      icon: <Group />,
      color: '#2563eb',
      onClick: () => navigate('/user-management')
    },
    { 
      title: 'Security & Privacy', 
      desc: 'Encryption protocols, HIPAA compliance, & audits', 
      icon: <Security />,
      color: '#dc2626',
      onClick: () => {}
    },
    { 
      title: 'Machine Integration', 
      desc: 'Connect and calibrate CT scanners and PACS', 
      icon: <SettingsInputComponent />,
      color: '#059669',
      onClick: () => {}
    },
    { 
      title: 'System Logs', 
      desc: 'Real-time debugging and operation history', 
      icon: <History />,
      color: '#4f46e5',
      onClick: () => navigate('/system-logs')
    },
    { 
      title: 'Compliance Reports', 
      desc: 'Generate regulatory dose summaries and PDFs', 
      icon: <Assessment />,
      color: '#d97706',
      onClick: () => {}
    }
  ];

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', pb: 8, px: 2 }}>
      {/* Header */}
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', mb: 6 }}>
        <IconButton onClick={() => navigate('/dashboard')} sx={{ color: '#0f172a' }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ 
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontWeight: 900, 
          color: '#0f172a',
          fontSize: '1.25rem'
        }}>
          Admin Control Center
        </Typography>
      </Box>

      {/* Configuration Header */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ 
          fontWeight: 900, 
          color: '#2563eb', 
          display: 'block', 
          mb: 1, 
          textTransform: 'uppercase', 
          letterSpacing: 1 
        }}>
          Configuration Setup
        </Typography>
        <Divider sx={{ bgcolor: '#2563eb', height: 2, opacity: 0.1 }} />
      </Box>

      {/* Admin Options as Large Cards */}
      <Stack spacing={2}>
        {adminOptions.map((option, index) => (
          <Paper 
            key={index}
            onClick={option.onClick}
            sx={{ 
                p: 3, 
                borderRadius: '20px', 
                bgcolor: 'rgba(255,255,255,0.4)',
                border: '1px solid rgba(226, 232, 240, 0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': { transform: 'scale(1.02)', bgcolor: 'white', borderColor: '#2563eb' } 
            }}
          >
            <Box sx={{ 
                width: 52, 
                height: 52, 
                borderRadius: '16px', 
                bgcolor: `${option.color}10`, 
                color: option.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: `1px solid ${option.color}20`
            }}>
                {React.cloneElement(option.icon, { sx: { fontSize: 26 } })}
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a', mb: 0.5, fontSize: '1.05rem' }}>
                    {option.title}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b' }}>
                    {option.desc}
                </Typography>
            </Box>
          </Paper>
        ))}
      </Stack>
      
      <Box sx={{ mt: 4, px: 1 }}>
        <Typography variant="caption" sx={{ color: '#b4becb', fontWeight: 600 }}>
          Software Version: CT DOSE v2.4.0-Enterprise
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminControlCenter;
