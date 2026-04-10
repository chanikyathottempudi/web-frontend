import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Chip, 
  Divider,
  CircularProgress,
  Button
} from '@mui/material';
import { 
  ArrowBack, 
  NotificationsActive,
  History
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import patientService from '../services/patientService';

const SystemLogs = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await patientService.getRecentAlerts();
        setAlerts(response.data || [
          { id: 1, patient_name: 'John Doe', alert_level: 'CRITICAL', description: 'Oxygen saturation dropped below 85%', room_number: '101', created_at: new Date().toISOString() },
          { id: 2, patient_name: 'Jane Smith', alert_level: 'WARNING', description: 'Heart rate slightly elevated', room_number: '204', created_at: new Date().toISOString() },
        ]);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', pb: 8, px: 2 }}>
      {/* Android Style Header */}
      <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <IconButton 
          onClick={() => navigate('/dashboard')} 
          sx={{ position: 'absolute', left: 0, top: 0, color: '#0f172a' }}
        >
          <ArrowBack />
        </IconButton>
        
        <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a', mb: 0.5 }}>
          Alerts
        </Typography>
        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
          {alerts.length} Active Alerts
        </Typography>
      </Box>

      {/* Tab Style Row */}
      <Box sx={{ mb: 3, borderBottom: '2px solid #2563eb' }}>
        <Typography variant="body2" sx={{ 
          display: 'inline-block', 
          color: '#2563eb', 
          fontWeight: 900, 
          pb: 1, 
          px: 2,
          borderBottom: '4px solid #2563eb' 
        }}>
          All
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress sx={{ color: '#2563eb' }} />
        </Box>
      ) : (
        <Paper className="glass-card" sx={{ overflow: 'hidden' }}>
          <List disablePadding>
            {alerts.map((alert, index) => (
              <React.Fragment key={alert.id}>
                <ListItem sx={{ py: 3, px: 4, '&:hover': { bgcolor: 'rgba(0,0,0,0.01)' } }}>
                  <ListItemAvatar sx={{ minWidth: 70 }}>
                    <Avatar sx={{ 
                      width: 50, 
                      height: 50, 
                      bgcolor: 'rgba(37, 99, 235, 0.08)', 
                      color: '#2563eb',
                      border: '1px solid rgba(37, 99, 235, 0.1)'
                    }}>
                      <NotificationsActive />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                        <Typography sx={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem' }}>
                          {alert.patient_name || "Unknown Patient"}
                        </Typography>
                        <Chip 
                          label={alert.alert_level} 
                          size="small" 
                          sx={{ 
                            bgcolor: alert.alert_level === 'CRITICAL' ? '#fee2e2' : '#fef3c7',
                            color: alert.alert_level === 'CRITICAL' ? '#dc2626' : '#d97706',
                            fontWeight: 800,
                            fontSize: '0.65rem'
                          }} 
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" sx={{ color: '#475569', mb: 1 }}>{alert.description}</Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>
                            ROOM: {alert.room_number || "302"}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>
                            {new Date(alert.created_at).toLocaleTimeString()}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                  <Button 
                    variant="outlined" 
                    size="small"
                    sx={{ 
                      borderRadius: '10px', 
                      color: '#2563eb', 
                      borderColor: 'rgba(37, 99, 235, 0.2)',
                      textTransform: 'none',
                      fontWeight: 700,
                      '&:hover': { bgcolor: 'rgba(37, 99, 235, 0.05)', borderColor: '#2563eb' }
                    }}
                  >
                    View Details
                  </Button>
                </ListItem>
                {index < alerts.length - 1 && <Divider sx={{ opacity: 0.5, mx: 4 }} />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {/* Technical Logs Footer */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button 
          startIcon={<History />}
          onClick={() => alert("System Audit Logs portal is accessible via Admin settings.")}
          sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'none', '&:hover': { color: '#0f172a' } }}
        >
          View Technical System Logs
        </Button>
      </Box>
    </Box>
  );
};

export default SystemLogs;
