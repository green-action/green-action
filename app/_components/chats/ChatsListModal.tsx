import { MODE_ACTION_PAGE, MODE_HEADER } from "@/app/_api/constant";
import { Modal, ModalContent } from "@nextui-org/react";
import PrivateChatsList from "./PageChatsList";
import HeaderChatsSelect from "./HeaderChatsSelect";

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
  return (
    <>
      <Modal size="full" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="w-[700px] absolute right-0 overflow-y-auto scrollbar-hide">
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
