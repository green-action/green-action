"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { uploadFileAndGetUrl } from "@/app/_api/community/community-api";

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

import { LuPencilLine } from "react-icons/lu";
import { useInsertCommunityPostFormData } from "@/app/_hooks/useMutations/community";
import PostImgUpload from "./PostImgUpload";

const AddPostModal = () => {
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
  const [file, setFile] = useState<File | undefined | null>(null);

  const router = useRouter();

  // 게시글 글쓰기 모달창 open여부 상태관리
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    alert("로그인이 필요합니다.");
    router.push(`/login`);
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
      const isConfirmed = window.confirm("작성하시겠습니까?");
      if (isConfirmed) {
        if (!file) {
          alert("사진은 필수값입니다.");
          return;
        }

        // 이미지 스토리지 업로드 후 url 반환받기
        const imgUrl = await uploadFileAndGetUrl(file);

        // url이 존재하면 formData에 append
        if (imgUrl) {
          formData.append("image_url", imgUrl);
        }

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
      }
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  return (
    <>
      {/* 글쓰기 버튼 */}
      <Button
        className="fixed z-50 bottom-16 right-16 rounded-full w-20 h-20 bg-gray-300 flex items-center justify-center"
        onClick={handleAddPostClick}
      >
        <LuPencilLine className="w-8 h-8" />
      </Button>
      {/* 게시글 글쓰기 모달창 */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="h-[600px]">
          {(onClose) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex items-center py-3 px-6 font-medium text-xs">
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
                    <div className="flex justify-end">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            variant="bordered"
                            className="capitalize border-1 rounded-full h-7"
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
                          <DropdownItem key="개인과 함께해요">
                            개인과 함께해요
                          </DropdownItem>
                          <DropdownItem key="단체와 함께해요">
                            단체와 함께해요
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                    {/* 활동 제목 */}
                    <div className="flex mx-auto w-full h-[34px] items-center pl-8 border-1 border-gray-300 rounded-3xl">
                      <label
                        htmlFor="activityTitle"
                        className="text-xs font-semibold w-[61px]"
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
                    <div className="flex items-start w-full h-auto pl-8 border-1 border-gray-300 rounded-3xl mb-8">
                      <label
                        htmlFor="activityDescription"
                        className="text-xs font-semibold w-[61px] mt-3"
                      >
                        활동 내용
                      </label>
                      <textarea
                        id="activityDescription"
                        name="activityDescription"
                        required
                        className="resize-none w-10/12 h-[100px] mx-4 mt-2 pr-4 bg-inherit focus:outline-none text-sm text-gray-400"
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              {/* 취소, 작성 버튼 */}
              <ModalFooter className="flex justify-center mb-8 !p-0">
                <Button
                  variant="light"
                  onPress={onClose}
                  className="rounded-full !w-[110px] h-[27px] border-1"
                >
                  취소하기
                </Button>
                <Button
                  type="submit"
                  onPress={onClose}
                  className="rounded-full !w-[110px] h-[27px]"
                >
                  작성완료
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPostModal;
