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
// "data": [
//   {
//     "video_id" : ,
//     "eng_sentence": ,
//     "kor_sentence": ,
//   },
//   {
//     "video_id" : ,
//     "eng_sentence": ,
//     "kor_sentence": ,
//   },
//   ...
// ]

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
