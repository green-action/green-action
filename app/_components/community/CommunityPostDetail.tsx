import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { LuPencilLine } from "react-icons/lu";

// AddPostModal 복사본 - 버튼 대신 각 포스트 클릭했을때 이동하도록 수정 필요
const CommunityPostDetail = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      {/* 글쓰기 버튼 */}
      <Button
        className="fixed bottom-16 right-16 rounded-full w-20 h-20 bg-gray-300 flex items-center justify-center"
        onPress={onOpen}
      >
        <LuPencilLine className="w-8 h-8" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-4 items-center mt-4">
                <div className="bg-black w-[40px] h-[40px] rounded-full" />
                <p className="font-semibold text-md">뚜찌빠찌</p>
                <p className="font-normal text-sm">Greener</p>
              </ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommunityPostDetail;
