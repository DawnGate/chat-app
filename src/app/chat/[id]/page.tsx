import { doc, getDoc } from 'firebase/firestore';
import { firebaseDb } from '@/lib/firebase-config';

import RightChat from '@/components/RightChat';
import { ChatInformation, ChatRaw } from '@/models/Chat';
import User from '@/models/User';
import { redirect } from 'next/navigation';

const getCheckUser = async (chatId: string) => {
  try {
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

    const docRef = doc(firebaseDb, 'chats', chatId);
    const docSnap = await getDoc(docRef);

    let chat: ChatRaw | null = null;

    // check if this chatId in chats
    if (docSnap.exists()) {
      chat = docSnap.data() as ChatRaw | null;
    }

    // create newChat information
    const newChat: ChatInformation = {
      id: chatId,
      users: {
        [firstUserSnapshot.id]: firstUserSnapshot.data() as User,
        [secondUserSnapshot.id]: secondUserSnapshot.data() as User,
      },
      chat,
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

  if (!chatInfo) {
    redirect('/404');
  }
  return <RightChat chatInfoString={JSON.stringify(chatInfo)} />;
}

export default ChatIdPage;
