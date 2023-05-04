import LoginForm from '@/app/auth/login/components/LoginForm';
import React from 'react';

const page = () => {
  return (
    <div className="flex justify-center items-center flex-col h-[80vh]">
      <LoginForm />
    </div>
  );
};

export default page;
