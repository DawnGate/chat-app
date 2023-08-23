'use client';

import { DotLottiePlayer } from '@dotlottie/react-player';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import addOpacityToHex from '@/utils/addOpacityToHex';
import { borderRadius } from '@/config/border';
import { whiteDefaultColor } from '@/config/colors';
import { captionTypo } from '@/config/typography';

function CRMNewMessage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100%"
    >
      <Box
        sx={{
          px: 1,
          py: 2,
          borderRadius: borderRadius.medium,
          backgroundColor: addOpacityToHex(whiteDefaultColor, 0.5),
          textAlign: 'center',
        }}
      >
        <Typography fontWeight="bold">No message yet</Typography>
        <Typography
          sx={{
            fontSize: captionTypo.medium,
          }}
        >
          Enter new message to join the chat
        </Typography>
        <DotLottiePlayer
          autoplay
          loop
          src="/lovelyCat.lottie"
          style={{ height: '300px', width: '300px' }}
        />
      </Box>
    </Box>
  );
}

export default CRMNewMessage;
