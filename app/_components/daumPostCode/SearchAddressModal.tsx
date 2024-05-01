import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import DaumPostcode from "react-daum-postcode";

const SearchAddressModal = ({
  setActivityLocation,
}: {
  setActivityLocation: any;
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const onCompletePost = (data: any) => {
    // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
    const roadAddr = data.roadAddress as string; // 도로명 주소 변수

    let extraRoadAddr = ""; // 참고 항목 변수 (동,건물이름 등을 확인 가능. 얘도 넣기로?)

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
                <p className="text-[12px] font-[Pretendard-ExtraLight]">
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
                <Button color="danger" variant="light" onPress={onClose}>
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
