interface ChatLogElement {
  text: string;
  sender: 'AI' | 'HUMAN';
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
