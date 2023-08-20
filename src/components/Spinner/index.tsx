import { primaryColor } from '@/config/colors';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Spinner() {
  return (
    <Box
      sx={{
        height: '100%',
        minHeight: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: primaryColor.hover,
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Spinner;
