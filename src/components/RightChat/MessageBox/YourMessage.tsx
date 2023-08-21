import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { textTypo } from '@/config/typography';
import { iconSizes } from '@/config/icons';

import MessageBox from '.';
import MessageItem from './MessageItem';

function YourMessage() {
  return (
    <Box display="flex" flexDirection="row-reverse" gap={1} paddingLeft={7}>
      <Avatar sx={iconSizes.medium} />
      <Box>
        <Typography fontWeight="medium" textAlign="end">
          You
        </Typography>
        <MessageBox>
          <MessageItem isYour>
            <Typography sx={{ fontSize: textTypo.medium }}>Hey</Typography>
          </MessageItem>
          <MessageItem isYour>
            <Typography sx={{ fontSize: textTypo.medium }}>
              Testing Message with inner
            </Typography>
          </MessageItem>
          <MessageItem isYour>
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

export default YourMessage;
