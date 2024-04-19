import React from "react";
import { Avatar, useDisclosure } from "@nextui-org/react";
import PrivateChatRoom from "./PrivateChatRoom";

// TODO any 타입 해결 필요
const HeaderPrivateItem = ({ eachRoomInfo }: any) => {
  // 1:1 채팅방 모달창
  const {
    isOpen: isPrivateChatOpen,
    onOpen: onPrivateChatOpen,
    onOpenChange: onPrivateChatOpenChange,
  } = useDisclosure();

  return (
    <div
      key={eachRoomInfo?.chat_rooms_info.room_id}
      className="flex flex-col bg-gray-200 p-4 mr-3 mb-3 cursor-pointer"
      onClick={() => {
        onPrivateChatOpen();
      }}
    >
      <div className="flex mb-3">
        <span>green-action :</span>
        <span>{eachRoomInfo.action_info.action_title}</span>
      </div>
      <div className="flex">
        <div>
          <Avatar
            showFallback
            src={eachRoomInfo.message.user.profile_img}
            alt="defaultImg"
            className="mr-5"
          />
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>닉네임 : {eachRoomInfo.message.user.display_name}</span>
              <span>
                {eachRoomInfo.chat_rooms_info.participant_type === "방장" &&
                  "운영중"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{eachRoomInfo.message.content}</span>
              <span>{eachRoomInfo.message.created_at}</span>
            </div>
          </div>
        </div>
      </div>
      {isPrivateChatOpen && (
        <PrivateChatRoom
          isOpen={isPrivateChatOpen}
          onOpenChange={onPrivateChatOpenChange}
          roomId={eachRoomInfo?.chat_rooms_info.room_id}
        />
      )}
    </div>
  );
};

export default HeaderPrivateItem;
