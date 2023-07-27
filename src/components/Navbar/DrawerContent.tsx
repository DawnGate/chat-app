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
import { ReactNode } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

type Color =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'error'
  | 'success';

function DrawerItemIcon({
  children,
  color = 'primary',
}: {
  children: ReactNode;
  color?: Color;
}) {
  return (
    <ListItemButton
      sx={(theme) => ({
        ...(color && {
          color: theme.palette[color].main,
        }),
        borderRadius: 1,
        justifyContent: 'center',
      })}
    >
      <ListItemIcon sx={{ minWidth: 0 }}>{children}</ListItemIcon>
    </ListItemButton>
  );
}

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
        <DrawerItemIcon>
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
        <DrawerItemIcon color="error">
          <LogOut />
        </DrawerItemIcon>
      </List>
    </Box>
  );
}

export default DrawerContent;
