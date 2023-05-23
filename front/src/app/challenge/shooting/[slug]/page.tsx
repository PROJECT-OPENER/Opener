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
      <ShootingVideo originalId={params.slug}></ShootingVideo>
    </div>
  );
};

export default page;
