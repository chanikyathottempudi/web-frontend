import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  TextField, 
  Avatar, 
  Fab,
  InputAdornment,
  Paper,
  CircularProgress,
  Grid,
  Button,
  Chip,
  Divider
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon, 
  Search as SearchIcon, 
  Add as AddIcon,
  DeleteOutline as DeleteIcon,
  FilterList,
  MoreVert
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import patientService from '../services/patientService';

const PatientList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await patientService.getPatients();
        setPatients(data);
      } catch (err) {
        setError('Failed to fetch patients');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ pb: 8 }}>
      {/* Search and Filters */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          placeholder="Search by name or ID..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ 
            flexGrow: 1, 
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              bgcolor: 'white',
              height: 48,
              '& fieldset': { borderColor: '#edf2f7' },
              '&:hover fieldset': { borderColor: '#e2e8f0' },
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#a0aec0' }} />
              </InputAdornment>
            ),
          }}
        />
        <Button 
          variant="outlined" 
          startIcon={<FilterList />}
          sx={{ 
            borderRadius: '12px', 
            height: 48, 
            color: '#4a5568', 
            borderColor: '#edf2f7',
            bgcolor: 'white',
            textTransform: 'none',
            fontSize: '0.9rem'
          }}
        >
          Filters
        </Button>
      </Box>

      {/* Patient Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress sx={{ color: '#0066ff' }} />
        </Box>
      ) : error ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '20px', bgcolor: '#fff5f5' }}>
          <Typography color="error" variant="body1" sx={{ fontWeight: 600 }}>{error}</Typography>
          <Button sx={{ mt: 2 }} onClick={() => window.location.reload()}>Retry</Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredPatients.map((patient) => (
            <Grid item xs={12} sm={6} lg={4} key={patient.id || patient.patient_id}>
              <Paper 
                onClick={() => navigate(`/patient/${patient.id}`)}
                sx={{ 
                  p: 2.5, 
                  borderRadius: '20px', 
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      width: 50, 
                      height: 50, 
                      bgcolor: '#ebf4ff', 
                      color: '#3182ce', 
                      fontWeight: 700,
                      fontSize: '1.2rem'
                    }}
                  >
                    {patient.name?.charAt(0) || 'P'}
                  </Avatar>
                  <IconButton size="small" sx={{ color: '#a0aec0' }}>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a202c', mb: 0.5 }}>
                    {patient.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 600, display: 'block' }}>
                    PATIENT ID: {patient.patient_id || patient.id}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2, opacity: 0.5 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip 
                    label="Stable" 
                    size="small" 
                    sx={{ bgcolor: '#f0fff4', color: '#38a169', fontWeight: 700, fontSize: '0.7rem' }} 
                  />
                  <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 600 }}>
                    Last Scan: 2h ago
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* FAB */}
      <Fab 
        onClick={() => navigate('/register-patient')}
        sx={{ 
          position: 'fixed', 
          bottom: 32, 
          right: 32, 
          bgcolor: '#0066ff',
          color: 'white',
          '&:hover': { bgcolor: '#0052cc' },
          boxShadow: '0 8px 16px rgba(0, 102, 255, 0.3)'
        }} 
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default PatientList;
