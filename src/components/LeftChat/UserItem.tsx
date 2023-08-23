'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';
import { useChatContext } from '@/context/chatContext';

import { firebaseDb } from '@/lib/firebase-config';
import { doc, onSnapshot } from 'firebase/firestore';

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

import { timeOptionHourMinute } from '@/config/time';

import { ChatRawWithId } from '@/models/Chat';
import User from '@/models/User';

// child components
import StatusIcon from './components/StatusIcon';
import { MessageStatus } from './types/common';

function UserItem({ chatId, chat }: { chatId: string; chat: ChatRawWithId }) {
  // TODO support group chat

  // hooks
  const pathname = usePathname();
  const router = useRouter();
  const { userInfo } = useChatContext();

  // state
  const [userChat, setUserChat] = useState<User | null>(null);

  // local variable
  const currentPath = `/chat/${chatId}`;
  const isSameCurrentSelect = pathname === currentPath;

  const timeSent = chat.latestMessage?.timeSent.toDate();
  const timeSentText = new Intl.DateTimeFormat(
    'en-US',
    timeOptionHourMinute,
  ).format(timeSent);

  const textContent = chat.latestMessage?.content;

  const chatUserId = Object.keys(chat.participants).find(
    (userId) => userId !== userInfo?.userId,
  );

  // effects
  useEffect(() => {
    if (!chatUserId) {
      router.push('404');
      return undefined;
    }
    const useRef = doc(firebaseDb, 'users', chatUserId);
    const unSub = onSnapshot(useRef, (userSnapshot) => {
      setUserChat(userSnapshot.data() as User);
    });
    return () => {
      unSub();
    };
  }, [chatUserId, router]);

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
            <Avatar src={userChat?.photoURL} />
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
            {userChat?.displayName}
          </Typography>
          <Typography
            sx={{
              color: textColor.lighter,
              fontSize: captionTypo.medium,
              ...threeDotTextOverflow,
            }}
          >
            {textContent}
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
            {timeSentText}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default UserItem;
