'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  SpeechConfig,
  SpeechRecognizer,
  AudioConfig,
} from 'microsoft-cognitiveservices-speech-sdk';
import { useRecoilState } from 'recoil';
import {
  aiChatIsChatState,
  aiChatIsRecordingState,
  aiChatMessageState,
} from '../../store';
import {
  BsArrowCounterclockwise,
  BsArrowUp,
  BsKeyboard,
  BsMic,
} from 'react-icons/bs';

type Props = {
  handleSendMessage: () => void;
};
const AiChatSendVoice = ({ handleSendMessage }: Props) => {
  const subscriptionKey = process.env.NEXT_PUBLIC_TTS_API;
  const serviceRegion = 'eastus';
  // recoil
  const [message, setMessage] = useRecoilState(aiChatMessageState);
  const [isRecording, setIsRecording] = useRecoilState(aiChatIsRecordingState);
  const [isChat, setisChat] = useRecoilState(aiChatIsChatState);
  // state
  const [text, setText] = useState([message]);

  // azure
  const speechConfig = SpeechConfig.fromSubscription(
    subscriptionKey as string,
    serviceRegion,
  );
  const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
  let recognizer: SpeechRecognizer | undefined;
  const recognizerRef = useRef<SpeechRecognizer | undefined>(recognizer);

  // useEffect
  useEffect(() => {
    setMessage(text.join(' '));
  }, [text]);
  useEffect(() => {
    setText([message]);
  }, [message]);
  useEffect(() => {
    if (!isChat && message.length > 1) {
      start();
    }
    if (isChat) {
      stop();
    }
  }, [isChat]);

  // function
  const start = () => {
    setIsRecording(true);
    Record();
  };
  const Record = () => {
    recognizer = new SpeechRecognizer(speechConfig, audioConfig);
    recognizerRef.current = recognizer;
    // recognizer.recognizing = (s, e) => {
    //   // console.log(`인식된 글자 : ${e.result.text}`);
    // };
    recognizer.recognized = (s, e) => {
      setText((prevText) => [...prevText, e.result.text]);
      // console.log('recognized : ', e.result.text);
    };
    recognizer.sessionStopped = () => {
      if (recognizer) {
        recognizer.close();
        recognizer = undefined;
        console.log('close');
        // setIsRecording(false);
      }
    };
    recognizer.startContinuousRecognitionAsync();
  };
  const stop = () => {
    if (recognizerRef.current) {
      console.log('stop');
      setIsRecording(false);
      recognizerRef.current.stopContinuousRecognitionAsync();
    }
  };
  const stopAndSendMessage = () => {
    handleSendMessage();
    stop();
  };
  const stopAndResetMessage = () => {
    stop();
    setMessage('');
    setText([]);
  };
  const handleKeyboard = () => {
    setisChat(!isChat);
    stop();
  };
  // 나갈 때 마이크 끄기
  useEffect(() => {
    return () => {
      stop();
    };
  }, []);
  return (
    <div className="grid grid-cols-3">
      <div className="flex flex-col justify-end p-5">
        {!isRecording && (
          <button type="button" className="text-3xl" onClick={handleKeyboard}>
            <BsKeyboard className="fill-white" />
          </button>
        )}
        {isRecording && (
          <button
            type="button"
            className="text-3xl"
            onClick={stopAndResetMessage}
          >
            <BsArrowCounterclockwise className="fill-white" />
          </button>
        )}
      </div>
      <div className="flex flex-col justify-center items-center py-5">
        <div className="text-white mb-4">
          {isRecording ? '듣고있어요' : '말씀해주세요.'}
        </div>
        <button
          onClick={isRecording ? stopAndSendMessage : start}
          className="rounded-full bg-white p-1 text-3xl text-black w-20 lg:w-14 h-20 lg:h-14 flex justify-center items-center"
        >
          {isRecording ? <BsArrowUp /> : <BsMic />}
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default AiChatSendVoice;
