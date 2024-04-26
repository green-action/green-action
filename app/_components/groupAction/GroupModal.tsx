import { useResponsive } from "@/app/_hooks/responsive";
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
import React from "react";
import search from "/app/_assets/image/logo_icon/icon/goods/Group-128.svg";

import type { groupModalProps } from "@/app/_types/groupAction";

const GroupModal: React.FC<groupModalProps> = ({ action }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  return (
    <>
      {(isDesktop || isLaptop) && (
        <>
          <Button
            className={`w-[10%] bg-transparent bottom-[-15px] ${
              isMobile ? "mr-[24px]" : ""
            }`}
            onPress={onOpen}
          >
            <Image
              className="w-full h-full rounded-[100%] bg-[#eee]"
              src={search}
              alt="search"
            />
          </Button>
          <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className="h-[600px] overflow-y-auto scrollbar-hide">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col items-center gap-1 relative z-[-9999]">
                    <Image
                      width={365}
                      height={550}
                      className="rounded-3xl bg-origin-border mt-4"
                      src={action.img_url}
                      alt="캠페인 포스터"
                    />
                  </ModalHeader>
                  <ModalBody className="flex">
                    <Link
                      href={action.action_url}
                      target="_blank"
                      className="w-[40%] bg-black/30 px-4 py-2 rounded-3xl text-sm text-white text-center ml-auto"
                    >
                      홈페이지 바로가기
                    </Link>
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
                  <ModalFooter className="flex justify-center">
                    <Button
                      className="z-10 mb-4 bg-black text-white"
                      onPress={onClose}
                    >
                      닫기
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
      {isMobile && (
        <>
          <Button
            className={`w-[10%] bg-transparent bottom-[-15px] ${
              isMobile ? "mr-[24px]" : ""
            }`}
            onPress={onOpen}
          >
            <Image
              className="w-full h-full rounded-[100%] bg-[#eee]"
              src={search}
              alt="search"
            />
          </Button>
          <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className="h-[600px] w-[330px] overflow-y-auto scrollbar-hide bg-[#F5F4F4]">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col items-center gap-1 relative z-[-9999]">
                    <Image
                      width={365}
                      height={550}
                      className="rounded-3xl bg-origin-border mt-4"
                      src={action.img_url}
                      alt="캠페인 포스터"
                    />
                  </ModalHeader>
                  <ModalBody className="flex">
                    <Link
                      href={action.action_url}
                      target="_blank"
                      className="w-[120px] bg-[#BABABA]/30 px-4 py-2 rounded-3xl text-[11px] text-[#727272] text-center ml-auto"
                    >
                      홈페이지 바로가기
                    </Link>
                    <h2 className="text-[#848484] bg-white py-2 px-4 mt-2 rounded-full">
                      캠페인 명{" "}
                      <span className="text-[#929292] ml-[30px]">
                        {action.title}
                      </span>
                    </h2>
                    <p className="border border-[#BFBFBF]/0 border-b-[#DFDFDF]  text-[#848484] py-2 px-4 ">
                      주관{" "}
                      <span className="text-[#929292] ml-[61px]">
                        {action.hosted_by}
                      </span>
                    </p>
                    <p className="text-[#848484]  py-2 px-4">
                      상세내용{" "}
                      <span className="text-[#929292] ml-[35px]">
                        {action.content}
                      </span>
                    </p>
                  </ModalBody>
                  <ModalFooter className="flex justify-center">
                    <Button
                      className="z-10 mb-4 bg-black text-white"
                      onPress={onClose}
                    >
                      닫기
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default GroupModal;
