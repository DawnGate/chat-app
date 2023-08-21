import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { captionTypo, textTypo } from '@/config/typography';
import { textColor } from '@/config/colors';
import { timeOptionHourMinute } from '@/config/time';

import { ChatMessage } from '@/models/Chat';

function MessageItem({
  item,
  isYour = false,
}: {
  item: ChatMessage;
  isYour?: boolean;
}) {
  // local variables
  const textContent = (
    <Typography
      sx={{
        fontSize: textTypo.medium,
      }}
    >
      {item.content}
    </Typography>
  );

  const timeSent = item.timeSent.toDate();
  const timeSentText = new Intl.DateTimeFormat(
    'en-US',
    timeOptionHourMinute,
  ).format(timeSent);

  // render
  return (
    <Box
      display="flex"
      justifyContent={isYour ? 'flex-end' : 'flex-start'}
      paddingLeft={isYour ? 0 : 4}
      paddingRight={isYour ? 4 : 0}
      my={0.5}
    >
      <Box
        sx={{
          padding: 1,
          paddingX: 1.5,
          borderRadius: 4,
          background: 'white',
          width: 'fit-content',
          ...(isYour
            ? {
                alignSelf: 'flex-end',
                borderBottomRightRadius: 8,
                borderTopRightRadius: 0,
              }
            : {
                borderBottomLeftRadius: 8,
                borderTopLeftRadius: 0,
              }),
        }}
      >
        {textContent}
        <Box minWidth={80} display="flex" justifyContent="flex-end">
          <Typography
            fontWeight="light"
            sx={{ fontSize: captionTypo.small, color: textColor.lighter }}
          >
            {timeSentText}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default MessageItem;
