"use client";

import { useResponsive } from "@/app/_hooks/responsive";
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

import type { searchMapModalProps } from "@/app/_types/individualAction-detail/individualAction-detail";

const SearchMapModal: React.FC<searchMapModalProps> = ({
  setActivityLocationMap,
  locationMapRef,
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { isDesktop, isLaptop, isMobile } = useResponsive();

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
      {(isDesktop || isLaptop) && (
        <>
          <Button
            onPress={onOpen}
            className="bg-[#5B5B5B] text-white text-[12px] rounded-full w-[90px] h-[28px]"
          >
            지도에서 검색
          </Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            size="5xl"
            className="h-[600px]"
            scrollBehavior="inside"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    지도 검색
                  </ModalHeader>
                  <ModalBody>
                    <form
                      id="subForm"
                      method="post"
                      onSubmit={handleKeywordSubmit}
                      className="fixed z-10 desktop:mt-[15px] desktop:ml-[10px] laptop:mt-[30px] laptop:ml-[40px]"
                    >
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
                      locationMapRef={locationMapRef}
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
      )}
      {isMobile && (
        <>
          <Button
            onPress={onOpen}
            className="bg-[#5B5B5B] text-white text-[12px] rounded-full w-[90px] h-[28px]"
          >
            지도에서 검색
          </Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            size="sm"
            className="h-[600px]"
            scrollBehavior="inside"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    지도 검색
                  </ModalHeader>
                  <ModalBody>
                    <form
                      id="subForm"
                      method="post"
                      onSubmit={handleKeywordSubmit}
                      className="fixed z-10 laptop:mt-[30px] laptop:ml-[40px]"
                    >
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
                      locationMapRef={locationMapRef}
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
      )}
    </>
  );
};

export default SearchMapModal;
