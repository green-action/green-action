import { MODE_ACTION_PAGE, MODE_HEADER } from "@/app/_api/constant";
import { Modal, ModalContent } from "@nextui-org/react";
import PrivateChatsList from "./PageChatsList";
import HeaderChatsSelect from "./HeaderChatsSelect";
import { useResponsive } from "@/app/_hooks/responsive";

const ChatsListModal = ({
  isOpen,
  onClose,
  mode,
  action_id,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  mode: string;
  action_id: string;
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
              ? "w-[32%] right-0"
              : isLaptop
              ? "w-[32%] right-0"
              : isMobile && "max-w-[332px] h-[87%] rounded-[55px]"
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
