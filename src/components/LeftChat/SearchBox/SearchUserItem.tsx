'use client';

import { useChatContext } from '@/context/chatContext';

import { useRouter } from 'next/navigation';

import User from '@/models/User';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { primaryColor, textColor } from '@/config/colors';

import {
  captionTypo,
  inputTypo,
  threeDotTextOverflow,
} from '@/config/typography';
import { borderRadius } from '@/config/border';

function SearchUserItem({
  user,
  handleCloseSearch,
}: {
  user: User;
  handleCloseSearch: () => void;
}) {
  // hooks
  const { userInfo } = useChatContext();
  const router = useRouter();
  // render
  return (
    <Box
      sx={{
        borderRadius: borderRadius.medium,
        ':hover': {
          background: alpha(primaryColor.main, 0.2),
        },
        ':active': {
          background: alpha(primaryColor.main, 0.5),
        },
        cursor: 'pointer',
        position: 'relative',
      }}
      onClick={() => {
        if (!userInfo?.id) {
          return;
        }
        const chatId =
          userInfo.id > user.id
            ? `${user.id}_${userInfo.id}`
            : `${userInfo.id}_${user.id}`;
        const chatPath = `/chat/${chatId}`;
        handleCloseSearch();
        router.push(chatPath);
      }}
    >
      <Stack direction="row" spacing={1} py={1} px={2}>
        <Avatar />
        <Box flex={1} overflow="hidden">
          <Typography
            sx={{
              fontWeight: 600,
              ...inputTypo,
              ...threeDotTextOverflow,
            }}
          >
            {user.displayName}
          </Typography>
          <Typography
            sx={{
              color: textColor.lighter,
              fontSize: captionTypo.medium,
              ...threeDotTextOverflow,
            }}
          >
            {user.email}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default SearchUserItem;