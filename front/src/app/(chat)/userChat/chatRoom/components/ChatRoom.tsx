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
  userChatFilteredState,
  userChatIsChatState,
  userChatIsRecordingState,
  userChatMessageListState,
  userChatMessageState,
  userChatMyNicknameState,
  userChatRoomIdState,
  userChatTimeState,
  userChatTimerState,
  userChatTurnState,
  userChatGrammerMsgListState,
  userChatScoreState,
  userChatLastChatState,
  userChatResultState,
} from '../../store';
import UserChatSendText from './UserChatSendText';
import { BsKeyboard } from 'react-icons/bs';
import useInterval from '@/app/hooks/useInterval';
import { convertToJSON, handleTurn } from '@/util/Math';
import { openAiContextScore, openAiUserChatApi } from '@/app/api/openAi';
import { checkGrammer, isStringValidJSON } from '@/util/AiChat';
import Loading from '@/app/components/Loading';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import UserChatRoundPc from './UserChatRoundPc';

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
  const [filtered, setFiltered] = useRecoilState(userChatFilteredState); //
  const [grammerMsg, setGrammerMsgState] = useRecoilState(
    userChatGrammerMsgListState,
  ); // 문법 검사 메세지
  const [score, setScore] = useRecoilState(userChatScoreState); // 점수
  // 라스트 채팅
  const [lastChat, setLastChat] = useRecoilState(userChatLastChatState);
  // 결과
  const setResult = useSetRecoilState(userChatResultState);
  const result = useRecoilValue(userChatResultState);

  // ref
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const pingIntervalIdRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    console.log('setResult', result);
  }, [result]);

  useEffect(() => {
    console.log('isFirst', isFirst);
    if (turn === 999 && lastChat) {
      console.log('score', score);
      handleSendResult();
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
          const messageData = {
            nickname: nickname,
          };
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
              console.log('subscribe : ', content);
              if (content.message === '탈주발생') {
                console.log('탈주발생');
                console.log('탈주발생', content);
                setResult(content);
                router.push('/userChat/Escape');
                return;
              }
              if (content.nickname !== nickname) {
                setIsRunning(true);
              }
              if (content.message.includes(userChatRoom.keyword)) {
                if (content.nickname === nickname) updateMyWordUsed();
                if (content.nickname === userChatRoom.otherNickname)
                  updateOtherWordUsed();
              }
              setMessageList((messageList) => {
                const updatedMessageList = [...messageList, content];
                if (isFirst === false) {
                  console.log('isFirst22222', isFirst);
                  handleContextScore(
                    updatedMessageList,
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
              console.log('subscribe : ', content);
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

    return () => {
      if (pingIntervalIdRef.current) {
        clearInterval(pingIntervalIdRef.current);
      }
      client.deactivate();
      setIsFirst(false);
    };
  }, []);
  // 문맥 점수 메서드
  const handleContextScore = async (
    updatedMessageList: any,
    chatNickname: string,
    msg: string,
  ) => {
    console.log('handleContextScore', updatedMessageList, chatNickname, msg);
    console.log('contextScore', score.myContextScore, score.otherContextScore);
    // 패스
    if (msg === 'pass') {
      return;
    } else {
      // 문맥 점수
      const filteredMessages = updatedMessageList.map(
        ({ nickname, message }: { nickname: string; message: string }) => ({
          nickname,
          message,
        }),
      );
      const res = await openAiContextScore(filteredMessages);
      const text = res.data.choices[0].text;
      console.log('text', text);
      const number = parseFloat(text.replace(/[^0-9.]/g, ''));
      handleContextState(number, msg, chatNickname);
    }
  };
  // 문맥 점수 메서드 - 일반
  const handleContextState = (
    number: number,
    msg: string,
    chatNickname: string,
  ) => {
    if (typeof number !== 'number') {
      if (chatNickname === nickname) {
        if (msg.length < 5) {
          updateMyContextScore(8);
        } else if (msg.length >= 5 && msg.length < 10) {
          updateMyContextScore(14);
        } else {
          updateMyContextScore(20);
        }
      }
      if (chatNickname !== nickname) {
        if (msg.length < 5) {
          updateOtherContextScore(8);
        } else if (msg.length >= 5 && msg.length < 10) {
          updateOtherContextScore(14);
        } else {
          updateOtherContextScore(20);
        }
      }
    } else {
      if (chatNickname === nickname) {
        if (msg.length < 5) {
          updateMyContextScore(number - 10);
        } else if (msg.length >= 5 && msg.length < 10) {
          updateMyContextScore(number - 5);
        } else {
          updateMyContextScore(number);
        }
      }
      if (chatNickname !== nickname) {
        if (msg.length < 5) {
          updateOtherContextScore(number - 10);
        } else if (msg.length >= 5 && msg.length < 10) {
          updateOtherContextScore(number - 5);
        } else {
          updateOtherContextScore(number);
        }
      }
    }
  };
  // 결과 전송
  const handleSendResult = () => {
    console.log('handleSendResult');
    const payload = {
      otherNickname: userChatRoom.otherNickname,
      score: score,
      messageList: messageList,
    };
    console.log('payload', payload);
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
    handleGrammerCheck(messageData.message, messageData.nickname);
    setMessage('');
    setIsRecording(false);
    setTurn(turn + 1);
    setIsRunning(false);
    setTimer(userChatTime);
    if (turn === 10) {
      setLastChat(true);
    }
  };
  //문법 검사
  const handleGrammerCheck = (text: string, chatNickname: string) => {
    if (text === 'pass') {
      const pass = async () => {
        const payload = {
          type: 'pass',
          nickname: chatNickname,
          message: 'pass',
          turn: turn,
          score: 0,
        };
        await setGrammerMsgState((prev: any) => {
          const isTurnExist = prev.some(
            (item: any) => item.turn === payload.turn,
          );
          if (isTurnExist) return prev;
          return [...prev, payload];
        });
      };
      pass();
    } else {
      // 문법 검사
      const check = async () => {
        const res = await checkGrammer(text, chatNickname, turn);
        await setGrammerMsgState((prev: any) => {
          const isTurnExist = prev.some((item: any) => item.turn === res.turn);
          if (isTurnExist) return prev;
          return [...prev, res];
        });
        if (chatNickname === nickname) {
          updateMyGrammerScore(res.score);
        } else {
          updateotherGrammarScore(res.score);
        }
      };
      check();
    }
  };
  const handleKeyboard = () => {
    setisChat(true);
  };

  const updateMyGrammerScore = (score: number) => {
    setScore((prevState: any) => ({
      ...prevState,
      myGrammarScore: prevState.myGrammarScore + score,
    }));
  };
  const updateotherGrammarScore = (score: number) => {
    setScore((prevState: any) => ({
      ...prevState,
      otherGrammarScore: prevState.otherGrammarScore + score,
    }));
  };
  const updateMyContextScore = (score: number) => {
    console.log('updateMyContextScore', score);
    setScore((prevState: any) => ({
      ...prevState,
      myContextScore: prevState.myContextScore + score,
    }));
  };
  const updateOtherContextScore = (score: number) => {
    console.log('updateOtherContextScore', score);
    setScore((prevState: any) => ({
      ...prevState,
      otherContextScore: prevState.otherContextScore + score,
    }));
  };
  const updateMyWordUsed = () => {
    setScore((prevState: any) => ({
      ...prevState,
      myWordUsed: true,
    }));
  };
  const updateOtherWordUsed = () => {
    setScore((prevState: any) => ({
      ...prevState,
      otherWordUsed: true,
    }));
  };
  const handleLeftGame = () => {
    const confirmed = window.confirm('게임을 나가시겠습니까?');
    if (confirmed) {
      router.push('/chat');
    }
  };

  return (
    <>
      {/* 모바일, 440부터 pc */}
      <div className="h-screen border-2 flex flex-col lg:hidden">
        {gameState && (
          <>
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
          <div className="flex justify-center items-center flex-col h-screen font-bold">
            <Loading />
            <div>잠시만 기다려주세요.</div>
            <button type="button" onClick={handleSendResult}>
              버튼
            </button>
            <div>대화가 분석되면 결과 화면으로 이동합니다.</div>
          </div>
        )}
      </div>
      {/* pc */}
      {/* pc */}
      {/* pc */}
      <div className="max-lg:hidden">
        <div className="absolute top-3 left-10 right-10 grid grid-cols-3 bg-white shadow-custom p-3 rounded-xl">
          <Image
            src={'/images/logo.png'}
            alt="Logo"
            width={100}
            height={24}
            priority
            className="mt-2"
          />
          <h1 className="text-center text-3xl font-bold">TREB</h1>
          <button
            className="text-end text-xl"
            onClick={handleLeftGame}
            type="button"
          >
            종료
          </button>
        </div>
        <div className="absolute top-20 left-10 right-10 grid grid-cols-3 bottom-10">
          {/* 왼쪽, 제시어 및 info */}
          <div className="col-span-1 flex flex-col justify-between h-[90%] mt-2 space-y-3">
            {gameState && (
              <>
                <UserChatRoundPc />
                <UserChatNav />
                <div className="flex-none h-fit flex flex-col bg-[#B474FF] pt-5 rounded-3xl">
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
              </>
            )}
            {!gameState && (
              <div className="font-bold bg-white rounded-3xl text-center p-3 flex justify-center items-center flex-col my-auto">
                <Loading />
                <div>잠시만 기다려주세요.</div>
                <button type="button" onClick={handleSendResult}>
                  버튼
                </button>
                <div>대화가 분석되면 결과 화면으로 이동합니다.</div>
              </div>
            )}
          </div>
          {/* 중앙, three.js */}
          <div className="w-full h-full flex justify-center items-center">
            <Image
              src={'/images/metamong.png'}
              alt=""
              width={500}
              height={500}
              className="object-fill w-96 h-96"
            />
          </div>
          {/* 오른쪽, 채팅 */}
          <div className="col-span-1 flex flex-col justify-between h-[90%] mt-2">
            <div
              ref={chatWindowRef}
              className={`${
                gameState ? '' : 'bg-red-300'
              } flex-auto h-0 overflow-y-auto bg-[#B474FF] rounded-3xl`}
            >
              <div className="min-h-full">
                <UserChatMessageList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
