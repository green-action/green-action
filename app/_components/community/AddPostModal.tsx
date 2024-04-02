"use client";

import {
  insertCommunityPostTextForm,
  uploadFileAndGetUrl,
} from "@/app/_api/community/community-api";
import { QUERY_KEY_COMMUNITYLIST } from "@/app/_api/queryKeys";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { LuPencilLine } from "react-icons/lu";

const AddPostModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
  const [file, setFile] = useState<File | undefined | null>(null);
  // 드랍다운 선택된 key 상태관리
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["Green-action 선택하기"]),
  );

  const queryClient = useQueryClient();

  // 임시 user_uid로 일단 테스트하기
  // 현재 로그인한 유저의 uid가져오기로 수정해야 함
  const currentUserUId = "55e7ec4c-473f-4754-af5e-9eae5c587b81";

  // post등록 후 communityList 쿼리키 무효화할 mutation
  // -> 이미지 url insert하는 함수로 쿼리키 무효화하기
  // const { mutate: insertTextFormMutation } = useMutation({
  //   mutationFn: async ({
  //     formData,
  //     currentUserUId,
  //   }: {
  //     formData: FormData;
  //     currentUserUId: string;
  //   }) => {
  //     const post_id = await insertCommunityPostTextForm({
  //       formData,
  //       currentUserUId,
  //     });
  //     return post_id;
  //   },
  //   onSuccess: (post_id) => {
  //     console.log("mutation-post_id", post_id);
  //     queryClient.invalidateQueries({ queryKey: [QUERY_KEY_COMMUNITYLIST] });
  //   },
  // });

  // 이미지 미리보기 띄우기
  const handleShowPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setUploadedFileUrl(imageUrl);
    setFile(file);
  };

  // 미리보기 이미지 삭제
  const handleDeleteImage = () => {
    setUploadedFileUrl("");
    setFile(null);
  };

  // 드랍다운 선택 로직
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  // '작성완료' 클릭시
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    // 드롭다운에서 선택한 값을 formData에 추가
    formData.append("action_type", Array.from(selectedKeys).join(", "));

    // url formData에 append

    // formData 자체를 community_posts에 insert

    try {
      // 확인창 표시
      const isConfirmed = window.confirm("작성하시겠습니까?");
      if (isConfirmed) {
        // 텍스트form insert하고 post_id 반환받기
        const post_id = await insertCommunityPostTextForm({
          formData,
          currentUserUId,
        });

        // 이미지 스토리지 업로드 후 url 반환받기
        const imgUrl = await uploadFileAndGetUrl(file);
        console.log("page-imgUrl", imgUrl);
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
        onPress={onOpen}
      >
        <LuPencilLine className="w-8 h-8" />
      </Button>
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
                  <div className="flex mx-auto mt-4 mb-5 border-1.5 border-dashed border-gray-300 rounded-3xl w-4/5 h-[220px]">
                    {/* 이미지 업로드한 경우 */}
                    {uploadedFileUrl ? (
                      <div className="relative w-full h-full">
                        <img
                          src={uploadedFileUrl}
                          alt={`Uploaded Image`}
                          className="w-full h-full rounded-3xl object-cover"
                        />
                        <button
                          onClick={handleDeleteImage}
                          color="default"
                          className="absolute top-1 right-3 w-4"
                        >
                          x
                        </button>
                      </div>
                    ) : (
                      // 보여줄 이미지 없는 경우
                      <div className="flex flex-col w-full h-full justify-end items-center mt-auto">
                        <label
                          htmlFor={`fileInput`}
                          className="mb-4 text-4xl font-thin text-gray-500 cursor-pointer"
                        >
                          +
                        </label>
                        <input
                          id={`fileInput`}
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          hidden
                          onChange={handleShowPreview}
                        />
                        <p className="mb-px font-medium text-gray-500">
                          Upload Image
                        </p>
                        <p className="text-xs mb-14 text-gray-400">
                          or drag & drop
                        </p>
                      </div>
                    )}
                  </div>
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
