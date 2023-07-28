import Image from 'next/image';

import {
  MessageSquare,
  Bookmark,
  LifeBuoy,
  Settings,
  LogOut,
} from 'react-feather';

import Box from '@mui/material/Box';
import Link from 'next/link';

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

import DrawerItemIcon from './DrawerItemIcon';

function DrawerDivider() {
  return (
    <Box paddingX={1} marginY={1}>
      <Divider />
    </Box>
  );
}

function DrawerContent() {
  return (
    <Box
      sx={{
        paddingY: 1,
      }}
    >
      <List
        component="nav"
        subheader={
          <Box display="flex" justifyContent="center" mb={2}>
            <Link href="/">
              <Image src="/chat.svg" width={40} height={40} alt="Logo" />
            </Link>
          </Box>
        }
      >
        <DrawerItemIcon selected>
          <MessageSquare />
        </DrawerItemIcon>
        <DrawerItemIcon>
          <Bookmark />
        </DrawerItemIcon>

        <DrawerDivider />

        <DrawerItemIcon>
          <LifeBuoy />
        </DrawerItemIcon>
        <DrawerItemIcon>
          <Settings />
        </DrawerItemIcon>
        <DrawerItemIcon color="error" href="..">
          <LogOut />
        </DrawerItemIcon>
      </List>
    </Box>
  );
}

export default DrawerContent;
