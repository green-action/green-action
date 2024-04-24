import React from "react";
import { Avatar, useDisclosure } from "@nextui-org/react";
import { LiaCrownSolid } from "react-icons/lia";
import PrivateChatRoom from "./PrivateChatRoom";
import Image from "next/image";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";
import {
  useGetActionInfo,
  useGetGroupParticipantsCount,
  useGetLastMessageInfo,
  useGetUnreadCount,
} from "@/app/_hooks/useQueries/chats";
import { formatToLocaleDateTimeString } from "@/utils/date/date";
import { useSession } from "next-auth/react";
import GroupChatRoom from "./GroupChatRoom";
import personIcon from "/app/_assets/image/logo_icon/icon/mypage/person.png";
import { MODE_TODAY } from "@/app/_api/constant";

const HeaderGroupItem = ({
  room_id,
  mode,
}: {
  room_id: string;
  mode: string;
}) => {
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  // 단체 채팅방 모달창
  const {
    isOpen: isGroupChatOpen,
    onOpen: onGroupChatOpen,
    onOpenChange: onGroupChatOpenChange,
  } = useDisclosure();

  // 채팅방의 action정보
  const { actionInfo, isActionInfoLoading, isActionInfoError } =
    useGetActionInfo(room_id);

  // 안읽은 메시지 수
  const { unreadCount, isLoading, isError } = useGetUnreadCount({
    loggedInUserUid,
    room_id,
  });

  // 그룹방 참여인원
  const { participantsCount, isParticipantsCountLoading, isParticipantsError } =
    useGetGroupParticipantsCount(room_id);

  // 그룹방 마지막 메시지 정보
  const { lastMessageInfo, isLastMessageInfoLoading, isLastMessageInfoError } =
    useGetLastMessageInfo(room_id);

  if (
    isActionInfoLoading ||
    isLoading ||
    isParticipantsCountLoading ||
    isLastMessageInfoLoading
  ) {
    return (
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoaing} alt="SoomLoading" />
      </div>
    );
  }

  if (
    isActionInfoError ||
    isError ||
    isParticipantsError ||
    isLastMessageInfoError ||
    unreadCount === undefined ||
    actionInfo === undefined
  ) {
    return <div>Error</div>;
  }

  if (!lastMessageInfo) return [];

  // 날짜 형식 변경
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

  return (
    <div
      key={room_id}
      className="flex flex-col bg-white mr-3 mb-6 cursor-pointer rounded-2xl px-9 py-8"
      onClick={() => {
        onGroupChatOpen();
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <img
            src={actionInfo?.action_url}
            alt="defaultImg"
            className="mr-10 w-[65px] h-[65px] rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <p className="bg-[#7B7B7B] px-3 rounded-xl text-white">
                {loggedInUserUid === actionInfo?.user_uid && "My"}
              </p>
              <span className="font-black text-xl max-w-[200px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                {actionInfo?.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={personIcon}
                alt="person-icon"
                className="w-[20px] h-[20px] text-gray-600"
              />
              <span className="text-[#7B7B7B]">
                {participantsCount} / {actionInfo?.recruit_number}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="max-w-[170px] text-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis">
              {lastMessageInfo?.content ? (
                <span className="max-w-[200px] text-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {lastMessageInfo?.content}
                </span>
              ) : (
                <span className="text-gray-500">(아직 메시지가 없습니다.)</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">
                {mode === MODE_TODAY
                  ? todayFormatTime(lastMessageInfo.created_at)
                  : previousFormatDate(lastMessageInfo.created_at)}
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
      {/* 그룹채팅방 */}
      {isGroupChatOpen && (
        <GroupChatRoom
          isOpen={isGroupChatOpen}
          onOpenChange={onGroupChatOpenChange}
          roomId={room_id}
          actionId={actionInfo?.action_id}
        />
      )}
    </div>
  );
};

export default HeaderGroupItem;
