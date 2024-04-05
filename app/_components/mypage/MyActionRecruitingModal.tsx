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

const MyActionRecruitingModal = ({
  id,
  isOpen,
  onClose,
  onOpenChange,
}: any) => {
  // 타입 변경하기
  const { updateRecruiting } = useUpdateActionRecruiting(id);

  // 모집상태 - 모집중>마감 으로 변경하기
  // FIXME mutation으로 쿼리키 무효화시키는데 바로 렌더링되지 않음
  const handleUpdateRecruiting = async () => {
    // return (
    //   <CustomConfirm
    //     text=".."
    //     buttonName=".."
    //     okFunction={handleRecruitingChange}
    //   />
    // );
    await updateRecruiting();
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
