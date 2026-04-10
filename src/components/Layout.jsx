import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import { useMediaQuery, useTheme } from '@mui/material';

const Layout = ({ children, title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {!isMobile && <Sidebar />}
      <Box sx={{ 
        flexGrow: 1, 
        ml: isMobile ? 0 : '260px', 
        display: 'flex', 
        flexDirection: 'column',
        pb: isMobile ? '80px' : 0 // Space for BottomNav
      }}>
        <TopBar title={title} />
        <Box sx={{ p: { xs: 2, md: 4 }, flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
      {isMobile && <BottomNav />}
    </Box>
  );
};

export default Layout;
