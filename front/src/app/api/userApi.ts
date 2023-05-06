import {
  emailAuthCheckInterface,
  userLoginInterface,
  userRegisterInterface,
} from '@/types/share';
import { memberApi } from './axiosConfig';

// 이메일 중복 확인
export const emailDuplicateCheckApi = async (email: string) => {
  const response = await memberApi.get(`/members/email?email=${email}`);
  console.log(response);
  return response.data;
};

// 이메일 인증 코드 발송
export const emailAuthApi = async (email: string) => {
  // console.log(email);
  const payload = { email: email };
  const response = await memberApi.post(`/members/email-code`, payload);
  console.log(response);
  return response.data;
};

// 이메일 인증 코드 검사
export const emailAuthCheckApi = async (payload: emailAuthCheckInterface) => {
  const response = await memberApi.post(`/members/email`, {
    email: payload.email,
    authCode: payload.code,
  });
  return response.data;
};

// 닉네임 중복 검사
export const nicknameDuplicateCheckApi = async (nickname: string) => {
  const response = await memberApi.get(
    `/members/nickname?nickname=${nickname}`,
  );
  return response.data;
};

// 회원가입
export const registerApi = async (payload: userRegisterInterface) => {
  const response = await memberApi.post(`/members`, payload);
  return response.data;
};

// 로그인
export const loginApi = async (payload: userLoginInterface) => {
  const response = await memberApi.post(`/members/login`, payload);
  console.log(response);
  return response.data;
};
