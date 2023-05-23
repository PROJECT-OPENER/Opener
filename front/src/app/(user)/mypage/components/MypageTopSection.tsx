'use client';
import { logoutApi } from '@/app/api/userApi';
import ProfileImage from '@/app/components/ProfileImage';
import useUser from '@/app/hooks/userHook';
import { interestInterface } from '@/types/share';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { AiOutlineLogout, AiOutlineSetting } from 'react-icons/ai';

const MypageTopSection = () => {
  const { user, isLoading } = useUser();
  const handleLogout = () => {
    console.log('logout');
    signOut();
    logoutApi();
  };
  if (isLoading) return <div>loading...</div>;
  return (
    <div className="h-[200px] flex px-10 py-12 bg-white m-3 rounded-3xl">
      {user && (
        <>
          <div className="mr-10 max-w-[100px]">
            <ProfileImage
              className="w-full"
              width={500}
              height={500}
              profileUrl={user.data.profile}
            />
          </div>
          <div className="w-full relative">
            <div className="text-xl">
              <span className="font-bold">{user.data.nickname}</span> 님
            </div>
            <div>{user.data.email}</div>
            <div className="flex justify-between absolute bottom-0 left-0 right-0 items-end">
              <div className="space-x-2 text-xs">
                {user.data.interests.map((item: interestInterface) => (
                  <span
                    key={item.interestId}
                    className="bg-gray-200 p-1 rounded-xl"
                  >
                    {item.interest}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <Link
                  href="/mypage/edit"
                  className="bg-gray-300 p-1 text-2xl rounded-full"
                >
                  <AiOutlineSetting className="fill-white" />
                </Link>
                <button
                  type="button"
                  className="bg-gray-300 p-1 text-2xl rounded-full"
                  onClick={handleLogout}
                >
                  <AiOutlineLogout className="fill-white" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MypageTopSection;
