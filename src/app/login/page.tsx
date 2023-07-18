import CTextField from '@/components/CTextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import Image from 'next/image';

function LoginPage() {
  return (
    <Grid container height="100%">
      <Grid
        item
        xs={0}
        sm={4}
        md={6}
        display={{
          xs: 'none',
          sm: 'block',
        }}
      >
        <Box
          display="flex"
          gap={1}
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Image src={'/chat.svg'} width={40} height={40} alt={'Logo'} />
          <Typography variant="h6" fontWeight="bold" color="dark">
            Chatbox
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={6} px={2}>
        <Box display="flex" height="100%" alignItems="center" py={2}>
          <Card
            sx={{
              p: {
                xs: 2,
                sm: 3,
                md: 5,
              },
              maxWidth: 500,
              width: '100%',
              height: {
                xs: '100%',
                sm: 'auto',
              },
            }}
          >
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
                py: '10px',
                background: grey[700],

                color: 'white',
                textTransform: 'inherit',
                fontWeight: 600,
                ':hover': {
                  background: grey[600],
                },
              }}
              fullWidth
              color="inherit"
            >
              Log in
            </Button>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
