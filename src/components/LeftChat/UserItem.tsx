'use client';

import { usePathname, useRouter } from 'next/navigation';

import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import { borderRadius } from '@/config/border';
import { badgeColor, primaryColor, textColor } from '@/config/colors';

import {
  captionTypo,
  inputTypo,
  threeDotTextOverflow,
} from '@/config/typography';

// child components
import StatusIcon from './components/StatusIcon';
import { MessageStatus } from './types/common';

function UserItem({ chatId }: { chatId: string }) {
  // hooks
  const pathname = usePathname();
  const router = useRouter();

  // local variable
  const currentPath = `/chat/${chatId}`;
  const isSameCurrentSelect = pathname === currentPath;

  // render
  return (
    <Box
      sx={{
        ':hover': {
          background: alpha(primaryColor.main, isSameCurrentSelect ? 0.5 : 0.2),
          '&:before': {
            content: '""',
            width: '3px',
            height: '100%',
            background: primaryColor.dark,
            position: 'absolute',
          },
        },
        ...(isSameCurrentSelect && {
          background: alpha(primaryColor.main, 0.5),
        }),
        cursor: 'pointer',
        position: 'relative',
        borderTopRightRadius: borderRadius.dBig,
        borderBottomRightRadius: borderRadius.dBig,
      }}
      onClick={() => {
        router.push(currentPath);
      }}
    >
      <Stack direction="row" spacing={1} py={1} px={2}>
        <Box>
          <Badge
            overlap="circular"
            variant="dot"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            sx={{
              '& > span': {
                border: '1px solid white',
                backgroundColor: badgeColor,
              },
            }}
          >
            <Avatar />
          </Badge>
        </Box>
        <Box flex={1} overflow="hidden">
          <Typography
            sx={{
              fontWeight: 600,
              ...inputTypo,
              ...threeDotTextOverflow,
            }}
          >
            Arman Test Arman Test Arman Test Arman Test
          </Typography>
          <Typography
            sx={{
              color: textColor.lighter,
              fontSize: captionTypo.medium,
              ...threeDotTextOverflow,
            }}
          >
            This is the latest message pArman Test Arman Test Arman Test
          </Typography>
        </Box>
        <Box width={30}>
          <Box display="flex" justifyContent="center" mb={0.5}>
            <StatusIcon status={MessageStatus.READ} />
          </Box>
          <Typography
            sx={{
              fontSize: captionTypo.small,
              fontWeight: 500,
              color: textColor.medium,
            }}
          >
            10:30
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default UserItem;
