/* eslint-disable no-underscore-dangle */

'use client';

import { Timestamp } from 'firebase/firestore';

import {
  ref,
  query as dbQuery,
  child,
  get,
  orderByChild,
  endBefore as dbEndBefore,
  onChildAdded,
  limitToLast,
} from 'firebase/database';

import { firebaseDatabase } from '@/lib/firebase-config';

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

const paginationLimit = 10;

function MessageContent({ chatInfo }: { chatInfo: ChatInformation }) {
  // hooks
  const { userInfo } = useChatContext();

  // local states
  const [messages, setMessages] = useState<ChatMessage[] | null>(null);
  const [isLoadingInitMessages, setIsLoadingInitMessages] =
    useState<boolean>(true);

  const [hasNext, setHasNext] = useState<boolean>(false);

  // local variables
  const isNotHaveAnyMessage = !isLoadingInitMessages && !messages;

  // events
  const fetchNextMessages = () => {
    // fetch old message
    const messageLength = messages?.length;
    if (!messageLength) return;
    const latestMessage = messages[messageLength - 1];
    const dbRef = ref(firebaseDatabase);

    const queryDb = dbQuery(
      child(dbRef, `messages/${chatInfo.id}`),
      orderByChild('timeSent'),
      dbEndBefore(latestMessage.timeSent.toMillis(), latestMessage.id),
      limitToLast(paginationLimit),
    );

    get(queryDb).then((messagesSnapshot) => {
      let listMessages: ChatMessage[] = [];

      if (messagesSnapshot.exists()) {
        const messagesVal = messagesSnapshot.val();

        listMessages = Object.keys(messagesVal)
          .toReversed()
          .map((key) => {
            const data = messagesVal[key];
            const messageData = {
              ...data,
              id: key,
              timeSent: Timestamp.fromMillis(data.timeSent),
            } as ChatMessage;
            return messageData;
          });

        const newMessageLength = listMessages.length;

        if (!newMessageLength) {
          setHasNext(false);
          return;
        }

        if (
          newMessageLength === paginationLimit &&
          listMessages[newMessageLength - 1].id !== latestMessage.id
        ) {
          setHasNext(true);
        } else {
          setHasNext(false);
        }

        setMessages((prev) => [...(prev ?? []), ...listMessages]);
      }
    });
  };

  // effects
  useEffect(() => {
    // init messages updates
    const dbRef = ref(firebaseDatabase);
    const queryDb = dbQuery(
      child(dbRef, `messages/${chatInfo.id}`),
      orderByChild('timeSent'),
      limitToLast(paginationLimit),
    );
    get(queryDb)
      .then((messagesSnapshot) => {
        let listMessages: ChatMessage[] = [];

        if (messagesSnapshot.exists()) {
          const messagesVal = messagesSnapshot.val();

          let latestMessageKey = null;

          listMessages = Object.keys(messagesVal)
            .toReversed()
            .map((key) => {
              latestMessageKey = key;
              const data = messagesVal[key];
              const messageData = {
                ...data,
                id: key,
                timeSent: Timestamp.fromMillis(data.timeSent),
              } as ChatMessage;
              return messageData;
            });

          if (listMessages.length === paginationLimit && latestMessageKey) {
            setHasNext(true);
          }
        }

        if (listMessages.length) {
          setMessages(listMessages);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingInitMessages(false);
      });
  }, [chatInfo.id]);

  useEffect(() => {
    // waiting new data when in chat
    if (isLoadingInitMessages) {
      return undefined;
    }
    // load latest query

    const dbRef = ref(firebaseDatabase);
    const queryDb = dbQuery(
      child(dbRef, `messages/${chatInfo.id}`),
      limitToLast(1),
    );
    const unSub = onChildAdded(queryDb, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const messageData = {
          ...data,
          id: snapshot.key,
          timeSent: Timestamp.fromMillis(data.timeSent),
        } as ChatMessage;
        setMessages((prev) => {
          if (!prev?.length) {
            return [messageData];
          }
          const isHadNewMessage = messageData.id === prev[0].id;
          if (isHadNewMessage) {
            return prev;
          }
          return [messageData, ...prev];
        });
      }
    });
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
