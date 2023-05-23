import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { aiChatIsChatState, aiChatMessageState } from '../../store';
import { BsArrowUp, BsMic } from 'react-icons/bs';
type Props = {
  handleSendMessage: () => void;
};

const AiChatSendText = ({ handleSendMessage }: Props) => {
  // recoil
  const [message, setMessage] = useRecoilState(aiChatMessageState);
  const [isChat, setisChat] = useRecoilState(aiChatIsChatState);
  // ref
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // function
  const handleKeyboardChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    const value = event.target.value;
    if (
      /^[a-zA-Z0-9 !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/.test(String(value)) ||
      value === ''
    ) {
      setMessage(value);
    }
    // console.log(event.target.value);
    // 높이가 변경될 때마다 `Textarea`의 높이를 자동으로 조절합니다.
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      if (event.target.value === '\n') {
        setMessage('');
        textareaRef.current.style.height = '40px';
      }
    }
  };
  const handleMicChange = () => {
    setisChat(!isChat);
  };
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };
  return (
    <div className="flex items-center min-h-[50px] mx-5 relative lg:rounded-b-3xl">
      <button
        type="button"
        className={`bg-brandY text-white font-bold py-2 px-2 rounded-full mr-3 absolute bottom-[0.65rem] shadow-custom`}
        onClick={handleMicChange}
      >
        <BsMic className="fill-white" />
      </button>
      <div className="relative w-full ml-12 mt-2">
        <textarea
          ref={textareaRef}
          placeholder="메시지를 영문으로 입력하세요."
          className="mr-2 pl-4 px-10 pr-12 py-2 rounded-lg border-2 text-sm border-gray-400 focus:outline-none focus:border-brandY w-full max-w-[100%] overflow-hidden resize-none min-h-[40px] shadow-custom"
          value={message}
          rows={1}
          onChange={handleKeyboardChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className={` bg-brandP hover:bg-brandG text-white font-bold py-2 px-2 rounded-full absolute right-1 bottom-[0.65rem] flex items-center`}
          onClick={handleSendMessage}
        >
          <BsArrowUp className="fill-white font-bold" />
        </button>
      </div>
    </div>
  );
};

export default AiChatSendText;
