import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { chatDefaultBackground } from '@/config/colors';

import RightChatHeader from './Header';
import OtherMessage from './OtherMessage';

function RightChat() {
  return (
    <>
      <RightChatHeader />
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          background: chatDefaultBackground,
        }}
      >
        <Box height={1000} p={2}>
          <OtherMessage />
          <OtherMessage />
          <OtherMessage />
          <OtherMessage />
        </Box>
      </Box>
      <Box px={1} my={1}>
        <TextField
          fullWidth
          sx={{
            height: '100%',
            '& input': {
              padding: 1,
            },
          }}
        />
      </Box>
    </>
  );
}

export default RightChat;
