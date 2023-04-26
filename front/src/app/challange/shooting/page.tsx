'use client';

import React, { useRef, useEffect, useState } from 'react';
import { CgRadioChecked } from 'react-icons/cg';
import OriginalVideo from './components/OriginalVideo';
import UploadVideo from './components/UploadVideo';

const page = () => {
  const [status, setStatus] = useState(false);
  const buttonIcon = () => {
    if (!status) {
      return <CgRadioChecked size="72" color="white" />;
    } else {
      return <CgRadioChecked size="72" color="red" />;
    }
  };
  const recordButton = useRef<HTMLButtonElement>(null);
  const stopButton = useRef<HTMLButtonElement>(null);
  const playButton = useRef<HTMLButtonElement>(null);
  const downloadButton = useRef<HTMLAnchorElement>(null);

  const previewPlayer = useRef<HTMLVideoElement | null>(null);
  const recordingPlayer = useRef<HTMLVideoElement>(null);
  let recorder: MediaRecorder;
  let recordedChunks: BlobPart[];

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 720, height: 1280 }, audio: true })
      .then((stream: MediaStream) => {
        if (previewPlayer.current) {
          previewPlayer.current.srcObject = stream;
          startRecording((previewPlayer.current as any).captureStream());
        }
      });
  }, []);

  function videoStart() {
    setStatus(true);
    startRecording((previewPlayer.current as any).captureStream());
  }

  function startRecording(stream: MediaStream) {
    recordedChunks = [];
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      recordedChunks.push(e.data);
    };
    recorder.start();
  }

  function stopRecording() {
    if (previewPlayer.current && previewPlayer.current.srcObject) {
      const srcObj = previewPlayer.current.srcObject;
      if ('getTracks' in srcObj) {
        srcObj
          .getTracks()
          .forEach((track: { stop: () => any }) => track.stop());
        console.log('getTracks 있음');
      }
    }
    recorder.stop();
  }

  function playRecording() {
    const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
    if (recordingPlayer.current) {
      recordingPlayer.current.src = URL.createObjectURL(recordedBlob);
      recordingPlayer.current.play();
      if (downloadButton.current) {
        downloadButton.current.href = recordingPlayer.current.src;
        downloadButton.current.download = `recording_${new Date()}.webm`;
        console.log(recordingPlayer.current.src);
      }
    }
  }

  return (
    <div className="wrapper">
      <div className="button-container">
        <button
          ref={stopButton}
          onClick={() => {
            stopRecording();
          }}
        >
          중지
        </button>
        <button
          ref={playButton}
          onClick={() => {
            playRecording();
          }}
        >
          녹화보기
        </button>
        <a ref={downloadButton}>다운로드</a>
      </div>
      <div className="video-container">
        <div className="video-item relative w-full flex justify-center">
          <div className="relative bg-yellow-50">
            <div className="relative">
              <video autoPlay muted ref={previewPlayer}></video>
            </div>
          </div>

          <div className="absolute bottom-0 flex justify-between mb-5">
            <div className="h-1/5 w-1/5">
              <OriginalVideo></OriginalVideo>
            </div>
            <button
              ref={recordButton}
              onClick={() => {
                videoStart();
              }}
            >
              {buttonIcon()}
            </button>
          </div>
        </div>
        <UploadVideo></UploadVideo>
        <div className="video-item">
          <h2>미리보기</h2>
          <video ref={recordingPlayer}></video>
        </div>
      </div>
    </div>
  );
};

export default page;
