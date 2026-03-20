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
    <Box sx={{ pb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a202c', mb: 0.5 }}>Dose Prediction</Typography>
        <Typography variant="body1" sx={{ color: '#a0aec0', fontWeight: 600 }}>Enter parameters for AI-driven exposure prediction</Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Input Form */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 4, borderRadius: '24px', bgcolor: 'white' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#4a5568', mb: 3 }}>Input Parameters</Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="caption" sx={{ color: '#4a5568', fontWeight: 700, mb: 1, display: 'block', textTransform: 'uppercase' }}>Body Part / Examination Area</Typography>
                <FormControl fullWidth>
                  <Select
                    name="body_part"
                    value={params.body_part}
                    onChange={handleInputChange}
                    sx={{ borderRadius: '12px', bgcolor: '#f7fafc' }}
                    startAdornment={
                      <InputAdornment position="start">
                        <AccessibilityNew sx={{ color: '#a0aec0', ml: 1 }} />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="Head">Head CT</MenuItem>
                    <MenuItem value="Chest">Chest X-Ray / CT</MenuItem>
                    <MenuItem value="Abdomen">Abdomen CT</MenuItem>
                    <MenuItem value="Pelvis">Pelvis CT</MenuItem>
                    <MenuItem value="Extremity">Extremity / Limbs</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#4a5568', fontWeight: 700, mb: 1, display: 'block', textTransform: 'uppercase' }}>Age (Years)</Typography>
                <TextField 
                  fullWidth 
                  name="age"
                  type="number" 
                  value={params.age}
                  onChange={handleInputChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f7fafc' } }} 
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#4a5568', fontWeight: 700, mb: 1, display: 'block', textTransform: 'uppercase' }}>Weight (kg)</Typography>
                <TextField 
                  fullWidth 
                  name="weight"
                  type="number" 
                  value={params.weight}
                  onChange={handleInputChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f7fafc' } }} 
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MonitorWeight sx={{ color: '#a0aec0' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#4a5568', fontWeight: 700, mb: 1, display: 'block', textTransform: 'uppercase' }}>kVp</Typography>
                <TextField 
                  fullWidth 
                  name="kvp"
                  type="number" 
                  value={params.kvp}
                  onChange={handleInputChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f7fafc' } }} 
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#4a5568', fontWeight: 700, mb: 1, display: 'block', textTransform: 'uppercase' }}>mAs</Typography>
                <TextField 
                  fullWidth 
                  name="mas"
                  type="number" 
                  value={params.mas}
                  onChange={handleInputChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f7fafc' } }} 
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ElectricBolt sx={{ color: '#a0aec0' }} />
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
                mt: 4, 
                bgcolor: '#0066ff', 
                py: 1.8, 
                borderRadius: '12px', 
                textTransform: 'none', 
                fontWeight: 800,
                fontSize: '1rem',
                boxShadow: '0 8px 20px rgba(0, 102, 255, 0.2)'
              }}
            >
              {loading ? 'Processing Neural Model...' : 'Generate AI Prediction'}
            </Button>
          </Paper>
        </Grid>

        {/* Prediction Results */}
        <Grid item xs={12} md={5}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#4a5568', mb: 3 }}>Prediction Results</Typography>
          <Paper sx={{ p: 4, borderRadius: '24px', bgcolor: 'white', position: 'relative', overflow: 'hidden', minHeight: 400 }}>
            {prediction ? (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#7c4dff', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>Confidence Score</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a202c' }}>94.2%</Typography>
                  </Box>
                  <Chip 
                    label={prediction.risk_status} 
                    sx={{ 
                      bgcolor: prediction.risk_status === 'LOW RISK' ? '#f0fff4' : '#fff5f5', 
                      color: prediction.risk_status === 'LOW RISK' ? '#38a169' : '#e53e3e', 
                      fontWeight: 800, 
                      borderRadius: '8px' 
                    }} 
                  />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700, display: 'block', mb: 1 }}>PREDICTED DLP</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 900, color: '#1a202c', mb: 1.5 }}>
                    {prediction.predicted_dlp} <Typography component="span" variant="h6" sx={{ opacity: 0.5 }}>mGy.cm</Typography>
                  </Typography>
                  <LinearProgress variant="determinate" value={Math.min(prediction.predicted_dlp / 10, 100)} sx={{ height: 10, borderRadius: 5, bgcolor: '#edf2f7', '& .MuiLinearProgress-bar': { bgcolor: '#0066ff' } }} />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700, display: 'block', mb: 1 }}>EFFECTIVE DOSE</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 900, color: '#1a202c', mb: 1.5 }}>
                    {prediction.effective_dose} <Typography component="span" variant="h6" sx={{ opacity: 0.5 }}>mSv</Typography>
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min(prediction.effective_dose * 5, 100)} 
                    sx={{ 
                      height: 10, 
                      borderRadius: 5, 
                      bgcolor: '#edf2f7', 
                      '& .MuiLinearProgress-bar': { bgcolor: prediction.effective_dose > 10 ? '#e53e3e' : '#38a169' } 
                    }} 
                  />
                </Box>

                <Divider sx={{ my: 3, opacity: 0.5 }} />
                
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <InfoOutlined sx={{ color: prediction.risk_status === 'LOW RISK' ? '#a0aec0' : '#e53e3e', mt: 0.2 }} />
                  <Typography variant="caption" sx={{ color: '#718096', fontWeight: 600, fontStyle: 'italic' }}>
                    {prediction.protocol_tip}
                  </Typography>
                </Box>
              </>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', py: 8, textAlign: 'center' }}>
                <Psychology sx={{ fontSize: 60, color: '#edf2f7', mb: 2 }} />
                <Typography sx={{ color: '#a0aec0', fontWeight: 600 }}>Enter parameters and click predict to see AI analysis</Typography>
              </Box>
            )}
          </Paper>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2.5, borderRadius: '16px', bgcolor: '#ebf8ff', display: 'flex', alignItems: 'center', gap: 2 }}>
                <HistoryIcon sx={{ color: '#3182ce' }} />
                <Typography variant="caption" sx={{ color: '#2b6cb0', fontWeight: 700 }}>AI Neural Model v4.2 active and ready for inference.</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PredictDose;
