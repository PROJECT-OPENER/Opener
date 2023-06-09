'use client';
import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

const UserChatLayout = ({ children }: { children: React.ReactNode }) => {
  const [target, setTarget] = useState(false);
  useEffect(() => {
    setTarget(true);
  }, []);

  if (!target) return <div></div>;
  return (
    <div className="font-nexon">
      <RecoilRoot>{children}</RecoilRoot>
    </div>
  );
};

export default UserChatLayout;
