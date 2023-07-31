import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { ChevronRight } from 'react-feather';

function LeftChatHeader() {
  return (
    <Stack
      gap={1}
      px={2}
      my={1}
      height="100%"
      direction="row"
      alignItems="center"
    >
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
