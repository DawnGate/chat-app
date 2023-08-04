import Box from '@mui/material/Box';
import { ReactNode } from 'react';

function MessageBox({ children }: { children: ReactNode }) {
  return (
    <Box
      className="c-message-box"
      sx={{
        padding: 1,
        borderRadius: 2,
        background: 'white',
        marginBottom: 1,
      }}
    >
      {children}
    </Box>
  );
}

export default MessageBox;
