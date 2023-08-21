'use client';

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firebaseDb } from '@/lib/firebase-config';

import { useEffect, useState } from 'react';
import { useChatContext } from '@/context/chatContext';

import { ChatInformation, ChatMessage } from '@/models/Chat';

import Spinner from '@/components/Spinner';
import CRMNewMessage from '@/components/CRNMessage';

import OtherMessage from '../MessageBox/OtherMessage';
import YourMessage from '../MessageBox/YourMessage';

function MessageContent({ chatInfo }: { chatInfo: ChatInformation }) {
  // hooks
  const { userInfo } = useChatContext();

  // local states
  const [messages, setMessages] = useState<ChatMessage[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // local variables
  const isNotHaveAnyMessage = !isLoading && !messages;

  // effects
  useEffect(() => {
    setIsLoading(true);
    const queryMessages = query(
      collection(firebaseDb, 'chats', chatInfo.id, 'messages'),
      orderBy('timeSent'),
    );
    const unSub = onSnapshot(
      queryMessages,
      (messagesSnapshot) => {
        const listMessages: ChatMessage[] = [];
        if (!messagesSnapshot.empty) {
          messagesSnapshot.forEach((messageSnapshot) => {
            const messageData = {
              id: messageSnapshot.id,
              ...messageSnapshot.data(),
            } as ChatMessage;
            listMessages.push(messageData);
          });
          setMessages(listMessages);
        } else {
          setMessages(null);
        }
        setIsLoading(false);
      },
      (err) => {
        console.log(err);
        setIsLoading(false);
      },
    );
    return () => {
      unSub();
    };
  }, [chatInfo.id]);

  // content
  if (isLoading) {
    return <Spinner />;
  }

  if (isNotHaveAnyMessage) {
    return <CRMNewMessage />;
  }

  // TODO render message box when have messages
  // TODO pagination with messages data
  // TODO rewrite your message and other message

  const chatContent = messages?.map((item) => {
    if (item.senderId === userInfo?.id) {
      return <YourMessage key={item.id} />;
    }
    return <OtherMessage key={item.id} />;
  });

  return chatContent;
}

export default MessageContent;
