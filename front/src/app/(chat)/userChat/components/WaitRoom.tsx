'use client';
import { Client } from '@stomp/stompjs';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  userChatFirstState,
  userChatGameState,
  userChatMessageListState,
  userChatMyNicknameState,
  userChatRoomIdState,
  userChatTargetWordState,
  userChatTimeState,
  userChatTimerState,
  userChatTurnState,
} from '../store';
import { useRouter } from 'next/navigation';
import Loading from '@/app/components/Loading';
import InfoSlider from './InfoSlider';
import useUser from '@/app/hooks/userHook';

const WaitRoom = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { user } = useUser();
  const nickname =
    session && session.user.user && session.user.user.data.nickname;
  const token = session?.user.user?.accessToken as string;
  // recoil
  const setUserChatNickname = useSetRecoilState(userChatMyNicknameState);
  const setUserChatMessageListState = useSetRecoilState(
    userChatMessageListState,
  );
  const setUserChatTimerState = useSetRecoilState(userChatTimerState);
  const setUserChatTurnState = useSetRecoilState(userChatTurnState);
  const setUserChatRoom = useSetRecoilState(userChatRoomIdState);
  const setUserChatGameState = useSetRecoilState(userChatGameState);
  const setUserChatFirstState = useSetRecoilState(userChatFirstState);
  const userChatTime = useRecoilValue(userChatTimeState);
  const setUserChatTargetWordState = useSetRecoilState(userChatTargetWordState);
  // socket
  const pingIntervalIdRef = useRef<NodeJS.Timer | null>(null);
  useEffect(() => {
    // recoil 초기화
    console.log('userChatFirstState', user);
    setUserChatMessageListState([]);
    setUserChatTimerState(userChatTime);
    setUserChatTurnState(1);
    setUserChatGameState(true);
    setUserChatFirstState(false);
    setUserChatTargetWordState(false);
    const socket = new WebSocket(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);
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

        const intervalId = setInterval(() => {
          const messageData = {
            nickname: nickname,
          };
          console.log('interval');
          // 1초마다 메시지를 보냅니다.
          client.publish({
            destination: '/pub/user-chat/',
            body: JSON.stringify(messageData), // 메시지 내용은 임의로 설정합니다.
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }, 1000);
        pingIntervalIdRef.current = intervalId;
        // setPingIntervalId(intervalId);
        client.subscribe(`/sub/user-chat/${nickname}`, (message) => {
          console.log('Received room message', message);
          // console.log('Received room message', JSON.parse(message.body));
          try {
            const content = JSON.parse(message.body);
            console.log('content : ', content);
            setUserChatRoom(content);
            clearInterval(intervalId);
            router.push('/userChat/chatRoom');
            client.deactivate();
          } catch (e) {
            console.error('Failed to parse message body:', message.body);
            // console.error(e);
          }
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
    // setStompClient(client);
    setUserChatNickname(nickname as string);

    return () => {
      if (pingIntervalIdRef.current) {
        clearInterval(pingIntervalIdRef.current);
      }
      client.deactivate();
    };
  }, []);

  return (
    <div>
      <div className="bg-white rounded-3xl my-5 mx-5 p-5">
        <p className="text-center">매칭중입니다...</p>
        <Loading />
      </div>
      <div className="flex flex-col items-center mx-5 my-5 bg-white rounded-3xl p-5">
        <h1 className="h1 text-3xl font-bold">TREB</h1>
        <h2 className="">Ten Round English Battle</h2>
      </div>
      <InfoSlider />
    </div>
  );
};

export default WaitRoom;
