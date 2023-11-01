import { Box, Button, Typography } from '@mui/material';

import Link from 'next/link';
import Image from 'next/image';
import { grey } from '@mui/material/colors';

import chatLandingImage from '../assets/images/chat-landing-preview.png';

export default function Home() {
  return (
    <Box
      minHeight="100vh"
      minWidth="100vw"
      sx={{
        background:
          'linear-gradient(129.35deg, #CAE0E2 48.54%, rgba(202, 224, 226, 0) 95.96%)',
      }}
    >
      <Box maxWidth={1440} margin="auto" paddingY="32px" paddingX="16px">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Link href="/chat">
            <Box display="flex" alignItems="center" gap="4px">
              <Image
                priority
                src="/chat.svg"
                width={40}
                height={40}
                alt="Logo"
              />
              <Typography sx={{ fontWeight: 600, fontSize: '18px' }}>
                Chatbox
              </Typography>
            </Box>
          </Link>
          <Link href="/login">
            <Button
              sx={{
                textTransform: 'unset',
              }}
              variant="contained"
            >
              <Typography sx={{ fontWeight: 500 }}>Give it a try</Typography>
            </Button>
          </Link>
        </Box>

        <Box
          mt={{
            xs: 6,
            lg: 12,
          }}
          display="flex"
          flexDirection={{
            xs: 'column',
            lg: 'row',
          }}
          gap={{
            xs: 4,
            lg: 0,
          }}
          alignItems="center"
        >
          <Box flex={1}>
            <Box maxWidth={500} mt={4}>
              <Typography
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 48,
                  lineHeight: '52px',
                }}
              >
                Open-source Chat application
              </Typography>
              <Typography
                mt={2}
                sx={{
                  color: grey[800],
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                Free and open-source. This chat application focus on how to
                bring better UX for user.
              </Typography>
              <Box display="flex" gap={2} mt={2}>
                <Button
                  sx={{
                    textTransform: 'unset',
                  }}
                  variant="contained"
                >
                  <Typography sx={{ fontWeight: 500 }}>
                    Give it a try
                  </Typography>
                </Button>
                <Button
                  sx={{
                    textTransform: 'unset',
                  }}
                  variant="outlined"
                  color="inherit"
                >
                  <Typography sx={{ fontWeight: 500 }}>Try later</Typography>
                </Button>
              </Box>
            </Box>
          </Box>
          <Box flex={1}>
            <Image
              priority
              src={chatLandingImage}
              width={500}
              height={500}
              alt="Logo"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
