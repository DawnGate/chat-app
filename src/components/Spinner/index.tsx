import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { primaryColor } from '@/config/colors';
import { borderRadius } from '@/config/border';

function Spinner() {
  // TODO change it to lottie file loading animation
  return (
    <Box
      sx={{
        height: '100%',
        minHeight: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: primaryColor.hover,
        borderRadius: borderRadius.big,
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Spinner;
