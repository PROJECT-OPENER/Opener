import React from 'react';
import ShootingVideo from './components/ShootingVideo';
type Props = {
  params: {
    slug: number;
  };
};
const page = ({ params }: Props) => {
  return (
    <div className="">
      <p>{params.slug}</p>
      <ShootingVideo></ShootingVideo>
    </div>
  );
};

export default page;
