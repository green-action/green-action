import { MODE_TODAY } from "@/app/_api/constant";
import { useResponsive } from "@/app/_hooks/responsive";
import { useGetUnreadCount } from "@/app/_hooks/useQueries/chats";
import { previousFormatDate, todayFormatTime } from "@/utils/date/date";
import { Avatar, useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import PrivateChatRoom from "./PrivateChatRoom";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";

import type { PrivateChatProps } from "@/app/_types/realtime-chats";

const PagePrivateItem: React.FC<PrivateChatProps> = ({
  privateChat,
  actionId,
  mode,
}) => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  // 현재 로그인한 유저 uid
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  // 1:1 채팅방 모달창
  const {
    isOpen: isPrivateChatOpen,
    onOpen: onPrivateChatOpen,
    onOpenChange: onPrivateChatOpenChange,
  } = useDisclosure();

  const { unreadCount, isLoading, isError } = useGetUnreadCount({
    loggedInUserUid,
    room_id: privateChat?.room_id ?? "",
  });

  if (isLoading) {
    return (
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoaing} alt="SoomLoading" unoptimized />
      </div>
    );
  }

  if (isError || unreadCount === undefined) {
    return <div>Error</div>;
  }

  return (
    <div>
      {privateChat && (
        <div
          onClick={() => {
            onPrivateChatOpen();
          }}
          className={`flex bg-white w-full h-[97%] justify-center items-center cursor-pointer rounded-2xl ${
            isDesktop
              ? "mb-5 px-9 py-6"
              : isLaptop
              ? "mb-3 px-7 py-5"
              : isMobile && "mb-3 px-4 py-2"
          }`}
        >
          <div>
            <Avatar
              showFallback
              src={privateChat?.user?.profile_img || ""}
              alt="user_profile"
              className={`${
                isDesktop
                  ? "w-[65px] h-[65px] mr-7"
                  : isLaptop
                  ? "w-[50px] h-[50px] mr-4"
                  : isMobile && "w-[30px] h-[30px] mr-3"
              }`}
            />
          </div>
          <div className="w-[90%]">
            <div className="flex justify-between mb-2">
              <p
                className={`font-black ${
                  isDesktop
                    ? "text-xl"
                    : isLaptop
                    ? "text-sm"
                    : isMobile && "text-xs"
                }`}
              >
                {privateChat?.user?.display_name}
              </p>
              <p
                className={`text-gray-500 ${
                  isLaptop ? "text-sm" : isMobile && "text-xs"
                }`}
              >
                {mode === MODE_TODAY
                  ? todayFormatTime(privateChat.created_at || "")
                  : previousFormatDate(privateChat.created_at || "")}
              </p>
            </div>
            <div className="flex justify-between">
              <p
                className={`text-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis ${
                  isDesktop
                    ? "max-w-[170px]"
                    : isLaptop
                    ? "max-w-[130px] text-sm"
                    : isMobile && "max-w-[120px] text-xs"
                }`}
              >
                {privateChat?.content}
              </p>
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
      )}
      {isPrivateChatOpen && (
        <PrivateChatRoom
          isOpen={isPrivateChatOpen}
          onOpenChange={onPrivateChatOpenChange}
          roomId={privateChat?.room_id ?? ""}
          actionId={actionId}
        />
      )}
    </div>
  );
};

export default PagePrivateItem;
