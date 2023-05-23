import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist({
  key: 'recoil-persist', // this key is using to store data in local storage
  storage: localStorage,
});

interface Message {
  text: string;
  sender: 'HUMAN' | 'AI';
}

export const aiChatMessageState = atom({
  key: 'aiChatMessageState',
  default: '',
});

export const aiChatMessageListState = atom<Message[]>({
  key: 'aiChatMessageListState',
  default: [],
});

export const aiChatPromptState = atom({
  key: 'aiChatPromptState',
  default: '',
});

export const aiChatIsRecordingState = atom({
  key: 'aiChatIsRecordingState',
  default: false,
});

export const aiChatIsChatState = atom({
  key: 'aiChatIsChatState',
  default: false,
});

export const aiChatSub = atom({
  key: 'aiChatSub',
  default: { subIndex: 0, name: '' },
  effects_UNSTABLE: [persistAtom],
});

export const aiChatModelState = atom({
  key: 'aiChatModelState',
  default: false,
});
