import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  InputAdornment,
  Avatar,
  Stack
} from '@mui/material';
import { 
  FilterList,
  ChevronLeft,
  ChevronRight,
  Search,
  HistoryEdu,
  Download,
  MoreVert,
  Circle
} from '@mui/icons-material';

const SystemLogs = () => {
  const [filter, setFilter] = useState('All');

  const logs = [
    { id: 1, timestamp: '09:42:15 AM', date: 'Oct 24, 2025', user: 'Dr. Aris Thorne', action: 'Scan Analysis Started', status: 'Success', category: 'CLINICAL' },
    { id: 2, timestamp: '09:38:22 AM', date: 'Oct 24, 2025', user: 'Sarah Jenkins', action: 'Patient Registered', status: 'Success', category: 'ADMIN' },
    { id: 3, timestamp: '09:15:04 AM', date: 'Oct 24, 2025', user: 'Admin', action: 'System Backup Completed', status: 'Success', category: 'SYSTEM' },
    { id: 4, timestamp: '08:55:10 AM', date: 'Oct 24, 2025', user: 'Marcus Vane', action: 'Dose Alert Acknowledged', status: 'Warning', category: 'SAFETY' },
    { id: 5, timestamp: '08:30:00 AM', date: 'Oct 24, 2025', user: 'Dr. Aris Thorne', action: 'Login Successful', status: 'Success', category: 'SECURITY' }
  ];

  const categories = ['All', 'Clinical', 'Admin', 'System', 'Safety', 'Security'];

  return (
    <Box sx={{ pb: 8 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Box sx={{ p: 1, borderRadius: '8px', bgcolor: '#ebf4ff', color: '#0066ff', display: 'flex' }}>
              <HistoryEdu fontSize="small" />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a202c', letterSpacing: -0.5 }}>System Audit Portal</Typography>
          </Box>
          <Typography variant="body1" sx={{ color: '#a0aec0', fontWeight: 600 }}>Governable event tracking and system integrity logs</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button 
            variant="outlined" 
            startIcon={<Download />}
            onClick={() => alert('Generating system audit report in CSV format...')}
            sx={{ borderRadius: '12px', color: '#4a5568', borderColor: '#edf2f7', bgcolor: 'white', textTransform: 'none', fontWeight: 700 }}
          >
            Export CSV
          </Button>
          <Button 
            variant="contained" 
            startIcon={<FilterList />}
            sx={{ borderRadius: '12px', bgcolor: '#0066ff', textTransform: 'none', fontWeight: 700 }}
          >
            Advanced Filter
          </Button>
        </Stack>
      </Box>

      {/* Filter Toolbar */}
      <Stack direction="row" spacing={1.5} sx={{ mb: 3, overflowX: 'auto', pb: 1 }}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            onClick={() => setFilter(cat)}
            sx={{ 
              fontWeight: 800, 
              px: 1,
              bgcolor: filter === cat ? '#0066ff' : 'white',
              color: filter === cat ? 'white' : '#718096',
              border: '1px solid',
              borderColor: filter === cat ? '#0066ff' : '#edf2f7',
              '&:hover': { bgcolor: filter === cat ? '#0052cc' : '#f7fafc' }
            }}
          />
        ))}
      </Stack>

      <Paper sx={{ p: 0, borderRadius: '24px', overflow: 'hidden', border: '1px solid #edf2f7', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
        <Box sx={{ px: 3, py: 2.5, bgcolor: '#f7fafc', borderBottom: '1px solid #edf2f7', display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            placeholder="Search by user, action, or status..."
            size="small"
            fullWidth
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                borderRadius: '12px', 
                bgcolor: 'white',
                '& fieldset': { borderColor: 'transparent' },
                '&:hover fieldset': { borderColor: '#e2e8f0' }
              } 
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#a0aec0' }} />
                </InputAdornment>
              )
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#ffffff' }}>
                <TableCell sx={{ color: '#a0aec0', fontWeight: 800, fontSize: '0.7rem', py: 2, textTransform: 'uppercase' }}>Event Details</TableCell>
                <TableCell sx={{ color: '#a0aec0', fontWeight: 800, fontSize: '0.7rem', py: 2, textTransform: 'uppercase' }}>Responsible User</TableCell>
                <TableCell sx={{ color: '#a0aec0', fontWeight: 800, fontSize: '0.7rem', py: 2, textTransform: 'uppercase' }}>Category</TableCell>
                <TableCell sx={{ color: '#a0aec0', fontWeight: 800, fontSize: '0.7rem', py: 2, textTransform: 'uppercase' }}>Compliance Status</TableCell>
                <TableCell sx={{ py: 2 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} sx={{ '&:hover': { bgcolor: '#fcfdff' }, transition: 'all 0.2s' }}>
                  <TableCell>
                    <Typography sx={{ fontWeight: 800, color: '#1a202c', fontSize: '0.9rem' }}>{log.action}</Typography>
                    <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700 }}>{log.date} • {log.timestamp}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#ebf4ff', color: '#3182ce', fontSize: '0.75rem', fontWeight: 800 }}>
                        {log.user.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Typography sx={{ fontWeight: 700, color: '#4a5568', fontSize: '0.85rem' }}>{log.user}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={log.category} size="small" sx={{ fontWeight: 800, fontSize: '0.65rem', bgcolor: '#f7fafc', color: '#718096' }} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Circle sx={{ fontSize: 8, color: log.status === 'Success' ? '#38a169' : '#ecc94b' }} />
                      <Typography sx={{ fontWeight: 800, color: log.status === 'Success' ? '#38a169' : '#dd6b20', fontSize: '0.8rem' }}>{log.status}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small"><MoreVert sx={{ color: '#cbd5e0' }} /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #edf2f7' }}>
          <Typography variant="caption" sx={{ color: '#a0aec0', fontWeight: 700 }}>
            Displaying 5 of 1,284 records
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button size="small" disabled variant="outlined" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 700 }}>Previous</Button>
            <Button size="small" variant="outlined" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 700, borderColor: '#0066ff', color: '#0066ff' }}>Next</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SystemLogs;
