import { textColor } from '@/config/colors';
import { Box } from 'react-feather';

import ContentBox from './ContentBox';
import UserItem from './UserItem';

function GroupAndChannel() {
  return (
    <ContentBox
      title="group & channel"
      icon={<Box color={textColor.lighter} size={14} />}
    >
      <UserItem chatId="123456" />
      <UserItem chatId="1234567" />
    </ContentBox>
  );
}

export default GroupAndChannel;
