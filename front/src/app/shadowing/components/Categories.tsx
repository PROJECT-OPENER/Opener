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
    href: '/shadowing/learning',
    img: '#',
  },
  {
    sentence: 'How are you?',
    href: '/shadowing/learning',
    img: '#',
  },
  {
    sentence: 'How are you?',
    href: '/shadowing/learning',
    img: '#',
  },
];

const Categories = () => {
  const [selected, setSelected] = useState<string>('');
  const categories = ['전체', '추천', 'sns', '여행'];
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
              className={category === selected ? 'active' : ''}
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
