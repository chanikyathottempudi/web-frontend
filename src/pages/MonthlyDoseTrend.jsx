import React from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Grid, 
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

const MonthlyDoseTrend = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ bgcolor: '#000033', minHeight: '100vh', color: 'white', pb: 7 }}>
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => navigate('/dashboard')} sx={{ color: 'white' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
          Monthly Dose Trend
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Month Comparison */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={6} sx={{ textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: '#aaa' }}>Current Month</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>45 mSv</Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: '#aaa' }}>Previous Month</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>38 mSv</Typography>
          </Grid>
        </Grid>

        {/* Bar Chart Placeholder */}
        <Paper sx={{ p: 2, bgcolor: 'white', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
          <Typography color="textSecondary">Monthly Bar Chart Placeholder</Typography>
        </Paper>
      </Box>

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

export default MonthlyDoseTrend;
