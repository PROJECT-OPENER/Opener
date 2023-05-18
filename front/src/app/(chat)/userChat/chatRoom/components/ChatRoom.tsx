'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import UserChatNav from './UserChatNav';
import UserChatSendVoice from './UserChatSendVoice';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
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
  userChatScoreState,
  userChatLastChatState,
  userChatResultState,
  userChatModelState,
} from '../../store';
import UserChatSendText from './UserChatSendText';
import { BsKeyboard } from 'react-icons/bs';
import useInterval from '@/app/hooks/useInterval';
import { handleTurn } from '@/util/Math';
import Loading from '@/app/components/Loading';
import { usePathname, useRouter } from 'next/navigation';
import UserChatRoundPc from './UserChatRoundPc';
import UserChatModel from '../../components/UserChatModel';
import DetailPageNav from '@/app/components/DetailPageNav';
import useCheck from '../hooks/useCheck';

const ChatRoom = () => {
  const { data: session } = useSession();
  const token = session?.user.user?.accessToken as string;
  const router = useRouter();
  // console.log('nickname', nickname);
  // socket
  const [stompClient, setStompClient] = useState<Client | null>(null);
  // recoil
  const nickname = useRecoilValue(userChatMyNicknameState); // 내 닉네임
  const userChatRoom = useRecoilValue(userChatRoomIdState); // 최초 가져온 방 정보
  const score = useRecoilValue(userChatScoreState); // 점수
  const isChat = useRecoilValue(userChatIsChatState); // 채팅중인지
  const [gameState, setGameState] = useRecoilState(userChatGameState); // 게임 상태
  const [message, setMessage] = useRecoilState(userChatMessageState); // 메세지
  const [messageList, setMessageList] = useRecoilState(
    userChatMessageListState,
  ); // 메세지 리스트
  const [isRecording, setIsRecording] = useRecoilState(
    userChatIsRecordingState,
  ); // 녹음중인지
  const [isFirst, setIsFirst] = useRecoilState(userChatFirstState); // 첫 턴이 누구인지
  const [turn, setTurn] = useRecoilState(userChatTurnState); // 현재 턴
  const [timer, setTimer] = useRecoilState(userChatTimerState); // 타이머
  const userChatTime = useRecoilValue(userChatTimeState); // 타이머 시간 설정
  const delay = 1000; // 1초
  const [isRunning, setIsRunning] = useState(false); // 타이머 실행 여부
  // 라스트 채팅
  const [lastChat, setLastChat] = useRecoilState(userChatLastChatState);
  // 결과
  const setResult = useSetRecoilState(userChatResultState);
  const [userChatModel, setUserChatModelState] =
    useRecoilState(userChatModelState);
  // ref
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const chatMoblieRef = useRef<HTMLDivElement>(null);
  const pingIntervalIdRef = useRef<NodeJS.Timer | null>(null);

  const pathname: string = usePathname();

  const {
    handleGrammerCheck,
    handleContextScore,
    handleKeyboard,
    handleLeftGame,
    updateMyWordUsed,
    updateOtherWordUsed,
  } = useCheck();

  useEffect(() => {
    console.log('isFirst', turn, lastChat);
    if (turn === 999 && lastChat) {
      // console.log('score', score);
      handleSendResult();
      const timer = setInterval(checkAndSendResult, 5000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [score]);

  useEffect(() => {
    if (turn === 999) {
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
    if (chatMoblieRef.current) {
      chatMoblieRef.current.scrollTop = chatMoblieRef.current.scrollHeight;
    }
    if (turn === 11) setTurn(999);
  }, [messageList]);
  useEffect(() => {
    if (timer !== userChatTime) {
      setIsRunning(true);
    }
    if (userChatRoom.startNickname === nickname) {
      setIsFirst(true);
      setIsRunning(true);
      // console.log('startTimer');
    }
  }, []);
  useEffect(() => {
    const socket = new WebSocket(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Stomp client connected');
        // 방 입장
        client?.publish({
          destination: `/pub/user-chat/${userChatRoom.roomId as string}`,
          body: 'Test OnConnect',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // 생존 핑
        const intervalId = setInterval(() => {
          console.log('ping');
          // 1초마다 메시지를 보냅니다.
          client.publish({
            destination: `/pub/user-chat/rooms/here/${userChatRoom.roomId}`,
            // body: JSON.stringify(messageData), // 메시지 내용은 임의로 설정합니다.
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }, 3000);
        pingIntervalIdRef.current = intervalId;
        // 메세지 수신
        client.subscribe(
          `/sub/user-chat/rooms/${userChatRoom.roomId}`,
          (message) => {
            try {
              const content = JSON.parse(message.body);
              console.log('subscribe');
              if (content.message === '탈주발생') {
                console.log('탈주발생');
                // console.log('탈주발생', content);
                setResult(content);
                router.push('/userChat/Escape');
                return;
              }
              if (content.nickname !== nickname) {
                setIsRunning(true);
              }
              // 제시어 검사
              if (
                content.message
                  .toLowerCase()
                  .includes(userChatRoom.keyword.toLowerCase())
              ) {
                if (content.nickname === nickname) updateMyWordUsed();
                if (content.nickname === userChatRoom.otherNickname)
                  updateOtherWordUsed();
              }
              handleGrammerCheck(
                content.message,
                content.nickname,
                content.turn,
              );

              setMessageList((messageList) => {
                const updatedMessageList = [...messageList, content];
                if (isFirst === false) {
                  // console.log('isFirst22222', isFirst);
                  handleContextScore(
                    updatedMessageList as [],
                    content.nickname,
                    content.message,
                  ); // setMessageList 호출 이후에 handleContextScore 호출
                }

                return updatedMessageList;
              });
              setTurn(content.turn);
            } catch (e) {
              console.error('Failed to parse message body:', message.body);
              // console.error(e);
            }
          },
        );
        client.subscribe(
          `/sub/user-chat/rooms/${userChatRoom.roomId}/result`,
          (message) => {
            try {
              const content = JSON.parse(message.body);
              // console.log('subscribe : ', content);
              setResult(content);
              router.push('/userChat/Result');
            } catch (e) {
              console.error(e);
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

    // 로컬스토리지 통한 url 접근 막기
    const storedUrl = localStorage.getItem('waitRoom');
    localStorage.setItem('chatRoom', pathname);

    // localStorage에 URL이 저장되어 있으면 해당 URL로 리디렉션
    if (!storedUrl) {
      alert('잘못된 접근입니다.');
      router.push('/chat');
    }

    return () => {
      if (pingIntervalIdRef.current) {
        clearInterval(pingIntervalIdRef.current);
      }
      client.deactivate();
      setIsFirst(false);
    };
  }, []);
  // 결과 전송
  const handleSendResult = () => {
    console.log('handleSendResult');
    const payload = {
      otherNickname: userChatRoom.otherNickname,
      score: score,
      messageList: messageList,
    };
    // console.log('payload', payload);
    stompClient?.publish({
      destination: `/pub/user-chat/rooms/result/${userChatRoom.roomId}`,
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  // 메세지 전송
  const handleSendMessage = () => {
    console.log('handleSendMessage');
    if (timer !== 0 && message.length === 0) {
      alert('메세지를 입력해주세요.');
      return;
    }
    // 메세지 전송
    const messageData = {
      nickname: nickname,
      message: timer === 0 ? 'pass' : message,
      turn: turn + 1,
      roomId: userChatRoom.roomId,
    };
    if (!isRunning) {
      messageData.message = 'pass';
    }
    stompClient?.publish({
      destination: `/pub/user-chat/rooms/${userChatRoom.roomId}`,
      body: JSON.stringify(messageData),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMessage('');
    setIsRecording(false);
    setTurn(turn + 1);
    setIsRunning(false);
    setTimer(userChatTime);
    if (turn === 10) {
      setLastChat(true);
    }
  };
  const checkAndSendResult = () => {
    console.log('checkAndSendResult');
    if (turn === 999 && lastChat) {
      handleSendResult();
    }
  };
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-[100vh] w-full">
        <UserChatModel />
      </div>
      {/* 모바일, 440부터 pc */}
      <div className="border-2 flex flex-col lg:hidden absolute left-0 right-0 top-0 bottom-0">
        {gameState && (
          <>
            <div className="flex-none">
              <UserChatNav />
            </div>
            <div className="flex flex-col justify-between h-full overflow-y-auto">
              <div className="overflow-y-auto px-4 mt-6" ref={chatMoblieRef}>
                <UserChatMessageList />
              </div>
            </div>
            <div className="flex-none h-fit flex flex-col">
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
                  <div className="p-5 text-center text-xl text-white animate-pulse">
                    상대방의 턴입니다.
                  </div>
                </div>
              )}
              {!gameState && (
                <div className="mx-5 mb-5 bg-brandP rounded-xl">
                  <div className="p-5 text-center text-xl text-white">
                    <span className="">게임종료</span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {!gameState && (
          <div
            onClick={handleSendResult}
            className="flex justify-center items-center flex-col h-screen font-bold"
          >
            <Loading />
            <div>잠시만 기다려주세요.</div>
            <div>대화가 분석되면 결과 화면으로 이동합니다.</div>
          </div>
        )}
      </div>
      {/* pc */}
      {/* pc */}
      {/* pc */}
      <div className="max-lg:hidden">
        <div className="absolute top-0 left-0 h-[100vh] w-[100vw] flex flex-row justify-center items-end pb-10 px-8">
          <DetailPageNav
            className="max-w-[1500px] absolute top-3 left-10 right-10 mx-auto"
            title="TREB"
            propEvent={handleLeftGame}
          />
          <div className="flex flex-row justify-between items-end h-[85%] w-full max-w-[1500px] lg:text-sm">
            {/* 왼쪽, 제시어 및 info */}
            <div className="w-full max-w-[410px] h-full">
              {gameState && (
                <div className="flex flex-col h-full space-y-5">
                  <UserChatRoundPc />
                  <UserChatNav />
                </div>
              )}
              {!gameState && (
                <div
                  onClick={handleSendResult}
                  className="font-bold bg-white rounded-3xl text-center p-3 flex justify-center items-center flex-col my-auto"
                >
                  <Loading />
                  <div>잠시만 기다려주세요.</div>
                  <div>대화가 분석되면 결과 화면으로 이동합니다.</div>
                </div>
              )}
            </div>
            {/* 중앙, three.js */}
            <div
              className="w-full h-full flex justify-center items-center"
              onClick={() => {
                setUserChatModelState(!userChatModel);
              }}
            ></div>
            {/* 오른쪽, 채팅 */}
            <div className="w-full min-w-[450px] max-w-[450px] h-full">
              <div
                // ref={chatWindowRef}
                className={`${
                  gameState ? '' : 'bg-red-300'
                } flex flex-col justify-between h-full overflow-y-auto bg-[#fff6] border lg:rounded-3xl shadow-custom`}
              >
                <div className="overflow-y-auto px-4 mt-6" ref={chatWindowRef}>
                  <UserChatMessageList />
                </div>
                <div className="flex-none h-fit flex flex-col rounded-3xl">
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
                        <UserChatSendVoice
                          handleSendMessage={handleSendMessage}
                        />
                      )}
                      {/* 키보드 */}
                      {isChat && (
                        <UserChatSendText
                          handleSendMessage={handleSendMessage}
                        />
                      )}
                    </div>
                  )}
                  {gameState && !handleTurn(isFirst, turn) && (
                    <div className="mx-5 mb-5 bg-brandP rounded-xl">
                      <div className="p-5 text-center text-xl text-white animate-pulse">
                        상대방을 기다리고 있습니다.
                      </div>
                    </div>
                  )}
                  {!gameState && (
                    <div className="mx-5 mb-5 bg-brandP rounded-xl">
                      <div className="p-5 text-center text-xl text-white">
                        <span className="">게임종료</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
