export const secToTime = (duration: number) => {
  let seconds: string | number = Math.floor(duration % 60);
  let minutes: string | number = Math.floor((duration / 60) % 60);

  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return minutes + ':' + seconds;
};

export const handleDate = (date: string) => {
  const getDate = new Date(date);
  const year = getDate.getFullYear();
  const month = (getDate.getMonth() + 1).toString().padStart(2, '0');
  const day = getDate.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const handleTurn = (isFirst: boolean, turn: number) => {
  // 선공 + 홀수 턴
  if (turn % 2 !== 0 && isFirst) return true;
  // 성공  + 짝수 턴
  if (turn % 2 === 0 && isFirst) return false;
  // 후공 + 홀수 턴
  if (turn % 2 !== 0 && !isFirst) return false;
  // 후공 + 짝수 턴
  if (turn % 2 === 0 && !isFirst) return true;
};
