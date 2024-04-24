import React from "react";
import { Avatar, useDisclosure } from "@nextui-org/react";
import { useGetUnreadCount } from "@/app/_hooks/useQueries/chats";
import { formatToLocaleDateTimeString } from "@/utils/date/date";
import { useSession } from "next-auth/react";
import { MODE_TODAY } from "@/app/_api/constant";
import Image from "next/image";
import PrivateChatRoom from "./PrivateChatRoom";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";

// TODO any 타입 해결 필요
const HeaderPrivateItem = ({
  eachRoomInfo,
  mode,
}: {
  eachRoomInfo: any;
  mode: string;
}) => {
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

  const todayFormatTime = (timeString: string) => {
    const date = new Date(timeString);
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "pm" : "am";

    return `${hours}:${minutes} ${ampm}`;
  };

  const previousFormatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
    const day = date.getDate();

    return `${month}월 ${day}일`;
  };

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
      className="flex flex-col bg-white mr-3 mb-5 cursor-pointer rounded-2xl px-9 py-7"
      onClick={() => {
        onPrivateChatOpen();
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <Avatar
            showFallback
            src={eachRoomInfo.message.user.profile_img}
            alt="defaultImg"
            className="mr-7 w-[60px] h-[60px]"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between">
            <div>
              <span className="font-black text-xl">
                {eachRoomInfo.message.user.display_name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="bg-[#7B7B7B] px-3 rounded-xl text-white">
                {eachRoomInfo.chat_rooms_info.participant_type === "방장" &&
                  "My"}
              </p>
              <span className="text-[#7B7B7B] text-lg font-black max-w-[170px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                {eachRoomInfo.action_info.action_title}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="max-w-[170px] text-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis">
              {eachRoomInfo.message.content}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">
                {mode === MODE_TODAY
                  ? todayFormatTime(eachRoomInfo.message.created_at)
                  : previousFormatDate(eachRoomInfo.message.created_at)}
              </span>
              {unreadCount > 0 && (
                <div className="bg-[#B3C8A1] w-7 h-7 ml-1 rounded-full text-white font-extrabold flex justify-center items-center">
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
