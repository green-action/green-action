import React from "react";
import { MODE_TODAY } from "@/app/_api/constant";
import { useResponsive } from "@/app/_hooks/responsive";
import {
  useGetActionInfo,
  useGetGroupParticipantsCount,
  useGetLastMessageInfo,
  useGetUnreadCount,
} from "@/app/_hooks/useQueries/chats";
import { previousFormatDate, todayFormatTime } from "@/utils/date/date";
import { useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import GroupChatRoom from "./GroupChatRoom";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";
import personIcon from "/app/_assets/image/logo_icon/icon/mypage/person.png";

import type { headerGroupItemProps } from "@/app/_types/realtime-chats";

const HeaderGroupItem: React.FC<headerGroupItemProps> = ({ room_id, mode }) => {
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  const {
    isOpen: isGroupChatOpen,
    onOpen: onGroupChatOpen,
    onOpenChange: onGroupChatOpenChange,
  } = useDisclosure();

  const { actionInfo, isActionInfoLoading, isActionInfoError } =
    useGetActionInfo(room_id);

  const { unreadCount, isLoading, isError } = useGetUnreadCount({
    loggedInUserUid,
    room_id,
  });

  const { participantsCount, isParticipantsCountLoading, isParticipantsError } =
    useGetGroupParticipantsCount(room_id);

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
        <Image className="" src={SoomLoaing} alt="SoomLoading" unoptimized />
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

  return (
    <div
      key={room_id}
      className={`flex flex-col bg-white cursor-pointer rounded-2xl ${
        isDesktop
          ? "mb-6 px-9 py-8"
          : isLaptop
          ? "mb-4 px-6 py-5"
          : isMobile && "mb-3 px-4 py-[10px]"
      }`}
      onClick={() => {
        onGroupChatOpen();
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <Image
            width={65}
            height={65}
            src={actionInfo?.action_url}
            alt="defaultImg"
            className={`rounded-full ${
              isDesktop
                ? "w-[65px] h-[65px] mr-10"
                : isLaptop
                ? "w-[50px] h-[50px] mr-7"
                : isMobile && "w-[30px] h-[30px] mr-5"
            }`}
          />
        </div>
        <div
          className={`flex flex-col w-full ${
            isDesktop ? "gap-2" : isLaptop ? "gap-1" : isMobile && "gap-1"
          }`}
        >
          <div className="flex justify-between">
            <div
              className={`flex items-center ${
                isDesktop ? "gap-2" : isLaptop ? "gap-2" : isMobile && "gap-1"
              }`}
            >
              {loggedInUserUid === actionInfo?.user_uid && (
                <p
                  className={`bg-[#7B7B7B] rounded-xl text-white ${
                    isDesktop
                      ? "px-3"
                      : isLaptop
                      ? "text-xs px-2 py-[1px]"
                      : isMobile && "text-[10px] px-1"
                  }`}
                >
                  My
                </p>
              )}

              <span
                className={`font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis ${
                  isDesktop
                    ? "text-xl max-w-[200px]"
                    : isLaptop
                    ? "text-sm max-w-[130px]"
                    : isMobile && "text-xs"
                }`}
              >
                {actionInfo?.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={personIcon}
                alt="person-icon"
                className={`text-gray-600 ${
                  isDesktop
                    ? "w-[20px] h-[20px]"
                    : isLaptop
                    ? "w-[17px] h-[17px]"
                    : isMobile && "w-[14px] h-[14px]"
                }`}
              />
              <span
                className={`text-[#7B7B7B] ${
                  isLaptop ? "text-sm" : isMobile && "text-xs"
                }`}
              >
                {participantsCount} / {actionInfo?.recruit_number}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="max-w-[170px] text-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis">
              {lastMessageInfo?.content ? (
                <span
                  className={`text-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis ${
                    isDesktop
                      ? "max-w-[200px]"
                      : isLaptop
                      ? "max-w-[170px] text-sm"
                      : isMobile && "max-w-[120px] text-xs"
                  }`}
                >
                  {lastMessageInfo?.content}
                </span>
              ) : (
                <span
                  className={`text-gray-500 ${
                    isLaptop ? "text-sm" : isMobile && "text-xs"
                  }`}
                >
                  (아직 메시지가 없습니다.)
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-gray-500 ${
                  isLaptop ? "text-sm" : isMobile && "text-xs"
                }`}
              >
                {mode === MODE_TODAY
                  ? todayFormatTime(lastMessageInfo.created_at)
                  : previousFormatDate(lastMessageInfo.created_at)}
              </span>
              {unreadCount > 0 && (
                <div
                  className={`bg-[#B3C8A1] ml-1 rounded-full text-white font-extrabold flex justify-center items-center ${
                    isDesktop
                      ? "w-7 h-7"
                      : isLaptop
                      ? "w-6 h-6 text-sm"
                      : isMobile && "w-4 h-4 text-xs"
                  }`}
                >
                  {unreadCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
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
