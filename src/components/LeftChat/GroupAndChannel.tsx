import { textColor } from '@/config/colors';
import { Box } from 'react-feather';

import ContentBox from './ContentBox';

function GroupAndChannel() {
  return (
    <ContentBox
      title="group & channel"
      icon={<Box color={textColor.lighter} size={14} />}
    >
      Hello
    </ContentBox>
  );
}

export default GroupAndChannel;
