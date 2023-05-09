import { atom } from 'recoil';

export const userChatMessageState = atom({
  key: 'userChatMessageState',
  default: '',
});

interface Message {
  nickname: string;
  content: string;
}

export const userChatMessageListState = atom<Message[]>({
  key: 'userChatMessageListState',
  default: [],
});

export const userChatIsRecordingState = atom({
  key: 'userChatIsRecordingState',
  default: false,
});

export const userChatIsChatState = atom({
  key: 'userChatIsChatState',
  default: false,
});
