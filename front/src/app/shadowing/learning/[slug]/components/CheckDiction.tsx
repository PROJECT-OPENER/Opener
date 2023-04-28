import React, { useState, useCallback } from 'react';

const CheckDiction = () => {
  const [stream, setStream] = useState<MediaStream>();
  const [media, setMedia] = useState<MediaRecorder>();
  const [onRec, setOnRec] = useState<boolean>(true);
  const [source, setSource] = useState<AudioNode>();
  const [audioUrl, setAudioUrl] = useState<Blob>();

  const onRecAudio = useCallback(() => {
    setAudioUrl(undefined);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      setStream(stream);
      setMedia(mediaRecorder);
      mediaRecorder.start();
      const audioCtx = new AudioContext();
      const sourceNode = audioCtx.createMediaStreamSource(stream);
      setSource(sourceNode);
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };
      mediaRecorder.onstop = function (e) {
        const audioBlob = new Blob(chunks);
        setAudioUrl(audioBlob);
        setOnRec(true);
        setStream(undefined);
        setMedia(undefined);
        setSource(undefined);
      };
      setOnRec(false);
    });
  }, []);

  const offRecAudio = useCallback(() => {
    media?.stop();
    stream?.getTracks().forEach((track) => track.stop());
    setOnRec(true);
    setAudioUrl(undefined);
  }, [media, stream]);

  // const onSubmitAudioFile = useCallback(() => {
  //   if (audioUrl) {
  //     console.log(URL.createObjectURL(audioUrl));
  //     const sound = new File([audioUrl], 'soundBlob', {
  //       type: 'audio/wav',
  //     });
  //     console.log(sound);
  //   }
  // }, [audioUrl]);

  return (
    <>
      <p>
        <button onClick={onRec ? onRecAudio : offRecAudio}>
          {onRec ? '[녹음 시작]' : '[녹음 중지]'}
        </button>
      </p>
      <p>
        {/* <button onClick={onSubmitAudioFile} disabled={!audioUrl}>
          [결과확인]
        </button> */}
        {audioUrl ? (
          <audio autoPlay controls>
            <source src={URL.createObjectURL(audioUrl)} type="audio/wav" />
          </audio>
        ) : (
          ''
        )}
      </p>
    </>
  );
};

export default CheckDiction;
