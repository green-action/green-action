import React from "react";
import { Avatar, useDisclosure } from "@nextui-org/react";
import { useResponsive } from "@/app/_hooks/responsive";
import PrivateChat from "./PrivateChat";

interface PrivateChatProps {
  privateChat: {
    created_at: string;
    content: string;
    room_id: string;
    user: {
      display_name: string | null | undefined;
      profile_img: string | null | undefined;
    };
  };
}

const PrivateChatsListItem = ({ privateChat }: PrivateChatProps) => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  // 1:1 채팅방 모달창
  const {
    isOpen: isPrivateChatOpen,
    onOpen: onPrivateChatOpen,
    onOpenChange: onPrivateChatOpenChange,
  } = useDisclosure();

  const handleOpenChatRoom = () => {
    onPrivateChatOpen();
  };

  return (
    <div key={privateChat?.room_id}>
      {privateChat && (
        <div
          onClick={handleOpenChatRoom}
          className={`${
            isDesktop &&
            "flex bg-gray-300 w-[90%] h-[90%] justify-center items-center mx-auto mb-5 cursor-pointer"
          }`}
        >
          <div>
            {/* TODO 1:1 채팅방 프로필 - 항상 참가자 정보 보이게 하고싶은데 바뀜 */}
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
        <PrivateChat
          isOpen={isPrivateChatOpen}
          onOpenChange={onPrivateChatOpenChange}
          roomId={privateChat.room_id}
        />
      )}
    </div>
  );
};

export default PrivateChatsListItem;
