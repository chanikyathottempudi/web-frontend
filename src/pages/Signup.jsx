import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  IconButton, 
  MenuItem, 
  Select, 
  FormControl, 
  Link,
  Paper,
  Avatar,
  Grid
} from '@mui/material';
import { ArrowBack, PersonAddOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await authService.signup({
        full_name: formData.fullName,
        email: formData.email,
        role: formData.role,
        password: formData.password
      });
      setSuccess('Account request submitted successfully! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        const errorMsg = err.response.data.error || 'Signup failed';
        setError(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
      } else {
        setError('Signup failed. Please check your connection.');
      }
    }
  };

  return (
    <Box sx={{ bgcolor: '#f7fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 5, borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => navigate('/login')} sx={{ bgcolor: '#f7fafc', color: '#4a5568' }}>
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900, color: '#1a202c' }}>Request Access</Typography>
              <Typography variant="body2" sx={{ color: '#a0aec0', fontWeight: 600 }}>Create your professional account</Typography>
            </Box>
          </Box>

          <form onSubmit={handleSubmit}>
            {error && (
              <Paper sx={{ p: 2, mb: 3, bgcolor: '#fff5f5', border: '1px solid #feb2b2', borderRadius: '12px' }}>
                <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>{error}</Typography>
              </Paper>
            )}
            {success && (
              <Paper sx={{ p: 2, mb: 3, bgcolor: '#f0fff4', border: '1px solid #9ae6b4', borderRadius: '12px' }}>
                <Typography sx={{ color: '#38a169', fontWeight: 600, variant: 'body2' }}>{success}</Typography>
              </Paper>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="caption" sx={{ color: '#4a5568', fontWeight: 700, mb: 1, display: 'block' }}>Full Name</Typography>
                <TextField
                  fullWidth
                  name="fullName"
                  placeholder="Dr. Emily Carter"
                  value={formData.fullName}
                  onChange={handleChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f7fafc' } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="caption" sx={{ color: '#4a5568', fontWeight: 700, mb: 1, display: 'block' }}>Professional Email</Typography>
                <TextField
                  fullWidth
                  name="email"
                  placeholder="emily.carter@hospital.com"
                  value={formData.email}
                  onChange={handleChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f7fafc' } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="caption" sx={{ color: '#4a5568', fontWeight: 700, mb: 1, display: 'block' }}>Clinical Role</Typography>
                <FormControl fullWidth>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    displayEmpty
                    sx={{ borderRadius: '12px', bgcolor: '#f7fafc' }}
                  >
                    <MenuItem value="" disabled>Select Role</MenuItem>
                    <MenuItem value="Doctor">Doctor</MenuItem>
                    <MenuItem value="Nurse">Nurse</MenuItem>
                    <MenuItem value="Admin">System Administrator</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ color: '#4a5568', fontWeight: 700, mb: 1, display: 'block' }}>Password</Typography>
                <TextField
                  fullWidth
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f7fafc' } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ color: '#4a5568', fontWeight: 700, mb: 1, display: 'block' }}>Confirm Password</Typography>
                <TextField
                  fullWidth
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f7fafc' } }}
                />
              </Grid>
            </Grid>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              startIcon={<PersonAddOutlined />}
              sx={{ 
                mt: 4, 
                mb: 2, 
                bgcolor: '#0066ff', 
                borderRadius: '12px',
                py: 1.8,
                textTransform: 'none',
                fontWeight: 800,
                fontSize: '1rem',
                boxShadow: '0 8px 16px rgba(0, 102, 255, 0.2)'
              }}
            >
              Initialize Account Request
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#a0aec0', fontWeight: 600 }}>
              Already registered? {' '}
              <Link 
                component="button"
                type="button"
                onClick={() => navigate('/login')}
                sx={{ color: '#0066ff', fontWeight: 800, textDecoration: 'none' }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
