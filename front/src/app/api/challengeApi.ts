import { challengeApi } from './axiosConfig';
import { ChallengeIndex } from '@/types/share';

// challenge 원본 리스트 가져오기
export const originalChallengeApi = async () => {
  const response = await challengeApi.get(`/challenges`);
  return response.data.data;
};

// 원본별 챌린지 리스트 가져오기
export const memberChallengeOriginalApi = async (
  challengeId: number,
  payload: ChallengeIndex,
) => {
  const response = await challengeApi.get(`/challenges/${challengeId}`, {
    params: {
      startIndex: payload.startIndex,
      endIndex: payload.endIndex,
    },
  });
  return response.data.data;
};

export const uploadChallenge = async (
  challengeId: number,
  payload: FormData,
) => {
  const response = await challengeApi.post(
    `/auth/challenges/${challengeId}/member-challenge`,
    payload,
  );
  return response.data;
};

// all 페이지의 챌린지 전체 가져오기
export const allChallengeApi = async (
  category: string,
  startIndex: number,
  endIndex: number,
) => {
  const response = await challengeApi.get(
    `/member-challenges?category=${category}&startIndex=${startIndex}&endIndex=${endIndex}`,
  );
  return response.data.data;
};

// 챌린지 원본 영상 가져오기
export const originalVideoApi = async (challengeId: number) => {
  const response = await challengeApi.get(`/watch/challenges/${challengeId}`);
  return response.data.data;
};

// 챌린지 1개 가져오기 - 현재 swr로 컴포넌트에서 불러서 쓰고 있음.
// export const challengeDetailApi = async (memberChallengeId: number) => {
//   const response = await challengeApi.get(
//     `/watch/member-challenges/${memberChallengeId}/video`,
//   );
//   return response.data.data;
// };

// 좋아요 등록
export const likeCreateApi = async (memberChallengeId: number) => {
  const response = await challengeApi.post(
    `/auth/member-challenges/${memberChallengeId}/like`,
  );
  return response.data.data;
};

// 좋아요 취소
export const likeDeleteApi = async (memberChallengeId: number) => {
  const response = await challengeApi.delete(
    `/auth/member-challenges/${memberChallengeId}/like`,
  );
  return response.data.data;
};

// 자신의 영상 삭제
export const deleteMemberChallenge = async (memberChallengeId: number) => {
  const response = await challengeApi.delete(
    `/auth/member-challenges/${memberChallengeId}`,
  );
  return response.data;
};
