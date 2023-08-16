import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { firebaseAuth, firebaseDb } from '@/lib/firebase-config';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import User from '@/models/User';
import { ChatActionMap, ChatActionType } from './type/chatType';

interface IReducer {
  userInfo: User | null;
  showMenuDrawer: boolean;
}

type IContext = IReducer & {
  updateUserInfo: (userInfo: User) => void;
  toggleMenuDrawer: (valueMenu: boolean) => void;
};

const initValue = {
  userInfo: null,
  showMenuDrawer: false,
};

const ChatContext = createContext<IContext | null>(null);

const chatReducer = (state: IReducer, action: ChatActionMap) => {
  const { type, payload } = action;
  switch (type) {
    case ChatActionType.UPDATE_USER_INFO:
      return { ...state, userInfo: payload.userInfo };
    case ChatActionType.TOGGLE_MENU_DRAWER:
      return { ...state, showMenuDrawer: payload.menuDrawerValue };
    default:
      return state;
  }
};

function ChatProvider({ children }: { children: ReactNode }) {
  const [value, dispatch] = useReducer(chatReducer, initValue);

  const handleActions = {
    updateUserInfo: (userInfo: User) => {
      dispatch({
        type: ChatActionType.UPDATE_USER_INFO,
        payload: {
          userInfo,
        },
      });
    },
    toggleMenuDrawer: (valueMenu: boolean) => {
      dispatch({
        type: ChatActionType.TOGGLE_MENU_DRAWER,
        payload: {
          menuDrawerValue: valueMenu,
        },
      });
    },
  };

  // effects
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        const { uid } = user;
        const userRef = doc(firebaseDb, 'users', uid);
        getDoc(userRef)
          .then((docSnapshot) => {
            const resData = docSnapshot.data();
            handleActions.updateUserInfo({
              id: uid,
              email: resData?.email,
              displayName: resData?.displayName,
            });
          })
          .catch();
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const memoValue = useMemo(() => {
    return {
      userInfo: value.userInfo,
      showMenuDrawer: value.showMenuDrawer,
      ...handleActions,
    };
  }, [value.userInfo, value.showMenuDrawer]);

  return (
    <ChatContext.Provider value={memoValue}>{children}</ChatContext.Provider>
  );
}

export default ChatProvider;

export const useChatContext = () => {
  const chatValue = useContext(ChatContext);
  if (!chatValue) {
    throw Error('Using out of chat context');
  }
  return chatValue;
};
