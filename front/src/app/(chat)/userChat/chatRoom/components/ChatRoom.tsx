'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import Loading from '@/app/components/Loading';

interface Message {
  nickname: string;
  content: string;
}

const ChatRoom = () => {
  const { data: session } = useSession();
  const nickname = session?.user.user?.data.nickname;
  const token = session?.user.user?.accessToken as string;
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
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
          setReceivedMessages((prevMessages) => [...prevMessages, content]);
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

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      setMessage('');
    }
  };

  return (
    <div>
      <h1 className="text-xl border-2 text-center p-2 m-3 border-purple-300 font-bold">
        Stomp
      </h1>
      <div>
        <Loading />
        <div className="border-2">
          {receivedMessages.map((message, index) => (
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
          <form onSubmit={handleSendMessage} className="flex m-3">
            <input
              type="text"
              value={message}
              className="w-full border-2 p-2 border-red-200"
              onChange={(event) => setMessage(event.target.value)}
            />
            <button type="submit" className="border-2 border-orange-400">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
