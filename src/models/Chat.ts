import User from './User';

export interface ChatMessage {
  content: string;
  sentUserId: string;
  timeSent: Date;
}

export interface ChatRaw {
  users: string[];
  latestMessage: {
    messageContent: string;
    timeSent: Date;
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
