'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CDivider from '@/components/CDivider';

import { dividerColor } from '@/config/colors';
import { HEADER_HEIGHT } from '@/config/constant';

import LeftChatHeader from '@/components/LeftChat/Header';
import LeftChat from '@/components/LeftChat';
import NavBar from '@/components/Navbar';

function AppLayout({ children }: { children: ReactNode }) {
  // hooks
  const pathname = usePathname();
  // local state
  const [mobileOpen, setMobileOpen] = useState(false);
  // events
  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box display="flex" height="100%">
      <NavBar handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
      <Box flex={1}>
        <Stack direction="row" height="100%">
          <Box
            className="LeftChat"
            flexDirection="column"
            sx={{
              width: {
                xs: '100%',
                md: 300,
              },
              background: '#FAFAFA',
              display: {
                xs: pathname === '/chat' ? 'flex' : 'none',
                md: 'flex',
              },
              borderRight: 1,
              borderColor: dividerColor,
            }}
          >
            <Box height={HEADER_HEIGHT}>
              <LeftChatHeader handleDrawerToggle={handleDrawerToggle} />
            </Box>
            <CDivider />
            <LeftChat />
          </Box>
          <Box
            className="RightChat"
            display="flex"
            flexDirection="column"
            sx={{
              background: '#FEFEFE',
              flex: 1,
            }}
          >
            {children}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default AppLayout;
