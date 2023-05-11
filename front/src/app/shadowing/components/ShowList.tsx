'use client';

import Link from 'next/link';
import styles from './categories.module.css';
import Image from 'next/image';
import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs';
import useSWRInfinite from 'swr/infinite';
import { getShadowingListApi } from '@/app/api/shadowingApi';
import { useEffect, useState } from 'react';
// import defaultImage from '@/../public/images/default.png';

const ShowList = (props: { category: string }) => {
  const category = props.category;

  const getKey = (pageIndex: number) => {
    const startIndex = pageIndex * 10;
    const endIndex = pageIndex * 10 + 9;
    return `/shadowings?category=${category}&startIndex=${startIndex}&endIndex=${endIndex}`; // SWR 키
  };

  const { data, size, setSize } = useSWRInfinite(getKey, getShadowingListApi);
  const [contents, setContents] = useState<any>([]);
  console.log('재 랜더링');
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
                <Image src={content.thumbnailUrl} fill alt="" />
                {/* <Image src={defaultImage.src} fill alt="" /> */}
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
          className="border border-[#e3e3e3] p-3 bg-[#f0f0f0] hover:bg-white hover:shadow-custom rounded rounded-xl"
        >
          load more
        </button>
      </div>
    );
  }
};
export default ShowList;
