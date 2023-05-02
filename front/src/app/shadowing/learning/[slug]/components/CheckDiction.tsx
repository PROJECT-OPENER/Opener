// import axios from 'axios';
// import React, { useState, useCallback } from 'react';
// import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

// type propsType = {
//   text: string | undefined; // 스크립트 텍스트
// };
// const AI_API_KEY = 'c9708472-79d0-49a8-a3e1-3aa30b6b3ed4';
// const openApiURL = 'http://aiopen.etri.re.kr:8000/WiseASR/Pronunciation';

// const CheckDiction = (props: propsType) => {
//   const [stream, setStream] = useState<MediaStream>();
//   const [media, setMedia] = useState<MediaRecorder>();
//   const [isRec, setIsRec] = useState<boolean>(false);
//   const [source, setSource] = useState<AudioNode>();
//   const [audioUrl, setAudioUrl] = useState<any>();

//   // console.log(props.text);
//   const onRecAudio = useCallback(() => {
//     setAudioUrl(undefined);
//     navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//       const mediaRecorder = new MediaRecorder(stream);
//       setStream(stream);
//       setMedia(mediaRecorder);
//       mediaRecorder.start();
//       const audioCtx = new AudioContext();
//       const sourceNode = audioCtx.createMediaStreamSource(stream);
//       setSource(sourceNode);
//       const audioArray: Blob[] = [];

//       // 이벤트핸들러: 녹음 데이터 취득 처리
//       mediaRecorder.ondataavailable = function (e) {
//         audioArray.push(e.data); // 오디오 데이터가 취득될 때마다 배열에 push.
//       };
//       // 이벤트핸들러: 녹음 종료 처리
//       mediaRecorder.onstop = function () {
//         const audioBlob = new Blob(audioArray, { type: 'audio/wav; codecs=0' });
//         setAudioUrl(audioBlob);
//         // setAudioUrl(audioArray);
//         setIsRec(false);
//         setStream(undefined);
//         setMedia(undefined);
//         setSource(undefined);
//       };
//       setIsRec(true);
//     });
//   }, []);

//   const offRecAudio = useCallback(() => {
//     media?.stop();
//     stream?.getTracks().forEach((track) => track.stop());
//     setIsRec(false);
//     setAudioUrl(undefined);
//   }, [media, stream]);

//   // const onSubmitAudioFile = useCallback(() => {
//   //   if (audioUrl) {
//   //     console.log(URL.createObjectURL(audioUrl));
//   //     const sound = new File([audioUrl], 'soundBlob', {
//   //       type: 'audio/wav',
//   //     });
//   //     console.log(sound);
//   //   }
//   // }, [audioUrl]);

//   //-----------------------발음 분석하기-------------------------
//   //-----------------------발음 분석하기-------------------------
//   //-----------------------발음 분석하기-------------------------

//   // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
//   const assessSpeech = () => {
//     const SPEECH_KEY = 'bdb2ab212ea64f55981c3cec87154feb';
//     const SPEECH_REGION = 'kr';
//     const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
//       SPEECH_KEY,
//       SPEECH_REGION,
//     );

//     speechConfig.speechRecognitionLanguage = 'en-US';
//     const audioConfig = SpeechSDK.AudioConfig.fromWavFileInput(audioUrl);

//     const context = {
//       referenceText: props.text, // 기준이 되는 대본
//       gradingSystem: 'HundredMark',
//       granularity: 'Phoneme',
//       phonemeAlphabet: 'IPA',
//       nBestPhonemeCount: 5,
//     };

//     const pronunciationAssessmentConfig =
//       SpeechSDK.PronunciationAssessmentConfig.fromJSON(JSON.stringify(context));

//     const speechRecognizer = new SpeechSDK.SpeechRecognizer(
//       speechConfig,
//       audioConfig,
//     );

//     pronunciationAssessmentConfig.applyTo(speechRecognizer);

//     speechRecognizer.recognizeOnceAsync(
//       (speechRecognitionResult: SpeechSDK.SpeechRecognitionResult) => {
//         // The pronunciation assessment result as a Speech SDK object
//         // const pronunciationAssessmentResult =
//         //   SpeechSDK.PronunciationAssessmentResult.fromResult(
//         //     speechRecognitionResult,
//         //   );

//         // The pronunciation assessment result as a JSON string
//         const pronunciationAssessmentResultJson =
//           speechRecognitionResult.properties.getProperty(
//             SpeechSDK.PropertyId.SpeechServiceResponse_JsonResult,
//           );
//         console.log(
//           'pronunciationAssessmentResultJson:',
//           pronunciationAssessmentResultJson,
//         );
//       },
//     );
//   };

//   //-----------------------발음 분석하기-------------------------
//   //-----------------------발음 분석하기-------------------------
//   //-----------------------발음 분석하기-------------------------

//   return (
//     <>
//       <p>
//         <button onClick={!isRec ? onRecAudio : offRecAudio}>
//           {!isRec ? '[녹음 시작]' : '[녹음 중지]'}
//         </button>
//       </p>
//       <p>
//         <button onClick={assessSpeech} disabled={!audioUrl}>
//           [결과확인]
//         </button>
//         {audioUrl ? (
//           <audio autoPlay controls>
//             <source src={URL.createObjectURL(audioUrl)} type="audio/wav" />
//           </audio>
//         ) : (
//           ''
//         )}
//       </p>
//     </>
//   );
// };

import React, { useState, useRef } from 'react';
import {
  SpeechConfig,
  SpeechRecognizer,
  AudioConfig,
  PropertyId,
  PronunciationAssessmentConfig,
} from 'microsoft-cognitiveservices-speech-sdk';

const CheckDiction = (props: any) => {
  const [isRecording, setIsRecording] = useState(false);
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
    setIsRecording(true);
    const config = PronunciationAssessmentConfig.fromJSON(
      JSON.stringify(context),
    );
    recognizer = new SpeechRecognizer(speechConfig, audioConfig);
    config.applyTo(recognizer);
    recognizerRef.current = recognizer;

    recognizer.recognizing = (s, e) => {
      console.log(`인식된 글자 : ${e.result.text}`);
    };
    recognizer.recognized = (s, e) => {
      const res = e.result.properties.getProperty(
        PropertyId.SpeechServiceResponse_JsonResult,
      );
      console.log('결과 :', res);
    };

    recognizer.sessionStopped = () => {
      if (recognizer) {
        recognizer.close();
        recognizer = undefined;
        console.log('close');
        setIsRecording(false);
      }
    };
    recognizer.startContinuousRecognitionAsync();
  };
  const stop = () => {
    if (recognizerRef.current) {
      recognizerRef.current.stopContinuousRecognitionAsync();
    }
  };

  return (
    <div>
      <h2>Pronunciation Assessment</h2>
      {isRecording ? (
        <button onClick={stop}>Recording...</button>
      ) : (
        <button onClick={start}>Record</button>
      )}
    </div>
  );
};

export default CheckDiction;
