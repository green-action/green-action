import { CommunityDetailProps } from "@/app/_types/community/community";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

// AddPostModal 복사본 - 버튼 대신 각 포스트 클릭했을때 이동하도록 수정 필요
const CommunityDetailModal = ({
  isOpen,
  onOpen,
  onOpenChange,
}: CommunityDetailProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="h-[600px]">
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-2 items-center mt-4 pb-2">
                <div className="bg-black w-[35px] h-[35px] rounded-full mr-2" />
                <p className="font-semibold text-sm">뚜찌빠찌</p>
                <p className="font-normal text-sm">Greener</p>
              </ModalHeader>
              <ModalBody>
                <div className="mx-auto w-[96%] h-[60%] rounded-2xl bg-slate-300"></div>
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <p className="ml-4 mr-2 rounded-full border-1 border-gray-300 text-xs p-0.5 px-4 w-[110px]">
                      개인과 함께해요
                    </p>
                    <p className="text-sm">쓰레기 줍기 실천 인증!!</p>
                  </div>
                </div>
              </ModalBody>
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

export default CommunityDetailModal;
