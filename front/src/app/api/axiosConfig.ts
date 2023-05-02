import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { responseInterface } from '../types/share';

const BASE_URL = 'http://k8c104.p.ssafy.io:8000/';

export const memberApi = axios.create({
  baseURL: BASE_URL + 'member-service',
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
  if (!error.response) {
    // Handle Network Error
    // Show an error message to the user
    return Promise.reject(error);
  }

  if (error.response.status === 401) {
    // Handle Authentication Error
    // Redirect to the login page
  }

  const errCode = (error.response?.data as responseInterface)?.code;
  if (errCode === undefined) {
    // Handle Empty Response Error
    // Show an error message to the user
  } else if (errCode === -100) {
    // Handle Email Already Used Error
    // Show an error message to the user
  } else if (errCode === -101) {
    // Handle Invalid Email Format Error
    // Show an error message to the user
  } else if (errCode === -104) {
    // Handle Email Required Error
    // Show an error message to the user
  }

  return Promise.reject(error);
};

// Add the request interceptor with a type assertion to bypass the type error
memberApi.interceptors.request.use(
  (config) => setAuthTokenHeader(config as AxiosRequestConfig) as any,
  handleRequestError,
);

// Add the response interceptor for handling successful responses and errors
memberApi.interceptors.response.use(handleResponseSuccess, handleResponseError);
