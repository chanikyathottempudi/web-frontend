import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  LinearProgress,
  Chip,
  Divider,
  InputAdornment,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import { 
  Psychology,
  ElectricBolt,
  AccessibilityNew,
  MonitorWeight,
  InfoOutlined,
  History as HistoryIcon
} from '@mui/icons-material';
import aiService from '../services/aiService';

const PredictDose = () => {
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    body_part: 'Head',
    age: 24,
    weight: 70,
    kvp: 120,
    mas: 250
  });
  const [prediction, setPrediction] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: value }));
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      // Ensure numeric values are sent as numbers, not strings from TextField
      const numericParams = {
        ...params,
        age: parseInt(params.age, 10) || 0,
        weight: parseFloat(params.weight) || 0,
        kvp: parseInt(params.kvp, 10) || 0,
        mas: parseInt(params.mas, 10) || 0
      };
      
      const result = await aiService.predictDose(numericParams);
      setPrediction(result);
    } catch (error) {
      console.error('Prediction failed:', error);
      alert('Failed to get AI prediction. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ pb: 8, maxWidth: 1100, mx: 'auto' }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', mb: 0.5, letterSpacing: -1 }}>AI Exposure Prediction</Typography>
        <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 700 }}>Enter parameters for predictive neural dose modeling</Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Input Form */}
        <Grid item xs={12} md={7}>
          <Paper className="glass-card" sx={{ p: 5, borderRadius: '32px' }}>
            <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a', mb: 4, letterSpacing: -0.5 }}>Input Parameters</Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1.5 }}>Examination Area</Typography>
                <FormControl fullWidth>
                  <Select
                    name="body_part"
                    value={params.body_part}
                    onChange={handleInputChange}
                    sx={{ borderRadius: '16px', bgcolor: '#f8fafc' }}
                    startAdornment={
                      <InputAdornment position="start">
                        <AccessibilityNew sx={{ color: '#64748b', ml: 1 }} />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="Head">Head CT Sequence</MenuItem>
                    <MenuItem value="Chest">Chest Protocol</MenuItem>
                    <MenuItem value="Abdomen">Abdominal Scan</MenuItem>
                    <MenuItem value="Pelvis">Pelvic Imaging</MenuItem>
                    <MenuItem value="Extremity">Extremity Analysis</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1.5 }}>Patient Age</Typography>
                <TextField 
                  fullWidth 
                  name="age"
                  type="number" 
                  value={params.age}
                  onChange={handleInputChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px', bgcolor: '#f8fafc' } }} 
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1.5 }}>Weight (kg)</Typography>
                <TextField 
                  fullWidth 
                  name="weight"
                  type="number" 
                  value={params.weight}
                  onChange={handleInputChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px', bgcolor: '#f8fafc' } }} 
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MonitorWeight sx={{ color: '#64748b' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1.5 }}>Stationary kVp</Typography>
                <TextField 
                  fullWidth 
                  name="kvp"
                  type="number" 
                  value={params.kvp}
                  onChange={handleInputChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px', bgcolor: '#f8fafc' } }} 
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1.5 }}>Exposure mAs</Typography>
                <TextField 
                  fullWidth 
                  name="mas"
                  type="number" 
                  value={params.mas}
                  onChange={handleInputChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px', bgcolor: '#f8fafc' } }} 
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ElectricBolt sx={{ color: '#64748b' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Button 
              fullWidth 
              variant="contained" 
              onClick={handlePredict}
              disabled={loading}
              sx={{ 
                mt: 6, 
                bgcolor: '#2563eb', 
                py: 2, 
                borderRadius: '16px', 
                textTransform: 'none', 
                fontWeight: 900,
                fontSize: '1rem',
                boxShadow: '0 8px 30px rgba(37, 99, 235, 0.2)',
                '&:hover': { bgcolor: '#1d4ed8' }
              }}
            >
              {loading ? 'Analyzing Neural Patterns...' : 'Execute AI Prediction'}
            </Button>
          </Paper>
        </Grid>

        {/* Prediction Results */}
        <Grid item xs={12} md={5}>
          <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a', mb: 3, letterSpacing: -0.5 }}>Clinical Metrics</Typography>
          <Paper className="glass-card" sx={{ p: 5, position: 'relative', overflow: 'hidden', minHeight: 450, borderRadius: '32px' }}>
            {prediction ? (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 5 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5 }}>Model Confidence</Typography>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a' }}>94.2%</Typography>
                  </Box>
                  <Chip 
                    label={prediction.risk_status} 
                    sx={{ 
                      bgcolor: prediction.risk_status === 'LOW RISK' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)', 
                      color: prediction.risk_status === 'LOW RISK' ? '#10b981' : '#ef4444', 
                      fontWeight: 900, 
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      px: 1
                    }} 
                  />
                </Box>

                <Box sx={{ mb: 5 }}>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, display: 'block', mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>Predicted DLP</Typography>
                  <Typography variant="h2" sx={{ fontWeight: 900, color: '#0f172a', mb: 2 }}>
                    {prediction.predicted_dlp} <Typography component="span" variant="h5" sx={{ opacity: 0.4, fontWeight: 700 }}>mGy.cm</Typography>
                  </Typography>
                  <LinearProgress variant="determinate" value={Math.min(prediction.predicted_dlp / 10, 100)} sx={{ height: 12, borderRadius: 6, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: '#2563eb', borderRadius: 6 } }} />
                </Box>

                <Box sx={{ mb: 5 }}>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, display: 'block', mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>Effective Dose</Typography>
                  <Typography variant="h2" sx={{ fontWeight: 900, color: '#0f172a', mb: 2 }}>
                    {prediction.effective_dose} <Typography component="span" variant="h5" sx={{ opacity: 0.4, fontWeight: 700 }}>mSv</Typography>
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min(prediction.effective_dose * 5, 100)} 
                    sx={{ 
                      height: 12, 
                      borderRadius: 6, 
                      bgcolor: '#f1f5f9', 
                      '& .MuiLinearProgress-bar': { bgcolor: prediction.effective_dose > 10 ? '#ef4444' : '#10b981', borderRadius: 6 } 
                    }} 
                  />
                </Box>

                <Divider sx={{ my: 4, opacity: 0.5 }} />
                
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', p: 2.5, bgcolor: 'rgba(37, 99, 235, 0.03)', borderRadius: '16px', border: '1px solid rgba(37, 99, 235, 0.05)' }}>
                  <InfoOutlined sx={{ color: '#2563eb', mt: 0.2 }} />
                  <Typography variant="body2" sx={{ color: '#475569', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.5 }}>
                    {prediction.protocol_tip}
                  </Typography>
                </Box>
              </>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', py: 8, textAlign: 'center' }}>
                <Psychology sx={{ fontSize: 80, color: '#f1f5f9', mb: 3 }} />
                <Typography variant="h6" sx={{ color: '#94a3b8', fontWeight: 800 }}>Awaiting Parameters</Typography>
                <Typography sx={{ color: '#cbd5e1', fontWeight: 700 }}>Enter data and click predict to see AI analysis</Typography>
              </Box>
            )}
          </Paper>

          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2.5, borderRadius: '20px', bgcolor: 'rgba(37, 99, 235, 0.05)', display: 'flex', alignItems: 'center', gap: 2, border: '1px solid rgba(37, 99, 235, 0.1)' }}>
                <HistoryIcon sx={{ color: '#2563eb' }} />
                <Typography variant="caption" sx={{ color: '#2563eb', fontWeight: 800, letterSpacing: 0.2 }}>VENTGUARD NEURAL MODEL v4.2 ACTIVE • READY FOR INFERENCE</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PredictDose;
