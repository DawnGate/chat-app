import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { badgeColor, errorColor, textColor } from '@/config/colors';

import { captionTypo } from '@/config/typography';

import DoneAllIcon from '@mui/icons-material/DoneAll';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';

import { MessageStatus } from '../types/common';

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

function StatusIcon({ status }: { status: MessageStatus }) {
  let content = null;
  switch (status) {
    case MessageStatus.MENTION:
      content = <BadgeBox count={2} />;
      break;
    case MessageStatus.NEW_MESSAGE:
      content = <BadgeBox count={3} color={textColor.light} />;
      break;
    case MessageStatus.READ:
      content = (
        <DoneAllIcon
          sx={{
            fontSize: '20px',
            color: badgeColor,
          }}
        />
      );
      break;
    case MessageStatus.MISS_CALL:
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

export default StatusIcon;
