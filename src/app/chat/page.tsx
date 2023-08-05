import Box from '@mui/material/Box';

import { chatDefaultBackground } from '@/config/colors';

function ChatPage() {
  return (
    <Box
      sx={{
        background: chatDefaultBackground,
        height: '100%',
        display: {
          xs: 'none',
          md: 'block',
        },
      }}
    />
  );
}

export default ChatPage;
