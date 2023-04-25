'use client';
import { usePathname } from 'next/navigation';
import styles from './styles/TopNav.module.css';
// import Link from 'next/link';

const TopNav = () => {
  const pathname = usePathname();
  if (pathname.includes('learning')) return <div></div>;
  return <div className={styles.mobile}>TopNav</div>;
};

export default TopNav;
