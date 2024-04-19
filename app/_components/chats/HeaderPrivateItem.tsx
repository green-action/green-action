import React from "react";
import { Avatar } from "@nextui-org/react";

// TODO any 타입 해결 필요
const HeaderPrivateItem = ({ eachRoomInfo }: any) => {
  return (
    <div
      key={eachRoomInfo?.chat_rooms_info.room_id}
      className="flex flex-col bg-gray-200 p-4 mr-3 mb-3"
    >
      <div className="flex mb-3">
        <span>green-action :</span>
        <span>액션 이름</span>
      </div>
      <div className="flex">
        <div>
          <Avatar showFallback src="" alt="defaultImg" className="mr-5" />
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>상대방 닉네임</span>
              <span>운영중</span>
            </div>
            <div className="flex justify-between">
              <span>마지막 메시지</span>
              <span>시간</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPrivateItem;
