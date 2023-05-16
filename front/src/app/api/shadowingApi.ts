import axios from 'axios';
import { shadowingApi } from './axiosConfig';
import { getSession } from 'next-auth/react';

const FAST_API_URL = process.env.NEXT_PUBLIC_FAST_API;

export const getRoadMapApi = async () => {
  console.log('getroadmap');
  const session = await getSession();
  const accessToken = session?.user?.user?.accessToken;
  const url = accessToken ? '/auth/roadmap' : '/roadmap';
  try {
    const res = await shadowingApi.get(url);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const getMainRoadMapApi = async () => {
  // console.log('getMainRoadMapApi');
  const session = await getSession();
  const accessToken = session?.user?.user?.accessToken;
  const url = accessToken ? '/auth/main-roadmap' : '/main-roadmap';
  try {
    const res = await shadowingApi.get(url);
    return res.data.data;
  } catch (err) {
    // console.log(err);
  }
};

export const getVideoApi = async (videoId: string) => {
  console.log('getVideoApi');
  const session = await getSession();
  const accessToken = session?.user?.user?.accessToken;
  const url = accessToken ? '/auth/videos/' + videoId : '/videos/' + videoId;
  try {
    const res = await shadowingApi.get(url);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const getShadowingListApi = async (url: string) => {
  const session = await getSession();
  const accessToken = session?.user?.user?.accessToken;
  const URL = accessToken ? '/auth/' + url : url;
  try {
    const res = await shadowingApi.get(URL);
    console.log(res);
    return accessToken
      ? res.data.data.authShadowingCategoryDtoList
      : res.data.data.shadowingCategoryDtoList;
  } catch (err) {
    console.log(err);
  }
  // return await shadowingApi
  //   .get(url)
  //   .then((res) => res.data.data.shadowingCategoryDtoList)
  //   .catch((err) => console.log(err));
};

export const getRecommendListApi = async () => {
  return await shadowingApi
    .get('/main-recommendation')
    .then((res) => res.data)
    .catch((err) => err);
};

export const setCountVideoApi = async (videoId: string) => {
  const session = await getSession();
  const accessToken = session?.user?.user?.accessToken;
  if (accessToken) {
    return await shadowingApi
      .patch(`/auth/videos/${videoId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
};

export const setBookmarkApi = async (videoId: string, isSet: boolean) => {
  const session = await getSession();
  const accessToken = session?.user?.user?.accessToken;
  if (accessToken) {
    shadowingApi({
      method: isSet ? 'POST' : 'DELETE',
      url: `/auth/videos/${videoId}/bookmark`,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
};

// 단어사전 API
export const dictionaryApi = (word: string) => {
  console.log('요청');
  return shadowingApi.get(`/dictionary/${word}`);
};

export const getCaptionApi = async (videoId: string) => {
  console.log('get caption');
  return await axios({
    method: 'GET',
    url: FAST_API_URL + '/fast/caption/' + videoId,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((res) => res.data);
};

export const translateCaptionApi = async (data: string) => {
  console.log('translate');
  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      model: 'text-davinci-003',
      prompt: 'Translate these captions into korean:\n' + data,
      temperature: 0.3,
      max_tokens: 3654,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(process.env.NEXT_PUBLIC_OPEN_API),
      },
    },
  );
  console.log(response);
  return response.data.choices[0].text;
};
