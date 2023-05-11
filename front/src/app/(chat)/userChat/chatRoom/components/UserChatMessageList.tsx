'use client';
import ProfileImage from '@/app/components/ProfileImage';
import { userChatMessageListState, userChatRoomIdState } from '../../store';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useRecoilValue } from 'recoil';

const UserChatMessageList = () => {
  const { data: session } = useSession();
  const nickname = session?.user.user?.data.nickname;
  const messageList = useRecoilValue(userChatMessageListState);
  const userChatRoom = useRecoilValue(userChatRoomIdState);
  return (
    <div className="overflow-clip">
      {messageList.map((message, index) => (
        <div
          key={index}
          className={`${
            message.nickname === nickname ? 'justify-end flex' : 'flex'
          }
      `}
        >
          {message.nickname !== nickname && (
            <div className="flex mt-2 relative">
              <ProfileImage
                className="h-12 w-12 mx-2 hover:cursor-pointer min-w-[48px]"
                profileUrl={userChatRoom.otherImgUrl}
                height={500}
                width={500}
              />
              <div className="max-w-[70vw]">
                <div>{message.nickname}</div>
                <div className="other-chat overflow-hidden break-words">
                  {message.message}
                </div>
              </div>
              <div className="absolute bottom-0 right-0 text-slate-600">
                {message.turn - 1}/10
              </div>
            </div>
          )}
          {message.nickname === nickname && (
            <div className="max-w-[70vw] relative">
              <div className="absolute bottom-0 left-[3.5rem] text-slate-600">
                {message.turn - 1}/10
              </div>
              <div className="my-chat break-words overflow-hidden">
                {message.message}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserChatMessageList;
