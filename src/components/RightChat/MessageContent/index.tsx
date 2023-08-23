'use client';

import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { firebaseDb } from '@/lib/firebase-config';

import InfiniteScroll from 'react-infinite-scroll-component';

import { Fragment, useEffect, useState } from 'react';
import { useChatContext } from '@/context/chatContext';

import { ChatInformation, ChatMessage } from '@/models/Chat';

import Spinner from '@/components/Spinner';
import CRMNewMessage from '@/components/CRNMessage';

import { Typography } from '@mui/material';
import { textTypo } from '@/config/typography';
import { textColor } from '@/config/colors';

import MessageUserInfo from '../MessageBox/MessageUserInfo';
import MessageItem from '../MessageBox/MessageItem';

const paginationLimit = 20;

function MessageContent({ chatInfo }: { chatInfo: ChatInformation }) {
  // hooks
  const { userInfo } = useChatContext();

  // local states
  const [messages, setMessages] = useState<ChatMessage[] | null>(null);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(true);
  const [latestMessage, setLatestMessage] = useState<QueryDocumentSnapshot<
    DocumentData,
    DocumentData
  > | null>(null);
  const [hasNext, setHasNext] = useState<boolean>(false);

  // local variables
  const isLoading = isLoadingMessages;
  const isNotHaveAnyMessage = !isLoadingMessages && !messages;

  // events
  const fetchNextMessages = () => {
    const queryNextMessages = query(
      collection(firebaseDb, 'chats', chatInfo.id, 'messages'),
      orderBy('timeSent', 'desc'),
      startAfter(latestMessage),
      limit(paginationLimit),
    );

    getDocs(queryNextMessages).then((docsSnapshot) => {
      const listMessages: ChatMessage[] = [];
      docsSnapshot.forEach((docSnapshot) => {
        const messageData = {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        } as ChatMessage;
        listMessages.push(messageData);
      });

      if (!listMessages.length) {
        setHasNext(false);
        return;
      }

      const latestNewMessages = docsSnapshot.docs[docsSnapshot.docs.length - 1];
      if (
        listMessages.length === paginationLimit &&
        latestNewMessages.id !== latestMessage?.id
      ) {
        setHasNext(true);
      } else {
        setHasNext(false);
      }

      setLatestMessage(latestNewMessages);

      setMessages((prev) => [...(prev ?? []), ...listMessages]);
    });
  };

  // effects
  useEffect(() => {
    setIsLoadingMessages(true);
    const queryMessages = query(
      collection(firebaseDb, 'chats', chatInfo.id, 'messages'),
      orderBy('timeSent', 'desc'),
      limit(paginationLimit),
    );
    // TODO handle new chat coming when chat with other users
    // because setting pagination and limit, some thing will not
    // correct flow when chatting
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
          setLatestMessage(
            messagesSnapshot.docs[messagesSnapshot.docs.length - 1],
          );
          if (listMessages.length === paginationLimit) {
            setHasNext(true);
          }
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

  let lastMessageUserId: string | null = null;
  const chatContent = messages?.map((item, index) => {
    const isYou = item.senderId === userInfo?.userId;
    let subContent = null;

    if (index === messages.length - 1) {
      subContent = (
        <MessageUserInfo
          userInfo={chatInfo.users[item.senderId]}
          isYou={isYou}
        />
      );
    } else if (
      lastMessageUserId &&
      lastMessageUserId !== messages[index + 1].senderId
    ) {
      lastMessageUserId = messages[index + 1].senderId;
      subContent = (
        <MessageUserInfo
          userInfo={chatInfo.users[item.senderId]}
          isYou={isYou}
        />
      );
    } else if (!lastMessageUserId) {
      lastMessageUserId = item.senderId;
    }

    return (
      <Fragment key={item.id}>
        <MessageItem isYour={isYou} item={item} />
        {subContent}
      </Fragment>
    );
  });

  return (
    <InfiniteScroll
      dataLength={messages?.length ?? 0}
      next={fetchNextMessages}
      hasMore={hasNext}
      loader={
        <Typography
          sx={{
            fontSize: textTypo.medium,
            textAlign: 'center',
            fontWeight: 'bold',
            color: textColor.lighter,
          }}
        >
          Loading more message ...
        </Typography>
      }
      endMessage={
        <Typography
          sx={{
            fontSize: textTypo.medium,
            textAlign: 'center',
            fontWeight: 'bold',
            color: textColor.lighter,
          }}
        >
          No more message
        </Typography>
      }
      scrollableTarget="scrollableDiv"
      inverse
      style={{
        display: 'flex',
        flexDirection: 'column-reverse',
      }}
    >
      {chatContent}
    </InfiniteScroll>
  );
}

export default MessageContent;
