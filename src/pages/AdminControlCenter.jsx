import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider,
  Grid
} from '@mui/material';
import { 
  Security as SecurityIcon,
  Devices,
  ListAlt,
  Assessment,
  Group,
  SettingsSuggest
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminControlCenter = () => {
  const navigate = useNavigate();

  const adminOptions = [
    { 
      title: 'User Management', 
      desc: 'Manage roles, permissions, and staff credentials', 
      icon: <Group sx={{ fontSize: 32 }} />,
      color: '#0066ff',
      onClick: () => navigate('/user-management')
    },
    { 
      title: 'Security & Privacy', 
      desc: 'Encryption protocols, HIPAA compliance, & audits', 
      icon: <SecurityIcon sx={{ fontSize: 32 }} />,
      color: '#e53e3e',
      onClick: () => {}
    },
    { 
      title: 'Machine Integration', 
      desc: 'Connect and calibrate CT scanners and PACS', 
      icon: <Devices sx={{ fontSize: 32 }} />,
      color: '#38a169',
      onClick: () => {}
    },
    { 
      title: 'System Logs', 
      desc: 'Real-time debugging and operation history', 
      icon: <ListAlt sx={{ fontSize: 32 }} />,
      color: '#7c4dff',
      onClick: () => navigate('/system-logs')
    },
    { 
      title: 'Compliance Reports', 
      desc: 'Generate regulatory dose summaries and PDFs', 
      icon: <Assessment sx={{ fontSize: 32 }} />,
      color: '#ecc94b',
      onClick: () => {}
    }
  ];

  return (
    <Box sx={{ pb: 8 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#edf2f7', color: '#4a5568' }}>
          <SettingsSuggest fontSize="large" />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a202c', mb: 0.5 }}>Admin Control Center</Typography>
          <Typography variant="body1" sx={{ color: '#a0aec0', fontWeight: 600 }}>Configure system security, users, and clinical integrations</Typography>
        </Box>
      </Box>

      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#4a5568', mb: 3, textTransform: 'uppercase', letterSpacing: 1 }}>
        Configuration Modules
      </Typography>

      <Grid container spacing={3}>
        {adminOptions.map((option, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Paper 
              onClick={option.onClick}
              sx={{ 
                p: 3, 
                borderRadius: '24px', 
                cursor: 'pointer',
                transition: 'all 0.2s',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }
              }}
            >
              <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: `${option.color}15`, color: option.color, alignSelf: 'flex-start' }}>
                {option.icon}
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a202c', mb: 1 }}>{option.title}</Typography>
                <Typography variant="body2" sx={{ color: '#718096', lineHeight: 1.6 }}>{option.desc}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminControlCenter;
