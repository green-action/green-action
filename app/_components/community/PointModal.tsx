"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import clap from "/app/_assets/image/logo_icon/icon/community/image 50.png";

import type { PointModalProps } from "@/app/_types/point/point";

const PointModal: React.FC<PointModalProps> = ({
  isOpen: open,
  onCloseFn,
  point,
  mod,
  handleClick,
}) => {
  const { isOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal
        placement="center"
        isOpen={open ?? isOpen}
        onOpenChange={onClose ?? onOpenChange}
        onClose={mod === "add" ? handleClick : onCloseFn} // onClose로 처리함으로써 close 버튼 외 모달바깥을 눌러 모달이 꺼져도 handleClick을 작동시킴
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex flex-col gap-5 justify-center items-center py-[70px]">
                <Image
                  className="block w-[100px] h-[80px]"
                  src={clap}
                  alt="clap"
                />
                <p className="font-bold text-center text-[16px]">
                  축하합니다!
                  <span className="block">{point} Point를 획득하셨습니다!</span>
                </p>
                <p className="text-[#8f8f8f] text-[12px] text-center">
                  내용과 관련 없는 이미지일 경우
                  <br /> 포인트가 환수될 수 있습니다.
                </p>
              </ModalBody>
              {mod === "add" && (
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={handleClick}>
                    Close
                  </Button>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default React.memo(PointModal);
