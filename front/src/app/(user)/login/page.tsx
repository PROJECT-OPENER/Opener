import React from 'react';
import LoginForm from './components/LoginForm';

const page = () => {
  return (
    <div className="flex justify-center items-center flex-col h-[80vh]">
      <h1 className="text-4xl font-bold mb-10">OPENER</h1>
      <LoginForm />
    </div>
  );
};

export default page;
