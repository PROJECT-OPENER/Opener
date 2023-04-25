'use client';

import React, { useRef } from 'react';
const ShootingVideo = () => {
  const recordButton = useRef<HTMLButtonElement>(null);
  const stopButton = useRef<HTMLButtonElement>(null);
  const playButton = useRef<HTMLButtonElement>(null);
  const downloadButton = useRef<HTMLAnchorElement>(null);

  const previewPlayer = useRef<HTMLVideoElement>(null);
  const recordingPlayer = useRef<HTMLVideoElement>(null);
  let recorder: MediaRecorder;
  let recordedChunks: BlobPart[];

  function videoStart() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream: MediaStream) => {
        if (previewPlayer.current) {
          previewPlayer.current.srcObject = stream;
          startRecording(previewPlayer.current.captureStream());
        }
      });
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
      previewPlayer.current.srcObject
        .getTracks()
        .forEach((track: { stop: () => any }) => track.stop());
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
          ref={recordButton}
          onClick={() => {
            videoStart();
          }}
        >
          녹화
        </button>
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
        <div className="video-item">
          <h2>녹화중</h2>
          <video autoPlay muted ref={previewPlayer}></video>
        </div>
        <div className="video-item">
          <h2>미리보기</h2>
          <video ref={recordingPlayer}></video>
        </div>
      </div>
    </div>
  );
};

export default ShootingVideo;
