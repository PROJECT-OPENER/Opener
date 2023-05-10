'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import UserChatNav from './UserChatNav';
import UserChatSendVoice from './UserChatSendVoice';
import { useRecoilState, useRecoilValue } from 'recoil';
import UserChatMessageList from './UserChatMessageList';
import {
  userChatFirstState,
  userChatIsChatState,
  userChatIsRecordingState,
  userChatMessageListState,
  userChatMessageState,
  userChatRoomIdState,
  userChatTurnState,
} from '../../store';
import UserChatSendText from './UserChatSendText';
import { BsKeyboard } from 'react-icons/bs';
import { set } from 'react-hook-form';

const ChatRoom = () => {
  const { data: session } = useSession();
  const nickname =
    session && session.user.user && session.user.user.data.nickname;
  const token = session?.user.user?.accessToken as string;
  // console.log('nickname', nickname);
  // socket
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const userChatRoom = useRecoilValue(userChatRoomIdState);
  // recoil
  const [message, setMessage] = useRecoilState(userChatMessageState);
  const [messageList, setMessageList] = useRecoilState(
    userChatMessageListState,
  );
  const [isRecording, setIsRecording] = useRecoilState(
    userChatIsRecordingState,
  );
  const [isChat, setisChat] = useRecoilState(userChatIsChatState);
  const [isFirst, setIsFirst] = useRecoilState(userChatFirstState);
  const [turn, setTurn] = useRecoilState(userChatTurnState);
  // ref
  const chatWindowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 스크롤이 최하단으로 자동으로 이동되도록 chatWindowRef의 scrollTop 속성을 최대값으로 설정합니다.
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messageList]);
  useEffect(() => {
    // console.log('message', message.length);
    if (userChatRoom.startNickname !== nickname) {
      setIsFirst(false);
    }
  }, [userChatRoom]);
  useEffect(() => {
    console.log(userChatRoom);
    console.log(userChatRoom.roomId);
    const socket = new WebSocket(
      `ws://k8c104.p.ssafy.io:8000/chatting-service/user-chat`,
    );
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Stomp client connected');
        client?.publish({
          destination: `/pub/user-chat/${userChatRoom.roomId as string}`,
          body: 'Test OnConnect',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        client.subscribe(
          `/sub/user-chat/rooms/${userChatRoom.roomId}`,
          (message) => {
            console.log('Received message', message);
            try {
              const content = JSON.parse(message.body);
              console.log(content);
              setMessageList((messageList) => [...messageList, content]);
            } catch (e) {
              console.error('Failed to parse message body:', message.body);
              // console.error(e);
            }
          },
        );
      },
      onStompError: (error) => {
        console.log(`Stomp error: ${error}`);
      },
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  const handleSendMessage = () => {
    if (stompClient && stompClient.connected) {
      const messageData = {
        nickname: nickname,
        message: message,
        turn: 0,
        roomId: userChatRoom.roomId,
      };
      stompClient.publish({
        destination: `/sub/user-chat/rooms/${userChatRoom.roomId}`,
        body: JSON.stringify(messageData),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setMessage('');
    }
    setMessage('');
    setIsRecording(false);
  };
  const handleKeyboard = () => {
    setisChat(true);
  };
  return (
    <div className="h-screen border-2 flex flex-col">
      <div className="flex-none">
        <UserChatNav />
      </div>
      <div
        ref={chatWindowRef}
        className="flex-auto h-0 overflow-y-auto bg-blue-200"
      >
        <div className="min-h-full">
          <UserChatMessageList />
        </div>
      </div>
      <div className="flex-none h-fit flex flex-col bg-blue-200">
        {/* 녹음 시 텍스트 보여주기 */}
        {!isChat && isRecording && (
          <div className="relative mx-5">
            <div className="bg-white rounded-xl text-xl py-3 pl-5 pr-10 min-h-[3.25rem]">
              {message.length > 1 ? message : 'Listening...'}
            </div>
            <button
              type="button"
              className="absolute right-0 top-0 bottom-0 text-3xl pr-3"
              onClick={handleKeyboard}
            >
              <BsKeyboard className="fill-black" />
            </button>
          </div>
        )}
        <div className="mx-5 mb-5 bg-brandP rounded-xl">
          {/* 녹음 */}
          {!isChat && (
            <UserChatSendVoice handleSendMessage={handleSendMessage} />
          )}
          {/* 키보드 */}
          {isChat && <UserChatSendText handleSendMessage={handleSendMessage} />}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
