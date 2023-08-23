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
      where('participants', 'array-contains', userInfo.userId),
    );

    const unSub = onSnapshot(queryChatsRef, (querySnapshot) => {
      const listChats: ChatRawWithId[] = [];
      querySnapshot.forEach((chatDoc) => {
        const chatData = {
          id: chatDoc.id,
          ...chatDoc.data(),
        } as ChatRawWithId;
        listChats.push(chatData);
      });
      setChats(listChats);
    });

    return () => {
      unSub();
    };
  }, [userInfo?.userId]);

  // TODO pagination with list user chat
  return (
    <ContentBox title="all message">
      {chats.map((chat) => (
        <UserItem chatId={chat.id} chat={chat} key={chat.id} />
      ))}
    </ContentBox>
  );
}

export default AllMessages;
