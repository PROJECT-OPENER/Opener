import { challengeApi } from './axiosConfig';
import { ChallengeIndex } from '@/app/types/share';

// challenge 원본 리스트 가져오기
export const originalChallengeApi = async () => {
  const response = await challengeApi.get(`/challenges`);
  return response.data.data;
};

// 원본별 사용자 챌린지 리스트 가져오기
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
