import Box from '@mui/material/Box';

import { ReactNode } from 'react';

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box height="100%" minHeight="100vh" width="100%">
      {children}
    </Box>
  );
};

export default LoginLayout;
