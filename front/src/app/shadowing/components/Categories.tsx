'use client';
import { useState } from 'react';
import ShowList from './ShowList';
import styles from './categories.module.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

// type listType = {
//   video_id: string;
//   thumbnail_url: string;
//   eng_sentence: string;
//   kor_sentence: string;
//   is_marked: string;
// };
// type contentType = {
//   length: number;
//   list: listType[];
// };
// const content: contentType[] = [
//   {
//     sentence: 'How are you?',
//     href: '/shadowing/learning/1',
//     img: '#',
//   },
//   {
//     sentence: 'How are you?',
//     href: '/shadowing/learning/2',
//     img: '#',
//   },
//   {
//     sentence: 'How are you?',
//     href: '/shadowing/learning/3',
//     img: '#',
//   },
// ];

const Categories = () => {
  const option = {
    wheelSpeed: 2,
    handlers: ['touch', 'click-rail', 'drag-thumb', 'keyboard', 'wheel'],
    wheelPropagation: true,
    minScrollbarLength: 2,
  };
  const [selected, setSelected] = useState<string>('전체');
  const categories = [
    '전체',
    '추천',
    'sns',
    '여행',
    '여행2',
    '여행3',
    '여행4',
    '여행5',
    '여행6',
    '여행8',
  ];
  const clickCat = (category: string) => {
    setSelected(category);
  };
  return (
    <div>
      <PerfectScrollbar option={option} className="w-full h-full py-4 my-2">
        <ul className={styles.categories}>
          {categories.map((category: string, index: number) => {
            return (
              <li
                style={{ cursor: 'pointer' }}
                key={index}
                className={
                  category === selected
                    ? `${styles.catItem} ${styles.catItemActive}`
                    : `${styles.catItem}`
                }
                onClick={() => clickCat(category)}
              >
                {category}
              </li>
            );
          })}
        </ul>
      </PerfectScrollbar>
      <ShowList category={selected} />
    </div>
  );
};
export default Categories;
