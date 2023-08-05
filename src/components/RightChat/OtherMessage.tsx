import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MessageItem from './MessageBox/MessageItem';
import MessageBox from './MessageBox';

function OtherMessage() {
  return (
    <Box display="flex" gap={1} paddingRight={7}>
      <Avatar />
      <Box>
        <Box display="flex" gap={1} alignItems="center">
          <Typography fontWeight="medium">Jame Bone</Typography>
        </Box>
        <MessageBox>
          <MessageItem>
            <p>Hey</p>
          </MessageItem>
          <MessageItem>
            <p>Testing Message with inner</p>
          </MessageItem>
          <MessageItem>
            <p>
              Hey What you think and expected Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book.
            </p>
          </MessageItem>
        </MessageBox>
      </Box>
    </Box>
  );
}

export default OtherMessage;
