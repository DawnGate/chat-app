import { doc, getDoc } from 'firebase/firestore';
import { firebaseDb } from '@/lib/firebase-config';

import RightChat from '@/components/RightChat';
import { ChatInformation, ChatRaw } from '@/models/Chat';
import User from '@/models/User';
import { redirect } from 'next/navigation';

const getChat = async (chatId: string) => {
  try {
    // check if chatId is valid from p2p chat
    const chatRef = doc(firebaseDb, 'chats', chatId);
    const chatSnapshot = await getDoc(chatRef);
    if (!chatSnapshot.exists()) {
      return null;
    }
    const chat = chatSnapshot.data() as ChatRaw;

    const usersRef = Object.keys(chat?.participants).map((userId) =>
      getDoc(doc(firebaseDb, 'users', userId)),
    );

    const usersSnapshot = await Promise.all(usersRef);
    const listUser = usersSnapshot
      .map((userSnapshot) => userSnapshot.data() as User)
      .reduce((result, user) => ({ ...result, [user.userId]: user }), {});

    // create newChat information
    const newChat: ChatInformation = {
      id: chatId,
      participants: listUser,
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
  const chatInfo: ChatInformation | null = await getChat(params.id);

  if (!chatInfo) {
    redirect('/404');
  }
  return <RightChat chatInfoString={JSON.stringify(chatInfo)} />;
}

export default ChatIdPage;
