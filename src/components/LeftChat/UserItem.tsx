import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';

import { badgeColor, textColor } from '@/config/colors';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
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

function StatusIcon({ status }: { status: STATUS }) {
  let content = null;
  switch (status) {
    case STATUS.MENTION:
      content = (
        <Badge
          badgeContent={2}
          color="primary"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Box>&nbsp;</Box>
        </Badge>
      );
      break;
    default:
      break;
  }
  return content;
}

function UserItem() {
  return (
    <Stack direction="row" spacing={1}>
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
        <Box>
          <StatusIcon status={STATUS.MENTION} />
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
  );
}

export default UserItem;
