import { useState } from 'react';

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
