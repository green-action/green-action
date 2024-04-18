import React from "react";
import { useResponsive } from "@/app/_hooks/responsive";

import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
} from "@nextui-org/react";

const PrivateChatsList = ({
  onClose,
  action_id,
}: {
  onClose: () => void;
  action_id: string;
}) => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        1:1채팅방 리스트 in 액션페이지
      </ModalHeader>
      <ModalBody>
        <div
          className={`${
            isDesktop &&
            "flex bg-gray-300 w-[90%] h-[10%] justify-center items-center mx-auto"
          }`}
        >
          <div>
            <Avatar showFallback src="" alt="" className="mx-3" />
          </div>
          <div className="w-[90%]">
            <div className="flex justify-between mr-7 mb-2">
              <p>닉네임</p>
              <p>시간</p>
            </div>
            <div>
              <p>마지막 메시지</p>
            </div>
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
  );
};

export default PrivateChatsList;
