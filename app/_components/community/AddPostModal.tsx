"use client";

import { uploadFileAndGetUrl } from "@/app/_api/community/community-api";
import { MODE_COMMUNITY } from "@/app/_api/constant";
import { updateUserPoint } from "@/app/_api/individualAction-add/add-api";
import { useResponsive } from "@/app/_hooks/responsive";
import { useInsertCommunityPostFormData } from "@/app/_hooks/useMutations/community";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Selection,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import postImg from "../../_assets/image/individualAction/write.png";
import CustomConfirm from "../customConfirm/CustomConfirm";
import AlertModal from "./AlertModal";
import PointModal from "./PointModal";
import PostImgUpload from "./PostImgUpload";

const AddPostModal = () => {
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
  const [file, setFile] = useState<File | undefined | null>(null);
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  // PointModal을 위한 상태관리
  const [showPointModal, setShowPointModal] = useState(false);

  // alert 대체 모달창을 위한 상태관리
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  // 게시글 글쓰기 모달창 open여부 상태관리
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // 현재 로그인한 유저 uid
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  // 드랍다운 선택된 key 상태관리
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["Green-action 선택하기"]),
  );

  // 게시글 등록 mutation - communityList 쿼리키 무효화
  const { insertFormDataMutation } = useInsertCommunityPostFormData();

  // 글쓰기 버튼 클릭핸들러
  const handleAddPostClick = () => {
    if (loggedInUserUid) {
      onOpen();
      return;
    }
    // alert("로그인이 필요합니다.");
    setMessage("로그인이 필요한 서비스입니다.");
    setIsOpenAlertModal(true);
    // router.push(`/login`);
    return;
  };

  // green-action 드랍다운 선택 로직
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  // '작성완료' 클릭시
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    // 드롭다운에서 선택한 값을 formData에 추가
    formData.append("action_type", Array.from(selectedKeys).join(", "));

    try {
      // 확인창 표시
      if (!file) {
        alert("사진은 필수값입니다.");
        return;
      } else if (
        !formData.get("activityTitle") ||
        !formData.get("activityDescription") ||
        !formData.get("action_type")
      ) {
        alert("입력하신 내용이 없습니다.");
        return;
      }
      // 이미지 스토리지 업로드 후 url 반환받기
      const imgUrl = await uploadFileAndGetUrl(file);

      // url이 존재하면 formData에 append
      if (imgUrl) {
        formData.append("image_url", imgUrl);
      }

      // 500포인트 업데이트
      await updateUserPoint(loggedInUserUid, { mode: "addPost" });

      setShowPointModal(true);

      // formData(텍스트, 이미지url) insert
      insertFormDataMutation({
        formData,
        loggedInUserUid,
      });

      // 입력값 초기화
      setFile(null);
      setUploadedFileUrl("");
      setSelectedKeys(new Set(["Green-action 선택하기"]));
      const target = event.target as HTMLFormElement;
      target.reset();
      onClose();
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  return (
    <>
      {/* 글쓰기 버튼 */}
      {(isDesktop || isLaptop) && (
        <Image
          src={postImg}
          alt="게시글 작성 이미지"
          className="desktop:size-[85px] laptop:size-[80px] fixed z-50 bottom-[120px] right-[22px] cursor-pointer hover:scale-105 ease-in-out duration-300"
          onClick={handleAddPostClick}
        />
      )}
      {isMobile && (
        <Image
          src={postImg}
          alt="게시글 작성 이미지"
          className="size-[50px] fixed z-50 bottom-[70px] right-[20px] cursor-pointer hover:scale-105 ease-in-out duration-300"
          onClick={handleAddPostClick}
        />
      )}
      {/* </Button> */}
      {/* 게시글 글쓰기 모달창 */}
      <Modal
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent className="h-[740px] relative">
          {(onClose) => (
            <>
              <CustomConfirm
                text="취소 하시겠습니까?"
                mode={MODE_COMMUNITY}
                okFunction={onClose}
              />
              <form onSubmit={handleSubmit}>
                <ModalHeader className="flex items-center py-3 px-6 font-extrabold text-[15px]">
                  New Post
                </ModalHeader>
                <hr className="border-t-1 border-gray-300" />
                <ModalBody>
                  <div className="flex flex-col justify-between h-full">
                    {/* 이미지 업로드 */}
                    <PostImgUpload
                      uploadedFileUrl={uploadedFileUrl}
                      setUploadedFileUrl={setUploadedFileUrl}
                      setFile={setFile}
                    />
                    <div className="flex flex-col gap-3">
                      {/* action_type선택 드랍다운 */}
                      <div className="flex justify-end mr-3">
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              variant="bordered"
                              className="capitalize border-1 rounded-full h-8 text-gray-500"
                            >
                              {selectedValue}
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Single selection example"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeys}
                            onSelectionChange={setSelectedKeys}
                          >
                            <DropdownItem
                              key="개인과 함께해요"
                              className="text-gray-500"
                            >
                              개인과 함께해요
                            </DropdownItem>
                            <DropdownItem
                              key="단체와 함께해요"
                              className="text-gray-500"
                            >
                              단체와 함께해요
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                      {/* 활동 제목 */}
                      <div className="flex mx-auto w-[95%] h-[42px] items-center pl-8 border-1 border-gray-300 rounded-3xl">
                        <label
                          htmlFor="activityTitle"
                          className="text-sm text-gray-500 font-semibold w-[61px]"
                        >
                          활동 제목
                        </label>
                        <input
                          type="text"
                          id="activityTitle"
                          name="activityTitle"
                          required
                          className="w-10/12 h-[30px] mx-4 pr-4 bg-inherit focus:outline-none text-sm text-gray-400"
                        />
                      </div>
                      {/* 활동 내용 */}
                      <div className="flex items-start flex-col w-[95%] h-auto pl-8 border-1 border-gray-300 rounded-3xl mb-3.5 mx-auto">
                        <label
                          htmlFor="activityDescription"
                          className="text-sm text-gray-500 font-semibold w-[61px] mt-4"
                        >
                          활동 내용
                        </label>
                        <textarea
                          id="activityDescription"
                          name="activityDescription"
                          required
                          className="resize-none w-11/12 h-[150px] mt-3 bg-inherit focus:outline-none text-sm text-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                </ModalBody>
                {/* 작성완료 버튼 */}
                <ModalFooter className="flex justify-center mb-12 !p-0">
                  <CustomConfirm
                    text="작성하시겠습니까?"
                    buttonName="작성완료"
                    okFunction={() => handleSubmit}
                  />
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
      {showPointModal && (
        <PointModal
          isOpen={showPointModal}
          onCloseFn={() => setShowPointModal(false)}
          point={300}
        />
      )}
      {isOpenAlertModal && (
        <AlertModal
          isOpen={isOpenAlertModal}
          onClose={() => {
            setIsOpenAlertModal(false);
            router.push(`/login`);
          }}
          message={message}
        />
      )}
    </>
  );
};

export default AddPostModal;
