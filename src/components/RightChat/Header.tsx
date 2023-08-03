import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// icons
import { MoreVertical, Phone, Search } from 'react-feather';

// styles
import { captionTypo, textTypo } from '@/config/typography';

function RightChatHeader() {
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
      <Avatar />
      <Box flex={1}>
        <Typography sx={{ fontWeight: 600, fontSize: textTypo.normal }}>
          Ducica team
        </Typography>
        <Typography sx={{ fontSize: captionTypo.medium }}>
          Online 10 minute ago
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
