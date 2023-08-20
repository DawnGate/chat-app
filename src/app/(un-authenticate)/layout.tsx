import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

// next
import Image from 'next/image';

// images
import backgroundLogin from '@/assets/images/login-background.jpg';

import { ReactNode } from 'react';

function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <Box minHeight="100vh" height="100%">
      <Grid
        container
        sx={{
          background: '#fff 50%',
          backgroundImage: `url(${backgroundLogin.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '100%',
        }}
      >
        <Grid
          item
          xs={0}
          sm={4}
          md={6}
          display={{
            xs: 'none',
            sm: 'block',
          }}
          paddingRight={{
            sm: 3,
            md: 6,
            lg: 9,
          }}
        >
          <Box
            display="flex"
            gap={1}
            alignItems="center"
            justifyContent="end"
            height="100%"
          >
            <Image priority src="/chat.svg" width={40} height={40} alt="Logo" />
            <Typography variant="h6" fontWeight="bold" color="dark">
              Chatbox
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={6} px={2}>
          <Box display="flex" alignItems="center" py={2} height="100%">
            <Card
              sx={{
                p: {
                  xs: 2,
                  sm: 3,
                  md: 5,
                },
                maxWidth: ['none', 500],
                width: '100%',
                height: {
                  xs: '100%',
                  sm: 'auto',
                },
              }}
            >
              {children}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginLayout;
