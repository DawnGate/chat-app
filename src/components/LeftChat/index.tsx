import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// icons
import { Edit } from 'react-feather';

// child components
import SearchTextField from './TextField';
import PinChats from './PinChats';
import GroupAndChannel from './GroupAndChannel';
import AllMessages from './AllMessages';

function LeftChat() {
  return (
    <Box my={1} mx={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                Messages
              </Typography>
              <Typography
                variant="body1"
                color="primary"
                fontWeight={600}
                ml={1}
              >
                13
                <Typography variant="caption" fontWeight={600} ml={0.5}>
                  New
                </Typography>
              </Typography>
            </Stack>
            <IconButton size="small" color="primary" sx={{}}>
              <Edit size={16} />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <SearchTextField />
        </Grid>
        <Grid item xs={12}>
          <PinChats />
        </Grid>
        <Grid item xs={12}>
          <GroupAndChannel />
        </Grid>
        <Grid item xs={12}>
          <AllMessages />
        </Grid>
      </Grid>
    </Box>
  );
}

export default LeftChat;
