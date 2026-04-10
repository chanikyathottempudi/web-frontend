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
  Card,
  CardContent,
  Button,
  Chip,
  Tooltip,
  Grow,
  Divider,
  Stack
} from '@mui/material';
import { 
  ArrowBack, 
  Search, 
  Add,
  Delete,
  FilterList,
  History,
  Person,
  ChevronRight,
  Badge
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import patientService from '../services/patientService';

const PatientList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await patientService.getPatients();
        setPatients(data);
      } catch (err) {
        console.error("Failed to fetch patients:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this patient record?")) {
      try {
        await patientService.deletePatient(id);
        setPatients(patients.filter(p => (p.id !== id && p.patient_id !== id)));
      } catch (err) {
        alert("Failed to delete patient");
      }
    }
  };

  const filteredPatients = patients.filter(patient => 
    patient.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.patient_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', pb: 12 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate('/dashboard')} sx={{ color: '#0f172a', bgcolor: 'white', '&:hover': { bgcolor: '#f1f5f9' }, border: '1px solid #e2e8f0' }}>
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: -1 }}>
              Patient Database
            </Typography>
            <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 700 }}>
              {filteredPatients.length} professional records active
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              placeholder="Filter by name or ID..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ 
                width: 300,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                  bgcolor: 'white',
                  height: 48,
                  '& fieldset': { borderColor: '#e2e8f0' },
                  '&:hover fieldset': { borderColor: '#2563eb' },
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#94a3b8' }} />
                  </InputAdornment>
                ),
              }}
            />
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress sx={{ color: '#2563eb' }} />
        </Box>
      ) : (
        <Box>
          {filteredPatients.length === 0 ? (
            <Paper sx={{ p: 10, textAlign: 'center', borderRadius: '32px', bgcolor: 'rgba(255,255,255,0.4)', border: '1px dashed #cbd5e1' }}>
              <Person sx={{ fontSize: 60, color: '#94a3b8', mb: 2 }} />
              <Typography sx={{ color: '#64748b', fontWeight: 800 }}>No patient records matching your search.</Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredPatients.map((patient, index) => (
                <Grid item xs={12} sm={6} md={4} key={patient.id || patient.patient_id}>
                  <Grow in={true} timeout={(index + 1) * 100}>
                    <Card 
                      onClick={() => navigate(`/patient/${patient.id || patient.patient_id}`)}
                      sx={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        borderRadius: '24px',
                        bgcolor: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(226, 232, 240, 0.5)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': { 
                          transform: 'translateY(-8px)', 
                          bgcolor: 'rgba(255,255,255,0.9)',
                          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.1)',
                          borderColor: '#2563eb'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 3, flexGrow: 1, textAlign: 'center' }}>
                        <Box sx={{ position: 'relative', mb: 2, display: 'inline-block' }}>
                          <Avatar 
                            sx={{ 
                              width: 80, 
                              height: 80, 
                              mx: 'auto',
                              bgcolor: '#f1f5f9', 
                              color: '#2563eb', 
                              fontSize: '2rem', 
                              fontWeight: 900,
                              border: '2px solid #e2e8f0'
                            }}
                          >
                            {patient.name?.charAt(0) || 'P'}
                          </Avatar>
                          <IconButton 
                            onClick={(e) => handleDelete(e, patient.id || patient.patient_id)}
                            sx={{ 
                              position: 'absolute', 
                              top: -5, 
                              right: -5, 
                              bgcolor: 'white', 
                              color: '#D32F2F', 
                              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                              '&:hover': { bgcolor: '#fee2e2' },
                              width: 32,
                              height: 32
                            }}
                          >
                            <Delete sx={{ fontSize: 18 }} />
                          </IconButton>
                        </Box>
                        
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5, lineHeight: 1.2 }}>
                          {patient.name}
                        </Typography>
                        
                        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, mb: 2 }}>
                          ID: {patient.patient_id || patient.id}
                        </Typography>
                        
                        <Divider sx={{ mb: 2, opacity: 0.5 }} />
                        
                        <Button 
                          fullWidth
                          variant="contained"
                          disableElevation
                          sx={{ 
                            borderRadius: '12px',
                            bgcolor: '#f1f5f9',
                            color: '#2563eb',
                            fontWeight: 700,
                            '&:hover': { bgcolor: '#e2e8f0' },
                            textTransform: 'none'
                          }}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {/* FAB for Adding Patient */}
      <Fab 
        onClick={() => navigate('/register-patient')}
        sx={{ 
          position: 'fixed', 
          bottom: 40, 
          right: 40, 
          bgcolor: '#2563eb',
          color: 'white',
          width: 64,
          height: 64,
          '&:hover': { bgcolor: '#1d4ed8', transform: 'scale(1.05)' },
          boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }} 
      >
        <Add sx={{ fontSize: 32 }} />
      </Fab>
    </Box>
  );
};

export default PatientList;
