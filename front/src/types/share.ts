import { interest } from '@/util/Interest';
// 유저 관련 타입
export interface User {
  email?: string | null | undefined;
  user?: {
    accessToken: string;
    code: number;
    data: {
      email: string;
      nickname: string;
      profile?: string;
      interests?: string;
    };
  };
}
export interface userInterface {
  name: string;
  nickname: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone: string;
  birth: string; // Use string instead of Date to avoid validation errors
}
export interface userLoginInterface {
  email: string;
  password: string;
}
export interface userRegisterInterface {
  email: string;
  password: string;
  confirmPassword?: string;
  nickname: string;
  birth: string; // YYYY-MM-DD string format
  gender: 'MALE' | 'FEMALE'; // enum
}
export interface emailAuthCheckInterface {
  email: string;
  code: string;
}
export interface interestInterface {
  interestId: number;
  interest: string;
}
// end of 유저 관련 타입

// response 관련 타입
export interface responseInterface {
  code: number;
  message: string;
}

// 쉐도잉 관련 타입
export interface scriptType {
  startTime: number;
  endTime: number;
  text: string;
}
// end of 쉐도잉 관련 타입

// 챌린지 원본 타입
export interface originalChallenge {
  challengeId: number;
  title: string;
  challengeImg: string;
  joinCount: number;
}

// 챌린지 인덱스 설정
export interface ChallengeIndex {
  startIndex: number;
  endIndex: number;
}

// index별로 가져오는 멤버 챌린지 리스트
export interface indexMemberChallengeList {
  original: originalChallenge;
  totalLength: number;
  memberChallengeResponseDtoList: memberChallenge[];
}

// 불러오는 멤버 챌린지
export interface memberChallenge {
  memberChallengeId: number;
  memberChallengeImg: string;
  likeCount: number;
  memberChallengeDate: string;
}

export interface originalChallenge {
  challengeId: number;
  title: string;
  challengeImg: string;
  joinCount: number;
}

// all 페이지에서 가져오는 챌린지 리스트
export interface allMemberChallengeList {
  totalLength: number;
  memberChallengeList: memberChallenge[];
}

// 원본 영상
export interface originalVideo {
  challengeId: number;
  title: string;
  korCaption: string;
  engCaption: string;
  captionTime: string;
  challengeUrl: string;
  joinCount: number;
}
