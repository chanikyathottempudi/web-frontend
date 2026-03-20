import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  IconButton,
  Link
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset password for:', email);
    // Simulate navigation to success or verification
  };

  return (
    <Box 
      sx={{ 
        bgcolor: '#000033', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        color: 'white'
      }}
    >
      <Box sx={{ p: 2 }}>
        <IconButton onClick={() => navigate('/login')} sx={{ color: 'white' }}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Container maxWidth="xs" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          Forgot Password
        </Typography>
        <Typography variant="body2" sx={{ color: '#cccccc', mb: 6 }}>
          Enter your registered email address and we'll send you instructions to reset your password.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#cccccc' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              },
              '& .MuiInputLabel-root': { color: '#cccccc' },
              '& .MuiInputBase-input': { color: 'white' }
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 4, 
              mb: 2, 
              bgcolor: '#0066ff', 
              borderRadius: '24px',
              py: 1.5,
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            Reset Password
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
