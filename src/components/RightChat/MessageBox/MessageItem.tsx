import { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { captionTypo } from '@/config/typography';
import { textColor } from '@/config/colors';

function MessageItem({
  children,
  isYour = false,
}: {
  children: ReactNode;
  isYour?: boolean;
}) {
  return (
    <Box
      className="c-message-item"
      sx={{
        padding: 1,
        paddingRight: 2,
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
      {children}
      <Box minWidth={80} display="flex" justifyContent="flex-end">
        <Typography
          fontWeight="light"
          sx={{ fontSize: captionTypo.small, color: textColor.lighter }}
        >
          09:11
        </Typography>
      </Box>
    </Box>
  );
}

export default MessageItem;
