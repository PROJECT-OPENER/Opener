type listType = {
  video_id: string;
  thumbnail_url: string;
  eng_sentence: string;
  kor_sentence: string;
  is_marked: string;
};
type contentType = {
  category: string;
  content: {
    length: number;
    list: listType[];
  };
};

//----------------------------------------------------------------

import Link from 'next/link';
import styles from './categories.module.css';
import Image from 'next/image';
import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs';
import defaultImage from '@/../public/images/default.png';

const ShowList = (props: contentType) => {
  const category = props.category;
  const length = props.content.length;
  const contents = props.content.list;
  return (
    <div className={styles.content}>
      <p>카테고리 : {category}</p>
      {contents.map((content, index) => {
        return (
          <Link
            href={'/shadowing/learning/' + content.video_id}
            key={index}
            className={styles.contentItem}
          >
            <div className={styles.ItemImage}>
              {/* <Image src={content.thumbnail_url} fill alt="" /> */}
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
    </div>
  );
};
export default ShowList;
