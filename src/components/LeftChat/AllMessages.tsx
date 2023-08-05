import ContentBox from './ContentBox';
import UserItem from './UserItem';

function AllMessages() {
  return (
    <ContentBox title="all message">
      <UserItem chatId="12345670" />
      <UserItem chatId="12345671" />
      <UserItem chatId="12345672" />
      <UserItem chatId="12345673" />
      <UserItem chatId="12345674" />
      <UserItem chatId="12345675" />
    </ContentBox>
  );
}

export default AllMessages;
