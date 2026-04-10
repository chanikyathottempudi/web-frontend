import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Grid,
  Divider,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress
} from '@mui/material';
import { 
  Timeline, 
  HealthAndSafety, 
  Psychology,
  History,
  TrendingDown,
  Person,
  MonitorWeight,
  CalendarMonth,
  Assignment,
  Shield,
  Warning
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import patientService from '../services/patientService';

const PatientSummary = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const data = await patientService.getPatientDetails(id);
        setPatient(data);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatientDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!patient) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">Patient not found</Typography>
      </Box>
    );
  }

  // Map backend data to UI format
  const doseHistory = (patient.daily_doses || []).map(d => ({
    part: 'CT Scan',
    dose: `${d.dose_amount} mSv`,
    severity: d.dose_amount > 2.0 ? 'High' : 'Normal',
    color: d.dose_amount > 2.0 ? '#e53e3e' : '#38a169',
    date: d.date
  }));

  const calculateAge = (dob) => {
    if (!dob) return null;
    try {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    } catch (e) {
      return null;
    }
  };

  const displayAge = patient.age || calculateAge(patient.dob) || 'N/A';

  const biometrics = [
    { label: 'Age', value: `${displayAge} Years`, icon: <Person /> },
    { label: 'Gender', value: patient.gender || 'N/A', icon: <Person /> },
    { label: 'Blood Group', value: patient.blood_group || 'N/A', icon: <HealthAndSafety /> }
  ];

  const totalDose = (patient.daily_doses || []).reduce((sum, d) => sum + parseFloat(d.dose_amount), 0).toFixed(1);

  return (
    <Box sx={{ pb: 8 }}>
      {/* Patient Header Card */}
      <Paper sx={{ p: 4, borderRadius: '24px', mb: 4, bgcolor: 'white', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', bgcolor: '#0066ff' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: '#ebf4ff', color: '#3182ce', fontSize: '2rem', fontWeight: 800 }}>
              {patient.name?.charAt(0) || 'P'}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a202c', mb: 0.5 }}>{patient.name}</Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Typography variant="body1" sx={{ color: '#a0aec0', fontWeight: 700 }}>ID: {patient.patient_id}</Typography>
                <Chip label="ACTIVE" size="small" sx={{ bgcolor: '#f0fff4', color: '#38a169', fontWeight: 800, height: 20 }} />
              </Box>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700, display: 'block' }}>SAFETY COMPLIANCE</Typography>
            <Chip 
              icon={<Shield sx={{ color: 'inherit !important' }} />} 
              label={totalDose > 150 ? "Risk Review Required" : "Optimal Status"} 
              sx={{ bgcolor: totalDose > 150 ? '#fff5f5' : '#f0fff4', color: totalDose > 150 ? '#e53e3e' : '#38a169', fontWeight: 800, mt: 1, px: 1, py: 2.5, borderRadius: '12px' }} 
            />
          </Box>
        </Box>

        <Grid container spacing={4} sx={{ mt: 1 }}>
          <Grid item xs={12} md={2.4}>
            <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Joined Date</Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#2d3748' }}>{new Date(patient.created_at || Date.now()).toLocaleDateString()}</Typography>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Age</Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#2d3748' }}>{displayAge} Yrs</Typography>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Blood Group</Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#2563eb' }}>{patient.blood_group || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Lifetime Dose</Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#e53e3e' }}>{totalDose} mSv</Typography>
          </Grid>
          <Grid item xs={12} md={2.4}>
            <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Health Status</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#38a169', animation: 'pulse 2s infinite' }} />
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#38a169' }}>Stable</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Navigation Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ '& .MuiTab-root': { fontWeight: 800, textTransform: 'none', fontSize: '1rem', minWidth: 120 } }}>
          <Tab label="Detailed Breakdown" />
          <Tab label="Patient Biometrics" />
          <Tab label="AI Risk Analysis" />
          <Tab label="History" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ mt: 2 }}>
        {tabValue === 0 && (
          <Grid container spacing={3}>
            {doseHistory.length > 0 ? doseHistory.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper sx={{ p: 3, borderRadius: '20px', display: 'flex', alignItems: 'center', gap: 2.5, transition: 'all 0.2s', '&:hover': { transform: 'translateY(-4px)', borderColor: '#0066ff' }, border: '1px solid #edf2f7' }}>
                  <Box sx={{ p: 2, borderRadius: '14px', bgcolor: `${item.color}15`, color: item.color, display: 'flex' }}>
                    <TrendingDown sx={{ fontSize: 24 }} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a202c', fontSize: '1rem' }}>{item.part}</Typography>
                    <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700 }}>DOSE: {item.dose}</Typography>
                  </Box>
                  <Chip label={item.severity} size="small" sx={{ bgcolor: `${item.color}15`, color: item.color, fontWeight: 800, fontSize: '0.65rem' }} />
                </Paper>
              </Grid>
            )) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="body1" sx={{ color: '#a0aec0' }}>No dose records found for this patient.</Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        )}

        {tabValue === 1 && (
          <Grid container spacing={3}>
            {biometrics.map((bio, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper sx={{ p: 3, borderRadius: '20px', textAlign: 'center', border: '1px solid #edf2f7' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, color: '#0066ff' }}>
                    {React.cloneElement(bio.icon, { fontSize: 'large' })}
                  </Box>
                  <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 800, textTransform: 'uppercase' }}>{bio.label}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a202c', mt: 0.5 }}>{bio.value}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {tabValue === 2 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Paper sx={{ p: 4, borderRadius: '24px', bgcolor: '#f7fafc', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #cbd5e0' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Psychology sx={{ fontSize: 80, color: '#e2e8f0', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: '#a0aec0', fontWeight: 600 }}>Running Neural Risk Correlation...</Typography>
                  <LinearProgress sx={{ mt: 3, width: 200, borderRadius: 5, height: 6 }} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#4a5568', mb: 3 }}>Predictive Insights</Typography>
              <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { title: 'Cumulative Risk', val: 'Low', color: '#38a169', icon: <Shield /> },
                  { title: 'Dose Anomaly', val: 'None Detected', color: '#38a169', icon: <Assignment /> },
                  { title: 'Protocol Correction', val: 'Recommended', color: '#ecc94b', icon: <History /> }
                ].map((item, i) => (
                  <ListItem key={i} sx={{ bgcolor: 'white', borderRadius: '16px', border: '1px solid #edf2f7', py: 2 }}>
                    <ListItemIcon sx={{ color: item.color }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={<Typography sx={{ fontWeight: 800, fontSize: '0.9rem' }}>{item.title}</Typography>} secondary={<Typography sx={{ color: item.color, fontWeight: 700, fontSize: '0.8rem' }}>{item.val}</Typography>} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        )}

        {tabValue === 3 && (
          <Paper sx={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid #edf2f7' }}>
            <List disablePadding>
              {doseHistory.length > 0 ? doseHistory.map((item, index) => (
                <Box key={index}>
                  <ListItem sx={{ py: 2, px: 3, '&:hover': { bgcolor: '#f7fafc' } }}>
                    <ListItemIcon><CalendarMonth sx={{ color: '#0066ff' }} /></ListItemIcon>
                    <ListItemText 
                      primary={<Typography sx={{ fontWeight: 800 }}>Dose Scan: {item.part}</Typography>} 
                      secondary={<Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 600 }}>Conducted on {new Date(item.date).toLocaleDateString()} • Result: {item.dose}</Typography>} 
                    />
                    <Chip label="VERIFIED" size="small" variant="outlined" sx={{ color: '#0066ff', borderColor: '#0066ff', fontWeight: 800, fontSize: '0.6rem' }} />
                  </ListItem>
                  {index < doseHistory.length - 1 && <Divider />}
                </Box>
              )) : (
                <ListItem sx={{ py: 4, justifyContent: 'center' }}>
                  <Typography variant="body1" sx={{ color: '#a0aec0' }}>No scan history recorded.</Typography>
                </ListItem>
              )}
            </List>
          </Paper>
        )}
      </Box>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default PatientSummary;
