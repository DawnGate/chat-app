import Box from '@mui/material/Box';

import { Metadata } from 'next';
import { ReactNode } from 'react';

import backgroundLogin from '@/assets/images/login-background.jpg';

export const metadata: Metadata = {
  title: 'Login - Chat box',
  description: 'Login page - Real time chat application',
};

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      height="100%"
      sx={{
        background: '#fff 50%',
        backgroundImage: `url(${backgroundLogin.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {children}
    </Box>
  );
};

export default LoginLayout;
