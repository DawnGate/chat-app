/* eslint-disable import/prefer-default-export */
import { auth, firestore } from 'firebase-admin';

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
    if (!chatId.includes('_')) {
      return NextResponse.json({ status: 404 });
    }

    const [firstUserId, secondUserId] = chatId.split('_');
    const firstUserRef = db.collection('users').doc(firstUserId);
    const secondUserRef = db.collection('users').doc(secondUserId);

    const [firstUserSnapshot, secondUserSnapshot] = await Promise.all([
      firstUserRef.get(),
      secondUserRef.get(),
    ]);

    if (!(firstUserSnapshot.exists && secondUserSnapshot.exists)) {
      return NextResponse.json({ status: 400 });
    }

    // check permission with valid user in valid chat
    const session = request.cookies.get('session')?.value;
    if (!session) {
      return NextResponse.json({ status: 401 });
    }
    const decodedClaims = await auth().verifySessionCookie(session, true);
    const currentUid = decodedClaims.uid;
    if (!(currentUid === firstUserId || currentUid === secondUserId)) {
      return NextResponse.json({ status: 403 });
    }

    // find chat id information
    const docRef = db.collection('chats').doc(chatId);
    const chatDoc = await docRef.get();

    const currentTime = firestore.Timestamp.now();
    if (!chatDoc.exists) {
      const newChatRaw = {
        users: [firstUserId, secondUserId],
      };
      await docRef.set(newChatRaw);
    }

    // update latest message
    const updateLatestMessage = docRef.update({
      latestMessage: {
        messageContent: messageText,
        timeSent: currentTime,
      },
    });

    // add new message chat
    const messagesRef = docRef.collection('messages');

    const addNewMessage = messagesRef.add({
      senderId: currentUid,
      content: messageText,
      timeSent: currentTime,
    });

    // TODO add this chatId into list chats of 2 user in chat users

    await Promise.all([updateLatestMessage, addNewMessage]);

    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 400 });
  }
}
