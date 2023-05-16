import { convertArrayToChatString } from '@/util/AiChat';
import axios from 'axios';
export const openAiChatApi = async (data: string) => {
  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      model: 'text-davinci-003',
      prompt: `The following is a conversation with an AI. The AI is helpful, creative, clever, and very friendly.${data}}`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [' Human:', ' AI:'],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(process.env.NEXT_PUBLIC_OPEN_API),
      },
    },
  );
  console.log(response);
  return response;
};

export const openAiUserChatApi = async (data: []) => {
  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      model: 'text-davinci-003',
      prompt: `${data}\n\n위 대화를 분석하여 닉네임 별로 영어 수준에 맞게 점수를 줘라. \n점수는 100점이 만점이다.\n반드시 두 사람의 점수가 달라야 한다.\n반드시 아래 예시 형태로만 대답해줘. \n예시 반환값: [{"nickname":"User1", "score":"00점"}, {"nickname":"User2", "score":"00점"}]`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(process.env.NEXT_PUBLIC_OPEN_API),
      },
    },
  );
  console.log(response);
  return response;
};

export const bingGrammerCheckApi = async (text: string) => {
  const query_string = '?mkt=en-US&mode=proof';
  const data = `text=${text}`;
  try {
    const response = await axios({
      method: 'post',
      url: `https://api.bing.microsoft.com/v7.0/spellcheck${query_string}`,
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_GRAMMER_API, // replace with your Bing Spell Check API key
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const openAiContextScore = async (data: []) => {
  console.log(data);
  const payload = convertArrayToChatString(data);
  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      model: 'text-davinci-003',
      prompt: `${payload}\n\n위 대화의 마지막 문장이 그 이전 문장에 대한 답변으로 적절한지 점수를 줘라. 0~20점 사이로 줘라.`,
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(process.env.NEXT_PUBLIC_OPEN_API),
      },
    },
  );
  console.log(response);
  return response;
};
