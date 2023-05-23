import React from 'react';
import AiChatRoom from './components/AiChatRoom';
// import AiChatRoomPc from './components/AiChatRoomPc';

const page = () => {
  return (
    <div>
      {/* 모바일 */}
      <div className="">
        <AiChatRoom />
      </div>
      {/* pc */}
      {/* <div className="max-lg:hidden"> */}
      {/* <AiChatRoomPc /> */}
      {/* </div> */}
    </div>
  );
};

export default page;
