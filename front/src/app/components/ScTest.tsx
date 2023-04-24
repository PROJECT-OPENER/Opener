'use client';
import styles from './styles/ScTest.module.css';

const ScTest = () => {
  return <div className={styles.test}>this is styled-component</div>;
};
// 스타일드 컴포넌트는 버전 낮춰서 했는데
// 스타일드 컴포넌트에서 테일윈드는 또 오류뜨넹
// 이건 13.2.4
// 최신은 13.3
// 스타일드 컴포넌트 내부에서 태일윈드 쓰는 게 안되넹

export default ScTest;
