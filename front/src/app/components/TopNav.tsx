'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from 'public/images/logo.png';
import { topNavNone } from '../util/navControl';

const TopNav = () => {
  const pathname: string = usePathname();

  if (topNavNone.includes(pathname)) return <div></div>;
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
      <div className="space-x-5">
        <Link href={'/mypage'}>마이페이지</Link>
        <Link href={'/login'}>로그인</Link>
        <Link href={'/interest'}>관심사</Link>
      </div>
    </div>
  );
};

export default TopNav;
