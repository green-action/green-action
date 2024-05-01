import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import DaumPostcode from "react-daum-postcode";

import type { SearchAddressProps } from "@/app/_types/individualAction-add/individualAction-add";

const SearchAddressModal: React.FC<SearchAddressProps> = ({
  setActivityLocation,
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const onCompletePost = (data: any) => {
    const roadAddr = data.roadAddress as string; // 도로명 주소 변수
    setActivityLocation(roadAddr);
    onClose();
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-[#5B5B5B] text-white rounded-full w-[105px] h-[28px] text-[12px]"
      >
        도로명 주소 검색
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p>도로명 주소 검색</p>
                <p className="text-[12px]">
                  검색 후 도로명을 누르면 해당 도로명 주소가 활동장소 칸에
                  입력됩니다.
                </p>
              </ModalHeader>
              <ModalBody>
                <DaumPostcode
                  className="w-[400px] h-[400px]"
                  onComplete={onCompletePost}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={onClose}
                  className="bg-[#5B5B5B] text-white rounded-full hover:bg-black"
                >
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

export default SearchAddressModal;
