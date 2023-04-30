import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const hostname = window && window.location && window.location.hostname;
const BASE_URL =
  hostname !== 'localhost'
    ? 'http://j8c202.p.ssafy.io:8080/'
    : 'http://localhost:8080/';

export const memberApi = axios.create({
  baseURL: BASE_URL + 'member-s',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Function to set the Authorization header if a token is available in localStorage
const setAuthTokenHeader = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers = {
      ...config.headers,
      accessToken: `Bearer ${accessToken}`,
    };
  }
  return config;
};

// Function to handle request errors
const handleRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

// Function to handle successful responses
const handleResponseSuccess = (response: AxiosResponse): AxiosResponse => {
  // You can also handle common successful response scenarios here
  return response;
};

// Function to handle response errors
const handleResponseError = (error: AxiosError): Promise<AxiosError> => {
  // Add common error handling here, such as handling 401 Unauthorized errors
  return Promise.reject(error);
};

// Add the request interceptor with a type assertion to bypass the type error
memberApi.interceptors.request.use(
  (config) => setAuthTokenHeader(config as AxiosRequestConfig) as any,
  handleRequestError,
);
//   (config) => setAuthTokenHeader(config as AxiosRequestConfig) as any,
//   handleRequestError,
// );

// Add the response interceptor for handling successful responses and errors
memberApi.interceptors.response.use(handleResponseSuccess, handleResponseError);
