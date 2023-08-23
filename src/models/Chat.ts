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
  participants: string[];
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
