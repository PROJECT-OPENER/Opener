'use client';
import { Client } from '@stomp/stompjs';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  userChatFirstState,
  userChatGameState,
  userChatGrammerMsgListState,
  userChatLastChatState,
  userChatMessageListState,
  userChatMyNicknameState,
  userChatResultState,
  userChatRoomIdState,
  userChatScoreState,
  userChatTargetWordState,
  userChatTimeState,
  userChatTimerState,
  userChatTurnState,
} from '../store';
import { usePathname, useRouter } from 'next/navigation';
import Loading from '@/app/components/Loading';
import InfoSlider from './InfoSlider';
import useUser from '@/app/hooks/userHook';

const WaitRoom = () => {
  const router = useRouter();
  const pathname: string = usePathname();
  const { data: session } = useSession();
  const { user } = useUser();
  console.log('user', user);
  const nickname =
    session && session.user.user && session.user.user.data.nickname;
  const token = session?.user.user?.accessToken as string;
  // recoil
  const setNickname = useSetRecoilState(userChatMyNicknameState);
  const setMessageListState = useSetRecoilState(userChatMessageListState);
  const setTimerState = useSetRecoilState(userChatTimerState);
  const setTurnState = useSetRecoilState(userChatTurnState);
  const setRoom = useSetRecoilState(userChatRoomIdState);
  const setGameState = useSetRecoilState(userChatGameState);
  const setFirstState = useSetRecoilState(userChatFirstState);
  const userChatTime = useRecoilValue(userChatTimeState);
  const setWordState = useSetRecoilState(userChatTargetWordState);
  const setGrammerMsgState = useSetRecoilState(userChatGrammerMsgListState);
  const setScoreState = useSetRecoilState(userChatScoreState);
  const setLastChat = useSetRecoilState(userChatLastChatState);
  const setResult = useSetRecoilState(userChatResultState);
  // socket
  const pingIntervalIdRef = useRef<NodeJS.Timer | null>(null);
  useEffect(() => {
    // recoil 초기화
    console.log('userChatFirstState', user);
    setLastChat(false);
    setResult({});
    setMessageListState([]);
    setScoreState({
      myGrammarScore: 0,
      otherGrammarScore: 0,
      myContextScore: 0,
      otherContextScore: 0,
      myWordUsed: false,
      otherWordUsed: false,
    });
    setTimerState(userChatTime);
    setTurnState(1);
    setGameState(true);
    setFirstState(false);
    setWordState(false);
    setGrammerMsgState([]);
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
            destination: '/pub/user-chat',
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
            setRoom(content);
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
    setNickname(nickname as string);

    // 로컬스토리지 통한 url 접근 막기
    localStorage.setItem('waitRoom', pathname);

    return () => {
      if (pingIntervalIdRef.current) {
        clearInterval(pingIntervalIdRef.current);
      }
      client.deactivate();
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center mx-5 my-5 bg-white rounded-3xl p-5">
        <h1 className="h1 text-3xl font-bold">TREB</h1>
        <h2 className="">Ten Round English Battle</h2>
      </div>
      <div className="bg-white rounded-3xl my-5 mx-5 p-5">
        <p className="text-center text-2xl font-bold">{user?.data.score}점</p>
        <Loading />
        <p className="text-center">매칭중입니다...</p>
      </div>
      <InfoSlider />
    </div>
  );
};

export default WaitRoom;
