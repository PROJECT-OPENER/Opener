import { responseInterface } from '@/types/share';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getSession } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const memberApi = axios.create({
  baseURL: BASE_URL + 'member-service',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const memberFileApi = axios.create({
  baseURL: BASE_URL + 'member-service',
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
});

// 쉐도잉 API
export const shadowingApi = axios.create({
  baseURL: BASE_URL + 'shadowing-service',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
// 챌린지 API
export const challengeApi = axios.create({
  baseURL: BASE_URL + 'challenge-service',
  withCredentials: true,
  headers: {
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
});

export const chatApi = axios.create({
  baseURL: BASE_URL + 'chatting-service',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Function to set the Authorization header if a token is available in localStorage
const setAuthTokenHeader = async (
  config: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  const session = await getSession();
  const accessToken = session?.user.user?.accessToken;

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
};

export const fetcher = async (url: string, token: string) => {
  const session = await getSession();
  const accessToken = session?.user.user?.accessToken;
  if (accessToken) {
    console.log(accessToken);
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 추가
      },
    });
    const data = await response.json();
    return data;
  } else {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
};

// Function to handle request errors
const handleRequestError = (error: AxiosError): Promise<AxiosError> => {
  // console.log('handleRequestError', error);
  return Promise.reject(error);
};

// Function to handle successful responses
const handleResponseSuccess = (response: AxiosResponse): AxiosResponse => {
  // You can also handle common successful response scenarios here
  // console.log(response);
  return response;
};

// Function to handle response errors
const handleResponseError = (error: AxiosError): Promise<AxiosError> => {
  // console.log('handleResponseError', error);
  // Handle Network Error
  if (!error.response) {
    const errMsg = 'Network Error';
    return Promise.reject(errMsg);
  }

  // Handle Authentication Error
  // Redirect to the login page
  if (error.response.status === 401) {
    console.log(error);
    console.log('401 error');
  }

  const errCode = (error.response?.data as responseInterface)?.code;
  const errMsg = (error.response?.data as responseInterface)?.message;
  // custom error handling : member-service
  if (errCode >= -121 && errCode <= -100) return Promise.reject(errMsg);

  // custom error handling : challenge-service / shooting
  if (errCode <= -411 && errCode >= -413) return Promise.reject(errMsg);

  return Promise.reject(error);
};

// Add the request interceptor with a type assertion to bypass the type error
memberApi.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config) => setAuthTokenHeader(config as AxiosRequestConfig) as any,
  handleRequestError,
);
chatApi.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config) => setAuthTokenHeader(config as AxiosRequestConfig) as any,
  handleRequestError,
);

// Add the response interceptor for handling successful responses and errors
memberApi.interceptors.response.use(handleResponseSuccess, handleResponseError);

shadowingApi.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config) => setAuthTokenHeader(config as AxiosRequestConfig) as any,
  handleRequestError,
);

challengeApi.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config) => setAuthTokenHeader(config as AxiosRequestConfig) as any,
  handleRequestError,
);

memberFileApi.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config) => setAuthTokenHeader(config as AxiosRequestConfig) as any,
  handleRequestError,
);

shadowingApi.interceptors.response.use(
  handleResponseSuccess,
  handleResponseError,
);

challengeApi.interceptors.response.use(
  handleResponseSuccess,
  handleResponseError,
);

chatApi.interceptors.response.use(handleResponseSuccess, handleResponseError);

memberFileApi.interceptors.response.use(
  handleResponseSuccess,
  handleResponseError,
);
