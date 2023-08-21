'use client';

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firebaseDb } from '@/lib/firebase-config';

import { useEffect, useState } from 'react';
import { useChatContext } from '@/context/chatContext';

import { ChatInformation, ChatMessage } from '@/models/Chat';

import Spinner from '@/components/Spinner';
import CRMNewMessage from '@/components/CRNMessage';

import MessageUserInfo from '../MessageBox/MessageUserInfo';
import MessageItem from '../MessageBox/MessageItem';

function MessageContent({ chatInfo }: { chatInfo: ChatInformation }) {
  // hooks
  const { userInfo } = useChatContext();

  // local states
  const [messages, setMessages] = useState<ChatMessage[] | null>(null);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(true);

  // local variables
  const isLoading = isLoadingMessages;
  const isNotHaveAnyMessage = !isLoadingMessages && !messages;

  // effects
  useEffect(() => {
    setIsLoadingMessages(true);
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
        setIsLoadingMessages(false);
      },
      (err) => {
        console.log(err);
        setIsLoadingMessages(false);
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

  // TODO pagination with messages data

  let latestMessageUserId: string | null = null;
  const chatContent = messages?.map((item) => {
    const isYou = item.senderId === userInfo?.userId;
    let subContent = null;
    if (latestMessageUserId !== item.senderId) {
      latestMessageUserId = item.senderId;
      subContent = (
        <MessageUserInfo
          userInfo={chatInfo.users[item.senderId]}
          key={item.id}
          isYou={isYou}
        />
      );
    }
    return (
      <>
        {subContent}
        <MessageItem isYour={isYou} item={item} />
      </>
    );
  });

  return chatContent;
}

export default MessageContent;
