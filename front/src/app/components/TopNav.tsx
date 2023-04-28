'use client';
import { usePathname } from 'next/navigation';
// import styles from './styles/TopNav.module.css';
// import Link from 'next/link';
import logo from 'public/images/logo.png';
import { topNavNone } from '../util/navControl';

const TopNav = () => {
  const pathname: string = usePathname();

  if (topNavNone.includes(pathname)) return <div></div>;
  return (
    <div className="topnav">
      <img id="logo" src={logo.src} alt="logo" />
    </div>
  );
};

export default TopNav;
