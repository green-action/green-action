import React from "react";
import { Avatar, useDisclosure } from "@nextui-org/react";
import { useResponsive } from "@/app/_hooks/responsive";
import PrivateChatRoom from "./PrivateChatRoom";
import { PrivateChatProps } from "@/app/_types/realtime-chats";

const PagePrivateItem = ({ privateChat }: PrivateChatProps) => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  // 1:1 채팅방 모달창
  const {
    isOpen: isPrivateChatOpen,
    onOpen: onPrivateChatOpen,
    onOpenChange: onPrivateChatOpenChange,
  } = useDisclosure();

  return (
    <div key={privateChat?.room_id}>
      {privateChat && (
        <div
          onClick={() => {
            onPrivateChatOpen();
          }}
          className={`${
            isDesktop &&
            "flex bg-gray-300 w-[90%] h-[90%] justify-center items-center mx-auto mb-5 cursor-pointer"
          }`}
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
            <div className="flex justify-between mr-7 mb-2">
              <p>{privateChat?.user?.display_name}</p>
              <p>{privateChat?.created_at}</p>
            </div>
            <div>
              <p>{privateChat?.content}</p>
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
