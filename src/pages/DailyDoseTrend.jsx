import React from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText, 
  Paper,
  BottomNavigation,
  BottomNavigationAction
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon, 
  Home, 
  People, 
  Settings 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DailyDoseTrend = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  // Mock data for daily trend
  const trends = [
    { id: '1', date: 'Oct 24, 2023', dose: '1.2 mSv', status: 'Optimal' },
    { id: '2', date: 'Oct 23, 2023', dose: '2.5 mSv', status: 'High' },
    { id: '3', date: 'Oct 22, 2023', dose: '0.8 mSv', status: 'Optimal' }
  ];

  return (
    <Box sx={{ bgcolor: '#000033', minHeight: '100vh', color: 'white', pb: 7 }}>
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => navigate('/dashboard')} sx={{ color: 'white' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
          Daily Dose Trend
        </Typography>
      </Box>

      {/* Trend List */}
      <List sx={{ px: 2 }}>
        {trends.map((item) => (
          <ListItem 
            key={item.id} 
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.05)', 
              borderRadius: 2, 
              mb: 1.5,
              borderLeft: `5px solid ${item.status === 'High' ? '#D32F2F' : '#4caf50'}`
            }}
          >
            <ListItemText
              primary={
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  {item.date}
                </Typography>
              }
              secondary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                  <Typography variant="body2" sx={{ color: '#ccc' }}>
                    Total Dose: {item.dose}
                  </Typography>
                  <Typography variant="body2" sx={{ color: item.status === 'High' ? '#D32F2F' : '#4caf50' }}>
                    {item.status}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>

      {/* Bottom Navigation */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction label="Home" icon={<Home />} />
          <BottomNavigationAction label="Patients" icon={<People />} />
          <BottomNavigationAction label="Settings" icon={<Settings />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default DailyDoseTrend;
