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
      prompt: `${data}\n\n위 대화의 문맥과 문법을 고려하여 너가 유저 별로 점수를 매겨줘 \n문법과 문맥 각각 100점 만점으로 환산하여 대답해줘\n반드시 두 사람의 문법과 문맥 점수의 합이 다르게 줘.\n반드시 아래 예시 형태로만 대답해줘.\n예시 반환값: [{"nickname":"4번", "context":"00점", "grammer":"00점"}, {"nickname":"1번", "context":"00점", "grammer":"00점"}]`,
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
