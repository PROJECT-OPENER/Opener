'use client';

import Link from 'next/link';
import styles from './categories.module.css';
import Image from 'next/image';
import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs';
import useSWRInfinite from 'swr/infinite';
// import { getShadowingListApi } from '@/app/api/shadowingApi';
import { useEffect, useState } from 'react';
import useUser from '@/app/hooks/userHook';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { shadowingApi } from '@/app/api/axiosConfig';
import defaultImage from '@/../public/images/default.png';
// import { shadowingApi } from './axiosConfig';

// eng_sentence
// kor_sentence
// thumbnail_url
// :
// null
// video_id
// :
// 18
const ShowList = (props: { category: string }) => {
  const category = props.category;
  const { user, isLoading, error } = useUser();
  console.log(user);
  const getShadowingListApi = async (url: string) => {
    if (props.category === 'recommend') {
      console.log(process.env.NEXT_PUBLIC_FAST_API + url);
      const res = await axios.get(process.env.NEXT_PUBLIC_FAST_API + url);
      console.log(res);
      return res.data.videos;
    } else {
      console.log(props.category);
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
    }
    // return await shadowingApi
    //   .get(url)
    //   .then((res) => res.data.data.shadowingCategoryDtoList)
    //   .catch((err) => console.log(err));
  };
  const getKey = (pageIndex: number) => {
    const startIndex = pageIndex * 10;
    const endIndex = pageIndex * 10 + 9;
    if (props.category === 'recommend') {
      console.log('추천');
      if (user.data.nickname) {
        return `/fast/recommendations/${user.data.nickname}/${startIndex}/${endIndex}`;
      }
    } else {
      return `/shadowings?category=${category}&startIndex=${startIndex}&endIndex=${endIndex}`; // SWR 키
    }
  };

  const { data, size, setSize } = useSWRInfinite(getKey, getShadowingListApi);
  console.log(data);
  const [contents, setContents] = useState<any>([]);
  // console.log('재 랜더링');
  useEffect(() => {
    if (data) {
      const arr = [];
      for (let i = 0; i < data?.length; i++) {
        for (let j = 0; j < data[i]?.length; j++) {
          if (data[i][j]) {
            arr.push(data[i][j]);
          }
        }
      }
      setContents(arr);
    }
  }, [data]);
  if (!data) {
    return <p>loading...</p>;
  } else {
    return (
      <div className={styles.content}>
        <p>카테고리 : {category}</p>
        {contents.map((content: any, index: number) => {
          return (
            <Link
              href={'/shadowing/learning/' + content.videoId}
              key={index}
              className={styles.contentItem}
            >
              <div className={styles.ItemImage}>
                {content.thumbnailUrl && (
                  <Image src={content.thumbnailUrl} fill alt="" />
                )}
                {!content.thumbnailUrl && (
                  // <Image src={content.thumbnailUrl} fill alt="" />
                  <Image src={defaultImage.src} fill alt="" />
                )}
              </div>
              <div className="px-5 flex flex-row w-full justify-between items-center">
                <div className="">
                  <p className="text-lg font-medium">{content.engSentence}</p>
                  <p className="text-xs">{content.korSentence}</p>
                </div>
                {content.marked ? (
                  <BsBookmarkPlusFill color="#7D17FF" size="1.5rem" />
                ) : (
                  <BsBookmarkPlus color="#D9D9D9" size="1.5rem" />
                )}
              </div>
            </Link>
          );
        })}
        <button
          onClick={() => setSize(size + 1)}
          className="border border-[#e3e3e3] p-3 bg-[#f0f0f0] hover:bg-white active:bg-[#f0f0f0] hover:shadow-custom rounded-xl"
        >
          load more
        </button>
      </div>
    );
  }
};
export default ShowList;
