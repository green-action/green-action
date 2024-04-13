"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import clap from "/app/_assets/image/logo_icon/icon/community/image 50.png";

interface PointModalProps {
  isOpen?: boolean | null;
  onClose?: () => void;
}

const PointModal: React.FC<PointModalProps> = ({ isOpen: open, onClose }) => {
  const { isOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Modal
        placement="center"
        isOpen={open ?? isOpen}
        onOpenChange={onClose ?? onOpenChange}
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
                  <span className="block">100 Point를 획득하셨습니다!</span>
                </p>
                <p className="text-[#8f8f8f] text-[12px] text-center">
                  내용과 관련 없는 이미지일 경우
                  <br /> 포인트가 환수될 수 있습니다.
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PointModal;
