import React from 'react';

interface message {
  nickname: string;
  message: string;
  contextResult?: string;
  grammarResult?: string;
}
interface resultProps {
  result: message[];
}

const me = '닉네임1';

const AnalyzeResult = ({ result }: resultProps) => {
  console.log(result);
  return (
    <div className="px-5 border-2">
      {result.map((item, index) => (
        <div
          key={index}
          className={`${
            item.nickname === me
              ? 'flex flex-col justify-end items-end border-4 border-red-500'
              : 'border-4 border-blue-400'
          }`}
        >
          <div className={`${item.nickname === me ? 'my-chat' : 'other-chat'}`}>
            <div>{item.message}</div>
            {item.contextResult && <div>{item.contextResult}</div>}
            {item.grammarResult && <div>{item.grammarResult}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyzeResult;
