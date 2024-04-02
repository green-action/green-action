import React from "react";
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button className="rounded-full" onPress={onOpen}>
        <LuSearch />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
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
                  onPress={onClose}
                >
                  구매하기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductInfoModal;
