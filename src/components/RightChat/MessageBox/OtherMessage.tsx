import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { textTypo } from '@/config/typography';

import MessageItem from './MessageItem';
import MessageBox from '.';

function OtherMessage() {
  return (
    <Box display="flex" gap={1} paddingRight={7}>
      <Avatar />
      <Box>
        <Typography fontWeight="medium">Jame Bone</Typography>
        <MessageBox>
          <MessageItem>
            <Typography sx={{ fontSize: textTypo.medium }}>Hey</Typography>
          </MessageItem>
          <MessageItem>
            <Typography sx={{ fontSize: textTypo.medium }}>
              Testing Message with inner
            </Typography>
          </MessageItem>
          <MessageItem>
            <Typography sx={{ fontSize: textTypo.medium }}>
              Hey What you think and expected Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book.
            </Typography>
          </MessageItem>
        </MessageBox>
      </Box>
    </Box>
  );
}

export default OtherMessage;
