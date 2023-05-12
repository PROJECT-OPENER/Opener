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
  effects_UNSTABLE: [persistAtom],
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
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userChatTurnState = atom({
  key: 'userChatTurnState',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

// isFist가 true => 홀 수 턴에 채팅할 사람
// isFist가 false => 짝 수 턴에 채팅할 사람

export const userChatTimerState = atom({
  key: 'userChatTimerState',
  default: 15, // 시작 값
  effects_UNSTABLE: [persistAtom],
});

export const userChatTimeState = atom({
  key: 'userChatTimeState',
  default: 15,
});

export const userChatMyNicknameState = atom({
  key: 'userChatMyNicknameState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const userChatGameState = atom({
  key: 'userChatGameState',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const userChatFilteredState = atom({
  key: 'userChatFilteredState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const userChatTargetWordState = atom({
  key: 'userChatTargetWordState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userChatResultState = atom({
  key: 'userChatResultState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
