'use client';
import React, { useState, useRef } from 'react';
import ProfileImage from '@/app/components/ProfileImage';
import { AiOutlineSetting } from 'react-icons/ai';
import useUser from '@/app/hooks/userHook';
import { imageUpdateApi } from '@/app/api/userApi';
import Button from '@/app/components/Button';

const MypageEditTopSection = () => {
  const { user, isLoading, mutate } = useUser();
  const [photo, setPhoto] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const changeImage = async () => {
    if (file) {
      const blobData = new Blob([file]);
      const sendData = new FormData();
      sendData.append('profileImg', blobData);
      const response = await imageUpdateApi(sendData);
      if (response.code === 200) {
        alert('프로필 사진이 변경되었습니다.');
        setPhoto(false);
        mutate({ ...user });
      } else {
        alert('프로필 사진 변경이 실패하였습니다.');
      }
    }
  };

  if (isLoading) return <div>loading...</div>;
  return (
    <>
      {user && (
        <div className="h-[200px] flex px-10 py-12 m-3 rounded-3xl">
          <div className="mr-10 max-w-[100px] relative">
            <ProfileImage
              className="w-full relative brightness-75"
              width={500}
              height={500}
              profileUrl={user.data.profile}
              onClick={() => setPhoto(!photo)}
            />
            <div className="bg-gray-300 p-1 text-2xl rounded-full absolute -bottom-2 left-8">
              <AiOutlineSetting
                className=" fill-white"
                onClick={() => setPhoto(!photo)}
              />
            </div>
          </div>
          <div className="w-full relative">
            <div className="text-xl">
              <span className="font-bold">{user.data.nickname}</span>님
            </div>
            <div>{user.data.email}</div>
            <div className="flex justify-between absolute bottom-0 left-0 right-0 items-end"></div>
          </div>
        </div>
      )}
      {photo && (
        <div className="mx-20 my-3 relative rounded-2xl  drop-shadow-md bg-white">
          <label className="block">
            <input
              type="file"
              ref={fileInputRef}
              className="block w-full text-sm text-slate-500
              file:mr-4 file:py-1 file:px-4 file:ml-3 file:my-2
              file:rounded-md file:border-0 
              file:text-xl file:font-bold
              file:bg-brandP file:text-white"
              onChange={(e) => {
                if (e.target.files && fileInputRef.current) {
                  setFile(e.target.files[0]);
                  fileInputRef.current.className =
                    'block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-4 file:ml-3 file:my-2 file:rounded-md file:border-0 file:text-xl file:font-bold file:bg-transparent file:text-white';
                }
              }}
            />
            {file && (
              <Button
                type="submit"
                text="수정"
                className="modification-submit top-2"
                onClick={() => {
                  changeImage();
                }}
              />
            )}
          </label>
        </div>
      )}
    </>
  );
};
export default MypageEditTopSection;
