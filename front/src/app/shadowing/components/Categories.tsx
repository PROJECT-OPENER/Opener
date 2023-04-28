'use client';
import { useState } from 'react';
import ShowList from './ShowList';
import styles from './categories.module.css';

type contentType = {
  sentence: string;
  href: string;
  img: string;
};
const content: contentType[] = [
  {
    sentence: 'How are you?',
    href: '/shadowing/learning/1',
    img: '#',
  },
  {
    sentence: 'How are you?',
    href: '/shadowing/learning/2',
    img: '#',
  },
  {
    sentence: 'How are you?',
    href: '/shadowing/learning/3',
    img: '#',
  },
];

const Categories = () => {
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
      <ShowList category={selected} content={content} />
    </div>
  );
};
export default Categories;
