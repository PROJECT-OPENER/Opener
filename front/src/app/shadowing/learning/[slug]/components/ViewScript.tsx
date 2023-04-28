'use client';
import CheckDiction from './CheckDiction';
import ViewDict from './ViewDict';
import { useRef, useState, useEffect } from 'react';
import { WordTokenizer } from 'natural';
import styles from './ViewScript.module.css';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { scriptType } from '@/app/types/share';

const subtitles =
  '00:00:01.000 --> 00:00:04.000\n- Never drink liquid nitrogen.\n\n00:00:06.000 --> 00:00:10.000\n- It will perforate your stomach.\n- You could die.';

const ViewScript = () => {
  const playerRef = useRef<YouTubePlayer>(null);
  const [checkDiction, setCheckDiction] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');

  const searchDict = (word: string): void => {
    setSearchWord(word);
  };
  const convertTime = (timeString: string): number => {
    const [hours, minutes, seconds] = timeString.split(/[:,]/).map(parseFloat);
    return hours * 3600 + minutes * 60 + seconds;
  };
  const subtitleArray: scriptType[] = [];
  if (subtitles) {
    const subtitle = subtitles.split('\n\n');
    for (let i = 0; i < subtitle.length; i++) {
      const sub = subtitle[i].split('\n');
      const subtitleTime = sub[0].split(' --> ');
      const subtitleText = sub.slice(1).join('\n');
      if (subtitleTime) {
        subtitleArray.push({
          startTime: convertTime(subtitleTime[0]),
          endTime: convertTime(subtitleTime[1]),
          text: subtitleText,
        });
      }
    }
  }
  const findNextInterval = (time: number) => {
    // 반환값 : 양수 또는 -1(양수 == 인터벌, 음수 == 더이상 자막이 없는 경우)
    // 자막 변경이 이루어져야 할 시점을 찾는 함수
    let min_time = Infinity;
    for (const subtitle of subtitleArray) {
      if (time < subtitle.startTime && min_time > subtitle.startTime) {
        min_time = subtitle.startTime;
      } else if (time < subtitle.endTime && min_time > subtitle.endTime) {
        min_time = subtitle.endTime;
      }
    }
    return min_time === Infinity ? -1 : (min_time - time) * 1000; //
  };

  const findSubtitle = (time: number) => {
    for (let i = 0; i < subtitleArray.length; i++) {
      if (
        time >= subtitleArray[i].startTime &&
        time < subtitleArray[i].endTime
      ) {
        return subtitleArray[i];
      }
    }
    return undefined;
  };
  const [tokenized, setTokenized] = useState<string[]>();
  const [intervalTime, setIntervalTime] = useState<number>(10);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    setIntervalTime(findNextInterval(currentTime));
    const myTimeout = changeSubtitle();

    return () => {
      clearTimeout(myTimeout); // setInterval(changeSubtitle) 후 clear <= 메모리 누수 방지
    };
  }, [intervalTime]);
  const tokenizer = new WordTokenizer();
  const changeSubtitle = () => {
    return setTimeout(function () {
      if (playerRef.current?.getPlayerState() === 1) {
        const curTime = playerRef.current.getCurrentTime();
        setCurrentTime(curTime);
        const subtitle: scriptType | undefined = findSubtitle(curTime);
        if (subtitle) setTokenized(tokenizer.tokenize(subtitle.text));
        else setTokenized([]);
        setIntervalTime(findNextInterval(curTime));
      }
    }, intervalTime);
  };

  return (
    <div className="min-h-[150px]">
      <div className={styles.videoContainer}>
        <YouTube
          onReady={(event) => {
            playerRef.current = event.target;
          }}
          onEnd={(event) => {
            event.target?.stopVideo(0);
          }}
          onStateChange={changeSubtitle}
          videoId="D8-snVfekto"
          opts={{
            height: '390',
            width: '640',
            playerVars: {
              autoplay: 1, // 자동재생 O
              rel: 0, // 관련 동영상 표시하지 않음
              modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
            },
          }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.scriptBox}>
          {checkDiction ? (
            <>
              <button onClick={() => setCheckDiction(false)}>이전으로</button>
              <CheckDiction />
            </>
          ) : (
            <>
              <button onClick={() => setCheckDiction(true)}>발음 체크</button>
              <div>
                {tokenized?.map((word, index) => {
                  return (
                    <span key={index}>
                      <span
                        onClick={() => searchDict(word)}
                        className={styles.word}
                      >
                        {word}
                      </span>
                      <span> </span>
                    </span>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {searchWord ? (
          <div className={styles.dictBox}>
            <ViewDict word={searchWord} />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
export default ViewScript;
