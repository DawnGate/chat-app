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

import Typography from '@mui/material/Typography';

import { Fragment, useEffect, useState } from 'react';
import { useChatContext } from '@/context/chatContext';

import { ChatInformation, ChatMessage } from '@/models/Chat';

import Spinner from '@/components/Spinner';
import CRMNewMessage from '@/components/CRNMessage';

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
  const [isLoadingInitMessages, setIsLoadingInitMessages] =
    useState<boolean>(true);
  const [oldestMessage, setOldestMessage] = useState<QueryDocumentSnapshot<
    DocumentData,
    DocumentData
  > | null>(null);
  const [hasNext, setHasNext] = useState<boolean>(false);

  // local variables
  const isNotHaveAnyMessage = !isLoadingInitMessages && !messages;

  // events
  const fetchNextMessages = () => {
    const queryNextMessages = query(
      collection(firebaseDb, 'chats', chatInfo.id, 'messages'),
      orderBy('timeSent', 'desc'),
      startAfter(oldestMessage),
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
        latestNewMessages.id !== oldestMessage?.id
      ) {
        setHasNext(true);
      } else {
        setHasNext(false);
      }

      setOldestMessage(latestNewMessages);

      setMessages((prev) => [...(prev ?? []), ...listMessages]);
    });
  };

  // effects
  useEffect(() => {
    const queryMessages = query(
      collection(firebaseDb, 'chats', chatInfo.id, 'messages'),
      orderBy('timeSent', 'desc'),
      limit(paginationLimit),
    );

    getDocs(queryMessages)
      .then((messagesSnapshot) => {
        const listMessages: ChatMessage[] = [];

        if (!messagesSnapshot.empty) {
          messagesSnapshot.forEach((messageSnapshot) => {
            const messageData = {
              id: messageSnapshot.id,
              ...messageSnapshot.data(),
            } as ChatMessage;
            listMessages.push(messageData);
          });
        }

        if (listMessages.length === paginationLimit) {
          setHasNext(true);
          setOldestMessage(
            messagesSnapshot.docs[messagesSnapshot.docs.length - 1],
          );
        }

        if (listMessages.length) {
          setMessages(listMessages);
        }
      })
      .finally(() => {
        setIsLoadingInitMessages(false);
      });
  }, [chatInfo.id]);

  useEffect(() => {
    if (isLoadingInitMessages) {
      return undefined;
    }
    // load latest query
    const queryMessages = query(
      collection(firebaseDb, 'chats', chatInfo.id, 'messages'),
      orderBy('timeSent', 'desc'),
      limit(1),
    );

    // ! When using onSnapshot, clear about your action will
    // ! not making infinite loop to exceed quota
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
        }

        if (listMessages.length) {
          setMessages((prev) => {
            const newestMessage = listMessages[0];
            if (!prev?.length) {
              return [newestMessage];
            }
            const isHadNewMessage = newestMessage.id === prev[0].id;
            if (isHadNewMessage) {
              return prev;
            }
            return [newestMessage, ...prev];
          });
        }
      },
      (err) => {
        console.log(err);
      },
    );
    return () => {
      unSub();
    };
  }, [chatInfo.id, isLoadingInitMessages]);

  // content
  if (isLoadingInitMessages) {
    return <Spinner />;
  }

  if (isNotHaveAnyMessage) {
    return <CRMNewMessage />;
  }

  let lastMessageUserId: string | null = null;
  const chatContent = messages?.map((item, index) => {
    const isYou = item.senderId === userInfo?.userId;
    let subContent = null;

    lastMessageUserId = item.senderId;

    if (index === messages.length - 1) {
      subContent = (
        <MessageUserInfo
          userInfo={chatInfo.participants[item.senderId]}
          isYou={isYou}
        />
      );
    } else if (lastMessageUserId !== messages[index + 1].senderId) {
      lastMessageUserId = messages[index + 1].senderId;
      subContent = (
        <MessageUserInfo
          userInfo={chatInfo.participants[item.senderId]}
          isYou={isYou}
        />
      );
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
