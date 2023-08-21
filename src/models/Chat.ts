import { TimestampClientAdmin } from './Timestamp';
import User from './User';

export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  timeSent: TimestampClientAdmin;
}

export interface ChatRaw {
  users: string[];
  latestMessage: {
    content: string;
    timeSent: TimestampClientAdmin;
  };
}

export interface ChatInformation {
  id: string;
  users: { [key: string]: User };
  // exist when have data chat
  chat: ChatRaw | null;
}
