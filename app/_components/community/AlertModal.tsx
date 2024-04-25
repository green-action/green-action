import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import logoImg from "../../_assets/image/logo_icon/logo/gray.png";

import type { AlertModalProps } from "@/app/_types/community/community";

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  return (
    <>
      <Modal placement="center" isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex flex-col gap-14 justify-between items-center py-[40px]">
                <Image src={logoImg} alt="alert" className="w-[15%] h-[7%]" />
                <p className="font-bold text-center text-[16px]">{message}</p>
                <Button
                  type="submit"
                  className="text-gray-500 rounded-full !w-[140px] h-[33px] border border-gray-400 bg-[#EFEFEF]"
                  onClick={() => {
                    onClose();
                  }}
                >
                  확인
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AlertModal;
