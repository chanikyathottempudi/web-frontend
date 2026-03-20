import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Container,
  Avatar,
  Chip,
  LinearProgress,
  Grid,
  Divider
} from '@mui/material';
import { 
  MonitorHeart,
  Warning as WarningIcon,
  Radar,
  Timer
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const RealTimeMonitor = () => {
  const navigate = useNavigate();
  const [monitorData, setMonitorData] = useState([
    { id: '1', patient: 'Ethan Carter', dose: 0.45, status: 'Normal', machine: 'CT-X1', color: '#38a169' },
    { id: '2', patient: 'Sophia Miller', dose: 2.1, status: 'Warning', machine: 'CT-X2', color: '#ecc94b' },
    { id: '3', patient: 'Jackson Reed', dose: 0.12, status: 'Normal', machine: 'CT-X1', color: '#3182ce' }
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMonitorData(prev => prev.map(item => ({
        ...item,
        dose: +(item.dose + (Math.random() * 0.05 - 0.02)).toFixed(2)
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ pb: 8 }}>
      {/* Live Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a202c', mb: 0.5 }}>Active Sessions</Typography>
          <Typography variant="body1" sx={{ color: '#a0aec0', fontWeight: 600 }}>3 scanners transmitting real-time data</Typography>
        </Box>
        <Chip 
          icon={<Radar className="pulse-animation" />} 
          label="LIVE MONITORING" 
          sx={{ 
            bgcolor: '#fed7d7', 
            color: '#e53e3e', 
            fontWeight: 800, 
            px: 1, 
            py: 2.5, 
            borderRadius: '12px',
            '& .MuiChip-icon': { color: 'inherit' }
          }} 
        />
      </Box>

      <Grid container spacing={3}>
        {monitorData.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Paper 
              onClick={() => navigate(`/patient/${item.id}`)}
              sx={{ 
                p: 0, 
                borderRadius: '24px', 
                overflow: 'hidden', 
                border: '1px solid #edf2f7',
                bgcolor: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': { 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  transform: 'translateY(-2px)',
                  borderColor: '#0066ff'
                }
              }}
            >
              <Box sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Avatar 
                    sx={{ 
                      width: 64, 
                      height: 64, 
                      bgcolor: `${item.color}15`, 
                      color: item.color,
                      border: `2px solid ${item.color}30`
                    }}
                  >
                    <MonitorHeart sx={{ fontSize: 32 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a202c' }}>{item.patient}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                      <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700, textTransform: 'uppercase' }}>Machine: {item.machine}</Typography>
                      <Divider orientation="vertical" flexItem sx={{ height: 12, my: 'auto' }} />
                      <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700, textTransform: 'uppercase' }}>Session: 14:02s</Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ textAlign: 'right', minWidth: 150 }}>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 900, 
                    color: item.status === 'Warning' ? '#ecc94b' : '#3182ce',
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'flex-end',
                    lineHeight: 1
                  }}>
                    {item.dose}
                    <Typography variant="h6" component="span" sx={{ ml: 1, fontWeight: 700, opacity: 0.6 }}>mSv</Typography>
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Real-time absorption</Typography>
                </Box>

                <Box sx={{ width: '100%', mt: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#4a5568' }}>Dose Exposure Progress</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: item.color }}>{item.status.toUpperCase()}</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min((item.dose / 3) * 100, 100)} 
                    sx={{ 
                      height: 10, 
                      borderRadius: 5, 
                      bgcolor: '#edf2f7',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: item.status === 'Warning' ? '#ecc94b' : item.color,
                        borderRadius: 5
                      }
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ mt: 4, p: 4, borderRadius: '24px', textAlign: 'center', bgcolor: '#ebf8ff', border: '2px dashed #bee3f8' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <Timer sx={{ color: '#3182ce' }} />
          <Typography variant="body1" sx={{ color: '#2b6cb0', fontWeight: 600 }}>
            Waiting for incoming streams from Department B... Internal system sync in progress.
          </Typography>
        </Box>
      </Paper>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
            100% { opacity: 1; transform: scale(1); }
          }
          .pulse-animation {
            animation: pulse 2s ease-in-out infinite;
          }
        `}
      </style>
    </Box>
  );
};

export default RealTimeMonitor;
