import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { ChatInformation } from '@/models/Chat';

import { chatDefaultBackground } from '@/config/colors';

import RightChatHeader from './Header';
import OtherMessage from './OtherMessage';
import YourMessage from './YourMessage';

function RightChat({ chatInfo }: { chatInfo: ChatInformation | null }) {
  return (
    <>
      <RightChatHeader chatInfo={chatInfo} />
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          background: chatDefaultBackground,
          p: 2,
        }}
        className="custom-scrollbar"
      >
        {/* // TODO create new chat message */}
        {chatInfo?.chat?.messages && (
          <>
            <OtherMessage />
            <OtherMessage />
            <OtherMessage />
            <YourMessage />
            <OtherMessage />
            <YourMessage />
          </>
        )}
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
