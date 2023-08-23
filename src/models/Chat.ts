import { ChatType } from '@/config/constant';
import { TimestampClientAdmin } from './Timestamp';
import User from './User';

export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  timeSent: TimestampClientAdmin;
}

export interface ChatRaw {
  participants: {
    [key: string]: boolean;
  };
  // TODO: change latestMessage object to plain
  // with latestMessagesContent and latestMessagetimeSent
  latestMessage?: {
    content: string;
    timeSent: TimestampClientAdmin;
  };
  createdTimestamp: TimestampClientAdmin;
  type: ChatType;
}

export type ChatRawWithId = ChatRaw & { id: string };

export interface ChatInformation {
  id: string;
  participants: { [key: string]: User };
  // exist when have data chat
  chat: ChatRaw;
}
