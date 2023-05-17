'use client';
import React, { Fragment } from 'react';
import useUser from '../hooks/userHook';
import { Menu, Transition } from '@headlessui/react';
import ProfileImage from './ProfileImage';
import Link from 'next/link';

const NavDropdown = () => {
  const { user } = useUser();
  return (
    <Menu as="div" className="relative inline-block text-center">
      <div>
        <Menu.Button className="">
          <ProfileImage
            className="h-10 w-10 lg:h-12 lg:w-12 hover:cursor-pointer shadow-custom rounded-full"
            profileUrl={user?.data.profile || null}
            height={500}
            width={500}
          />
          {/* <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" /> */}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-32 z-10 bg-white shadow-custom p-3 rounded-xl space-y-3 font-bold">
          <Menu.Item>
            {({ active }) => (
              <Link
                href={'/mypage'}
                className={`${active ? 'bg-slate-100' : ''} block rounded p-2`}
              >
                마이페이지
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className={`${
                  active ? 'bg-slate-100' : ''
                } block rounded p-2 w-full`}
              >
                로그아웃
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NavDropdown;
