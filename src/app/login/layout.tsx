import Box from '@mui/material/Box';

import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Login - Chat box',
  description: 'Login page - Real time chat application',
};

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box minHeight="100vh" height="100%">
      {children}
    </Box>
  );
};

export default LoginLayout;
