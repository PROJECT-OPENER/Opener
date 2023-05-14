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
  userChatTargetWordState,
  userChatGrammerMsgListState,
  userChatScoreState,
} from '../../store';
import UserChatSendText from './UserChatSendText';
import { BsKeyboard } from 'react-icons/bs';
import useInterval from '@/app/hooks/useInterval';
import { convertToJSON, handleTurn } from '@/util/Math';
import { bingGrammerCheckApi, openAiUserChatApi } from '@/app/api/openAi';
import {
  applySpellCheckFeedback,
  checkGrammer,
  isStringValidJSON,
} from '@/util/AiChat';
import Loading from '@/app/components/Loading';
import useSWR from 'swr';

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
  const [filtered, setFiltered] = useRecoilState(userChatFilteredState); //
  const setUserChatTargetWordState = useSetRecoilState(userChatTargetWordState); // 제시어 사용 여부
  const [grammerMsg, setGrammerMsgState] = useRecoilState(
    userChatGrammerMsgListState,
  ); // 문법 검사 메세지
  const [score, setScore] = useRecoilState(userChatScoreState); // 점수
  const [contextResult, setContextResult] = useState<any>(null); // openAi 결과
  // 라스트 채팅
  const [lastChat, setLastChat] = useState(false);

  // ref
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const { data: contextResultApi } = useSWR(
    !gameState ? '/api/data' : null,
    () => openAiUserChatApi(filtered),
  );

  // if (!isDataValid(data)) {
  //   revalidate();
  // }
  useEffect(() => {
    if (
      score.myContextScore !== 0 &&
      score.otherContextScore !== 0
      // lastChat
    ) {
      console.log('lastChat', lastChat);
      handleSendResult();
    }
  }, [contextResultApi]);

  useEffect(() => {
    // console.log('result', typeof contextResultApi?.data.choices[0].text);
    if (contextResultApi !== undefined) {
      if (isStringValidJSON(contextResultApi?.data.choices[0].text)) {
        const res = convertToJSON(
          contextResultApi?.data.choices[0].text,
        ) as any;
        console.log('res', res);
        res.forEach((item: any) => {
          if (item.nickname === nickname) {
            updateMyContextScore(item.score);
          } else {
            updateOtherContextScore(item.score);
          }
        });
      }
    }
    // console.log('texcontextResultt', contextResult);
  }, [contextResultApi]);

  useEffect(() => {
    if (turn === 999) {
      setGameState(false);
      const filteredMessages = messageList.map(({ nickname, message }) => ({
        nickname,
        message,
      }));
      setFiltered(filteredMessages);
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
    // console.log('score', score);
    // 스크롤이 최하단으로 자동으로 이동되도록 chatWindowRef의 scrollTop 속성을 최대값으로 설정합니다.
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
    // 문법 검사
    if (messageList.length > 0 && turn < 12) {
      // console.log('messageList', turn);
      const text = messageList[messageList.length - 1].message;
      const chatNickname = messageList[messageList.length - 1].nickname;
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
        // 제시어 체크
        if (text.includes(userChatRoom.keyword)) {
          if (chatNickname === nickname) updateMyWordUsed();
          else updateOtherWordUsed();
        }
        // 문법 검사
        const check = async () => {
          const res = await checkGrammer(text, chatNickname, turn);
          await setGrammerMsgState((prev: any) => {
            const isTurnExist = prev.some(
              (item: any) => item.turn === res.turn,
            );
            if (isTurnExist) return prev;
            return [...prev, res];
          });
          if (chatNickname === nickname) {
            updateMyGrammerScore(res.score);
          } else {
            updateOtherGrammerScore(res.score);
          }
        };
        check();
      }
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
    // console.log(userChatRoom);
    // console.log(userChatRoom.roomId);
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
              // console.log('subscribe : ', content);
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
        client.subscribe(
          `/sub/user-chat/rooms/${userChatRoom.roomId}/result`,
          (message) => {
            console.log('Received message', message);
            try {
              const content = JSON.parse(message.body);
              console.log('subscribe : ', content);
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
    console.log(`Payload: ${JSON.stringify(payload)}`);
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
    if (turn === 10) {
      setLastChat(true);
    }
  };
  const handleKeyboard = () => {
    setisChat(true);
  };

  const updateMyGrammerScore = (score: number) => {
    setScore((prevState: any) => ({
      ...prevState,
      myGrammerScore: prevState.myGrammerScore + score,
    }));
  };
  const updateOtherGrammerScore = (score: number) => {
    setScore((prevState: any) => ({
      ...prevState,
      otherGrammerScore: prevState.otherGrammerScore + score,
    }));
  };
  const updateMyContextScore = (score: string) => {
    setScore((prevState: any) => ({
      ...prevState,
      myContextScore: score,
    }));
  };
  const updateOtherContextScore = (score: string) => {
    setScore((prevState: any) => ({
      ...prevState,
      otherContextScore: score,
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

  return (
    <div className="h-screen border-2 flex flex-col">
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
          <div className="flex-none">
            <UserChatNav />
          </div>
          <Loading />
          <div>잠시만 기다려주세요.</div>
          <button type="button" onClick={handleSendResult}>
            버튼
          </button>
          <div>대화가 분석되면 결과 화면으로 이동합니다.</div>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
