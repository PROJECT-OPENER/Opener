'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from 'public/images/logo.png';
import { topNavNone } from '../util/navControl';
import ProfileImage from './ProfileImage';

const TopNav = () => {
  const isAuthenticated = true;
  const pathname: string = usePathname();

  if (topNavNone.includes(pathname)) return <div></div>;
  return (
    <div className="topnav">
      <Link href={'/'}>
        <Image src={logo.src} alt="Logo" width={100} height={24} priority />
      </Link>
      <div className="flex flex-row">
        <div className="hidden lg:flex flex-row space-x-12 items-center text-medium">
          <Link
            className={
              'hover:text-brandP  active:text-black hover:underline underline-offset-4'
            }
            href={'/shadowing'}
          >
            쉐도잉
          </Link>
          <Link
            className={
              'hover:text-brandP active:text-black hover:underline underline-offset-4'
            }
            href={'/challenge'}
          >
            챌린지
          </Link>
          <Link
            className={
              'hover:text-brandP  active:text-black hover:underline underline-offset-4'
            }
            href={'/chat'}
          >
            AI 채팅
          </Link>
          <Link
            className={
              'hover:text-brandP  active:text-black hover:underline underline-offset-4'
            }
            href={'/roadmap'}
          >
            로드맵
          </Link>
        </div>
        <div className="ml-[5rem]">
          {isAuthenticated ? (
            <Link href={'/mypage'}>
              <ProfileImage
                className="h-10 w-10 lg:h-12 lg:w-12 hover:cursor-pointer shadow-custom rounded-full"
                profileUrl="/images/ai.png"
                height={500}
                width={500}
              />
            </Link>
          ) : (
            <div>
              <Link
                href={'/login'}
                className="rounded-lg bg-[#636363] py-1 px-4 text-white hover:bg-[#4f4f4f] active:bg-[#2f2f2f]"
              >
                로그인
              </Link>
              {/* <Link href={'/interest'}>관심사</Link> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
