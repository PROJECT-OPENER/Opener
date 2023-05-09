'use client';
import { userChatMessageListState } from '../../store';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useRecoilState } from 'recoil';

const UserChatMessageList = () => {
  const { data: session } = useSession();
  const nickname = session?.user.user?.data.nickname;
  const [messageList, setMessageList] = useRecoilState(
    userChatMessageListState,
  );
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
            <div className="other-chat">
              <strong>{message.nickname}:</strong> {message.content}
            </div>
          )}
          {message.nickname === nickname && (
            <div className="my-chat">
              <strong>{message.nickname}:</strong> {message.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserChatMessageList;
