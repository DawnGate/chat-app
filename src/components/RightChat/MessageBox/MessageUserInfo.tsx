import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import User from '@/models/User';
import { iconSizes } from '@/config/icons';

function MessageUserInfo({
  userInfo,
  isYou = false,
}: {
  userInfo: User | null;
  isYou?: boolean;
}) {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection={isYou ? 'row-reverse' : 'row'}
      gap={1}
    >
      <Avatar
        sx={{
          ...(isYou && iconSizes.medium),
        }}
      />
      <Typography fontWeight="medium" textAlign={isYou ? 'start' : 'end'}>
        {isYou ? 'You' : userInfo?.displayName}
      </Typography>
    </Box>
  );
}

export default MessageUserInfo;
