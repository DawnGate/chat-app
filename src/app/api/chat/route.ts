/* eslint-disable import/prefer-default-export */
import { auth, firestore, database } from 'firebase-admin';

import { NextRequest, NextResponse } from 'next/server';

import firebaseAdminInitApp from '@/lib/firebase-admin-config';

firebaseAdminInitApp();

// api handle action send message
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // extract body request
    const body = await request.json();
    const { chatId, messageText } = body;

    if (!chatId || !messageText) {
      return NextResponse.json({ status: 400 });
    }

    // init firestore database
    const db = firestore();
    // check valid chatId
    const chatRef = db.collection('chats').doc(chatId);
    const chatSnapshot = await chatRef.get();
    if (!chatSnapshot.exists) {
      return NextResponse.json({ status: 404 });
    }

    // check permission with valid user in valid chat
    const session = request.cookies.get('session')?.value;
    if (!session) {
      return NextResponse.json({ status: 401 });
    }
    const decodedClaims = await auth().verifySessionCookie(session, true);
    const currentUid = decodedClaims.uid;
    if (!chatSnapshot.data()?.participants[currentUid]) {
      return NextResponse.json({ status: 403 });
    }

    // update latest message
    const currentTime = firestore.Timestamp.now();
    const updateLatestMessage = chatRef.update({
      latestMessage: {
        content: messageText,
        timeSent: currentTime,
      },
    });

    // add new message chat
    const messagesRef = chatRef.collection('messages');

    const addNewMessage = messagesRef.add({
      senderId: currentUid,
      content: messageText,
      timeSent: currentTime,
    });

    // add new message with database
    const realtimeDb = database();
    const messageRef = realtimeDb.ref('messages').child(chatId);
    messageRef.push().set({
      senderId: currentUid,
      content: messageText,
      timeSent: currentTime,
    });

    await Promise.all([updateLatestMessage, addNewMessage]);

    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 400 });
  }
}
