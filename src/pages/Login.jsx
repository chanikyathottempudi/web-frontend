import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  IconButton, 
  InputAdornment,
  Link,
  Paper,
  Avatar
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  HealthAndSafety,
  LockOutlined
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    try {
      await authService.login(email, password);
      navigate('/dashboard');
    } catch (err) {
      if (err.response) {
        const errorMsg = err.response.data?.error || err.response.data?.detail || `Error ${err.response.status}: ${err.message}`;
        setError(errorMsg);
      } else if (err.request) {
        setError('Server not reachable (Network Error). Please check if backend is running.');
      } else {
        setError(`Login Error: ${err.message}`);
      }
      console.error('Login error detail:', err.response?.data || err);
    }
  };

  return (
    <Box sx={{ bgcolor: '#f7fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
      <Container maxWidth="xs">
        <Paper sx={{ p: 5, borderRadius: '32px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: '#ebf4ff', color: '#0066ff', mb: 2 }}>
              <HealthAndSafety fontSize="large" />
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#1a202c', letterSpacing: '-0.5px' }}>VentGuard</Typography>
            <Typography variant="body2" sx={{ color: '#a0aec0', fontWeight: 600, mt: 0.5 }}>Clinical Analytics Portal</Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            {error && (
              <Paper sx={{ p: 2, mb: 3, bgcolor: '#fff5f5', border: '1px solid #feb2b2', borderRadius: '12px' }}>
                <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>{error}</Typography>
              </Paper>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Professional Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px', bgcolor: '#f7fafc' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end" sx={{ color: '#a0aec0' }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '14px', bgcolor: '#f7fafc' } }}
            />
            
            <Box sx={{ textAlign: 'right', mt: 1 }}>
              <Link 
                component="button"
                type="button"
                variant="caption" 
                onClick={() => navigate('/forgot-password')}
                sx={{ color: '#718096', fontWeight: 700, textDecoration: 'none' }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<LockOutlined />}
              sx={{ 
                mt: 4, 
                mb: 3, 
                bgcolor: '#0066ff', 
                borderRadius: '14px',
                py: 1.8,
                textTransform: 'none',
                fontWeight: 800,
                fontSize: '1rem',
                boxShadow: '0 8px 16px rgba(0, 102, 255, 0.2)'
              }}
            >
              Access Secure Portal
            </Button>
          </Box>

          <Typography variant="body2" sx={{ color: '#a0aec0', fontWeight: 600 }}>
            Authorized Personnel Only. {' '}
            <Link 
              component="button"
              type="button"
              onClick={() => navigate('/signup')}
              sx={{ color: '#0066ff', fontWeight: 800, textDecoration: 'none' }}
            >
              Request Access
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
