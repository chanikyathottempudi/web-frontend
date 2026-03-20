import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  MenuItem,
  Select,
  FormControl,
  Paper,
  Grid
} from '@mui/material';
import { PersonAdd, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import patientService from '../services/patientService';

const PatientRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    patient_id: '',
    allergies: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await patientService.registerPatient(formData);
      navigate('/patients');
    } catch (err) {
      setError('Registration failed. Please check inputs.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Container maxWidth="md">
        <Paper sx={{ p: 4, borderRadius: '24px', bgcolor: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#ebf4ff', color: '#3182ce' }}>
              <PersonAdd fontSize="large" />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a202c' }}>Register New Patient</Typography>
              <Typography variant="body2" sx={{ color: '#a0aec0', fontWeight: 600 }}>Enter patient details to initialize analysis</Typography>
            </Box>
          </Box>

          <form onSubmit={handleSubmit}>
            {error && (
              <Paper sx={{ p: 2, mb: 3, bgcolor: '#fff5f5', border: '1px solid #feb2b2', borderRadius: '12px' }}>
                <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>{error}</Typography>
              </Paper>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ color: '#4a5568', fontWeight: 700, mb: 1, display: 'block', textTransform: 'uppercase' }}>Full Name</Typography>
                <TextField
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ethan Carter"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f7fafc' } }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ color: '#4a5568', fontWeight: 700, mb: 1, display: 'block', textTransform: 'uppercase' }}>Patient ID</Typography>
                <TextField
                  fullWidth
                  name="patient_id"
                  value={formData.patient_id}
                  onChange={handleChange}
                  placeholder="PID-XXXXX"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f7fafc' } }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ color: '#4a5568', fontWeight: 700, mb: 1, display: 'block', textTransform: 'uppercase' }}>Date of Birth</Typography>
                <TextField
                  fullWidth
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f7fafc' } }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ color: '#4a5568', fontWeight: 700, mb: 1, display: 'block', textTransform: 'uppercase' }}>Gender</Typography>
                <FormControl fullWidth>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    displayEmpty
                    sx={{ borderRadius: '12px', bgcolor: '#f7fafc' }}
                  >
                    <MenuItem value="" disabled>Select gender</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="caption" sx={{ color: '#4a5568', fontWeight: 700, mb: 1, display: 'block', textTransform: 'uppercase' }}>Allergies / Notes</Typography>
                <TextField
                  fullWidth
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  placeholder="Describe any known allergies or medical notes..."
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f7fafc' } }}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', gap: 2, mt: 5 }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ 
                  bgcolor: '#0066ff', 
                  py: 1.8, 
                  borderRadius: '12px', 
                  textTransform: 'none', 
                  fontWeight: 800,
                  fontSize: '1rem',
                  boxShadow: '0 8px 20px rgba(0, 102, 255, 0.2)'
                }}
              >
                {loading ? 'Registering...' : 'Register Patient'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/patients')}
                sx={{ 
                  px: 4, 
                  borderRadius: '12px', 
                  borderColor: '#edf2f7', 
                  color: '#4a5568',
                  textTransform: 'none',
                  fontWeight: 700
                }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default PatientRegister;
