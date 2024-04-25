import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import type { confirmModalProps } from "@/app/_types/comments/comments";

const ConfirmModal: React.FC<confirmModalProps> = ({
  loggedInUserUid,
  handleInsertComment,
}) => {
  const { isOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="py-[50px]">
                <p className="text-center">등록하시겠습니까?</p>
              </ModalBody>
              <ModalFooter className="flex flex-row-reverse justify-center">
                <Button
                  className="inline-block w-[100px] py-[5px]  cursor-pointer border border-[#999] bg-white hover:bg-black hover:text-white"
                  onPress={onClose}
                >
                  아니오
                </Button>
                <Button
                  type="submit"
                  className="inline-block w-[100px] py-[5px]  cursor-pointer border border-[#999] bg-white hover:bg-black hover:text-white"
                  onClick={() => handleInsertComment}
                >
                  네
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModal;
