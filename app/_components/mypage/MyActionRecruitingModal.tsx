"use client";

import { useUpdateActionRecruiting } from "@/app/_hooks/useMutations/mypage";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

const MyActionRecruitingModal = ({ id }: { id: any }) => {
  // 타입 변경하기
  const { updateRecruiting } = useUpdateActionRecruiting(id);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

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
    <>
      {" "}
      <Button size="sm" radius="full" onClick={onOpen} className="h-[1.5rem]">
        모집중
      </Button>
      <Modal
        isOpen={isOpen}
        // onClose={handleModalClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            //   NOTE 모달
            <div className="flex flex-col items-center p-10">
              <ModalHeader>
                <p className="text-lg">모집 마감을 하시겠습니까?</p>
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
    </>
  );
};

export default MyActionRecruitingModal;
