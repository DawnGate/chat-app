'use client';

import { useChatContext } from '@/context/chatContext';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { ChevronRight, Menu } from 'react-feather';

function LeftChatHeader() {
  // hooks
  const { toggleMenuDrawer } = useChatContext();
  // render
  return (
    <Stack
      gap={1}
      px={2}
      pt={1}
      height="100%"
      direction="row"
      alignItems="center"
    >
      <IconButton
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
          },
        }}
        onClick={() => {
          toggleMenuDrawer(true);
        }}
      >
        <Menu />
      </IconButton>
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
      <IconButton size="small" color="primary">
        <ChevronRight />
      </IconButton>
    </Stack>
  );
}

export default LeftChatHeader;
