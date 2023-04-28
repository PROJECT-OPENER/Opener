import React from 'react';
import Image from 'next/image';
type ProfileImageProps = {
  className: string;
  profileUrl: string;
  onClick?: () => void;
  height: number;
  width: number;
};

const ProfileImage = ({
  className,
  profileUrl,
  onClick,
  height,
  width,
}: ProfileImageProps) => {
  return (
    <div className={className}>
      <Image
        src={
          profileUrl
            ? profileUrl
            : 'https://s3.amazonaws.com/my-bucket/profile.png'
        }
        alt="Picture of the author"
        className="rounded-full w-full h-full"
        width={width}
        height={height}
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
        onClick={onClick}
      />
    </div>
  );
};

export default ProfileImage;
