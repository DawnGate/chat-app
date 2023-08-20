import { Timestamp } from 'firebase/firestore';

import User from './User';

// because time stamp type of admin sdk different with client
export type TimestampClientAdmin = Omit<Timestamp, 'toJSON'>;

export interface ChatMessage {
  content: string;
  sentUserId: string;
  timeSent: TimestampClientAdmin;
}

export interface ChatRaw {
  users: string[];
  latestMessage: {
    content: string;
    timeSent: TimestampClientAdmin;
  };
  messages: {
    [key: string]: ChatMessage;
  };
}

export interface ChatInformation {
  id: string;
  users: User[];
  // exist when have data chat
  chat?: ChatRaw;
}
