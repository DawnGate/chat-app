import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CDivider from '@/components/CDivider';
import { dividerColor } from '@/config/colors';
import LeftChatHeader from '@/components/LeftChat/Header';
import LeftChat from '@/components/LeftChat';
import RightChat from '@/components/RightChat';

import { HEADER_HEIGHT } from '@/config/constant';

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
        display="flex"
        flexDirection="column"
        sx={{
          background: '#FEFEFE',
          flex: 1,
        }}
      >
        <RightChat />
      </Box>
    </Stack>
  );
}

export default ChatPage;
