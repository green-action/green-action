import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import search from "/app/_assets/image/logo_icon/icon/goods/Group 128.png";

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
        className=" rounded-[100%] bg-transparent laptop:bottom-[-20px] laptop:right-[20px]"
        onPress={onOpen}
      >
        <Image className="w-full h-full" src={search} alt="search" />
      </Button>
      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="h-[600px] overflow-y-auto scrollbar-hide">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 relative z-[-9999]">
                <img
                  className="rounded-3xl bg-origin-border mt-4"
                  src={action.img_url}
                  alt="캠페인 포스터"
                />
                <Link
                  href={action.action_url}
                  target="_blank"
                  className="absolute bottom-[15px] right-[30px] bg-black/30 px-4 py-2 rounded-3xl text-sm text-white"
                >
                  홈페이지 바로가기
                </Link>
              </ModalHeader>
              <ModalBody className="box-border">
                <h2 className="border border-[#BFBFBF]/0 border-b-[#BFBFBF] rounded-3xl hover:rounded-3xl hover:border hover:border-[#BFBFBF]  text-[#848484]  bg-white  py-2 px-4 ">
                  캠페인 명{" "}
                  <span className="text-[#929292] ml-[30px]">
                    {action.title}
                  </span>
                </h2>
                <p className="border border-[#BFBFBF]/0 border-b-[#BFBFBF] rounded-3xl hover:rounded-3xl hover:border hover:border-[#BFBFBF]  text-[#848484]  bg-white  py-2 px-4 ">
                  주관{" "}
                  <span className="text-[#929292] ml-[61px]">
                    {action.hosted_by}
                  </span>
                </p>
                <p className="border border-[#BFBFBF]/0 border-b-[#BFBFBF] rounded-3xl hover:border hover:border-[#BFBFBF] hover:rounded-3xl text-[#848484]  bg-white  py-2 px-4">
                  상세내용{" "}
                  <span className="text-[#929292] ml-[35px]">
                    {action.content}
                  </span>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="z-10 mb-4"
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
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
