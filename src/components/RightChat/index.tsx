import Box from '@mui/material/Box';

import { ChatInformation } from '@/models/Chat';

import { chatDefaultBackground } from '@/config/colors';

import RightChatHeader from './Header';

import ChatInput from '../ChatInputBox';
import MessageContent from './MessageContent';

function RightChat({ chatInfoString }: { chatInfoString: string }) {
  // local variables
  const chatInfo = JSON.parse(chatInfoString) as ChatInformation;

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
        <MessageContent chatInfo={chatInfo} />
      </Box>
      <Box px={1} my={1}>
        <ChatInput />
      </Box>
    </>
  );
}

export default RightChat;
