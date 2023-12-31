'use client';

import Backdrop from '@mui/material/Backdrop';

import { DotLottiePlayer } from '@dotlottie/react-player';

function GlobalLoading() {
  return (
    <Backdrop open>
      <DotLottiePlayer
        autoplay
        loop
        src="/boatLoading.lottie"
        style={{ height: '300px', width: '300px' }}
      />
    </Backdrop>
  );
}

export default GlobalLoading;
