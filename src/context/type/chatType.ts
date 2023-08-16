import User from '@/models/User';

export enum ChatActionType {
  UPDATE_USER_INFO,
  TOGGLE_MENU_DRAWER,
}

export type ChatActionPayload = {
  [ChatActionType.UPDATE_USER_INFO]: {
    userInfo: User;
  };
  [ChatActionType.TOGGLE_MENU_DRAWER]: {
    menuDrawerValue: boolean;
  };
};

export type ChatAction<T extends ChatActionType> = {
  type: T;
  payload: ChatActionPayload[T];
};

export type ChatActionMap =
  | ChatAction<ChatActionType.UPDATE_USER_INFO>
  | ChatAction<ChatActionType.TOGGLE_MENU_DRAWER>;
