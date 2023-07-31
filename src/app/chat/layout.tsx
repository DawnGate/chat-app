'use client';

import { ReactNode, useState } from 'react';

import Box from '@mui/material/Box';

import NavBar from '@/components/Navbar';

function AppLayout({ children }: { children: ReactNode }) {
  // local state
  const [mobileOpen, setMobileOpen] = useState(false);
  // events
  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box display="flex" height="100%">
      <NavBar handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
      <Box flex={1}>{children}</Box>
    </Box>
  );
}

export default AppLayout;
