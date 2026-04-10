import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  IconButton, 
  TextField, 
  Button, 
  Stack,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import { 
  ArrowBack, 
  MonitorHeart 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import scanService from '../services/scanService';

const RealTimeMonitor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    requestingPhysician: '',
    scanType: 'Head'
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    if (!formData.patientName || !formData.patientId || !formData.requestingPhysician) {
      setFeedback({ open: true, message: 'Please fill all required fields.', severity: 'error' });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        patient_name: formData.patientName,
        patient_id: formData.patientId,
        requesting_physician: formData.requestingPhysician,
        scan_type: formData.scanType
      };
      await scanService.registerScan(payload);
      setFeedback({ open: true, message: `Scan sequence for ${formData.patientName} initialized successfully!`, severity: 'success' });
      setTimeout(() => navigate('/ai-risk', { state: { autoStart: true, patientId: formData.patientId } }), 2000);
    } catch (err) {
      setFeedback({ open: true, message: 'Failed to register scan. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', pb: 8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
        <IconButton onClick={() => navigate('/dashboard')} sx={{ color: '#0f172a' }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 900, flexGrow: 1, textAlign: 'center', color: '#0f172a', letterSpacing: -0.5 }}>
          New Scan Registration
        </Typography>
      </Box>

      <Paper className="glass-card" sx={{ p: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5 }}>
          <Box sx={{ p: 1.5, borderRadius: '16px', bgcolor: 'rgba(37, 99, 235, 0.08)', color: '#2563eb', border: '1px solid rgba(37, 99, 235, 0.1)' }}>
            <MonitorHeart sx={{ fontSize: 32 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>Registration Portal</Typography>
            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>Initialize medical imaging sequence</Typography>
          </Box>
        </Box>

        <Stack spacing={4}>
          <Box>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1.5 }}>
              Patient ID *
            </Typography>
            <TextField
              fullWidth
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              variant="outlined"
              placeholder="e.g. PT-12345"
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '16px', 
                  bgcolor: '#f8fafc',
                  color: '#0f172a',
                  mb: 2,
                  '& fieldset': { borderColor: '#e2e8f0' },
                  '&:hover fieldset': { borderColor: '#2563eb' },
                } 
              }}
            />

            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1.5 }}>
              Patient Name *
            </Typography>
            <TextField
              fullWidth
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              variant="outlined"
              placeholder="e.g. Alex Johnson"
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '16px', 
                  bgcolor: '#f8fafc',
                  color: '#0f172a',
                  mb: 2,
                  '& fieldset': { borderColor: '#e2e8f0' },
                  '&:hover fieldset': { borderColor: '#2563eb' },
                } 
              }}
            />

            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1.5 }}>
              Requesting Physician *
            </Typography>
            <TextField
              fullWidth
              name="requestingPhysician"
              value={formData.requestingPhysician}
              onChange={handleChange}
              variant="outlined"
              placeholder="e.g. Dr. Smith"
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '16px', 
                  bgcolor: '#f8fafc',
                  color: '#0f172a',
                  '& fieldset': { borderColor: '#e2e8f0' },
                  '&:hover fieldset': { borderColor: '#2563eb' },
                } 
              }}
            />
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1.5 }}>
              Scan Type
            </Typography>
            <Stack direction="row" spacing={2}>
              {['Head', 'Neck', 'Chest', 'Abdomen'].map((type) => (
                <Button
                  key={type}
                  onClick={() => setFormData({...formData, scanType: type})}
                  variant={formData.scanType === type ? 'contained' : 'outlined'}
                  sx={{
                    borderRadius: '12px',
                    px: 3,
                    py: 1,
                    flex: 1,
                    textTransform: 'none',
                    fontWeight: 800,
                    bgcolor: formData.scanType === type ? '#2563eb' : '#ffffff',
                    color: formData.scanType === type ? 'white' : '#64748b',
                    borderColor: formData.scanType === type ? '#2563eb' : '#e2e8f0',
                    '&:hover': { bgcolor: formData.scanType === type ? '#1d4ed8' : '#f8fafc' }
                  }}
                >
                  {type}
                </Button>
              ))}
            </Stack>
          </Box>

          <Box sx={{ pt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleNext}
              disabled={loading}
              sx={{ 
                py: 2, 
                borderRadius: '16px', 
                bgcolor: '#2563eb', 
                fontWeight: 900, 
                fontSize: '1rem',
                textTransform: 'none',
                boxShadow: '0 8px 30px rgba(37, 99, 235, 0.2)',
                '&:hover': { bgcolor: '#1d4ed8' }
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Start Diagnostic Scan"}
            </Button>
          </Box>
        </Stack>
      </Paper>

      <Snackbar 
        open={feedback.open} 
        autoHideDuration={6000} 
        onClose={() => setFeedback({ ...feedback, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={feedback.severity} variant="filled" sx={{ borderRadius: '12px', fontWeight: 700 }}>
          {feedback.message}
        </Alert>
      </Snackbar>

      {/* Helper Footer */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button 
          startIcon={<MonitorHeart />}
          onClick={() => alert("Legacy Live Monitoring view is coming soon!")}
          sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'none', '&:hover': { color: '#0f172a' } }}
        >
          Access Live Monitoring
        </Button>
      </Box>
    </Box>
  );
};

export default RealTimeMonitor;
