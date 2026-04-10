import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Paper,
  Grid,
  Divider,
  Button,
  Chip,
  IconButton,
  CircularProgress
} from '@mui/material';
import { 
  Person,
  Timeline,
  CalendarMonth,
  ChevronRight,
  TrendingUp
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import patientService from '../services/patientService';

const DoseStatistics = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await patientService.getPatients();
        const patientResults = data.results || data || [];
        setPatients(patientResults.map(p => ({
          id: p.id,
          name: p.name,
          patientId: `ID: ${p.patient_id}`,
          gender: p.gender?.toLowerCase() || 'male',
          lastVisit: p.last_visit ? new Date(p.last_visit).toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A',
          trend: 'stable' // Default until we have actual trend logic
        })));
      } catch (error) {
        console.error("Failed to fetch patients for stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 8, maxWidth: 1000, mx: 'auto' }}>
      {/* List Header */}
      <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: -1, mb: 0.5 }}>Dose Statistics</Typography>
          <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 700 }}>Historical exposure tracking by active patient</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Timeline />}
          sx={{ 
            bgcolor: '#2563eb', 
            '&:hover': { bgcolor: '#1d4ed8' }, 
            borderRadius: '16px', 
            px: 4, 
            py: 1.5,
            fontWeight: 900,
            textTransform: 'none',
            boxShadow: '0 8px 30px rgba(37, 99, 235, 0.2)'
          }}
        >
          Generate Analytics PDF
        </Button>
      </Box>

      {/* Stats List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {patients.map((patient) => (
          <Paper 
            key={patient.id} 
            className="glass-card"
            onClick={() => navigate(`/patient/${patient.id}`)}
            sx={{ 
              borderRadius: '24px', 
              cursor: 'pointer',
              overflow: 'hidden',
              transition: 'all 0.2s ease',
              border: '1px solid #f1f5f9',
              '&:hover': { transform: 'translateX(8px)', bgcolor: 'rgba(37, 99, 235, 0.02)' }
            }}
          >
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar 
                sx={{ 
                  width: 64, 
                  height: 64, 
                  bgcolor: 'rgba(37, 99, 235, 0.08)', 
                  color: '#2563eb', 
                  fontSize: '1.4rem', 
                  fontWeight: 900,
                  border: '2px solid rgba(37, 99, 235, 0.1)'
                }}
              >
                {patient.name.charAt(0)}
              </Avatar>
              
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a', mb: 0.5 }}>{patient.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                   <Chip 
                    label={patient.patientId} 
                    size="small" 
                    sx={{ bgcolor: '#f1f5f9', color: '#2563eb', fontWeight: 900, height: 20, fontSize: '0.65rem' }} 
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <CalendarMonth sx={{ fontSize: 16, color: '#94a3b8' }} />
                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>Visit: {patient.lastVisit}</Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, display: 'block' }}>Exposures</Typography>
                  <Chip 
                    label={patient.trend.toUpperCase()} 
                    size="small" 
                    icon={<TrendingUp sx={{ fontSize: '14px !important' }} />}
                    sx={{ 
                      height: 24, 
                      fontWeight: 900, 
                      fontSize: '0.65rem',
                      px: 1,
                      bgcolor: patient.trend === 'stable' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: patient.trend === 'stable' ? '#10b981' : '#ef4444',
                      mt: 0.5
                    }} 
                  />
                </Box>
                <IconButton sx={{ bgcolor: '#f8fafc', color: '#cbd5e1' }}>
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
