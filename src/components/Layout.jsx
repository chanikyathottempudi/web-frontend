import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = ({ children, title }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f7fafc' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, ml: '260px', display: 'flex', flexDirection: 'column' }}>
        <TopBar title={title} />
        <Box sx={{ p: 4, flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
