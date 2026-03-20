import React from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  Button
} from '@mui/material';
import {
  People,
  MonitorHeart,
  NotificationsActive,
  TrendingUp,
  Psychology,
  ArrowUpward,
  ArrowDownward,
  Timeline
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const kpis = [
    { title: 'Active Patients', value: '24', trend: '+2', trendType: 'up', icon: <People />, color: '#0066ff', path: '/patients' },
    { title: 'Active Vents', value: '18', trend: '-0', trendType: 'neutral', icon: <MonitorHeart />, color: '#00cc88', path: '/real-time' },
    { title: 'Active Alerts', value: '7', trend: '-3', trendType: 'down', icon: <NotificationsActive />, color: '#ff4d4d', path: '/system-logs' },
    { title: 'Staff Online', value: '12', trend: '', trendType: 'none', icon: <Psychology />, color: '#7c4dff', path: '/user-management' },
  ];

  const quickActions = [
    { title: 'Patients', icon: <People />, color: '#0066ff', path: '/patients' },
    { title: 'Monitor', icon: <MonitorHeart />, color: '#00cc88', path: '/real-time' },
    { title: 'Alerts', icon: <NotificationsActive />, color: '#ff4d4d', path: '/system-logs' },
    { title: 'Analytics', icon: <Timeline />, color: '#4a5568', path: '/dose-stats' },
    { title: 'AI Assistant', icon: <Psychology />, color: '#7c4dff', path: '/ai-risk' },
  ];

  const aiInsights = [
    { 
      title: 'Predictive Alerts', 
      value: '3 Events', 
      desc: 'Predicted in next 4h', 
      gradient: 'linear-gradient(135deg, #7c4dff, #0066ff)',
      flex: 1.5,
      path: '/predict-dose'
    },
    { 
      title: 'False Alarm Rate', 
      value: '57%', 
      desc: 'Reduced by AI', 
      gradient: 'linear-gradient(135deg, #3182ce, #4299e1)',
      flex: 1,
      path: '/detect-anomalies'
    },
    { 
      title: 'High Risk', 
      value: '4 Patients', 
      desc: 'Flagged for review', 
      gradient: 'linear-gradient(135deg, #3182ce, #0bc5ea)',
      flex: 2.5,
      path: '/ai-risk'
    },
  ];

  const recentAlerts = [
    { name: 'John Doe', location: 'ICU-04', issue: 'High Pressure', severity: 'Critical', time: '2m ago', color: '#e53e3e' },
    { name: 'Sarah Smith', location: 'ICU-02', issue: 'Low Tidal Volume', severity: 'Warning', time: '15m ago', color: '#ecc94b' },
    { name: 'Mike Johnson', location: 'ICU-08', issue: 'Disconnect', severity: 'Warning', time: '1h ago', color: '#ecc94b' },
  ];

  return (
    <Box>
      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {kpis.map((kpi, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Paper 
              onClick={() => navigate(kpi.path)}
              sx={{ 
                p: 2.5, 
                borderRadius: '16px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 1,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ p: 1, borderRadius: '12px', bgcolor: `${kpi.color}15`, color: kpi.color, display: 'flex' }}>
                  {React.cloneElement(kpi.icon, { sx: { fontSize: 24 } })}
                </Box>
                {kpi.trend !== '' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: kpi.trendType === 'up' ? '#38a169' : kpi.trendType === 'down' ? '#e53e3e' : '#718096' }}>
                    {kpi.trendType === 'up' ? <ArrowUpward sx={{ fontSize: 14 }} /> : kpi.trendType === 'down' ? <ArrowDownward sx={{ fontSize: 14 }} /> : null}
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>{kpi.trend}</Typography>
                  </Box>
                )}
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a202c' }}>{kpi.value}</Typography>
                <Typography variant="caption" sx={{ color: '#718096', fontWeight: 600 }}>{kpi.title}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#4a5568', mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          {quickActions.map((action, i) => (
            <Grid item xs={6} sm={4} md={2.4} key={i}>
              <Paper 
                onClick={() => navigate(action.path)}
                sx={{ 
                  p: 2, 
                  borderRadius: '16px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: 1.5,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }
                }}
              >
                <Box sx={{ p: 1.5, borderRadius: '50%', bgcolor: `${action.color}10`, color: action.color, display: 'flex' }}>
                  {React.cloneElement(action.icon, { sx: { fontSize: 28 } })}
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#4a5568' }}>{action.title}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Bottom Sections */}
      <Grid container spacing={4}>
        {/* AI Insights */}
        <Grid item xs={12} md={7}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Psychology sx={{ color: '#7c4dff', fontSize: 20 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#4a5568', textTransform: 'uppercase', letterSpacing: 1 }}>
              AI Insights
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {aiInsights.slice(0, 2).map((item, i) => (
                <Box 
                  key={i} 
                  onClick={() => navigate(item.path)}
                  sx={{ 
                    flex: item.flex, 
                    p: 3, 
                    borderRadius: '20px', 
                    background: item.gradient, 
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.02)' }
                  }}
                >
                  <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 500 }}>{item.title}</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, my: 0.5 }}>{item.value}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>{item.desc}</Typography>
                </Box>
              ))}
            </Box>
            <Box 
              onClick={() => navigate(aiInsights[2].path)}
              sx={{ 
                p: 3, 
                borderRadius: '20px', 
                background: aiInsights[2].gradient, 
                color: 'white',
                minHeight: 140,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.01)' }
              }}
            >
              <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 500 }}>{aiInsights[2].title}</Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, my: 0.5 }}>{aiInsights[2].value}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>{aiInsights[2].desc}</Typography>
            </Box>
          </Box>
        </Grid>

        {/* Recent Alerts */}
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#4a5568', textTransform: 'uppercase', letterSpacing: 1 }}>
              Recent Alerts
            </Typography>
            <Button size="small" onClick={() => navigate('/system-logs')} sx={{ fontSize: '0.75rem', fontWeight: 700 }}>View All</Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {recentAlerts.map((alert, i) => (
              <Paper 
                key={i} 
                onClick={() => navigate('/system-logs')}
                sx={{ 
                  p: 2, 
                  borderRadius: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2, 
                  borderLeft: `6px solid ${alert.color}`,
                  cursor: 'pointer',
                  transition: 'bgcolor 0.2s',
                  '&:hover': { bgcolor: '#f7fafc' }
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1a202c' }}>{alert.name}</Typography>
                    <Typography variant="caption" sx={{ color: '#a0aec0' }}>|</Typography>
                    <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 600 }}>{alert.location}</Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#718096', display: 'block' }}>{alert.issue}</Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: `${alert.color}15`, px: 1, py: 0.2, borderRadius: '10px' }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: alert.color }} />
                    <Typography variant="caption" sx={{ color: alert.color, fontWeight: 800, fontSize: '0.7rem' }}>{alert.severity}</Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#a0aec0', display: 'block', mt: 0.5 }}>{alert.time}</Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
