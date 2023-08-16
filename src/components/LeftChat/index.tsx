import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase-config';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// icons
import { Edit } from 'react-feather';

// child components
import SearchUserBox from './SearchBox';
import PinChats from './PinChats';
import GroupAndChannel from './GroupAndChannel';
import AllMessages from './AllMessages';

// get user information
const getCurrentUserInformation = () => {
  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      const { uid } = user;
      console.log(uid);
    } else {
      console.log('not found');
    }
  });
};

function LeftChat() {
  // init data
  getCurrentUserInformation();
  // render
  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      gap={1}
      overflow="hidden"
    >
      <Box mx={2} my={1}>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Stack direction="row" alignItems="center">
            <Typography variant="h6" fontWeight={600}>
              Messages
            </Typography>
            <Typography variant="body1" color="primary" fontWeight={600} ml={1}>
              13
              <Typography variant="caption" fontWeight={600} ml={0.5}>
                New
              </Typography>
            </Typography>
          </Stack>
          <IconButton size="medium" color="primary" sx={{}}>
            <Edit size={16} />
          </IconButton>
        </Stack>
        <SearchUserBox />
      </Box>
      <Box
        gap={2}
        flex={1}
        display="flex"
        flexDirection="column"
        overflow="auto"
        className="custom-scrollbar"
      >
        <PinChats />
        <GroupAndChannel />
        <AllMessages />
      </Box>
    </Box>
  );
}

export default LeftChat;
