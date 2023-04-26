'use client';
import CheckDiction from './CheckDiction';
import ViewDict from './ViewDict';
import { useRef, useState } from 'react';
import { WordTokenizer } from 'natural';
import styles from './ViewScript.module.css';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { scriptType } from '@/app/types/user';

const subtitles =
  '00:00:01.000 --> 00:00:04.000\n- Never drink liquid nitrogen.\n\n00:00:06.000 --> 00:00:10.000\n- It will perforate your stomach.\n- You could die.';

const ViewScript = () => {
  const playerRef = useRef<YouTubePlayer>(null);
  const [checkDiction, setCheckDiction] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');

  const searchDict = (word: string): void => {
    setSearchWord(word);
  };

  const convertTime = (time: string): number => {
    const parts = time.split(':');
    const seconds = parseFloat(parts[2].replace(',', '.'));
    const minutes = parseInt(parts[1]);
    const hours = parseInt(parts[0]);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const subtitleArray: scriptType[] = [];
  const splitSubtitles = (sub: string): void => {
    if (sub) {
      const subtitles = sub.split('\n\n');
      for (let i = 0; i < subtitles.length; i++) {
        const subtitle = subtitles[i].split('\n');
        const subtitleTime = subtitle[0].split(' --> ');
        const subtitleText = subtitle.slice(1).join('\n');
        if (subtitleTime) {
          subtitleArray.push({
            startTime: convertTime(subtitleTime[0]),
            endTime: convertTime(subtitleTime[1]),
            text: subtitleText,
          });
        }
      }
    }
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

  function onPlayerReady() {
    setInterval(function () {
      if (playerRef.current.getPlayerState() === 1) {
        const currentTime = playerRef.current.getCurrentTime();
        const subtitle: scriptType | undefined = findSubtitle(
          parseInt(currentTime),
        );
        const tokenizer = new WordTokenizer();
        setTokenized(subtitle ? tokenizer.tokenize(subtitle.text) : []);
      }
    }, 50);
  }
  return (
    <div className="min-h-[150px]">
      <div className={styles.videoContainer}>
        <YouTube
          onReady={(event) => {
            playerRef.current = event.target;
            onPlayerReady();
            splitSubtitles(subtitles);
          }}
          onEnd={(event) => {
            event.target?.stopVideo(0);
          }}
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
      {checkDiction ? (
        <div>
          <button onClick={() => setCheckDiction(false)}>이전으로</button>
          <CheckDiction />
        </div>
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
      {searchWord ? <ViewDict word={searchWord} /> : ''}
    </div>
  );
};
export default ViewScript;
