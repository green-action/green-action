import React from "react";
import { Modal, ModalContent, Button, useDisclosure } from "@nextui-org/react";
import HeaderChatsList from "./HeaderChatsList";
import PrivateChatsList from "./PrivateChatsList";

const ChatsListModal = ({
  isOpen,
  onOpen,
  onClose,
  mode,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  mode: string;
}) => {
  // // 채팅방 리스트 모달창
  // const {
  //   isOpen: isOpen,
  //   onOpen: onOpen,
  //   onClose: onClose,
  // } = useDisclosure();

  return (
    <>
      {/* <Button onPress={onOpen}>Open</Button> */}
      <Modal size="full" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="w-[600px] absolute right-0  overflow-y-auto scrollbar-hide">
          {(onClose) => (
            <>
              {mode === "header" && <HeaderChatsList onClose={onClose} />}
              {mode === "actionPage" && <PrivateChatsList onClose={onClose} />}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatsListModal;
