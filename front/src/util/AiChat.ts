import { bingGrammerCheckApi } from '@/app/api/openAi';

interface ChatLogElement {
  text: string;
  sender: 'AI' | 'HUMAN';
}

interface chat {
  nickname: string;
  message: string;
}

export const handleChatLog = (chatLog: ChatLogElement[]) => {
  let result = '';
  chatLog.forEach((chat, index) => {
    if (chat.sender === 'HUMAN') {
      result += `\n\nHuman: ${chat.text}\n`;
    } else {
      if (index === 0) {
        result += `AI: ${chat.text}`;
      } else {
        result += `\n\nAI: ${chat.text}`;
      }
    }
  });
  return result;
};

export const pushChatLog = (chatLog: string, text: string) => {
  const newChatLog = chatLog + `\nHuman: ${text}`;
  return newChatLog;
};

// 문법 검사 피드백 반영
export const applySpellCheckFeedback = (
  originalSentence: string,
  feedback: any,
) => {
  let newSentence = originalSentence;
  let offsetShift = 0;
  feedback.forEach((item: any) => {
    const { offset, suggestions } = item;
    const suggestion = suggestions[0].suggestion;
    const startOffset = offset + offsetShift;
    const endOffset = offset + item.token.length + offsetShift;
    const correctedToken = `<span class="highlight">${suggestion}</span>`;
    newSentence =
      newSentence.slice(0, startOffset) +
      correctedToken +
      newSentence.slice(endOffset);
    offsetShift += correctedToken.length - item.token.length;
  });
  return newSentence;
};

// 문법 검사
export const checkGrammer = async (
  text: string,
  nickname: string,
  turn: number,
) => {
  const res = await bingGrammerCheckApi(text);
  // console.log('res', res.flaggedTokens);
  if (res.flaggedTokens.length > 0) {
    let computedScore = 0.7;
    if (res.flaggedTokens[0].suggestions[0].score > 0.7) {
      computedScore = res.flaggedTokens[0].suggestions[0].score;
    }
    const convertedScore = Math.round((computedScore - 0.7) * (20 / 0.3));
    // const convertedScore = Math.round(
    //   res.flaggedTokens[0].suggestions[0].score * 20,
    // );
    const result = applySpellCheckFeedback(text, res.flaggedTokens);
    const payload = {
      type: 'grammerCheck',
      nickname: nickname,
      message: result,
      turn: turn,
      score: convertedScore,
    };
    return payload;
  } else {
    const payload = {
      type: 'correct',
      nickname: nickname,
      message: text,
      turn: turn,
      score: 20,
    };
    return payload;
  }
};

export const resultArray = async (original: any, feedback: any) => {
  const mergedArray = original.map((item1: any) => {
    const item2 = feedback.find(
      (item2: any) =>
        item2.nickname === item1.nickname && item2.turn === item1.turn,
    );
    if (item2) {
      return {
        ...item1, // ARRAY1의 모든 내용을 유지
        ...item2, // ARRAY2의 모든 내용을 유지
        message: item1.message, // ARRAY1의 message를 유지
        correctMessage: item2.message, // ARRAY2의 message를 correctMessage로 변환
      };
    } else {
      return item1; // ARRAY2에서 일치하는 요소가 없는 경우 ARRAY1의 요소를 그대로 반환
    }
  });
  return mergedArray;
};

export const isStringValidJSON = (str: any) => {
  try {
    const json = JSON.parse(str);
    return Array.isArray(json) && json.length > 0;
  } catch (error) {
    return false;
  }
};

export const convertArrayToChatString = (array: []) => {
  return array
    .map((item: chat) => `${item.nickname}: ${item.message}`)
    .join('\n');
};
