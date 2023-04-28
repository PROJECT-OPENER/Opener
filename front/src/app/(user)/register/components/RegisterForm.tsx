'use client';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userRegisterInterface } from '@/app/types/share';
import {
  AiOutlineCalendar,
  AiOutlineCheck,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineUser,
} from 'react-icons/ai';
import { MdOutlineMailLock } from 'react-icons/md';
import { handleDate, secToTime } from '@/app/util/Math';
import Button from '@/app/components/Button';

const schema = yup
  .object({
    nickname: yup.string().required('닉네임을 입력해주세요.'),
    email: yup
      .string()
      .email('이메일 형식으로 입력해주세요.')
      .required('이메일을 입력해주세요.'),
    password: yup
      .string()
      .required('비밀번호를 입력해주세요.')
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/,
        '비밀번호는 최소 8자 이상, 1개 이상의 숫자, 특수문자, 소문자를 포함해야 합니다.',
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호 확인을 입력해주세요.'),
    birth: yup
      .date()
      .transform((originalValue) => {
        if (originalValue === '') {
          return null;
        }
        const date = new Date(originalValue);
        return isNaN(date.getTime()) ? null : date;
      })
      .nullable()
      .required('생일을 입력해주세요.'),
    gender: yup
      .mixed()
      .oneOf(Object.values(['MALE', 'FEMALE']))
      .required('성별을 선택해주세요.'),
  })
  .required();

const genderOptions = [
  { value: 'MALE', label: '남' },
  { value: 'FEMALE', label: '여' },
];

const RegisterForm = () => {
  // 이메일 state
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isEmailAuthActive, setIsEmailAuthActive] = useState(false);
  const [checkEmailDuplicate, setCheckEmailDuplicate] = useState(false);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isAuthEmail, setIsAuthEmail] = useState(false);
  const [count, setCount] = useState(9999);
  // 비밀번호 state
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const [isPasswordConfirmActive, setIsPasswordConfirmActive] = useState(false);
  // 닉네임 state
  const [isNicknameActive, setIsNicknameActive] = useState(false);
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);
  // 생일 state
  const [isBirthActive, setIsBirthActive] = useState(false);
  // 성별 state
  const [gender, setGender] = useState('');

  // 이메일 인증 시간
  useEffect(() => {
    if (isSendEmail) {
      setCount(5);
      const id = setInterval(() => {
        setCount((count) => {
          if (count === 0) {
            clearInterval(id);
            return count;
          }
          return count - 1;
        });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [isSendEmail]);

  // react-hook-form, yup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<userRegisterInterface>({
    resolver: yupResolver(schema),
  });
  // form submit
  const handleRegister: SubmitHandler<userRegisterInterface> = async (data) => {
    if (!isAuthEmail) return alert('이메일 인증을 해주세요.');
    if (!isNicknameDuplicate) return alert('닉네임 중복확인을 해주세요.');
    const birth = handleDate(data.birth);
    // const birth = yyyyMmDd(date);
    console.log(birth);
  };
  // emailDuplicateCheck
  const watchEmail = watch('email');
  useEffect(() => {
    setCheckEmailDuplicate(false);
    setIsSendEmail(false);
    setIsAuthEmail(false);
  }, [watchEmail]);
  const handleEmailDuplicateCheck = () => {
    schema
      .validateAt('email', { email: watchEmail })
      .then((res) => {
        console.log(res);
        if (!checkEmailDuplicate) {
          setCheckEmailDuplicate(!checkEmailDuplicate);
        }
        if (checkEmailDuplicate) {
          setIsSendEmail(!isSendEmail);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  // emailAuth
  const handleEmailAuth = () => {
    setIsAuthEmail(!isAuthEmail);
    if (count === 0) {
      alert('인증 시간이 초과되었습니다.');
      setCheckEmailDuplicate(false);
      setIsSendEmail(false);
      setIsAuthEmail(false);
    }
  };
  // nicknameDuplicateCheck
  const watchNickname = watch('nickname');
  useEffect(() => {
    setIsNicknameDuplicate(false);
  }, [watchNickname]);
  const handleNicknameDuplicateCheck = () => {
    schema
      .validateAt('nickname', { nickname: watchNickname })
      .then((res) => {
        console.log(res);
        if (!isNicknameDuplicate) {
          setIsNicknameDuplicate(!isNicknameDuplicate);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="mt-5 w-[450px]">
      {/* 이메일 */}
      <div className="shadow rounded-md">
        <div className="relative" onBlur={() => setIsEmailActive(false)}>
          <input
            type="text"
            className="validator-input rounded-t-md"
            placeholder="이메일"
            maxLength={30}
            onFocus={() => setIsEmailActive(true)}
            {...register('email')}
          />
          <AiOutlineMail
            className={`${
              isEmailActive ? 'fill-brandText' : 'fill-gray-400'
            } absolute top-[0.7rem] w-7 h-7 left-3 `}
          />
          <button
            type="button"
            className={`${
              checkEmailDuplicate ? 'bg-brandY' : 'bg-brandP'
            } absolute top-[0.5rem] p-2 bg-brandP text-white right-1 rounded-md text-sm`}
            onClick={handleEmailDuplicateCheck}
            disabled={isSendEmail}
          >
            {isSendEmail
              ? secToTime(count)
              : checkEmailDuplicate
              ? '인증 메일 보내기'
              : '중복 확인'}
          </button>
        </div>
        <hr />
        <div className="relative" onBlur={() => setIsEmailAuthActive(false)}>
          <input
            type="text"
            className="validator-input rounded-b"
            placeholder="인증코드"
            disabled={!isSendEmail}
            onFocus={() => setIsEmailAuthActive(true)}
          />
          {isSendEmail && (
            <button
              type="button"
              className={`${
                isAuthEmail ? 'bg-gray-400 hover:cursor-default' : 'bg-brandP'
              } absolute top-[0.5rem] w-24 p-2 bg-brandP text-white right-1 rounded-md text-sm`}
              onClick={handleEmailAuth}
              disabled={isAuthEmail}
            >
              {isAuthEmail ? '인증완료' : '인증하기'}
            </button>
          )}
          <MdOutlineMailLock
            className={`${
              isEmailAuthActive ? 'fill-brandText' : 'fill-gray-400'
            } absolute top-[0.7rem] w-7 h-7 left-3 `}
          />
        </div>
      </div>
      <div className="my-3 text-red-500">{errors.email?.message}</div>
      {/* 패스워드 */}
      <div className="shadow rounded-md mt-10">
        <div className="relative" onBlur={() => setIsPasswordActive(false)}>
          <input
            type="password"
            className="validator-input rounded-t"
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
        <hr />
        <div
          className="relative"
          onBlur={() => setIsPasswordConfirmActive(false)}
        >
          <input
            type="password"
            className="validator-input rounded-b"
            placeholder="비밀번호 확인"
            {...register('confirmPassword')}
            onFocus={() => setIsPasswordConfirmActive(true)}
          />
          <AiOutlineCheck
            className={`${
              isPasswordConfirmActive ? 'fill-brandText' : 'fill-gray-400'
            } absolute top-[0.7rem] w-7 h-7 left-3 `}
          />
        </div>
      </div>
      <div className="my-3 text-red-500">
        {errors.password
          ? errors.password.message
          : errors.confirmPassword?.message}
      </div>
      {/* 닉네임 생년월일 성별 */}
      <div className="shadow rounded-md mt-10">
        <div className="relative" onBlur={() => setIsNicknameActive(false)}>
          <input
            type="text"
            className="validator-input rounded-t"
            placeholder="닉네임"
            {...register('nickname')}
            onFocus={() => setIsNicknameActive(true)}
          />
          <button
            type="button"
            className={`${
              isNicknameDuplicate ? 'bg-gray-400' : 'bg-brandP'
            } absolute top-[0.5rem] p-2 text-white right-1 rounded-md text-sm`}
            onClick={handleNicknameDuplicateCheck}
          >
            {isNicknameDuplicate ? '사용 가능' : '중복 확인'}
          </button>
          <AiOutlineUser
            className={`${
              isNicknameActive ? 'fill-brandText' : 'fill-gray-400'
            } absolute top-[0.7rem] w-7 h-7 left-3 `}
          />
        </div>
        <hr />
        <div className="relative" onBlur={() => setIsBirthActive(false)}>
          <input
            type="date"
            className="validator-input"
            max="9999-12-31"
            {...register('birth')}
            onFocus={() => setIsBirthActive(true)}
          />
          <AiOutlineCalendar
            className={`${
              isBirthActive ? 'fill-brandText' : 'fill-gray-400'
            } absolute top-[0.7rem] w-7 h-7 left-3 `}
          />
        </div>
        <hr />
        <div className="w-full rounded-b bg-white">
          <div className="grid grid-cols-2 rounded-b">
            {genderOptions.map((option) => (
              <div
                key={option.value}
                className={`${
                  gender === option.value ? 'bg-brandP text-white' : 'bg-white'
                } flex justify-center items-center border-r-2 cursor-pointer rounded-b`}
              >
                <input
                  type="radio"
                  id={option.value}
                  value={option.value}
                  {...register('gender')}
                  className="sr-only"
                />
                <label
                  htmlFor={option.value}
                  className={`${
                    gender === option.value ? 'bg-brandP text-white' : ''
                  } w-full h-full p-3 text-center ${
                    option.value === 'MALE' ? 'rounded-bl' : 'rounded-br'
                  }`}
                  onClick={() => {
                    setGender(option.value);
                  }}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-3 text-red-500">
        {errors.nickname
          ? errors.nickname.message
          : errors.birth
          ? errors.birth.message
          : errors.gender?.message}
      </div>
      <Button type="submit" text="회원가입" className="validator-submit" />
    </form>
  );
};

export default RegisterForm;
