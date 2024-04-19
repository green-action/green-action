import React from "react";
import { Avatar, useDisclosure } from "@nextui-org/react";
import { useResponsive } from "@/app/_hooks/responsive";
import PrivateChatRoom from "./PrivateChatRoom";
import { PrivateChatProps } from "@/app/_types/realtime-chats";
import { formatToLocaleDateTimeString } from "@/utils/date/date";
import { useGetUnreadCount } from "@/app/_hooks/useQueries/chats";
import Image from "next/image";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";

const PagePrivateItem = ({ privateChat }: PrivateChatProps) => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  // 날짜 형식 변경
  const formattedDate = privateChat
    ? formatToLocaleDateTimeString(privateChat.created_at ?? "")
    : "";

  // 1:1 채팅방 모달창
  const {
    isOpen: isPrivateChatOpen,
    onOpen: onPrivateChatOpen,
    onOpenChange: onPrivateChatOpenChange,
  } = useDisclosure();

  const { unreadCount, isLoading, isError } = useGetUnreadCount(
    privateChat?.room_id ?? "",
  );

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
    <div>
      {privateChat && (
        <div
          onClick={() => {
            onPrivateChatOpen();
          }}
          className="flex bg-gray-300 w-[90%] h-[90%] justify-center items-center mx-auto mb-5 p-4 cursor-pointer"
        >
          <div>
            <Avatar
              showFallback
              src={privateChat?.user?.profile_img || ""}
              alt=""
              className="mx-3"
            />
          </div>
          <div className="w-[90%]">
            <div className="flex justify-between mb-2">
              <p>{privateChat?.user?.display_name}</p>
              <p>{formattedDate}</p>
            </div>
            <div className="flex justify-between">
              <p>{privateChat?.content}</p>
              {unreadCount > 0 && (
                <div className="bg-[#B3C8A1] w-7 h-7 rounded-full text-white font-extrabold flex justify-center items-center">
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
        />
      )}
    </div>
  );
};

export default PagePrivateItem;
