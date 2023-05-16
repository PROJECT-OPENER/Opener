export interface ucScoreInterface {
  myGrammarScore: number;
  otherGrammarScore: number;
  myContextScore: number;
  otherContextScore: number;
  myWordUsed: boolean;
  otherWordUsed: boolean;
}

export interface ucGrammerMsgInterface {
  type: 'pass' | 'grammerCheck' | 'correct';
  nickname: string;
  message: string;
  turn: number;
  score: number;
}

export interface ucFilterMsgInterface {
  nickname: string;
  message: string;
}

export interface ucAnalyzedMsgInterface {
  message: string;
  correctMessage: string;
  type: string;
  nickname: string;
  turn: number;
  score: number;
  roomId: string;
}
