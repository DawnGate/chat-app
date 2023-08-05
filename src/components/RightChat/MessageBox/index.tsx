import Box from '@mui/material/Box';
import { ReactNode } from 'react';

function MessageBox({ children }: { children: ReactNode }) {
  return (
    <Box className="c-message-box" sx={{}}>
      {children}
    </Box>
  );
}

export default MessageBox;
