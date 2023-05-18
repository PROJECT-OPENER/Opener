import {
  userChatIsChatState,
  userChatMyNicknameState,
  userChatGrammerMsgListState,
  userChatScoreState,
  userChatTipState,
} from '../../store';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  ucFilterMsgInterface,
  ucGrammerMsgInterface,
  ucScoreInterface,
} from '@/types/userChatTypes';
import { openAiContextScore } from '@/app/api/openAi';
import { checkGrammer } from '@/util/AiChat';
import { useRouter } from 'next/navigation';

const useCheck = () => {
  const router = useRouter();
  // recoil
  const nickname = useRecoilValue(userChatMyNicknameState); // 내 닉네임
  const setisChat = useSetRecoilState(userChatIsChatState); // 채팅중인지
  const setGrammerMsgState = useSetRecoilState(userChatGrammerMsgListState); // 문법 검사 메세지
  const setScore = useSetRecoilState(userChatScoreState); // 점수
  const [isTip, setIsTip] = useRecoilState(userChatTipState); // tip

  // 메서드
  // 마무리 메세지

  //문법 검사
  const handleGrammerCheck = (
    text: string,
    chatNickname: string,
    msgTurn: number,
  ) => {
    if (text === 'pass') {
      const pass = async () => {
        const payload = {
          type: 'pass',
          nickname: chatNickname,
          message: 'pass',
          turn: msgTurn,
          score: 0,
        };
        await setGrammerMsgState((prev: ucGrammerMsgInterface[]) => {
          const isTurnExist = prev.some(
            (item: ucGrammerMsgInterface) => item.turn === payload.turn,
          );
          if (isTurnExist) return prev;
          return [...prev, payload];
        });
      };
      pass();
    } else {
      // 문법 검사
      const check = async () => {
        // console.log('checkGrammer', text, chatNickname, msgTurn);
        const res = await checkGrammer(text, chatNickname, msgTurn);
        await setGrammerMsgState((prev: ucGrammerMsgInterface[]) => {
          const isTurnExist = prev.some(
            (item: ucGrammerMsgInterface) => item.turn === res.turn,
          );
          if (isTurnExist) return prev;
          return [...prev, res];
        });
        if (chatNickname === nickname) {
          updateMyGrammerScore(res.score);
        } else {
          updateotherGrammarScore(res.score);
        }
        // console.log('res', res);
        // console.log('score', score);
      };
      check();
    }
  };
  // 문맥 점수 메서드
  const handleContextScore = async (
    updatedMessageList: [],
    chatNickname: string,
    msg: string,
  ) => {
    // console.log('handleContextScore', updatedMessageList, chatNickname, msg);
    // console.log('contextScore', score.myContextScore, score.otherContextScore);
    // 패스
    if (msg === 'pass') {
      return;
    } else {
      // 문맥 점수
      const filteredMessages = updatedMessageList.map(
        ({ nickname, message }: ucFilterMsgInterface) => ({
          nickname,
          message,
        }),
      );
      const res = await openAiContextScore(filteredMessages);
      const text = res.data.choices[0].text;
      // console.log('text', text);
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
  const handleKeyboard = () => {
    setisChat(true);
  };

  const updateMyGrammerScore = (score: number) => {
    setScore((prevState: ucScoreInterface) => ({
      ...prevState,
      myGrammarScore: prevState.myGrammarScore + score,
    }));
  };
  const updateotherGrammarScore = (score: number) => {
    setScore((prevState: ucScoreInterface) => ({
      ...prevState,
      otherGrammarScore: prevState.otherGrammarScore + score,
    }));
  };
  const updateMyContextScore = (score: number) => {
    // console.log('updateMyContextScore', score);
    setScore((prevState: ucScoreInterface) => ({
      ...prevState,
      myContextScore: prevState.myContextScore + score,
    }));
  };
  const updateOtherContextScore = (score: number) => {
    // console.log('updateOtherContextScore', score);
    setScore((prevState: ucScoreInterface) => ({
      ...prevState,
      otherContextScore: prevState.otherContextScore + score,
    }));
  };
  const updateMyWordUsed = () => {
    setScore((prevState: ucScoreInterface) => ({
      ...prevState,
      myWordUsed: true,
    }));
  };
  const updateOtherWordUsed = () => {
    setScore((prevState: ucScoreInterface) => ({
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
  const handleTip = () => {
    setIsTip(!isTip);
  };

  return {
    handleGrammerCheck,
    handleContextScore,
    handleKeyboard,
    handleLeftGame,
    updateMyGrammerScore,
    updateotherGrammarScore,
    updateMyContextScore,
    updateOtherContextScore,
    updateMyWordUsed,
    updateOtherWordUsed,
    handleTip,
  };
};

export default useCheck;
