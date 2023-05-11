import { shadowingApi } from './axiosConfig';
import { getSession } from 'next-auth/react';

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
  return await shadowingApi
    .get(url)
    .then((res) => res.data.data.shadowingCategoryDtoList)
    .catch((err) => console.log(err));
};

export const getRecommendListApi = async () => {
  return await shadowingApi
    .get('/main-recommendation')
    .then((res) => res.data)
    .catch((err) => err);
};
