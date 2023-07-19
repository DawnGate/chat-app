import CTextField from '@/components/CTextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

// images
import backgroundLogin from '@/assets/images/login-background.jpg';

// next
import Image from 'next/image';

function LoginPage() {
  return (
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
          <Image src={'/chat.svg'} width={40} height={40} alt={'Logo'} />
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
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
