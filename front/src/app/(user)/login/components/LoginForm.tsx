'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userLoginInterface } from '@/app/types/share';
import Button from '@/app/components/Button';
import Link from 'next/link';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';

const schema = yup
  .object({
    email: yup
      .string()
      .email('이메일 형식으로 입력해주세요.')
      .required('이메일를 입력해주세요.'),
    password: yup.string().required('비밀번호를 입력해주세요.'),
  })
  .required();

const LoginForm = () => {
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  // react-hook-form, yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLoginInterface>({
    resolver: yupResolver(schema),
  });

  // form submit
  const handleLogin: SubmitHandler<userLoginInterface> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-10">OPENER</h1>
      <form onSubmit={handleSubmit(handleLogin)} className="mt-5 w-[450px]">
        <div className="shadow rounded-md">
          <div className="relative" onBlur={() => setIsEmailActive(false)}>
            <input
              type="text"
              className="validator-input rounded-t-md"
              placeholder="이메일"
              onFocus={() => setIsEmailActive(true)}
              {...register('email')}
            />
            <AiOutlineMail
              className={`${
                isEmailActive ? 'fill-brandText' : 'fill-gray-400'
              } absolute top-[0.7rem] w-7 h-7 left-3 `}
            />
          </div>
          <hr />
          <div className="relative" onBlur={() => setIsPasswordActive(false)}>
            <input
              type="password"
              className="validator-input rounded-b"
              placeholder="비밀번호"
              {...register('password')}
              onFocus={() => setIsPasswordActive(true)}
            />
            <AiOutlineLock
              className={`${
                isPasswordActive ? 'fill-brandText' : 'fill-gray-400'
              } absolute top-[0.7rem] w-7 h-7 left-3 `}
            />
          </div>
        </div>
        <div className="my-3 text-red-500">
          {errors.email ? errors.email.message : errors.password?.message}
        </div>
        <div className="flex justify-end font-bold">
          <Link href="/register">회원가입</Link>
        </div>
        <Button type="submit" text="로그인" className="validator-submit" />
      </form>
    </>
  );
};

export default LoginForm;
