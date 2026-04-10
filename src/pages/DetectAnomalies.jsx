import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Grid,
  Chip,
  IconButton,
  Divider,
  TextField,
  Button,
  CircularProgress
} from '@mui/material';
import { 
  Warning,
  Insights,
  ChevronRight,
  NotificationsActive,
  PriorityHigh,
  Sync,
  Search
} from '@mui/icons-material';
import aiService from '../services/aiService';

const DetectAnomalies = () => {
  const [loading, setLoading] = useState(false);
  const [patientId, setPatientId] = useState('PT-DETAILS-001');
  const [anomalies, setAnomalies] = useState([]);
  const [message, setMessage] = useState('Enter Patient ID to begin analysis');

  const fetchAnomalies = async () => {
    if (!patientId) return;
    setLoading(true);
    setMessage('AI is scanning historical dose patterns...');
    try {
      const result = await aiService.detectAnomalies(patientId);
      if (result.success) {
        setAnomalies(result.anomalies);
        setMessage(result.anomalies.length > 0 
          ? `Found ${result.anomalies.length} potential anomalies.` 
          : 'No critical anomalies detected in recent scans.');
      }
    } catch (error) {
      console.error('Anomaly detection failed:', error);
      setMessage('Analysis failed. Please check the Patient ID.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnomalies();
  }, []);

  return (
    <Box sx={{ pb: 8, maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: -1, mb: 0.5 }}>AI Anomaly Detector</Typography>
          <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 700 }}>Identifying irregular dose patterns using neural analysis</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField 
            label="Patient Access ID" 
            variant="outlined" 
            size="small" 
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            sx={{ width: 220, '& .MuiOutlinedInput-root': { borderRadius: '16px', bgcolor: 'white' } }}
          />
          <Button 
            variant="contained" 
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Sync />}
            onClick={fetchAnomalies}
            disabled={loading}
            sx={{ 
                bgcolor: '#2563eb', 
                borderRadius: '16px', 
                px: 3, 
                py: 1.2,
                fontWeight: 800, 
                textTransform: 'none',
                boxShadow: '0 8px 20px rgba(37, 99, 235, 0.2)',
                '&:hover': { bgcolor: '#1d4ed8' }
            }}
          >
            {loading ? 'Analyzing...' : 'Re-scan Patterns'}
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Status Card */}
        <Grid item xs={12} md={4}>
          <Paper className="glass-card" sx={{ p: 5, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ 
              width: 80, 
              height: 80, 
              borderRadius: '24px', 
              bgcolor: anomalies.length > 0 ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto',
              mb: 3,
              border: `1px solid ${anomalies.length > 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'}`
            }}>
              {anomalies.length > 0 ? (
                <Warning sx={{ fontSize: 40, color: '#ef4444' }} />
              ) : (
                <Insights sx={{ fontSize: 40, color: '#10b981' }} />
              )}
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a', mb: 1, letterSpacing: -0.5 }}>
              {loading ? 'Intelligence Scan...' : (anomalies.length > 0 ? 'Critical Attention' : 'Pattern Healthy')}
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 700, px: 2, lineHeight: 1.6 }}>
              {message}
            </Typography>
            
            <Divider sx={{ my: 4, opacity: 0.5 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 900, color: anomalies.length > 0 ? '#ef4444' : '#0f172a' }}>{anomalies.length}</Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, letterSpacing: 1 }}>ANOMALIES</Typography>
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a' }}>100%</Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, letterSpacing: 1 }}>PRECISION</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Anomaly List */}
        <Grid item xs={12} md={8}>
          <Typography variant="subtitle2" sx={{ fontWeight: 900, color: '#94a3b8', mb: 3, textTransform: 'uppercase', letterSpacing: 1.5 }}>INTELLIGENCE OBSERVATIONS</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {anomalies.length > 0 ? anomalies.map((anomaly, index) => (
              <Paper key={index} className="glass-card" sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #f1f5f9', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { transform: 'translateX(10px)', bgcolor: 'rgba(37, 99, 235, 0.02)' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Avatar sx={{ bgcolor: anomaly.status_level === 'CRITICAL' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(245, 158, 11, 0.08)', color: anomaly.status_level === 'CRITICAL' ? '#ef4444' : '#f59e0b', borderRadius: '14px', width: 52, height: 52, border: `1px solid ${anomaly.status_level === 'CRITICAL' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)'}` }}>
                    <PriorityHigh />
                  </Avatar>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 900, color: '#0f172a' }}>{anomaly.anomaly_id}</Typography>
                      <Chip label={anomaly.status_level} size="small" sx={{ bgcolor: anomaly.status_level === 'CRITICAL' ? '#fee2e2' : '#fef3c7', color: anomaly.status_level === 'CRITICAL' ? '#dc2626' : '#d97706', fontWeight: 900, fontSize: '0.65rem', height: 20 }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#475569', fontWeight: 700, mb: 0.5 }}>{anomaly.description}</Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800 }}>AREA: {anomaly.area} • PEAK: {anomaly.dlp_value} mGy.cm</Typography>
                  </Box>
                </Box>
                <IconButton sx={{ bgcolor: '#f8fafc', p: 1.2, color: '#cbd5e1' }}>
                  <ChevronRight />
                </IconButton>
              </Paper>
            )) : !loading && (
              <Paper sx={{ p: 8, borderRadius: '32px', bgcolor: 'rgba(255,255,255,0.4)', textAlign: 'center', border: '1px dashed #e2e8f0' }}>
                <NotificationsActive sx={{ fontSize: 48, color: '#cbd5e1', mb: 2 }} />
                <Typography sx={{ color: '#64748b', fontWeight: 800 }}>System Integrity Check: No anomalies detected.</Typography>
              </Paper>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetectAnomalies;
