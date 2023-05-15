import { chatApi } from './axiosConfig';

// 전체 관심사 리스트 가져오기
export const getInterestListApi = async () => {
  const response = await chatApi.get(`/auth/interests`);
  return response.data;
};

// 팁 가져오기
export const getTipApi = async (data: number) => {
  const response = await chatApi.get(`/auth/ai-chat/interests/${data}`);
  return response.data;
};
