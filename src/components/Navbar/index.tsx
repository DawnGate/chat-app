'use client';

import { useChatContext } from '@/context/chatContext';

import Drawer from '@mui/material/Drawer';

import DrawerContent from './DrawerContent';

// constant
const NAV_WIDTH = 66;

function NavBar() {
  // hooks
  const { showMenuDrawer, toggleMenuDrawer } = useChatContext();

  // local variables
  const container =
    typeof window !== 'undefined' ? () => window.document.body : undefined;

  const drawer = <DrawerContent />;

  return (
    <>
      <Drawer
        container={container}
        variant="temporary"
        open={showMenuDrawer}
        onClose={() => {
          toggleMenuDrawer(false);
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          width: NAV_WIDTH,
        }}
        PaperProps={{
          className: 'custom-scrollbar',
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: NAV_WIDTH,
        }}
        PaperProps={{
          className: 'custom-scrollbar',
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
}
export default NavBar;
