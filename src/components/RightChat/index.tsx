import Box from '@mui/material/Box';

import RightChatHeader from './Header';

function RightChat() {
  return (
    <>
      <RightChatHeader />
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
