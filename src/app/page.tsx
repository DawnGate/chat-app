import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box>
      <Link href="/app">
        <Button variant="contained">Home Page</Button>
      </Link>
      <Typography variant="h1" color="primary">
        Testing
      </Typography>
      <Link href="/login">
        <p>Login</p>
      </Link>
    </Box>
  );
}
