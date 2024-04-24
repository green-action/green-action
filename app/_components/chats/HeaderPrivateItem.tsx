import React from "react";
import { Avatar, useDisclosure } from "@nextui-org/react";
import { LiaCrownSolid } from "react-icons/lia";
import PrivateChatRoom from "./PrivateChatRoom";
import Image from "next/image";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";
import { useGetUnreadCount } from "@/app/_hooks/useQueries/chats";
import { formatToLocaleDateTimeString } from "@/utils/date/date";
import { useSession } from "next-auth/react";

// TODO any 타입 해결 필요
const HeaderPrivateItem = ({ eachRoomInfo }: any) => {
  // 현재 로그인한 유저 uid
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  // 1:1 채팅방 모달창
  const {
    isOpen: isPrivateChatOpen,
    onOpen: onPrivateChatOpen,
    onOpenChange: onPrivateChatOpenChange,
  } = useDisclosure();

  // console.log("eachRoomInfo", eachRoomInfo);

  const room_id = eachRoomInfo?.chat_rooms_info.room_id;
  const action_id = eachRoomInfo?.action_info.action_id;

  // 날짜 형식 변경
  const formattedDate = eachRoomInfo
    ? formatToLocaleDateTimeString(eachRoomInfo.message.created_at)
    : "";

  // 안읽은 메시지 수 가져오기
  const { unreadCount, isLoading, isError } = useGetUnreadCount({
    loggedInUserUid,
    room_id,
  });

  if (isLoading) {
    return (
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoaing} alt="SoomLoading" />
      </div>
    );
  }

  if (isError || unreadCount === undefined) {
    return <div>Error</div>;
  }

  return (
    <div
      key={room_id}
      className="flex flex-col bg-white p-4 mr-3 mb-5 cursor-pointer rounded-2xl px-7 py-5"
      onClick={() => {
        onPrivateChatOpen();
      }}
    >
      <div className="flex mb-3 justify-between">
        <div className="flex gap-3">
          <span className="text-gray-500">green-action :</span>
          <span className="text-gray-500">
            {eachRoomInfo.action_info.action_title}
          </span>
          <span>
            {eachRoomInfo.chat_rooms_info.participant_type === "방장" && (
              <LiaCrownSolid size={20} />
            )}
          </span>
        </div>
        <div className="text-sm text-gray-500">{formattedDate}</div>
      </div>
      <div className="flex">
        <div>
          <Avatar
            showFallback
            src={eachRoomInfo.message.user.profile_img}
            alt="defaultImg"
            className="mr-7 w-[50px] h-[50px]"
          />
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="font-bold text-lg">
                {eachRoomInfo.message.user.display_name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="max-w-[170px] text-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {eachRoomInfo.message.content}
              </span>
              {unreadCount > 0 && (
                <div className="bg-[#B3C8A1] w-7 h-7 rounded-full text-white font-extrabold flex justify-center items-center">
                  {unreadCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isPrivateChatOpen && (
        <PrivateChatRoom
          isOpen={isPrivateChatOpen}
          onOpenChange={onPrivateChatOpenChange}
          roomId={room_id}
          actionId={action_id}
        />
      )}
    </div>
  );
};

export default HeaderPrivateItem;
