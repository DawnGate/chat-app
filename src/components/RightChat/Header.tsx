'use client';

import { useRouter } from 'next/navigation';
import { useChatContext } from '@/context/chatContext';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// icons
import { ArrowLeft, MoreVertical, Phone, Search } from 'react-feather';

// styles
import { captionTypo, textTypo } from '@/config/typography';
import { ChatInformation } from '@/models/Chat';

// types
import User from '@/models/User';

function RightChatHeader({ chatInfo }: { chatInfo: ChatInformation | null }) {
  // hooks
  const router = useRouter();
  const { userInfo } = useChatContext();

  // state
  const [otherUserInfo, setOtherUserInfo] = useState<User | null>(null);

  // variables
  const usersIdMap = chatInfo?.users?.map((user) => {
    return user.id;
  });

  // effects
  useEffect(() => {
    if (!userInfo) return;
    if (!usersIdMap?.includes(userInfo.id)) {
      router.push('/404');
    }
    const otherUserId = usersIdMap?.find((id) => id !== userInfo.id);
    const otherUser = chatInfo?.users?.find((user) => user.id === otherUserId);
    setOtherUserInfo(otherUser ?? null);
  }, [userInfo, usersIdMap, router]);

  // render
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
      py={1}
      px={2}
      gap={1}
    >
      <IconButton
        sx={{
          display: {
            md: 'none',
          },
        }}
        onClick={() => {
          router.push('/chat');
        }}
      >
        <ArrowLeft />
      </IconButton>
      <Avatar />
      <Box flex={1}>
        <Typography sx={{ fontWeight: 600, fontSize: textTypo.normal }}>
          {otherUserInfo?.displayName}
        </Typography>
        <Typography sx={{ fontSize: captionTypo.medium }}>
          {otherUserInfo?.email}
        </Typography>
      </Box>
      <Stack direction="row" spacing={1}>
        <IconButton>
          <Phone />
        </IconButton>
        <IconButton>
          <Search />
        </IconButton>
        <IconButton>
          <MoreVertical />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default RightChatHeader;
