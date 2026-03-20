import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Paper,
  Grid,
  Divider,
  Button,
  Chip,
  IconButton
} from '@mui/material';
import { 
  Person,
  Timeline,
  CalendarMonth,
  ChevronRight,
  TrendingUp
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DoseStatistics = () => {
  const navigate = useNavigate();

  // Mock data based on the app's patient list
  const patients = [
    { id: '1', name: 'Ethan Carter', patientId: 'ID: 123456789', gender: 'male', lastVisit: '10 Oct 2025', trend: 'down' },
    { id: '2', name: 'Sophia Miller', patientId: 'ID: 987654321', gender: 'female', lastVisit: '12 Oct 2025', trend: 'up' },
    { id: '3', name: 'Jackson Reed', patientId: 'ID: 456789123', gender: 'male', lastVisit: '15 Oct 2025', trend: 'stable' }
  ];

  return (
    <Box sx={{ pb: 8 }}>
      {/* List Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a202c', mb: 0.5 }}>Dose Statistics</Typography>
          <Typography variant="body1" sx={{ color: '#a0aec0', fontWeight: 600 }}>Historical dose tracking by patient</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Timeline />}
          sx={{ bgcolor: '#7c4dff', '&:hover': { bgcolor: '#6b41d7' }, borderRadius: '12px', px: 3 }}
        >
          Generate Report
        </Button>
      </Box>

      {/* Stats List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {patients.map((patient) => (
          <Paper 
            key={patient.id} 
            onClick={() => navigate(`/patient/${patient.id}`)}
            sx={{ 
              p: 0, 
              borderRadius: '24px', 
              cursor: 'pointer',
              overflow: 'hidden',
              transition: 'all 0.3s',
              '&:hover': { transform: 'scale(1.01)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }
            }}
          >
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar 
                sx={{ 
                  width: 70, 
                  height: 70, 
                  bgcolor: patient.gender === 'male' ? '#ebf4ff' : '#fff5f7',
                  color: patient.gender === 'male' ? '#3182ce' : '#d53f8c',
                  border: `2px solid ${patient.gender === 'male' ? '#bee3f8' : '#fed7e2'}`,
                  fontSize: '1.5rem',
                  fontWeight: 800
                }}
              >
                {patient.name.charAt(0)}
              </Avatar>
              
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a202c', mb: 0.5 }}>{patient.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700 }}>{patient.patientId}</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem sx={{ height: 12, my: 'auto' }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarMonth sx={{ fontSize: 14, color: '#a0aec0' }} />
                    <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 600 }}>Last visit: {patient.lastVisit}</Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
                  <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>Dose Trend</Typography>
                  <Chip 
                    label={patient.trend.toUpperCase()} 
                    size="small" 
                    variant="outlined"
                    sx={{ 
                      height: 24, 
                      fontWeight: 800, 
                      fontSize: '0.65rem',
                      borderColor: patient.trend === 'up' ? '#feb2b2' : patient.trend === 'down' ? '#9ae6b4' : '#e2e8f0',
                      color: patient.trend === 'up' ? '#e53e3e' : patient.trend === 'down' ? '#38a169' : '#a0aec0',
                      mt: 0.5
                    }} 
                  />
                </Box>
                <IconButton sx={{ bgcolor: '#f7fafc', color: '#a0aec0' }}>
                  <ChevronRight />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default DoseStatistics;
