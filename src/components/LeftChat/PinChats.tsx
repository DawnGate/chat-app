import PushPinIcon from '@mui/icons-material/PushPin';
import { textColor } from '@/config/colors';

import ContentBox from './ContentBox';
import UserItem from './UserItem';

function PinChats() {
  return (
    <ContentBox
      title="pin chats"
      icon={
        <PushPinIcon
          sx={{
            color: textColor.lighter,
            fontSize: 14,
          }}
        />
      }
    >
      <UserItem chatId="12345" />
    </ContentBox>
  );
}

export default PinChats;
