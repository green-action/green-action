import React from "react";
import { Avatar, useDisclosure } from "@nextui-org/react";
import { LiaCrownSolid } from "react-icons/lia";
import PrivateChatRoom from "./PrivateChatRoom";
import Image from "next/image";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";
import { useGetUnreadCount } from "@/app/_hooks/useQueries/chats";
import { formatToLocaleDateTimeString } from "@/utils/date/date";
import { useSession } from "next-auth/react";
import GroupChatRoom from "./GroupChatRoom";

const HeaderGroupItem = () => {
  // 단체 채팅방 모달창
  const {
    isOpen: isGroupChatOpen,
    onOpen: onGroupChatOpen,
    onOpenChange: onGroupChatOpenChange,
  } = useDisclosure();

  return (
    <div
      //   key={room_id}
      className="flex flex-col bg-white p-4 mr-3 mb-3 cursor-pointer rounded-2xl px-7 py-5"
      onClick={() => {
        // onPrivateChatOpen();
      }}
    >
      <div className="flex mb-3 justify-between">
        <div className="flex gap-3">
          <span className="text-gray-500">green-action :</span>
          <span className="text-gray-500">action title</span>
          <span>
            {/* 방장이면 보여주기 */}
            <LiaCrownSolid size={20} />
          </span>
        </div>
        <div className="text-sm text-gray-500">날짜</div>
      </div>
      <div className="flex">
        <div>
          <Avatar
            showFallback
            src=""
            alt="user-profile"
            className="mr-7 w-[50px] h-[50px]"
          />
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="font-bold text-lg">닉네임</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">메시지</span>
              {/* {unreadCount > 0 && (
                <div className="bg-[#B3C8A1] w-7 h-7 rounded-full text-white font-extrabold flex justify-center items-center">
                  {unreadCount}
                </div>
              )} */}
              <div className="bg-[#B3C8A1] w-7 h-7 rounded-full text-white font-extrabold flex justify-center items-center">
                3
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 그룹채팅방 */}
      {isGroupChatOpen && (
        <GroupChatRoom
          isOpen={isGroupChatOpen}
          onOpenChange={onGroupChatOpenChange}
          //  props 확인 필요
          roomId=""
          actionId=""
        />
      )}
    </div>
  );
};

export default HeaderGroupItem;
