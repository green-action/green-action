import React from "react";

import { Modal, ModalContent } from "@nextui-org/react";

import HeaderChatsList from "./HeaderChatsList";
import PrivateChatsList from "./PrivateChatsList";

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
        <ModalContent className="w-[600px] absolute right-0  overflow-y-auto scrollbar-hide">
          {(onClose) => (
            <>
              {mode === "header" && <HeaderChatsList onClose={onClose} />}
              {mode === "actionPage" && (
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
