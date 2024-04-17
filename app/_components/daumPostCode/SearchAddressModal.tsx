import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";

const SearchAddressModal = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [address, setAddress] = useState({
    roadAddress: "",
    jibunAddress: "",
    extraAddress: "",
  });

  const onCompletePost = (data: any) => {
    console.log("🐰 ~ SearchAddressModal ~ data : ", data);

    // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
    const roadAddr = data.roadAddress; // 도로명 주소 변수
    const jibunAddr = data.autoJibunAddress || data.jibunAddress;
    let extraRoadAddr = ""; // 참고 항목 변수 (동,건물이름 등을 확인 가능. 얘도 넣기로?)

    // (bname 은 동이름)
    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
    // 빼기? extra address - 거의 동, 길 이라서 지번주소에 포함되어있음
    // if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
    //   extraRoadAddr += data.bname;
    // }
    // // 건물명이 있고, 공동주택일 경우 추가한다.
    // if (data.buildingName !== "" && data.apartment === "Y") {
    //   extraRoadAddr +=
    //     extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
    // }
    // // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
    // if (extraRoadAddr !== "") {
    //   extraRoadAddr = " (" + extraRoadAddr + ")";
    // }

    // 지번 주소 선택안함 시
    if (data.noSelected === "Y") {
      setAddress({
        roadAddress: roadAddr,
        jibunAddress: "",
        extraAddress: "",
      });
    } else {
      setAddress({
        roadAddress: roadAddr,
        jibunAddress: jibunAddr,
        extraAddress: "",
      }); // 많으니까 괄호로 묶어서 하나로 합칠지?
    }

    console.log("🐰 ~ onCompletePost ~ roadAddr : ", roadAddr);
    // console.log("🐰 ~ onCompletePost ~ extraRoadAddr : ", extraRoadAddr);

    onClose();
  };

  return (
    <>
      {/* <form> 폼태그는 등록완료까지 전체
          필수값으로 할지?*/}
      <input
        type="text"
        id="road-address"
        name="road-address"
        value={address.roadAddress}
        placeholder="도로명 주소"
        className="w-[300px]"
      />
      <input
        type="text"
        id="jibun-address"
        name="jibun-address"
        value={address.jibunAddress}
        placeholder="지번 주소"
        className="w-[300px]"
      />
      <input
        type="text"
        id="extra-address"
        name="extra-address"
        value={address.extraAddress}
        placeholder="상세 주소"
        className="w-[300px]"
      />
      {/* </form> */}
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
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
                <Button color="primary" onPress={onClose}>
                  Action
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
