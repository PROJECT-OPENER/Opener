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
    <div>
      {messageList.map((message, index) => (
        <div
          key={index}
          className={`${
            message.nickname === nickname ? 'justify-end flex' : 'flex'
          }
      `}
        >
          {message.nickname !== nickname && (
            <div className="flex mt-2">
              <ProfileImage
                className="h-12 w-12 mx-2 hover:cursor-pointer min-w-[48px]"
                profileUrl={userChatRoom.otherImgUrl}
                height={500}
                width={500}
              />
              <div className="">
                <div>{message.nickname}</div>
                <div className="other-chat">{message.message}</div>
              </div>
            </div>
          )}
          {message.nickname === nickname && (
            <div className="my-chat">{message.message}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserChatMessageList;
