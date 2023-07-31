import PushPinIcon from '@mui/icons-material/PushPin';
import { textColor } from '@/config/colors';

import ContentBox from './ContentBox';

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
      Hello
    </ContentBox>
  );
}

export default PinChats;
