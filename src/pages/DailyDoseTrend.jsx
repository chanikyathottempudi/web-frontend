import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Paper,
  Chip
} from '@mui/material';
import { 
  TrendingUp,
  Info
} from '@mui/icons-material';

const DailyDoseTrend = () => {
  // Mock data for daily trend
  const trends = [
    { id: '1', date: 'Oct 24, 2023', dose: '1.2 mSv', status: 'Optimal', color: '#10b981' },
    { id: '2', date: 'Oct 23, 2023', dose: '2.5 mSv', status: 'High', color: '#ef4444' },
    { id: '3', date: 'Oct 22, 2023', dose: '0.8 mSv', status: 'Optimal', color: '#10b981' },
    { id: '4', date: 'Oct 21, 2023', dose: '1.5 mSv', status: 'Optimal', color: '#10b981' },
    { id: '5', date: 'Oct 20, 2023', dose: '1.1 mSv', status: 'Optimal', color: '#10b981' },
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', pb: 4 }}>
      <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ 
            p: 1.5, 
            borderRadius: '16px', 
            bgcolor: 'rgba(37, 99, 235, 0.08)', 
            color: '#2563eb', 
            display: 'flex',
            border: '1px solid rgba(37, 99, 235, 0.1)'
        }}>
          <TrendingUp sx={{ fontSize: 32 }} />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: -0.5 }}>
            Daily Dose Trends
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 700 }}>
            Historical record of diagnostic radiation patterns
          </Typography>
        </Box>
      </Box>

      {/* Trend List */}
      <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {trends.map((item) => (
          <Paper 
            key={item.id} 
            className="glass-card"
            sx={{ 
              borderRadius: '24px', 
              transition: 'all 0.2s',
              border: '1px solid #f1f5f9',
              '&:hover': { transform: 'translateX(8px)', bgcolor: 'rgba(37, 99, 235, 0.02)' }
            }}
          >
            <ListItem sx={{ py: 3, px: 4 }}>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: -0.2 }}>
                      {item.date}
                    </Typography>
                    <Chip 
                      label={item.status} 
                      size="small" 
                      sx={{ 
                        bgcolor: `${item.color}15`, 
                        color: item.color, 
                        fontWeight: 900, 
                        fontSize: '0.65rem',
                        height: 22,
                        px: 1
                      }} 
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>Total Dose:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 900, color: '#0f172a' }}>{item.dose}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#94a3b8' }}>
                      <Info sx={{ fontSize: 16 }} />
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>Clinical Protocol Validated</Typography>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default DailyDoseTrend;
