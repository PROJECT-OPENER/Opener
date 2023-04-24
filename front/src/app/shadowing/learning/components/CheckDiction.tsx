const CheckDiction = () => {
  const getVoice = async () => {
    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      /* use the stream */
    } catch (err) {
      /* handle the error */
    }
  };
  return (
    <div>
      <button onClick={getVoice}>음성 녹음하기</button>
    </div>
  );
};
export default CheckDiction;
