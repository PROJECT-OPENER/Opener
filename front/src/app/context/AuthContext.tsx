'use client';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

const AuthContext = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default AuthContext;
