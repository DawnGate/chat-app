'use client';

import Drawer from '@mui/material/Drawer';

import DrawerContent from './DrawerContent';

// constant
const NAV_WIDTH = 60;

function NavBar({
  handleDrawerToggle,
  mobileOpen,
}: {
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
}) {
  const container =
    typeof window !== 'undefined' ? () => window.document.body : undefined;

  const drawer = <DrawerContent />;

  return (
    <>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { width: NAV_WIDTH },
          width: NAV_WIDTH,
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { width: NAV_WIDTH },
          width: NAV_WIDTH,
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
}
export default NavBar;
