import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";

const GroupModal = ({
  action,
}: {
  action: {
    content: string | null;
    hosted_by: string | null;
    id: string;
    img_url: string;
    title: string | null;
    action_url: string;
  };
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        className="bg-transparent absolute w-[100%] h-[100%] top-0 left-0 z-10"
        onPress={onOpen}
      ></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="h-[600px] overflow-y-auto scrollbar-hide">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 relative">
                <img
                  className="rounded-3xl bg-origin-border"
                  src={action.img_url}
                  alt="캠페인 포스터"
                />
                <Link
                  href={action.action_url}
                  target="_blank"
                  className="absolute bottom-6 right-6 bg-white/70 px-4 py-2 rounded-3xl text-sm text-[#929292]"
                >
                  홈페이지 바로가기
                </Link>
              </ModalHeader>
              <ModalBody className="box-border">
                <h2 className="hover:border hover:border-[#BFBFBF] hover:rounded-3xl text-[#848484]  bg-white  py-2 px-4 border border-[#BFBFBF]/0">
                  캠페인 명{" "}
                  <span className="text-[#929292] ml-[30px]">
                    {action.title}
                  </span>
                </h2>
                <p className="hover:border hover:border-[#BFBFBF] hover:rounded-3xl text-[#848484]  bg-white  py-2 px-4 border border-[#BFBFBF]/0">
                  주관{" "}
                  <span className="text-[#929292] ml-[61px]">
                    {action.hosted_by}
                  </span>
                </p>
                <p className="hover:border hover:border-[#BFBFBF] hover:rounded-3xl text-[#848484]  bg-white  py-2 px-4 border border-[#BFBFBF]/0">
                  상세내용{" "}
                  <span className="text-[#929292] ml-[35px]">
                    {action.content}
                  </span>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupModal;
