'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';

import NavBar from '@/components/Navbar';
import Button from '@mui/material/Button';

function AppPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box display="flex">
      <NavBar handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
      <Box flex={1}>
        <p>Content</p>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleDrawerToggle();
          }}
          sx={{ display: { sm: 'none' } }}
        >
          Show Drawer
        </Button>
      </Box>
    </Box>
  );
}

export default AppPage;
