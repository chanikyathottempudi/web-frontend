import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  CircularProgress, 
  Button, 
  LinearProgress,
  Avatar,
  IconButton,
  Chip,
  Tooltip,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Stack,
  Card,
  Autocomplete,
  TextField
} from '@mui/material';
import { 
  Security, 
  AutoGraph, 
  Warning, 
  CheckCircle, 
  Info, 
  ArrowBack,
  PlayArrow,
  Insights,
  Shield,
  HealthAndSafety,
  Person,
  Rule,
  Stars,
  SafetyDivider
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import aiService from '../services/aiService';
import patientService from '../services/patientService';

const AiRiskScore = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [riskData, setRiskData] = useState(null);
  const [patient, setPatient] = useState(null);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Handle auto-start from navigation state (e.g. from RealTimeMonitor)
  useEffect(() => {
    if (!loading && patients.length > 0 && location.state?.autoStart && location.state?.patientId) {
      const target = patients.find(p => p.patient_id === location.state.patientId);
      if (target) {
        setPatient(target);
        // Clear state to prevent re-trigger on refresh
        window.history.replaceState({}, document.title);
        
        // Trigger manual analysis for this specific patient
        const runAutoAnalysis = async () => {
          setCalculating(true);
          try {
            await fetchRiskData(target.patient_id);
            // Optionally trigger a fresh calculation
            const result = await aiService.calculateRisk(target.patient_id);
            if (result.success) {
              setRiskData(result.data);
            }
          } catch (err) {
            console.error("Auto analysis failed:", err);
          } finally {
            setCalculating(false);
          }
        };
        runAutoAnalysis();
      }
    }
  }, [loading, patients, location.state]);

  const fetchInitialData = async () => {
    try {
      const patientList = await patientService.getPatients();
      setPatients(patientList);
      if (patientList.length > 0) {
        const targetPatient = patientList[0];
        setPatient(targetPatient);
        await fetchRiskData(targetPatient.patient_id);
      }
    } catch (err) {
      console.error("AI Data fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRiskData = async (patientId) => {
    try {
      const result = await aiService.getRiskByPatient(patientId);
      if (result.success) {
        setRiskData(result.data);
      } else {
        setRiskData(null);
      }
    } catch (err) {
      console.error("Risk data fetch failed:", err);
      setRiskData(null);
    }
  };

  const handlePatientSelect = async (event, newValue) => {
    if (newValue) {
      setPatient(newValue);
      setCalculating(true);
      await fetchRiskData(newValue.patient_id);
      setCalculating(false);
    }
  };

  const handleStartAnalysis = async () => {
    if (!patient) return;
    setCalculating(true);
    try {
      const result = await aiService.calculateRisk(patient.patient_id);
      if (result.success) {
        setRiskData(result.data);
      }
    } catch (err) {
      alert("AI Analysis failed. Checking backend connectivity...");
    } finally {
      setCalculating(false);
    }
  };

  const aiSteps = [
    {
      label: 'Intelligent Context Intake',
      description: `CT DOSE AI analyzes patient age (${patient?.age || 'N/A'}) and clinical history to establish a safety baseline.`,
      icon: <Person />
    },
    {
      label: 'Reference Level Guarding',
      description: 'AI compares current machine settings (kVp/mAs) against Pediatric Reference Levels (PRLs).',
      icon: <Shield />
    },
    {
      label: 'Cumulative Risk Forecasting',
      description: 'The engine predicts future radiation exposure across the next 12 months based on scan frequency.',
      icon: <AutoGraph />
    },
    {
      label: 'Clinical Guidance Generation',
      description: 'Final generation of actionable insights to minimize dose while maintaining diagnostic quality.',
      icon: <HealthAndSafety />
    }
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress sx={{ color: '#2563eb' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', pb: 8 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <IconButton onClick={() => navigate('/dashboard')} sx={{ color: '#0f172a', bgcolor: 'white', '&:hover': { bgcolor: '#f1f5f9' } }}>
          <ArrowBack />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: -1 }}>
            CT DOSE Intelligence
          </Typography>
          <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 700 }}>
            Predictive Pediatric Radiation Protection
          </Typography>
        </Box>
        <Autocomplete
          options={patients}
          getOptionLabel={(option) => `${option.name} (${option.patient_id})`}
          value={patient}
          onChange={handlePatientSelect}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="Select Patient for Analysis" 
              variant="outlined"
              sx={{ 
                width: 320,
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '12px',
                  bgcolor: 'white'
                }
              }}
            />
          )}
          sx={{ ml: 'auto' }}
        />
      </Box>

      <Grid container spacing={4}>
        {/* Main Score Area */}
        <Grid item xs={12} md={5}>
          <Paper className="glass-card" sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Avatar sx={{ bgcolor: 'rgba(37, 99, 235, 0.05)', color: '#2563eb', width: 80, height: 80, mb: 3 }}>
              <Security sx={{ fontSize: 40 }} />
            </Avatar>
            
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                Overall Safety Score
            </Typography>
            
            <Box sx={{ position: 'relative', display: 'inline-flex', my: 4 }}>
              <CircularProgress 
                variant="determinate" 
                value={riskData ? riskData.high_risk_value : 0} 
                size={160} 
                thickness={6}
                sx={{ 
                    color: riskData ? (riskData.high_risk_value > 70 ? '#ef4444' : '#2563eb') : '#e2e8f0',
                    transition: 'all 0.5s ease'
                }}
              />
              <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a' }}>
                  {riskData ? riskData.high_risk_value : '--'}
                </Typography>
              </Box>
            </Box>

            <Typography sx={{ color: '#1e293b', fontWeight: 700, mb: 4, px: 2, lineHeight: 1.4 }}>
              {riskData ? riskData.high_risk_desc : "Select a patient and start an intelligence scan to assess safety."}
            </Typography>

            <Button 
              variant="contained" 
              fullWidth
              disabled={calculating || !patient}
              onClick={handleStartAnalysis}
              startIcon={calculating ? <CircularProgress size={20} color="inherit" /> : <PlayArrow />}
              sx={{ 
                height: 56, 
                borderRadius: '16px', 
                bgcolor: '#2563eb', 
                fontWeight: 800,
                boxShadow: '0 10px 20px rgba(37, 99, 235, 0.2)',
                '&:hover': { bgcolor: '#1d4ed8' },
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              {calculating ? 'Processing CT DOSE AI...' : 'Start Intelligence Scan'}
            </Button>
          </Paper>
        </Grid>

        {/* AI Explanation Area */}
        <Grid item xs={12} md={7}>
          <Paper className="glass-card" sx={{ p: 4, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Insights sx={{ color: '#2563eb' }} />
              How CT DOSE AI Works
            </Typography>
            
            <Stepper orientation="vertical">
              {aiSteps.map((step, index) => (
                <Step key={step.label} active={true}>
                  <StepLabel 
                    StepIconComponent={() => (
                      <Box sx={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: '50%', 
                          bgcolor: '#f1f5f9', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          color: '#2563eb',
                          fontWeight: 900,
                          fontSize: '0.85rem',
                          border: '2px solid rgba(37, 99, 235, 0.1)'
                      }}>
                        {index + 1}
                      </Box>
                    )}
                  >
                    <Typography sx={{ fontWeight: 800, color: '#0f172a' }}>{step.label}</Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.9rem', mb: 2 }}>
                      {step.description}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(37, 99, 235, 0.03)', borderRadius: '16px', border: '1px solid rgba(37, 99, 235, 0.1)' }}>
                <Typography variant="caption" sx={{ color: '#2563eb', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1, textTransform: 'uppercase', letterSpacing: 1 }}>
                    <Shield sx={{ fontSize: 16 }} />
                    AI STATUS: CLINICAL GUARD ACTIVE
                </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Detailed Metrics */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {[
              { label: 'Pediatric Shielding', value: riskData?.pediatric_risk_value || 0, desc: riskData?.pediatric_risk_desc, icon: <Shield /> },
              { label: 'Protocol Deviations', value: riskData?.protocol_deviations_value || 0, desc: riskData?.protocol_deviations_desc, icon: <HealthAndSafety /> },
              { label: 'Intelligence Confidence', value: riskData?.confidence_level === 'High' ? 100 : 50, desc: `AI calculation confidence: ${riskData?.confidence_level || 'N/A'}`, icon: <CheckCircle /> }
            ].map((m, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Paper className="glass-card" sx={{ p: 3 }}>
                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography sx={{ fontWeight: 800, color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1 }}>{m.label}</Typography>
                      <Box sx={{ color: '#2563eb' }}>{m.icon}</Box>
                   </Box>
                   <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a', mb: 1 }}>
                      {m.value}%
                   </Typography>
                   <LinearProgress 
                      variant="determinate" 
                      value={m.value} 
                      sx={{ 
                          height: 6, 
                          borderRadius: 3, 
                          bgcolor: '#f1f5f9', 
                          '& .MuiLinearProgress-bar': { bgcolor: '#2563eb' } 
                      }} 
                   />
                   <Typography variant="caption" sx={{ color: '#64748b', mt: 1.5, display: 'block', fontWeight: 700, lineHeight: 1.4 }}>
                      {m.desc || "Awaiting intelligence scan..."}
                   </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AiRiskScore;
