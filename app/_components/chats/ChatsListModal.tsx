import { MODE_ACTION_PAGE, MODE_HEADER } from "@/app/_api/constant";
import { useResponsive } from "@/app/_hooks/responsive";
import { Modal, ModalContent } from "@nextui-org/react";
import React from "react";
import HeaderChatsSelect from "./HeaderChatsSelect";
import PrivateChatsList from "./PageChatsList";

import type { chatsListModalProps } from "@/app/_types/realtime-chats";

const ChatsListModal: React.FC<chatsListModalProps> = ({
  isOpen,
  onClose,
  mode,
  action_id,
}) => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  return (
    <>
      <Modal
        size={`${isDesktop || isLaptop ? "full" : "md"}`}
        isOpen={isOpen}
        onClose={onClose}
        placement={`${isMobile ? "center" : "auto"}`}
      >
        <ModalContent
          className={`
          ${
            isDesktop
              ? "w-[32%] min-w-[620px] right-0"
              : isLaptop
              ? "w-[32%] min-w-[430px] right-0"
              : isMobile && "max-w-[332px] h-[87%] rounded-[30px]"
          }
          
          overflow-y-auto scrollbar-hide absolute`}
        >
          {(onClose) => (
            <>
              {mode === MODE_HEADER && <HeaderChatsSelect onClose={onClose} />}
              {mode === MODE_ACTION_PAGE && (
                <PrivateChatsList onClose={onClose} action_id={action_id} />
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatsListModal;
