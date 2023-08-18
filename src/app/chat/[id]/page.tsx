import { doc, getDoc } from 'firebase/firestore';
import { firebaseDb } from '@/lib/firebase-config';

import RightChat from '@/components/RightChat';
import { ChatInformation } from '@/models/Chat';
import User from '@/models/User';

const getCheckUser = async (chatId: string) => {
  try {
    const docRef = doc(firebaseDb, 'messages', chatId);
    const docSnap = await getDoc(docRef);
    // check if this chatId in chats
    if (docSnap.exists()) {
      // TODO get information chat when it exist
      console.log(docSnap);
      return null;
    }
    // check if chatId is valid from p2p chat
    if (!chatId.includes('_')) {
      return null;
    }

    const [firstUserId, secondUserId] = chatId.split('_');
    const firstUserRef = doc(firebaseDb, 'users', firstUserId);
    const secondUserRef = doc(firebaseDb, 'users', secondUserId);

    const [firstUserSnapshot, secondUserSnapshot] = await Promise.all([
      getDoc(firstUserRef),
      getDoc(secondUserRef),
    ]);

    if (!(firstUserSnapshot.exists && secondUserSnapshot.exists)) {
      return null;
    }

    // create newChat information
    const newChat: ChatInformation = {
      id: chatId,
      users: [
        { id: firstUserSnapshot.id, ...firstUserSnapshot.data() } as User,
        { id: secondUserSnapshot.id, ...secondUserSnapshot.data() } as User,
      ],
    };

    return newChat;
  } catch (err) {
    // TODO handle error when occur
    console.log(err);
    return null;
  }
};

async function ChatIdPage({ params }: { params: { id: string } }) {
  const chatInfo: ChatInformation | null = await getCheckUser(params.id);
  return <RightChat chatInfo={chatInfo} />;
}

export default ChatIdPage;
