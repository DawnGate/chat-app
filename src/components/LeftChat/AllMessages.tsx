'use client';

import { useEffect, useState } from 'react';
import { useChatContext } from '@/context/chatContext';

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firebaseDb } from '@/lib/firebase-config';

import { ChatRawWithId } from '@/models/Chat';

import ContentBox from './ContentBox';
import UserItem from './UserItem';

function AllMessages() {
  // hooks
  const { userInfo } = useChatContext();

  // states
  const [chats, setChats] = useState<ChatRawWithId[]>([]);

  // effects
  useEffect(() => {
    if (!userInfo?.userId) {
      return undefined;
    }

    const queryChatsRef = query(
      collection(firebaseDb, 'chats'),
      where(`participants.${userInfo.userId}`, '==', true),
    );

    // ! When using onSnapshot, clear about your action will
    // ! not making infinite loop to exceed quota
    const unSub = onSnapshot(queryChatsRef, (querySnapshot) => {
      const listChats: ChatRawWithId[] = [];
      querySnapshot.forEach((chatDoc) => {
        const chatData = {
          id: chatDoc.id,
          ...chatDoc.data(),
        } as ChatRawWithId;
        if (chatData.latestMessage) {
          listChats.push(chatData);
        }
      });
      setChats(listChats);
    });

    return () => {
      unSub();
    };
  }, [userInfo?.userId]);

  // TODO pagination + lazy load with list user chat
  return (
    <ContentBox title="all message">
      {chats.map((chat) => (
        <UserItem chatId={chat.id} chat={chat} key={chat.id} />
      ))}
    </ContentBox>
  );
}

export default AllMessages;
