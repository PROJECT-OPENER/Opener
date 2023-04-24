'use client';
import React from 'react';
import { interest } from '@/app/util/Interest';

const ChoiceBox = () => {
  return (
    <div className="flex justify-around items-center">
      {interest.map((v, i) => {
        return (
          <div key={i} className="flex flex-col justify-center items-center">
            <span>{v}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ChoiceBox;
