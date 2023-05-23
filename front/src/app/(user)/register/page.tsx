import React from 'react';
import RegisterForm from './components/RegisterForm';

const page = () => {
  return (
    <div className="flex justify-center items-center flex-col h-[80vh]">
      <h1 className="text-4xl font-bold mb-10 mt-10">회원가입</h1>
      <RegisterForm />
    </div>
  );
};

export default page;
