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
  const response = await challengeApi
    .post(`/auth/challenges/${challengeId}/member-challenge`, payload)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
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

// 내가 업로드한 챌린지 목록 조회
export const getMyChallengesApi = async () => {
  const response = await challengeApi.get(`/auth/member-challenges`);
  console.log(response);
  return response.data.data;
};
// 내가 좋아요한 챌린지 목록 조회 => 아직 API 없음
export const getLikeChallengesApi = async () => {
  // const response = await challengeApi.get(`/auth/member-challenges`);
  // console.log(response);
  // return response.data.data;
};

// 자신의 영상 삭제
export const deleteMemberChallenge = async (memberChallengeId: number) => {
  const response = await challengeApi.delete(
    `/auth/member-challenges/${memberChallengeId}`,
  );
  return response.data;
};
