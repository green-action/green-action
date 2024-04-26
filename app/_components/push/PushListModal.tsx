import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import CommentAlarm from "./CommentAlarm";

const PushListModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  return (
    <>
      <Modal size="full" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="w-[600px] absolute right-0  overflow-y-auto scrollbar-hide">
          <CommentAlarm onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default PushListModal;
