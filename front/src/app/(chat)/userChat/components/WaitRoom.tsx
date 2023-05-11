'use client';
import { Client } from '@stomp/stompjs';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userChatRoomIdState } from '../store';
import { useRouter } from 'next/navigation';
import useUser from '@/app/hooks/userHook';
import Loading from '@/app/components/Loading';
import InfoSlider from './InfoSlider';

const WaitRoom = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const nickname =
    session && session.user.user && session.user.user.data.nickname;
  const token = session?.user.user?.accessToken as string;
  const { user, isLoading, error } = useUser();
  console.log(user);
  // socket
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const setUserChatRoom = useSetRecoilState(userChatRoomIdState);
  const [pingIntervalId, setPingIntervalId] = useState<NodeJS.Timer>();
  // 소켓
  useEffect(() => {
    const socket = new WebSocket(
      'ws://k8c104.p.ssafy.io:8000/chatting-service/user-chat',
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
        const intervalId = setInterval(() => {
          const messageData = {
            nickname: nickname,
          };
          console.log('interval');
          // 1초마다 메시지를 보냅니다.
          client.publish({
            destination: '/pub/user-chat/ping',
            body: JSON.stringify(messageData), // 메시지 내용은 임의로 설정합니다.
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }, 1000);
        setPingIntervalId(intervalId);
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
    setStompClient(client);

    return () => {
      clearInterval(pingIntervalId);
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
        <h1 className="h1 text-3xl font-bold">TRES</h1>
        <h2 className="">Ten Round English Showdown</h2>
      </div>
      <InfoSlider />
    </div>
  );
};

export default WaitRoom;