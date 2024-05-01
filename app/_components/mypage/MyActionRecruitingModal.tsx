"use client";

import { useUpdateActionRecruiting } from "@/app/_hooks/useMutations/mypage";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

import type { MyActionRecruitingChange } from "@/app/_types/mypage/mypage";

const MyActionRecruitingModal: React.FC<MyActionRecruitingChange> = ({
  id,
  isOpen,
  onClose,
  onOpenChange,
}) => {
  const { updateRecruiting } = useUpdateActionRecruiting(id);

  // 모집상태 - 모집중>마감 으로 변경하기
  const handleUpdateRecruiting = async () => {
    await updateRecruiting();
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <div className="flex flex-col items-center p-10">
            <ModalHeader>
              <p className="text-lg">모집 마감으로 변경하시겠습니까?</p>
            </ModalHeader>
            <ModalFooter>
              <Button color="primary" onPress={handleUpdateRecruiting}>
                네
              </Button>
              <Button color="danger" onPress={onClose}>
                아니오
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MyActionRecruitingModal;
