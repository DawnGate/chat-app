import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';

function MessageBox({ children }: { children: ReactNode }) {
  return (
    <Stack className="c-message-box" gap={1} mb={2}>
      {children}
    </Stack>
  );
}

export default MessageBox;
