import { Message } from '@/types/share';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist({
  key: 'recoil-persist', // this key is using to store data in local storage
  storage: localStorage,
});

export const userChatMessageState = atom({
  key: 'userChatMessageState',
  default: '',
});

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

export const userChatRoomIdState = atom({
  key: 'userChatRoomIdState',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const userChatFirstState = atom({
  key: 'userChatFirstState',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const userChatTurnState = atom({
  key: 'userChatTurnState',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});
