'use client';

import { useEffect } from 'react';
import { useChatContext } from '@/context/chatContext';

import { collection, query } from 'firebase/firestore';
import { firebaseDb } from '@/lib/firebase-config';

import ContentBox from './ContentBox';
import UserItem from './UserItem';

function AllMessages() {
  // hooks
  const { userInfo } = useChatContext();
  // effects
  useEffect(() => {
    if (!userInfo?.userId) {
      return;
    }
    const queryChats = query(
      collection(firebaseDb, 'userChat', userInfo.userId, 'chats'),
    );
    const unSub = () => {};
  }, [userInfo?.userId]);
  // TODO display history message

  // TODO pagination with list user chat
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
