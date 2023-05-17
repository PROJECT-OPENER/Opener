'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  SpeechConfig,
  SpeechRecognizer,
  AudioConfig,
} from 'microsoft-cognitiveservices-speech-sdk';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  userChatIsChatState,
  userChatIsRecordingState,
  userChatMessageState,
  userChatTimerState,
} from '../../store';
import {
  BsArrowCounterclockwise,
  BsArrowUp,
  BsKeyboard,
  BsMic,
} from 'react-icons/bs';

const subscriptionKey = '73f54ad18a1942b98944cca014f59386';
const serviceRegion = 'eastus';

type Props = {
  handleSendMessage: () => void;
};

const UserChatSendVoice = ({ handleSendMessage }: Props) => {
  // recoil
  const [isRecording, setIsRecording] = useRecoilState(
    userChatIsRecordingState,
  );
  const [message, setMessage] = useRecoilState(userChatMessageState);
  const [isChat, setisChat] = useRecoilState(userChatIsChatState);
  const timer = useRecoilValue(userChatTimerState);
  // state
  const [text, setText] = useState([message]);

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

  const speechConfig = SpeechConfig.fromSubscription(
    subscriptionKey,
    serviceRegion,
  );
  const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
  let recognizer: SpeechRecognizer | undefined;
  const recognizerRef = useRef<SpeechRecognizer | undefined>(recognizer);
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
    <div className="grid grid-cols-3 shadow-custom">
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
        <div className="text-white">
          {isRecording ? '듣고있어요' : '말씀해주세요.'}
        </div>
        <button
          onClick={isRecording ? stopAndSendMessage : start}
          className="rounded-full bg-white p-1 text-3xl text-black w-20 h-20 flex justify-center items-center relative"
        >
          {isRecording && (
            <div className="absolute h-20 w-20 rounded-full border-4 border-t-brandY border-l-red-300 animate-spin"></div>
          )}

          {isRecording ? <BsArrowUp /> : <BsMic />}
        </button>
      </div>
      <div className="text-end relative">
        <div
          className={`absolute h-12 w-12 bottom-3 right-3 rounded-full border-4 animate-spin z-50 ${
            timer < 10
              ? 'border-t-red-400 border-l-red-400'
              : 'border-t-red-300'
          }`}
        ></div>
        <span className="bg-white h-12 w-12 absolute bottom-3 right-3 rounded-full flex items-center justify-center">
          {timer}
        </span>
      </div>
    </div>
  );
};

export default UserChatSendVoice;
