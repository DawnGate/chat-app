import { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { captionTypo } from '@/config/typography';

function MessageItem({ children }: { children: ReactNode }) {
  return (
    <Box
      className="c-message-item"
      sx={{
        padding: 1,
        paddingRight: 2,
        borderRadius: 4,
        marginBottom: 1,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 0,
        background: 'white',
        width: 'fit-content',
      }}
    >
      {children}
      <Box minWidth={80} display="flex" justifyContent="end">
        <Typography fontWeight="light" sx={{ fontSize: captionTypo.medium }}>
          09:11
        </Typography>
      </Box>
    </Box>
  );
}

export default MessageItem;
