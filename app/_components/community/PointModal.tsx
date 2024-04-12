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
import clap from "/app/_assets/image/logo_icon/icon/community/image 50.png";

const PointModal = () => {
  const { isOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex flex-col gap-5 justify-center items-center">
                <Image src={clap} alt="clap" />
                <p>
                  축하합니다!
                  <span className="block">100 Point를 획득하셨습니다!</span>
                </p>
                <p>
                  내용과 관련 없는 이미지일 경우
                  <br /> 포인트가 환수될 수 있습니다.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
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

export default PointModal;
