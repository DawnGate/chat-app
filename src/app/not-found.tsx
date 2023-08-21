'use client';

import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { blue } from '@mui/material/colors';
import { ArrowLeft } from 'react-feather';

function NotFound() {
  return (
    <Box
      sx={{
        height: '100%',
        backgroundImage:
          'url(https://cdn.dribbble.com/users/4107199/screenshots/14742251/media/c159dbe5b2f06882472d7a83cf47aed8.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%',
        backgroundSize: 'contain',
        backgroundColor: '#EFB0BB',
      }}
    >
      <IconButton href="/">
        <ArrowLeft color={blue[500]} />
      </IconButton>
    </Box>
  );
}

export default NotFound;
