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

const HeaderGroupItem = ({ room_id }: { room_id: string }) => {
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

  // 날짜 형식 변경
  const formattedDate = lastMessageInfo
    ? formatToLocaleDateTimeString(lastMessageInfo.created_at ?? "")
    : "";

  return (
    <div
      key={room_id}
      className="flex flex-col bg-white mb-3 cursor-pointer rounded-2xl px-7 py-6"
      onClick={() => {
        onGroupChatOpen();
      }}
    >
      <div className="flex justify-between"></div>
      <div className="flex items-center">
        <div>
          <img
            src={actionInfo?.action_url}
            alt="action-image"
            className="mr-10 w-[70px] h-[70px] object-cover rounded-2xl"
          />
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg">{actionInfo?.title}</span>
                {loggedInUserUid === actionInfo?.user_uid && (
                  <LiaCrownSolid size={20} />
                )}
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <Image
                    src={personIcon}
                    alt="person-icon"
                    className="w-[20px] h-[20px] text-gray-600"
                  />
                </div>
                <div className="text-gray-600">
                  {participantsCount} / {actionInfo?.recruit_number}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              {lastMessageInfo?.content ? (
                <span className="max-w-[170px] text-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {lastMessageInfo?.content}
                </span>
              ) : (
                <span className="text-gray-500">(아직 메시지가 없습니다.)</span>
              )}
              <div className="flex items-center gap-3">
                {lastMessageInfo?.content && (
                  <span className="text-gray-400 text-sm ml-1">
                    {formattedDate}
                  </span>
                )}
                {unreadCount > 0 && (
                  <div className="bg-[#B3C8A1] w-7 h-7 rounded-full text-white font-extrabold flex justify-center items-center">
                    {unreadCount}
                  </div>
                )}
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
          roomId={room_id}
          actionId={actionInfo?.action_id}
        />
      )}
    </div>
  );
};

export default HeaderGroupItem;
