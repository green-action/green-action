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
import Image from "next/image";
import React, { useState } from "react";
import SearchMapResult from "./SearchMapResult";
import search from "/app/_assets/image/logo_icon/icon/goods/Group 128.png";

import type { searchMapModalProps } from "@/app/_types/individualAction-detail/individualAction-detail";

const SearchMapModal: React.FC<searchMapModalProps> = ({
  setActivityLocationMap,
  locationMapRef,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
            className="desktop:h-[700px] laptop:h-[600px] p-3" // w는 조절안됨
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
                      className="fixed z-10 mt-[0.5%] desktop:ml-[2%] laptop:ml-[0.5%]"
                    >
                      <input
                        type="text"
                        value={value}
                        onChange={handleKeywordValueChange}
                        placeholder="검색어를 입력해주세요. (예: 잠원한강공원) "
                        required
                        form="subForm"
                        className="desktop:w-[400px] laptop:w-[400px] rounded-2xl p-2 shadow-md border-[#e2eee0] border-[3px] focus:outline-none"
                      />
                      <button
                        type="submit"
                        form="subForm"
                        className="w-[40px] absolute right-[0px] top-[7px] outline-none"
                      >
                        <Image
                          src={search}
                          alt="검색 버튼"
                          className="size-[33px] cursor-pointer"
                        />
                      </button>
                    </form>
                    <SearchMapResult
                      searchKeyword={keyword}
                      setActivityLocation={setActivityLocationMap}
                      onClose={onClose}
                      locationMapRef={locationMapRef}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      onPress={onClose}
                      size="md"
                      className="bg-[#5B5B5B] text-white rounded-full hover:bg-black absolute bottom-[5%] right-[5%]"
                    >
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
            size="xs"
            className="min-h-[200px]"
            scrollBehavior="inside"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-[12px]">
                    지도 검색
                  </ModalHeader>
                  <ModalBody className="text-[12px]">
                    <form
                      id="subForm"
                      method="post"
                      onSubmit={handleKeywordSubmit}
                      className="fixed z-10 top-[26%]"
                    >
                      <input
                        type="text"
                        value={value}
                        onChange={handleKeywordValueChange}
                        placeholder="검색어를 입력해주세요. (예: 잠원한강공원) "
                        required
                        form="subForm"
                        className="w-[260px] h-[26px] rounded-2xl p-2 text-[11px] shadow-md border-[#e2eee0] border-[2px] focus:outline-none"
                      />
                      <button
                        type="submit"
                        form="subForm"
                        className="w-[25px] absolute top-[9%] right-[0%] outline-none"
                      >
                        <Image
                          src={search}
                          alt="검색 버튼"
                          className="size-[20px] cursor-pointer"
                        />
                      </button>
                    </form>
                    <SearchMapResult
                      searchKeyword={keyword}
                      setActivityLocation={setActivityLocationMap}
                      onClose={onClose}
                      locationMapRef={locationMapRef}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <button
                      onClick={onClose}
                      className="bg-[#5B5B5B] text-white rounded-full hover:bg-black absolute bottom-[3%] right-[2%] text-[10px] p-2 h-[20px] flex items-center shadow-sm"
                    >
                      Close
                    </button>
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
