'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import UserChatNav from './UserChatNav';
import UserChatSendVoice from './UserChatSendVoice';
import { useRecoilState } from 'recoil';
import UserChatMessageList from './UserChatMessageList';
import {
  userChatIsChatState,
  userChatIsRecordingState,
  userChatMessageListState,
  userChatMessageState,
} from '../../store';
import UserChatSendText from './UserChatSendText';

interface Message {
  nickname: string;
  content: string;
}

const ChatRoom = () => {
  const { data: session } = useSession();
  const nickname = session?.user.user?.data.nickname;
  const token = session?.user.user?.accessToken as string;
  // socket
  const [stompClient, setStompClient] = useState<Client | null>(null);
  // recoil
  const [message, setMessage] = useRecoilState(userChatMessageState);
  const [messageList, setMessageList] = useRecoilState(
    userChatMessageListState,
  );
  const [isRecording, setIsRecording] = useRecoilState(
    userChatIsRecordingState,
  );
  const [isChat, setisChat] = useRecoilState(userChatIsChatState);
  // ref
  const chatWindowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 스크롤이 최하단으로 자동으로 이동되도록 chatWindowRef의 scrollTop 속성을 최대값으로 설정합니다.
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messageList]);
  // 소켓
  useEffect(() => {
    const socket = new WebSocket(
      'ws://localhost:8000/chatting-service/user-chat',
    );
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Stomp client connected');
        client?.publish({
          destination: '/pub/user-chat',
          body: 'Test OnConnect',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        client.subscribe('/sub/user-chat', (message) => {
          console.log('Received message', message);
          const content = JSON.parse(message.body);
          setMessageList((messageList) => [...messageList, content]);
        });
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
  }, [token]);

  const handleSendMessage = () => {
    if (stompClient && stompClient.connected) {
      const messageData = {
        nickname: nickname,
        content: message,
      };
      stompClient.publish({
        destination: '/pub/user-chat',
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
  const handleInputChage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
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
          <div className="bg-white rounded-xl mx-5 text-xl py-3 px-5 min-h-[3.25rem]">
            {message.length > 1 ? message : 'Listening...'}
          </div>
        )}
        <div className="mx-5 mb-5 bg-brandP rounded-xl">
          {/* 녹음 */}
          {!isChat && (
            <UserChatSendVoice handleSendMessage={handleSendMessage} />
          )}
          {/* 키보드 */}
          {isChat && <UserChatSendText />}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
