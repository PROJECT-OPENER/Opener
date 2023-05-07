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

// Function to handle request errors
const handleRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.log(error);
  return Promise.reject(error);
};

// Function to handle successful responses
const handleResponseSuccess = (response: AxiosResponse): AxiosResponse => {
  // You can also handle common successful response scenarios here
  console.log(response);
  return response;
};

// Function to handle response errors
const handleResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.log(error);
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
chatApi.interceptors.response.use(handleResponseSuccess, handleResponseError);
