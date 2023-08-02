import Box from '@mui/material/Box';

import { HEADER_HEIGHT } from '@/config/constant';

import RightChatHeader from './Header';

function RightChat() {
  return (
    <>
      <Box height={HEADER_HEIGHT}>
        <RightChatHeader />
      </Box>
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
        }}
      >
        <Box height={1000}>Chat body</Box>
      </Box>
      <Box height={50}>Input TEst</Box>
    </>
  );
}

export default RightChat;
