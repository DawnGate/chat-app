'use client';

import { usePathname } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';

import {
  MessageSquare,
  Bookmark,
  LifeBuoy,
  Settings,
  LogOut,
} from 'react-feather';

import Box from '@mui/material/Box';
import List from '@mui/material/List';

import DrawerItemIcon from './DrawerItemIcon';
import DrawerDivider from '../CDivider';

const chatRoutes = { chat: '/chat', chatSettings: '/chat/settings' };

function DrawerContent() {
  // init value
  const chatRoutesPath = Object.values(chatRoutes);
  // hooks
  const pathname = usePathname();

  // local variables
  let selectedRoute = chatRoutesPath[0];
  chatRoutesPath.forEach((item) => {
    if (pathname.startsWith(item)) {
      selectedRoute = item;
    }
  });

  // render
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
        <DrawerItemIcon
          href={chatRoutes.chat}
          selected={selectedRoute === chatRoutes.chat}
        >
          <MessageSquare />
        </DrawerItemIcon>
        <DrawerItemIcon>
          <Bookmark />
        </DrawerItemIcon>

        <DrawerDivider />

        <DrawerItemIcon>
          <LifeBuoy />
        </DrawerItemIcon>
        <DrawerItemIcon
          href={chatRoutes.chatSettings}
          selected={selectedRoute === chatRoutes.chatSettings}
        >
          <Settings />
        </DrawerItemIcon>
        <DrawerItemIcon color="error">
          <LogOut />
        </DrawerItemIcon>
      </List>
    </Box>
  );
}

export default DrawerContent;
