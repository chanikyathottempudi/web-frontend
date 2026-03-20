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
    <Box sx={{ pb: 8 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a202c', mb: 0.5 }}>AI Anomaly Detector</Typography>
          <Typography variant="body1" sx={{ color: '#a0aec0', fontWeight: 600 }}>Identifying irregular dose patterns using deep learning</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField 
            label="Patient ID" 
            variant="outlined" 
            size="small" 
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            sx={{ width: 200, '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: 'white' } }}
          />
          <Button 
            variant="contained" 
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Sync />}
            onClick={fetchAnomalies}
            disabled={loading}
            sx={{ bgcolor: '#0066ff', borderRadius: '12px', px: 3, fontWeight: 700 }}
          >
            Re-scan
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Status Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, borderRadius: '24px', bgcolor: 'white', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ 
              width: 80, 
              height: 80, 
              borderRadius: '24px', 
              bgcolor: anomalies.length > 0 ? '#fff5f5' : '#f0fff4', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto mb: 3',
              mb: 3
            }}>
              {anomalies.length > 0 ? (
                <Warning sx={{ fontSize: 40, color: '#e53e3e' }} />
              ) : (
                <Insights sx={{ fontSize: 40, color: '#38a169' }} />
              )}
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a202c', mb: 1 }}>
              {loading ? 'Analyzing...' : (anomalies.length > 0 ? 'Action Required' : 'Scan Healthy')}
            </Typography>
            <Typography variant="body2" sx={{ color: '#718096', fontWeight: 600, px: 2 }}>
              {message}
            </Typography>
            
            <Divider sx={{ my: 4, opacity: 0.5 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a202c' }}>{anomalies.length}</Typography>
                <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700 }}>ISSUES</Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a202c' }}>0</Typography>
                <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700 }}>RESOLVED</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Anomaly List */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#4a5568', mb: 3 }}>Detected Issues</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {anomalies.length > 0 ? anomalies.map((anomaly, index) => (
              <Paper key={index} sx={{ p: 3, borderRadius: '20px', bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #edf2f7', '&:hover': { borderColor: '#0066ff', transform: 'translateY(-2px)', transition: 'all 0.2s' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Avatar sx={{ bgcolor: anomaly.status_level === 'CRITICAL' ? '#fff5f5' : '#fffaf0', color: anomaly.status_level === 'CRITICAL' ? '#e53e3e' : '#ed8936', borderRadius: '12px', width: 48, height: 48 }}>
                    <PriorityHigh />
                  </Avatar>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1a202c' }}>{anomaly.anomaly_id}</Typography>
                      <Chip label={anomaly.status_level} size="small" sx={{ bgcolor: anomaly.status_level === 'CRITICAL' ? '#fed7d7' : '#feebc8', color: anomaly.status_level === 'CRITICAL' ? '#c53030' : '#c05621', fontWeight: 800, fontSize: '0.65rem' }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#4a5568', fontWeight: 600 }}>{anomaly.description}</Typography>
                    <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700 }}>AREA: {anomaly.area} • VALUE: {anomaly.dlp_value} mGy.cm</Typography>
                  </Box>
                </Box>
                <IconButton sx={{ bgcolor: '#f7fafc', p: 1.5 }}>
                  <ChevronRight sx={{ color: '#a0aec0' }} />
                </IconButton>
              </Paper>
            )) : !loading && (
              <Paper sx={{ p: 8, borderRadius: '24px', bgcolor: 'white', textAlign: 'center', border: '1px dashed #e2e8f0' }}>
                <NotificationsActive sx={{ fontSize: 48, color: '#edf2f7', mb: 2 }} />
                <Typography sx={{ color: '#a0aec0', fontWeight: 600 }}>System check complete. No anomalies found for this patient.</Typography>
              </Paper>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetectAnomalies;
