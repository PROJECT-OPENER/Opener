import Loading from '@/app/components/Loading';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div>
      <Loading />
      <Link href={'./userChat/Result'}>Result</Link>
    </div>
  );
};

export default page;
