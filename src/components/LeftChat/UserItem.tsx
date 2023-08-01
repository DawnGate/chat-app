'use client';

import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import DoneAllIcon from '@mui/icons-material/DoneAll';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';

import {
  badgeColor,
  errorColor,
  primaryColor,
  textColor,
} from '@/config/colors';

import {
  captionTypo,
  inputTypo,
  threeDotTextOverflow,
} from '@/config/typography';

enum STATUS {
  MENTION,
  NEW_MESSAGE,
  MISS_CALL,
  READ,
}

function BadgeBox({
  count,
  color = errorColor.main,
}: {
  count: number;
  color?: string;
}) {
  return (
    <Box
      sx={{
        background: color,
        borderRadius: 999,
        textAlign: 'center',
        minWidth: 18,
      }}
    >
      <Typography
        sx={{
          fontSize: captionTypo.medium,
          color: 'white',
        }}
      >
        {count}
      </Typography>
    </Box>
  );
}

function StatusIcon({ status }: { status: STATUS }) {
  let content = null;
  switch (status) {
    case STATUS.MENTION:
      content = <BadgeBox count={2} />;
      break;
    case STATUS.NEW_MESSAGE:
      content = <BadgeBox count={3} color={textColor.light} />;
      break;
    case STATUS.READ:
      content = (
        <DoneAllIcon
          sx={{
            fontSize: '20px',
            color: badgeColor,
          }}
        />
      );
      break;
    case STATUS.MISS_CALL:
      content = (
        <PhoneCallbackIcon
          sx={{
            fontSize: '20px',
            color: errorColor.main,
          }}
        />
      );
      break;
    default:
      break;
  }
  return content;
}

function UserItem() {
  return (
    <Box
      sx={{
        ':hover': {
          background: alpha(primaryColor.main, 0.08),
          '&:before': {
            content: '""',
            width: '3px',
            height: '100%',
            background: primaryColor.dark,
            position: 'absolute',
          },
        },
        cursor: 'pointer',
        position: 'relative',
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
            <StatusIcon status={STATUS.READ} />
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
