'use client';
import React, { useState, useRef, useEffect } from 'react';
import { BsChevronLeft, BsMic } from 'react-icons/bs';
import { AiOutlinePause } from 'react-icons/ai';
import {
  SpeechConfig,
  SpeechRecognizer,
  AudioConfig,
  PropertyId,
  PronunciationAssessmentConfig,
} from 'microsoft-cognitiveservices-speech-sdk';

const CheckDiction = (props: any) => {
  const [assessmentResult, setAssessmentResult] = useState<any>();

  const backBtn = () => {
    props.setCheckDiction(false);
    props.playerRef.current?.playVideo();
    props.showCountRef.current = false;
    props.isRepeatRef.current = false;
    props.playerRef.current?.unMute();
  };

  const [isRecording, setIsRecording] = useState<boolean>(false);

  const context = {
    referenceText: props.text,
    gradingSystem: 'HundredMark',
    granularity: 'Phoneme',
    phonemeAlphabet: 'IPA',
    nBestPhonemeCount: 5,
  };

  // Cognitive Services 계정 정보
  const subscriptionKey = '73f54ad18a1942b98944cca014f59386';
  const serviceRegion = 'eastus';

  const speechConfig = SpeechConfig.fromSubscription(
    subscriptionKey,
    serviceRegion,
  );
  const audioConfig = AudioConfig.fromDefaultMicrophoneInput();

  let recognizer: SpeechRecognizer | undefined;
  const recognizerRef = useRef<SpeechRecognizer | undefined>(recognizer);
  const start = () => {
    // 3초 타이머
    setAssessmentResult(undefined);
    setIsRecording(true);
    props.setSecond(3);
    props.playerRef.current?.mute();
    props.playerRef.current?.seekTo(props.subRangeRef.current?.start, true);
    props.playerRef.current?.pauseVideo();
    props.showCountRef.current = true;
    let second = 3;
    const timer = setInterval(() => {
      second -= 1;
      props.setSecond(second);
      if (!props.showCountRef.current) {
        clearInterval(timer);
      } else if (second < 1) {
        Record();
        props.playerRef.current?.playVideo();
        props.showCountRef.current = false;
        clearInterval(timer);
      }
    }, 1000);
  };
  const Record = () => {
    const config = PronunciationAssessmentConfig.fromJSON(
      JSON.stringify(context),
    );
    recognizer = new SpeechRecognizer(speechConfig, audioConfig);
    config.applyTo(recognizer);
    recognizerRef.current = recognizer;

    recognizer.recognizing = (s, e) => {
      const list: any = [];
      e.result.text.split(' ').map((word, index) => {
        const info = {
          index: index,
          word: word,
          isPron: true,
          pronunciationAssessment: '',
        };
        list.push(info);
      });
      setAssessmentResult({
        aassessment: {},
        list: list,
      });
      console.log(`인식된 글자 : ${e.result.text}`);
    };
    recognizer.recognized = (s, e) => {
      const res = e.result.properties.getProperty(
        PropertyId.SpeechServiceResponse_JsonResult,
      );
      if (recognizer) {
        result(JSON.parse(res));
        stop();
      }
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

  useEffect(() => {
    start();

    return () => {
      stop();
    };
  }, []);

  const result = async (result: any) => {
    if (props.captionArray && result.RecognitionStatus === 'Success') {
      const res = result.NBest[0];
      const Lexical = res.Lexical.split(' ');
      const caption = props.captionArray;
      const assessment = {
        accuracy: res.PronunciationAssessment.AccuracyScore,
        fluency: res.PronunciationAssessment.FluencyScore,
        completeness: res.PronunciationAssessment.CompletenessScore,
        pron: res.PronunciationAssessment.PronScore,
      };

      // caption과 Lexical 비교 =>  최장공통부분수열 LCS(Longest Common Subsequence)
      // 1. 2차원 배열 초기화
      const n = caption.length;
      const m = Lexical.length;
      const arr = Array(n + 1)
        .fill(0)
        .map(() => Array(m + 1).fill(0));

      // 2. 2차원 배열 순회하며 비교 후 배열 채우기
      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
          if (caption[i - 1].toLowerCase() === Lexical[j - 1].toLowerCase()) {
            arr[i][j] = arr[i - 1][j - 1] + 1;
          } else {
            arr[i][j] = Math.max(arr[i - 1][j], arr[i][j - 1]);
          }
        }
      }

      // 3. 공통되는 부분 추적
      let i = n;
      let j = m;
      const resCaptionIdx = []; // caption 리스트에서 Lexical의 단어와 일치하는 단어를 담을 인덱스
      while (arr[i][j] > 0) {
        if (arr[i][j] === arr[i][j - 1]) {
          j -= 1;
        } else if (arr[i][j] === arr[i - 1][j]) {
          i -= 1;
        } else {
          resCaptionIdx.push(i - 1);
          i -= 1;
          j -= 1;
        }
      }
      const recognized = []; // 단어의 발음 정보를 담는 배열
      for (let i = 0; i < n; i++) {
        const info = {
          index: i,
          word: caption[i],
          isPron: false,
          pronunciationAssessment: res.Words[i]?.PronunciationAssessment,
        };
        if (resCaptionIdx.includes(i)) {
          info.isPron = true;
        }
        recognized.push(info);
      }
      setAssessmentResult({
        assessment: assessment,
        list: recognized,
      }); // 발음 결과
    } else if (
      props.captionArray &&
      result.RecognitionStatus === 'EndOfDictation'
    ) {
      console.log('EndOfDictation');
    }
  };
  const DetailResult = (index: number) => {
    console.log(assessmentResult.list[index]?.pronunciationAssessment);
  };

  return (
    <div className="relative flex flex-col justify-between h-full">
      <div className="mb-4 min-h-[60px]">
        <p className="font-bold mb-2">{props.captionArray?.join(' ')}</p>
        <p className="font-semibold">
          {assessmentResult?.list.map((caption: any, index: number) => {
            return (
              <span key={index}>
                <span onClick={() => DetailResult(index)}>
                  {caption.isPron ? (
                    <>
                      <span className="cursor-pointer hover:bg-black">
                        {caption.word}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-red-600/75 cursor-pointer hover:bg-black">
                        {caption.word}
                      </span>
                    </>
                  )}
                </span>{' '}
              </span>
            );
          })}
        </p>
      </div>
      <div>
        <p>accuracy: {assessmentResult?.assessment?.accuracy}점</p>
        <p>fluency: {assessmentResult?.assessment?.fluency}점</p>
        <p>completeness: {assessmentResult?.assessment?.completeness}점</p>
        <p>pron: {assessmentResult?.assessment?.pron}점</p>
      </div>
      <div className="flex flex-row items-end justify-between">
        <div className="w-full">
          <button className="rounded-full p-2 bg-[#F0F0F0]" onClick={backBtn}>
            <BsChevronLeft />
          </button>
        </div>
        <div className="w-full flex flex-col items-center">
          {isRecording ? (
            <button onClick={stop} className="rounded-full bg-[#F0F0F0] p-4">
              <AiOutlinePause size={'2rem'} />
            </button>
          ) : (
            <button onClick={start} className="rounded-full bg-[#F0F0F0] p-4">
              <BsMic size={'2rem'} />
            </button>
          )}
        </div>
        <div className="w-full" />
      </div>
    </div>
  );
};

export default CheckDiction;
