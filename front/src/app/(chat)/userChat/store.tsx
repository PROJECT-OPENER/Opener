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
  default: 45, // 시작 값, 45, 30
  effects_UNSTABLE: [persistAtom],
});

export const userChatTimeState = atom({
  key: 'userChatTimeState',
  default: 45,
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

// 제시어, 문법 점수 통합
export const userChatScoreState = atom({
  key: 'userChatScoreState',
  default: {
    myGrammarScore: 0,
    otherGrammarScore: 0,
    myContextScore: 0,
    otherContextScore: 0,
    myWordUsed: false,
    otherWordUsed: false,
  },
  effects_UNSTABLE: [persistAtom],
});

// 문법 검사 문장 리스트
export const userChatGrammerMsgListState = atom({
  key: 'userChatGrammerMsgListState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// 제시어 사용 여부
export const userChatTargetWordState = atom({
  key: 'userChatTargetWordState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userChatResultState = atom({
  key: 'userChatResultState',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const userChatLastChatState = atom({
  key: 'userChatLastChatState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const bonobonoState = atom({
  key: 'bonobonoState',
  default: false,
});

export const userChatTipState = atom({
  key: 'userChatTipState',
  default: true,
});

export const userChatModelState = atom({
  key: 'userChatModelState',
  default: false,
});
