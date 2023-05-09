'use client';
import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

const AiChatLayout = ({ children }: { children: React.ReactNode }) => {
  const [target, setTarget] = useState(false);
  useEffect(() => {
    setTarget(true);
  }, []);

  if (!target) return <div></div>;
  return (
    <div className="">
      <RecoilRoot>{children}</RecoilRoot>
    </div>
  );
};

export default AiChatLayout;
