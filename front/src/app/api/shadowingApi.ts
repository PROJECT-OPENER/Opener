import axios from 'axios';
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

// oauthSignIn => 현재 사용 불가능
// export const oauthSignIn = async () => {
//   const client_id = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID;
//   const redirect_uri = process.env.NEXT_PUBLIC_SERVER_URL;
//   // Google's OAuth 2.0 endpoint for requesting an access token
//   const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

//   // Create <form> element to submit parameters to OAuth 2.0 endpoint.
//   const form = document.createElement('form');
//   form.setAttribute('method', 'GET'); // Send as a GET request.
//   form.setAttribute('action', oauth2Endpoint);

//   // Parameters to pass to OAuth 2.0 endpoint.
//   const params = {
//     client_id: client_id,
//     redirect_uri: redirect_uri,
//     response_type: 'token',
//     scope: 'https://www.googleapis.com/auth/youtube.force-ssl', // 해당 스코프는 프로젝트가 https인 경우에만 가능
//     include_granted_scopes: 'true',
//     state: 'pass-through value',
//   };

//   // Add form parameters as hidden input values.
//   for (const p in params) {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'hidden');
//     input.setAttribute('name', p);
//     input.setAttribute('value', params[p]);
//     form.appendChild(input);
//   }

//   // Add form to page and submit it to open the OAuth 2.0 endpoint.
//   document.body.appendChild(form);
//   form.submit();
// };
