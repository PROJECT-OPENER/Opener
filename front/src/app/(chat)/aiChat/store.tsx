import { atom } from 'recoil';

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
