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
