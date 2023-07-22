import CTextField from '@/components/CTextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

// next
import Link from 'next/link';

function LoginPage() {
  return (
    <>
      <Typography variant="h5" fontWeight={600} textAlign="center">
        Log in
      </Typography>
      <Box mt={2}>
        <CTextField
          label="Login, email or phone number"
          formId="login-email-phone-number"
        />
      </Box>
      <Box mt={2}>
        <CTextField label="Password" formId="login-password" />
      </Box>
      <Button
        variant="contained"
        sx={{
          borderRadius: 9999,
          mt: 2,
          py: 1.5,
          background: blue[700],
          color: 'white',
          textTransform: 'inherit',
          fontWeight: 600,
          ':hover': {
            background: blue[600],
          },
        }}
        fullWidth
        color="inherit"
      >
        <Typography variant="body1" fontWeight={600}>
          Log in
        </Typography>
      </Button>
      <Typography variant="caption" mt={2}>
        Don't have account yet? <Link href="/sign-up">Join us</Link>
      </Typography>
    </>
  );
}

export default LoginPage;
