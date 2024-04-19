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
import SearchMapResult from "./SearchMapResult";
import { placeCoordinateType } from "@/app/_types/individualAction-detail/individualAction-detail";

const SearchMapModal = ({
  setActivityLocationMap,
  locationCoorRef,
}: {
  setActivityLocationMap: React.Dispatch<React.SetStateAction<string>>;
  locationCoorRef: React.MutableRefObject<placeCoordinateType | null>;
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [value, setValue] = useState(""); // 입력 값 관리
  const [keyword, setKeyword] = useState(""); // 제출한 검색어 관리

  // 입력 폼 변화 감지해 state에 담기
  const handleKeywordValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // 제출한 검색어 state에 담기
  const handleKeywordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(value);
  };

  return (
    <>
      <Button onPress={onOpen}>지도에서 검색</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="5xl"
        className="h-[700px]"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                지도 검색
              </ModalHeader>
              <ModalBody>
                <form id="subForm" method="post" onSubmit={handleKeywordSubmit}>
                  <input
                    type="text"
                    value={value}
                    onChange={handleKeywordValueChange}
                    placeholder="검색어를 입력해주세요. (예: 잠원한강공원) "
                    required
                    form="subForm"
                    className="w-[300px] border-2 rounded-2xl p-2"
                  />
                  <Button type="submit" form="subForm">
                    검색
                  </Button>
                </form>
                <SearchMapResult
                  searchKeyword={keyword}
                  setActivityLocation={setActivityLocationMap}
                  onClose={onClose}
                  locationCoorRef={locationCoorRef}
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

export default SearchMapModal;