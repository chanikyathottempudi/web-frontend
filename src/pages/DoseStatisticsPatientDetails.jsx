import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper,
  Chip,
  Divider,
  LinearProgress,
  Button,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  History,
  TrendingUp,
  BarChart,
  CalendarMonth,
  HealthAndSafety,
  Description,
  Scale,
  Height,
  Opacity,
  InfoOutlined,
  Download
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

const DoseStatisticsPatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const metrics = [
    { label: 'Height', value: '178 cm', icon: <Height /> },
    { label: 'Weight', value: '72 kg', icon: <Scale /> },
    { label: 'BMI', value: '22.7', icon: <Description /> },
    { label: 'Blood Group', value: 'O+', icon: <Opacity /> }
  ];

  return (
    <Box sx={{ pb: 8 }}>
      {/* Dynamic Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: '#0066ff', color: 'white', fontWeight: 800, fontSize: '1.5rem' }}>EC</Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a202c', mb: 0.5 }}>Ethan Carter</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1" sx={{ color: '#a0aec0', fontWeight: 700 }}>ID: {id || 'PT-987654321'}</Typography>
              <Chip label="CRITICAL CARE" size="small" sx={{ bgcolor: '#fff5f5', color: '#e53e3e', fontWeight: 800, height: 20 }} />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<Download />}
            onClick={() => alert('Generating patient dose report in PDF format...')}
            sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 700, borderColor: '#edf2f7', color: '#4a5568' }}
          >
            Export PDF
          </Button>
          <Button 
            variant="contained" 
            startIcon={<History />}
            onClick={() => navigate(`/patient/${id}`)}
            sx={{ bgcolor: '#0066ff', borderRadius: '12px', textTransform: 'none', fontWeight: 700 }}
          >
            View Full Profile
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column: Metrics & Biometrics */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#4a5568', mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>Patient Metrics</Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {metrics.map((m, i) => (
              <Grid item xs={6} key={i}>
                <Paper sx={{ p: 2, borderRadius: '16px', textAlign: 'center', border: '1px solid #edf2f7' }}>
                  <Box sx={{ color: '#0066ff', mb: 0.5 }}>{m.icon}</Box>
                  <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 800 }}>{m.label}</Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1a202c' }}>{m.value}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Paper sx={{ p: 4, borderRadius: '24px', bgcolor: '#0066ff', color: 'white', mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 700, textTransform: 'uppercase' }}>Lifetime Cumulative Dose</Typography>
              <Tooltip title="Total calculated across 12 sessions">
                <InfoOutlined sx={{ fontSize: 18, opacity: 0.8 }} />
              </Tooltip>
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 1 }}>2,450 <Typography variant="h6" component="span" sx={{ opacity: 0.7 }}>mGy.cm</Typography></Typography>
            <Box sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700 }}>Exposure Progress</Typography>
                <Typography variant="caption" sx={{ fontWeight: 700 }}>45% of Threshold</Typography>
              </Box>
              <LinearProgress variant="determinate" value={45} sx={{ height: 8, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.2)', '& .MuiLinearProgress-bar': { bgcolor: 'white' } }} />
            </Box>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: '20px', bgcolor: 'white', border: '1px solid #edf2f7' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ p: 1, borderRadius: '10px', bgcolor: '#f0fff4', color: '#38a169', display: 'flex' }}>
                <HealthAndSafety />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 800 }}>AI RISK PROFILE</Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#3182ce' }}>Safety Optimized</Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2, opacity: 0.5 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1, borderRadius: '10px', bgcolor: '#ebf4ff', color: '#3182ce', display: 'flex' }}>
                <CalendarMonth />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 800 }}>LAST EVALUATION</Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a202c' }}>Oct 15, 2025</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Right Column: Charts & Trends */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, borderRadius: '24px', bgcolor: 'white', mb: 4, border: '1px solid #edf2f7' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#4a5568', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <TrendingUp sx={{ color: '#0066ff' }} /> Advanced Dose Regression Trend
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label="Weekly" size="small" variant="outlined" sx={{ fontWeight: 700, borderRadius: '8px' }} />
                <Chip label="Monthly" size="small" sx={{ fontWeight: 700, borderRadius: '8px', bgcolor: '#f7fafc', border: '1px solid #edf2f7' }} />
              </Box>
            </Box>
            <Box sx={{ height: 280, bgcolor: '#f7fafc', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #cbd5e0' }}>
              <Box sx={{ textAlign: 'center' }}>
                <BarChart sx={{ fontSize: 60, color: '#e2e8f0', mb: 1 }} />
                <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700 }}>Predictive Historical Exposure Variance Map Rendering...</Typography>
                <LinearProgress sx={{ mt: 2, width: 180, mx: 'auto', height: 4, borderRadius: 2 }} />
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 4, borderRadius: '24px', bgcolor: 'white', border: '1px solid #edf2f7' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#4a5568', mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Description sx={{ color: '#7c4dff' }} /> Organ Sensitive Dose Heatmap
            </Typography>
            <Grid container spacing={2}>
              {['Brain', 'Eye Lens', 'Thyroid', 'Breast'].map((organ, i) => (
                <Grid item xs={6} sm={3} key={i}>
                  <Box sx={{ p: 2, textAlign: 'center', bgcolor: '#f7fafc', borderRadius: '16px' }}>
                    <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 800, display: 'block' }}>{organ.toUpperCase()}</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: i === 2 ? '#e53e3e' : '#1a202c' }}>{Math.floor(Math.random() * 50)}.5 <Typography variant="caption">mGy</Typography></Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoseStatisticsPatientDetails;
