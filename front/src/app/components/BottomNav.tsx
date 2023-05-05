'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FiHome,
  FiYoutube,
  FiGrid,
  FiMessageCircle,
  FiMap,
} from 'react-icons/fi';
import { TfiAngleLeft } from 'react-icons/tfi';
import { bottomNavBackward, bottomNavNone } from '@/util/navControl';

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  if (bottomNavNone.includes(pathname))
    return <div className="blankbox-zero" />; // 하단 네브바 없음
  if (bottomNavBackward.includes(pathname)) {
    return (
      // 뒤로 가기 버튼만 존재
      <>
        <div className="tabmenu-back">
          <button
            type="button"
            className="tabmenu-back-items"
            onClick={() => {
              router.back();
            }}
          >
            <TfiAngleLeft
              className="tabmenu-items-ico"
              size={'2rem'}
              color="#838383"
            />
          </button>
        </div>
        <div className="blankbox lg:hidden" />
      </>
    );
  }
  return (
    <>
      <div className="tabmenu">
        <Link href="/" className="tabmenu-items">
          <FiHome
            className="tabmenu-items-ico"
            size={'1.3rem'}
            color="#838383"
          />
          홈
        </Link>
        <Link href="/shadowing" className="tabmenu-items">
          <FiYoutube
            className="tabmenu-items-ico"
            size={'1.3rem'}
            color="#838383"
          />
          쉐도잉
        </Link>
        <Link href="/challenge" className="tabmenu-items">
          <FiGrid
            className="tabmenu-items-ico"
            size={'1.3rem'}
            color="#838383"
          />
          챌린지
        </Link>
        <Link href="/chat" className="tabmenu-items">
          <FiMessageCircle
            className="tabmenu-items-ico"
            size={'1.3rem'}
            color="#838383"
          />
          AI 채팅
        </Link>
        <Link href="/roadmap" className="tabmenu-items">
          <FiMap
            className="tabmenu-items-ico"
            size={'1.3rem'}
            color="#838383"
          />
          로드맵
        </Link>
      </div>
      <div className="blankbox lg:hidden" />
    </>
  );
};

export default BottomNav;
