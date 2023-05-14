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

export const handleProcessArray = (arrays: any[], nickname: string) => {
  const recentArrays = arrays.slice(-2); // 가장 최근의 두 개의 배열 가져오기
  const processedArrays = recentArrays.map((array) => {
    if (array.nickname === nickname) {
      return `${array.turn - 1}, : ${array.message}`;
    } else {
      return `${array.turn - 1}, : ${array.message}`;
    }
  });
  return processedArrays.join('\n');
};

export const convertToJSON = (str: string) => {
  // console.log('str', str);
  let jsonString = str.trim();

  // 문자열이 ']' 또는 '}]'로 끝나지 않은 경우
  if (!jsonString.endsWith(']') && !jsonString.endsWith('}]')) {
    // ']'로 끝나는 경우
    if (jsonString.endsWith('[')) {
      jsonString += ']';
    }
    // '}]'로 끝나는 경우
    else if (jsonString.endsWith('{')) {
      jsonString += '}]';
    }
    // 그 외의 경우
    else {
      jsonString += '}';
    }
  }

  try {
    const json = JSON.parse(jsonString);
    return json;
  } catch (error) {
    console.error('Error parsing string to JSON:', error);
    return null;
  }
};
