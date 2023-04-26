'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
// import styles from './styles/TopNav.module.css';
// import Link from 'next/link';
import logo from 'public/images/logo.png';

const TopNav = () => {
  const pathname: string = usePathname();
  if (pathname.includes('learning')) return <div></div>;
  return (
    <div className="topnav">
      <Link href={'/'}>
        <Image
          src={logo.src}
          alt="Logo"
          className=""
          width={100}
          height={24}
          priority
        />
        {/* <img id="logo" src={logo.src} alt="logo" /> */}
      </Link>
      <Link href={'/login'}>
        <button type="button">로그인</button>
      </Link>
    </div>
  );
};

export default TopNav;
