import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box>
      <Link href="/chat">
        <Button variant="contained">Chat Page</Button>
      </Link>
      <Typography>
        Note: (when you already login and still have session)
      </Typography>
      <Typography variant="h3" color="primary">
        Click to login link to start
      </Typography>
      <Link href="/login">
        <p>Login</p>
      </Link>
    </Box>
  );
}
