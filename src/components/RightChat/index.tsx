import Box from '@mui/material/Box';

import { ChatInformation } from '@/models/Chat';

import { chatDefaultBackground } from '@/config/colors';

import RightChatHeader from './Header';
import OtherMessage from './OtherMessage';
import YourMessage from './YourMessage';
import CRMNewMessage from '../CRNMessage';
import ChatInput from '../ChatInputBox';

function RightChat({ chatInfoString }: { chatInfoString: string }) {
  const chatInfo = JSON.parse(chatInfoString) as ChatInformation;

  const chatContent = chatInfo.chat?.messages ? (
    <>
      <OtherMessage />
      <OtherMessage />
      <OtherMessage />
      <YourMessage />
      <OtherMessage />
      <YourMessage />
    </>
  ) : (
    <CRMNewMessage />
  );

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
        {chatContent}
      </Box>
      <Box px={1} my={1}>
        <ChatInput />
      </Box>
    </>
  );
}

export default RightChat;
