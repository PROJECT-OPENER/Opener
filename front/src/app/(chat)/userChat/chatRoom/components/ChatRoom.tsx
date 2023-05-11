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
  userChatGameState,
  userChatIsChatState,
  userChatIsRecordingState,
  userChatMessageListState,
  userChatMessageState,
  userChatMyNicknameState,
  userChatRoomIdState,
  userChatTimeState,
  userChatTimerState,
  userChatTurnState,
} from '../../store';
import UserChatSendText from './UserChatSendText';
import { BsKeyboard } from 'react-icons/bs';
import useInterval from '@/app/hooks/useInterval';
import { handleTurn } from '@/util/Math';

const ChatRoom = () => {
  const { data: session } = useSession();
  const token = session?.user.user?.accessToken as string;
  // console.log('nickname', nickname);
  // socket
  const [stompClient, setStompClient] = useState<Client | null>(null);
  // recoil
  const nickname = useRecoilValue(userChatMyNicknameState); // 내 닉네임
  const userChatRoom = useRecoilValue(userChatRoomIdState); // 최초 가져온 방 정보
  const [gameState, setGameState] = useRecoilState(userChatGameState); // 게임 상태
  const [message, setMessage] = useRecoilState(userChatMessageState); // 메세지
  const [messageList, setMessageList] = useRecoilState(
    userChatMessageListState,
  ); // 메세지 리스트
  const [isRecording, setIsRecording] = useRecoilState(
    userChatIsRecordingState,
  ); // 녹음중인지
  const [isChat, setisChat] = useRecoilState(userChatIsChatState); // 채팅중인지
  const [isFirst, setIsFirst] = useRecoilState(userChatFirstState); // 첫 턴이 누구인지
  const [turn, setTurn] = useRecoilState(userChatTurnState); // 현재 턴
  const [timer, setTimer] = useRecoilState(userChatTimerState); // 타이머
  const userChatTime = useRecoilValue(userChatTimeState); // 타이머 시간 설정
  const delay = 1000; // 1초
  const [isRunning, setIsRunning] = useState(false); // 타이머 실행 여부
  // ref
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (turn === 11) {
      setGameState(false);
    }
  }, [turn]);

  useInterval(
    () => {
      // Your custom logic here
      if (!gameState) {
        setIsRunning(false);
        setTimer(userChatTime);
        return;
      }
      if (timer === 0) {
        setIsRunning(false);
        setTimer(userChatTime);
        handleSendMessage();
        return;
      }
      setTimer(timer - 1);
    },
    isRunning ? delay : null,
  );
  useEffect(() => {
    // 스크롤이 최하단으로 자동으로 이동되도록 chatWindowRef의 scrollTop 속성을 최대값으로 설정합니다.
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messageList]);
  useEffect(() => {
    // console.log('message', message.length);
    console.log(userChatRoom.startNickname);
    console.log(nickname, 'qwd');
    if (timer !== userChatTime) {
      setIsRunning(true);
    }
    if (userChatRoom.startNickname === nickname) {
      setIsFirst(true);
      setIsRunning(true);
      console.log('startTimer');
    }
  }, []);
  useEffect(() => {
    console.log(userChatRoom);
    console.log(userChatRoom.roomId);
    const socket = new WebSocket(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);
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
              console.log('subscribe : ', content);
              setMessageList((messageList) => [...messageList, content]);
              if (content.nickname !== nickname) {
                setIsRunning(true);
              }
              setTurn(content.turn);
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
      setIsFirst(false);
    };
  }, []);

  const handleSendMessage = () => {
    console.log('handleSendMessage');
    console.log('message', message);
    // if (stompClient && stompClient.connected) {

    const messageData = {
      nickname: nickname,
      message: timer === 0 ? 'pass' : message,
      turn: turn + 1,
      roomId: userChatRoom.roomId,
    };
    if (!isRunning) {
      messageData.message = '시간초과';
    }
    stompClient?.publish({
      destination: `/sub/user-chat/rooms/${userChatRoom.roomId}`,
      body: JSON.stringify(messageData),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // setMessage('');
    // }
    setMessage('');
    setIsRecording(false);
    setTurn(turn + 1);
    setIsRunning(false);
    setTimer(userChatTime);
  };
  const handleKeyboard = () => {
    setisChat(true);
  };

  return (
    <div className="h-screen border-2 flex flex-col">
      <div className="flex-none">
        <UserChatNav />
        {nickname}
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
        {gameState && handleTurn(isFirst, turn) && (
          <div className="mx-5 mb-5 bg-brandP rounded-xl">
            {/* 녹음 */}
            {!isChat && (
              <UserChatSendVoice handleSendMessage={handleSendMessage} />
            )}
            {/* 키보드 */}
            {isChat && (
              <UserChatSendText handleSendMessage={handleSendMessage} />
            )}
          </div>
        )}
        {gameState && !handleTurn(isFirst, turn) && (
          <div className="mx-5 mb-5 bg-brandP rounded-xl">
            <div className="bg-emerald-200 p-5 text-center text-xl">
              상대 턴
            </div>
          </div>
        )}
        {!gameState && (
          <div className="mx-5 mb-5 bg-brandP rounded-xl">
            <div className="bg-emerald-200 p-5 text-center text-xl">
              게임종료
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
