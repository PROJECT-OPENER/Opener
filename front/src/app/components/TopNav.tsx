'use client';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from 'public/images/logo.png';
import ProfileImage from './ProfileImage';
import { useSession, signOut } from 'next-auth/react';
import { topNavNone } from '@/util/navControl';
import useUser from '../hooks/userHook';
import { logoutApi } from '../api/userApi';

const TopNav = () => {
  const { data: session } = useSession();
  const pathname: string = usePathname();
  const { user, isLoading, error } = useUser();
  if (user) {
    if (user.data.interests.length === 0 && pathname !== '/interest') {
      redirect('/interest');
    }
  }
  const handleLogout = () => {
    signOut();
    logoutApi();
  };
  if (error) {
    console.log('error');
    handleLogout();
  }
  if (isLoading) return <div>loading...</div>;
  for (let i = 0; i < topNavNone.length; i++) {
    if (pathname.startsWith(topNavNone[i])) return <div></div>;
  }
  return (
    <div className="topnav z-10">
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
          {session ? (
            <div className="flex space-x-3">
              <button
                type="button"
                className="border-2 p-3 bg-red-200"
                onClick={handleLogout}
              >
                로그아웃
              </button>
              <Link href={'/mypage'}>
                <ProfileImage
                  className="h-10 w-10 lg:h-12 lg:w-12 hover:cursor-pointer shadow-custom rounded-full"
                  profileUrl={user?.data.profile || null}
                  height={500}
                  width={500}
                />
              </Link>
            </div>
          ) : (
            <div>
              <Link
                href={'/auth/login'}
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
