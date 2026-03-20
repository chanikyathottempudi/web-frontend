import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button,
  Avatar,
  Chip,
  CircularProgress
} from '@mui/material';
import { 
  Warning,
  Security,
  AssignmentLate,
  Psychology,
  AutoGraph,
  ShieldOutlined
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AiRiskScore = () => {
  const navigate = useNavigate();
  const metrics = [
    { title: 'High Risk Status', desc: 'Patients flagged for review', value: '4', icon: <Warning />, color: '#e53e3e', path: '/patients' },
    { title: 'Safety Alerts', desc: 'Critical dose exposures', value: '12', icon: <Security />, color: '#ecc94b', path: '/system-logs' },
    { title: 'Dose Anomaly', desc: 'Predicted deviations', value: '3', icon: <AssignmentLate />, color: '#3182ce', path: '/detect-anomalies' }
  ];

  return (
    <Box sx={{ pb: 8 }}>
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
          <Avatar 
            sx={{ 
              width: 120, 
              height: 120, 
              bgcolor: '#ebf4ff', 
              color: '#3182ce', 
              boxShadow: '0 0 40px rgba(49, 130, 206, 0.1)' 
            }}
          >
            <Psychology sx={{ fontSize: 64 }} />
          </Avatar>
          <Box className="pulse-animation" sx={{ position: 'absolute', top: -10, right: -10, bgcolor: '#38a169', color: 'white', px: 1.5, py: 0.5, borderRadius: '20px', fontSize: '0.7rem', fontWeight: 900 }}>
            AI ACTIVE
          </Box>
        </Box>
        
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a202c', mb: 1 }}>AI Risk Intelligence</Typography>
        <Typography variant="body1" sx={{ color: '#a0aec0', fontWeight: 600, mb: 3 }}>Advanced neural modeling for patient safety & dose optimization</Typography>

        <Chip 
          icon={<ShieldOutlined sx={{ color: 'inherit !important' }} />}
          label="High Intelligence Confidence" 
          sx={{ bgcolor: '#ebf8ff', color: '#2b6cb0', fontWeight: 800, px: 2, height: 40, borderRadius: '12px' }} 
        />
        <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#a0aec0', fontWeight: 600 }}>
          Last updated: Today, 09:42 AM
        </Typography>
      </Box>

      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#4a5568', mb: 3, textTransform: 'uppercase', letterSpacing: 1 }}>
        Key Risk Metrics
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper 
              onClick={() => navigate(metric.path)}
              sx={{ 
                p: 3, 
                borderRadius: '24px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 3,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderColor: metric.color },
                border: '1px solid transparent'
              }}
            >
              <Avatar sx={{ bgcolor: `${metric.color}15`, color: metric.color }}>
                {metric.icon}
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a202c' }}>{metric.value}</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#4a5568' }}>{metric.title}</Typography>
                <Typography variant="caption" sx={{ color: '#a0aec0' }}>{metric.desc}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 4, borderRadius: '24px', background: 'linear-gradient(135deg, #f7fafc, #edf2f7)', border: '1px solid #e2e8f0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress variant="determinate" value={87} size={80} thickness={4} sx={{ color: '#7c4dff' }} />
              <Typography variant="h6" sx={{ position: 'absolute', fontWeight: 800, color: '#7c4dff' }}>87%</Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a202c' }}>System Safety Score</Typography>
              <Typography variant="body2" sx={{ color: '#4a5568' }}>Aggregated across all active scanning sessions</Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<AutoGraph />}
            sx={{ 
              bgcolor: '#0066ff', 
              borderRadius: '16px', 
              px: 4, 
              py: 1.5, 
              textTransform: 'none', 
              fontWeight: 800,
              boxShadow: '0 8px 20px rgba(0, 102, 255, 0.2)'
            }}
          >
            View Detailed Analysis
          </Button>
        </Box>
      </Paper>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(56, 161, 105, 0.4); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(56, 161, 105, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(56, 161, 105, 0); }
          }
          .pulse-animation {
            animation: pulse 2s infinite;
          }
        `}
      </style>
    </Box>
  );
};

export default AiRiskScore;
