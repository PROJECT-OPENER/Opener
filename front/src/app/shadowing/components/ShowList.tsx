'use client';
type listType = {
  video_id: string;
  thumbnail_url: string;
  eng_sentence: string;
  kor_sentence: string;
  is_marked: string;
};
type contentType = {
  length: number;
  list: listType[];
};
const contents: contentType = {
  length: 2,
  list: [
    {
      video_id: '1',
      thumbnail_url: '/',
      eng_sentence: 'How are you?',
      kor_sentence: '어떻게 지내?',
      is_marked: 'false',
    },
    {
      video_id: '2',
      thumbnail_url: '/',
      eng_sentence: 'How are you?',
      kor_sentence: '어떻게 지내?',
      is_marked: 'false',
    },
  ],
};
//----------------------------------------------------------------''
import Link from 'next/link';
import styles from './categories.module.css';
import Image from 'next/image';
import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs';
import defaultImage from '@/../public/images/default.png';
import useSWRInfinite from 'swr/infinite';

const ShowList = (props: { category: string }) => {
  const category = props.category;
  // const length = props.content.length;
  // const contents = props.content.list;

  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const getKey = (pageIndex: number, previousPageData: string[]) => {
    return `https://api.github.com/repos/reactjs/react-a11y/issues?per_page=1&page=${pageIndex}`; // SWR 키
  };

  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);
  if (!data) {
    return <p>loading...</p>;
  } else {
    return (
      <div className={styles.content}>
        <p>카테고리 : {category}</p>

        {/* {data.map((user, index) => {
        return <div key={index}>{user[0].user.id}</div>;
      })} */}

        {contents.list.map((content: listType, index) => {
          return (
            <Link
              href={'/shadowing/learning/' + content.video_id}
              key={index}
              className={styles.contentItem}
            >
              <div className={styles.ItemImage}>
                <Image src={content.thumbnail_url} fill alt="" />
                <Image src={defaultImage.src} fill alt="" />
              </div>
              <div className="px-5 flex flex-row w-full justify-between items-center">
                <div className="">
                  <p className="text-lg font-medium">{content.eng_sentence}</p>
                  <p className="text-xs">{content.kor_sentence}</p>
                </div>
                {content.is_marked === 'true' ? (
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
