import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { LuSearch } from "react-icons/lu";
import { supabase } from "@/utils/supabase/client";

const ProductInfoModal = ({
  item,
}: {
  item: {
    id: string;
    img_url: string;
    point: number;
    product_info: string | null;
    product_name: string;
  };
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleConfirmPurchase = () => {
    // 포인트 차감 로직
    alert("구매 성공!");
    setConfirmModalOpen(false);
    onClose(); // 첫번째 모달도 같이 닫기
  };

  const handleModalClose = () => {
    setConfirmModalOpen(false);
    onClose();
  };

  return (
    <>
      <Button className="rounded-full" onPress={onOpen}>
        <LuSearch />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center">
            제품 상세 정보
          </ModalHeader>
          <ModalBody className="text-center">
            <p>{item.product_info}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              className="rounded-3xl"
              color="primary"
              onClick={() => setConfirmModalOpen(true)}
            >
              구매하기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* 구매 확인 모달 */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center">
            구매 확인
          </ModalHeader>
          <ModalBody className="text-center">
            <p>{item.point}P를 차감하고 구매하시겠습니까?</p>
          </ModalBody>
          <ModalFooter>
            <Button
              className="rounded-3xl"
              color="primary"
              onClick={handleConfirmPurchase}
            >
              구매
            </Button>
            <Button
              className="rounded-3xl"
              color="warning"
              onClick={handleModalClose}
            >
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductInfoModal;
