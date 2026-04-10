import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Stack, 
  Avatar, 
  Button,
  IconButton,
  CircularProgress,
  Tooltip
} from '@mui/material';
import { 
  TrendingUp, 
  NotificationsActive, 
  CheckCircle, 
  ArrowForward,
  InfoOutlined,
  CalendarMonth,
  Analytics,
  People
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalScans: 120,
    activeAlerts: 5,
    complianceScore: 75,
  });

  const navigationItems = [
    { title: 'Patients', icon: <People />, path: '/patients' },
    { title: 'Real-Time Monitor', icon: <Analytics />, path: '/real-time' },
    { title: 'Dose Statistics', icon: <Analytics />, path: '/dose-stats' },
    { title: 'Daily Dose Trend', icon: <Analytics />, path: '/daily-dose-trend' },
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', pb: 10 }}>
      {/* Android Style Header */}
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', mb: 4, px: 2 }}>
        <Avatar 
          src="/api/placeholder/40/40" 
          sx={{ width: 36, height: 36, border: '1px solid #e2e8f0' }} 
        />
        <Typography variant="h6" sx={{ 
          position: 'absolute', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          fontWeight: 900, 
          color: '#0f172a' 
        }}>
          Dashboard
        </Typography>
      </Box>

      {/* Top Stats Cards (2 Columns) */}
      <Grid container spacing={2} sx={{ mb: 4, px: 1 }}>
        <Grid item xs={6}>
          <Paper className="glass-card" sx={{ p: 3, borderRadius: '16px' }}>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Total Scans Today</Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', mt: 1 }}>{stats.totalScans}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="glass-card" sx={{ p: 3, borderRadius: '16px', cursor: 'pointer' }} onClick={() => navigate('/system-logs')}>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' }}>Active Alerts</Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', mt: 1 }}>{stats.activeAlerts}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Safety Compliance Section */}
      <Box sx={{ px: 2, mb: 4 }}>
        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800, display: 'block', mb: 1 }}>Safety Compliance</Typography>
        <Box sx={{ width: '100%', height: 10, bgcolor: '#e2e8f0', borderRadius: '10px', overflow: 'hidden', mb: 1 }}>
            <Box sx={{ width: `${stats.complianceScore}%`, height: '100%', bgcolor: '#2563eb', transition: 'width 1s ease' }} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>Target: 100%</Typography>
            <Typography variant="caption" sx={{ color: '#2563eb', fontWeight: 900 }}>{stats.complianceScore}%</Typography>
        </Box>
      </Box>

      {/* Navigation Header */}
      <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a', mb: 2, px: 2 }}>Navigation</Typography>

      {/* Navigation Grid (2 Columns) */}
      <Grid container spacing={2} sx={{ mb: 4, px: 1 }}>
        {navigationItems.map((item, index) => (
          <Grid item xs={6} key={index}>
            <Paper 
                className="glass-card" 
                onClick={() => navigate(item.path)}
                sx={{ 
                    p: 3, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': { transform: 'translateY(-4px)', bgcolor: 'rgba(37, 99, 235, 0.02)' }
                }}
            >
              <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(37, 99, 235, 0.08)', color: '#2563eb', mb: 1 }}>
                {item.icon}
              </Box>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800, textAlign: 'center' }}>{item.title}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* AI Safety Intelligence Section */}
      <Paper sx={{ mx: 1, p: 3, borderRadius: '24px', bgcolor: '#f0f7ff', border: '1px solid #dbeafe', boxShadow: 'none' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Avatar sx={{ bgcolor: 'white', border: '1px solid #dbeafe' }}>
            <NotificationsActive sx={{ color: '#2563eb' }} />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a' }}>AI Safety Intelligence</Typography>
        </Box>
        
        <Stack spacing={1.5}>
          <Button 
            fullWidth 
            onClick={() => navigate('/ai-risk')}
            sx={{ 
              bgcolor: 'white', 
              color: '#0f172a', 
              py: 2, 
              borderRadius: '16px', 
              fontWeight: 800, 
              textTransform: 'none',
              border: '1px solid #e2e8f0',
              '&:hover': { bgcolor: '#f8fafc', border: '1px solid #2563eb' }
            }}
          >
            AI Risk Score
          </Button>
          <Button 
            fullWidth 
            onClick={() => navigate('/predict-dose')}
            sx={{ 
              bgcolor: 'white', 
              color: '#0f172a', 
              py: 2, 
              borderRadius: '16px', 
              fontWeight: 800, 
              textTransform: 'none',
              border: '1px solid #e2e8f0',
              '&:hover': { bgcolor: '#f8fafc', border: '1px solid #2563eb' }
            }}
          >
            Predict Dose
          </Button>
          <Button 
            fullWidth 
            onClick={() => navigate('/detect-anomalies')}
            sx={{ 
              bgcolor: 'white', 
              color: '#0f172a', 
              py: 2, 
              borderRadius: '16px', 
              fontWeight: 800, 
              textTransform: 'none',
              border: '1px solid #e2e8f0',
              '&:hover': { bgcolor: '#f8fafc', border: '1px solid #2563eb' }
            }}
          >
            Detect Anomalies
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Dashboard;
