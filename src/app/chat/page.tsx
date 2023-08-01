import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CDivider from '@/components/CDivider';
import { dividerColor } from '@/config/colors';
import LeftChatHeader from '@/components/LeftChat/Header';
import LeftChat from '@/components/LeftChat';

const HEADER_HEIGHT = 50;

function ChatPage() {
  return (
    <Stack direction="row" height="100%">
      <Box
        className="LeftChat"
        flexDirection="column"
        sx={{
          width: 300,
          background: '#FAFAFA',
          display: {
            xs: 'none',
            md: 'flex',
          },
          borderRight: 1,
          borderColor: dividerColor,
        }}
      >
        <Box height={HEADER_HEIGHT}>
          <LeftChatHeader />
        </Box>
        <CDivider />
        <LeftChat />
      </Box>
      <Box
        className="RightChat"
        sx={{
          background: '#FEFEFE',
          flex: 1,
        }}
      >
        <Box height={HEADER_HEIGHT}>Header Right Chat</Box>
        <CDivider />
        Right Chat
      </Box>
    </Stack>
  );
}

export default ChatPage;
