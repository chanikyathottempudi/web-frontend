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
  Grid,
  IconButton,
  CircularProgress
} from '@mui/material';
import { PersonAdd, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import patientService from '../services/patientService';

const PatientRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    patient_id: '',
    allergies: '',
    age: '',
    blood_group: '',
    clinical_notes: ''
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
      const payload = { ...formData, allergies: formData.allergies.trim() || 'None' };
      await patientService.registerPatient(payload);
      navigate('/patients');
    } catch (err) {
      const serverError = err.response?.data;
      if (serverError && typeof serverError === 'object') {
        const firstKey = Object.keys(serverError)[0];
        const errorMsg = Array.isArray(serverError[firstKey]) ? serverError[firstKey][0] : serverError[firstKey];
        setError(`${firstKey}: ${errorMsg}`);
      } else {
        setError('Registration failed. Please check inputs.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ pb: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
            <IconButton onClick={() => navigate('/patients')} sx={{ color: '#0f172a' }}>
                <ArrowBack />
            </IconButton>
            <Typography variant="h5" sx={{ 
                fontWeight: 900, 
                flexGrow: 1, 
                textAlign: 'center',
                color: '#0f172a',
                letterSpacing: -0.5
            }}>
                Patient Registration
            </Typography>
        </Box>

        <Paper className="glass-card" sx={{ p: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 6 }}>
            <Box sx={{ 
                p: 2, 
                borderRadius: '16px', 
                bgcolor: 'rgba(37, 99, 235, 0.08)', 
                color: '#2563eb',
                border: '1px solid rgba(37, 99, 235, 0.1)'
            }}>
              <PersonAdd sx={{ fontSize: 32 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>New Patient Entry</Typography>
              <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>Create a secure medical profile</Typography>
            </Box>
          </Box>

          <form onSubmit={handleSubmit}>
            {error && (
              <Paper sx={{ p: 2, mb: 5, bgcolor: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '12px' }}>
                <Typography color="#dc2626" variant="body2" sx={{ fontWeight: 800 }}>Error encountered: {error}</Typography>
              </Paper>
            )}

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>Full Name</Typography>
                <TextField
                  fullWidth
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ethan Carter"
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: '16px', 
                      bgcolor: '#f8fafc',
                      color: '#0f172a',
                      '& fieldset': { borderColor: '#e2e8f0' },
                      '&:hover fieldset': { borderColor: '#2563eb' }
                    } 
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>Patient ID</Typography>
                <TextField
                  fullWidth
                  required
                  name="patient_id"
                  value={formData.patient_id}
                  onChange={handleChange}
                  placeholder="e.g. VG-2024-001"
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: '16px', 
                      bgcolor: '#f8fafc',
                      color: '#0f172a',
                      '& fieldset': { borderColor: '#e2e8f0' },
                      '&:hover fieldset': { borderColor: '#2563eb' }
                    } 
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>Date of Birth</Typography>
                <TextField
                  fullWidth
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: '16px', 
                      bgcolor: '#f8fafc',
                      color: '#0f172a',
                      '& fieldset': { borderColor: '#e2e8f0' },
                      '&:hover fieldset': { borderColor: '#2563eb' }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>Gender</Typography>
                <FormControl fullWidth>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    displayEmpty
                    required
                    sx={{ 
                        borderRadius: '16px', 
                        bgcolor: '#f8fafc',
                        color: formData.gender ? '#0f172a' : '#94a3b8',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#2563eb' },
                        '& .MuiSelect-icon': { color: '#94a3b8' }
                    }}
                  >
                    <MenuItem value="" disabled>Select gender</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>Age (Years)</Typography>
                <TextField
                  fullWidth
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g. 24"
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: '16px', 
                      bgcolor: '#f8fafc',
                      color: '#0f172a',
                      '& fieldset': { borderColor: '#e2e8f0' },
                      '&:hover fieldset': { borderColor: '#2563eb' }
                    } 
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>Blood Group</Typography>
                <TextField
                  fullWidth
                  name="blood_group"
                  value={formData.blood_group}
                  onChange={handleChange}
                  placeholder="e.g. O+, B-"
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: '16px', 
                      bgcolor: '#f8fafc',
                      color: '#0f172a',
                      '& fieldset': { borderColor: '#e2e8f0' },
                      '&:hover fieldset': { borderColor: '#2563eb' }
                    } 
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>Allergies</Typography>
                <TextField
                  fullWidth
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="e.g. Penicillin, Peanuts (or 'None')"
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: '16px', 
                      bgcolor: '#f8fafc',
                      color: '#0f172a',
                      '& fieldset': { borderColor: '#e2e8f0' },
                      '&:hover fieldset': { borderColor: '#2563eb' }
                    } 
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, mb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>Clinical History & Notes</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  name="clinical_notes"
                  value={formData.clinical_notes || ''}
                  onChange={handleChange}
                  placeholder="Brief summary of patient history, primary diagnosis..."
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: '16px', 
                      bgcolor: '#f8fafc',
                      color: '#0f172a',
                      '& fieldset': { borderColor: '#e2e8f0' },
                      '&:hover fieldset': { borderColor: '#2563eb' }
                    } 
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', gap: 3, mt: 6 }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ 
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
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Register Patient Record'}
              </Button>
              <Button
                onClick={() => navigate('/patients')}
                sx={{ 
                  px: 4, 
                  borderRadius: '16px', 
                  color: '#64748b',
                  bgcolor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  textTransform: 'none',
                  fontWeight: 700,
                  '&:hover': { bgcolor: '#f8fafc', color: '#0f172a' }
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
