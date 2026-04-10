import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper,
  Divider
} from '@mui/material';
import { 
  BarChart,
  CalendarMonth,
  TrendingDown
} from '@mui/icons-material';

const MonthlyDoseTrend = () => {
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#ebf4ff', color: '#3182ce', display: 'flex' }}>
          <CalendarMonth />
        </Box>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a202c' }}>
            Monthly Dose Analysis
          </Typography>
          <Typography variant="body2" sx={{ color: '#718096' }}>
            Comparison of radiation exposure trends over the months
          </Typography>
        </Box>
      </Box>

      {/* Month Comparison Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid #edf2f7' }} elevation={0}>
            <Typography variant="caption" sx={{ color: '#718096', fontWeight: 700, textTransform: 'uppercase' }}>
              Current Month Total
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, mt: 1 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#1a202c' }}>45.2</Typography>
              <Typography variant="subtitle1" sx={{ color: '#718096', mb: 1, fontWeight: 600 }}>mGy*cm</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1, color: '#38a169' }}>
              <TrendingDown sx={{ fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 700 }}>12% lower than average</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid #edf2f7' }} elevation={0}>
            <Typography variant="caption" sx={{ color: '#718096', fontWeight: 700, textTransform: 'uppercase' }}>
              Previous Month
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, mt: 1 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#718096' }}>51.8</Typography>
              <Typography variant="subtitle1" sx={{ color: '#a0aec0', mb: 1, fontWeight: 600 }}>mGy*cm</Typography>
            </Box>
            <Typography variant="caption" sx={{ color: '#a0aec0', display: 'block', mt: 1 }}>
              Total recorded scans: 24
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Bar Chart Section */}
      <Paper sx={{ p: 4, borderRadius: '24px', border: '1px solid #edf2f7', bgcolor: 'white' }} elevation={0}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a202c' }}>
            Dose Distribution by Month
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '3px', bgcolor: '#0066ff' }} />
            <Typography variant="caption" sx={{ color: '#718096', fontWeight: 600 }}>Total DLP</Typography>
          </Box>
        </Box>
        
        <Box sx={{ height: 350, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', px: 2 }}>
          {/* Simulated Bar Chart */}
          {[
            { m: 'May', v: 40 }, { m: 'Jun', v: 65 }, { m: 'Jul', v: 45 }, 
            { m: 'Aug', v: 80 }, { m: 'Sep', v: 55 }, { m: 'Oct', v: 45 }
          ].map((bar, i) => (
            <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '10%' }}>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: `${bar.v}%`, 
                  bgcolor: i === 5 ? '#0066ff' : '#ebf4ff', 
                  borderRadius: '6px 6px 0 0',
                  transition: 'height 0.5s ease-out'
                }} 
              />
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#718096' }}>{bar.m}</Typography>
            </Box>
          ))}
        </Box>
        
        <Divider sx={{ my: 4, opacity: 0.6 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#718096' }}>
          <BarChart sx={{ fontSize: 18 }} />
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            Automated analysis suggests a downward trend in average patient exposure.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default MonthlyDoseTrend;
