"use client";

import React, { useEffect, useState } from "react";

import type { EditPostProps } from "@/app/_types/community/community";

import { uploadFileAndGetUrl } from "@/app/_api/community/community-api";
import { useUpdateEditPostMutation } from "@/app/_hooks/useMutations/community";
import { useGetSinglePostForEdit } from "@/app/_hooks/useQueries/community";

import PostImgEdit from "./PostImgEdit";

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
} from "@nextui-org/react";
import CustomConfirm from "../customConfirm/CustomConfirm";

const EditPostModal = ({
  isOpen,
  onOpenChange,
  post_id,
  mode,
}: EditPostProps) => {
  const [modalPlacement, setModalPlacement] = React.useState("auto");

  // 드랍다운 선택된 key 상태관리
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["Green-action 선택하기"]),
  );

  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>("");
  const [file, setFile] = useState<File | undefined | null>(null);

  // post_id 데이터 가져오기
  const { singlePostForEdit } = useGetSinglePostForEdit(post_id);

  // 이미지url set하기, action_type set하기
  useEffect(() => {
    if (singlePostForEdit) {
      setUploadedFileUrl(singlePostForEdit.img_url);
    }
    if (singlePostForEdit?.action_type === "개인") {
      setSelectedKeys(new Set(["개인과 함께해요"]));
    }
    setSelectedKeys(new Set(["단체와 함께해요"]));
  }, [singlePostForEdit]);

  // 게시글 수정 mutation - 상세모달창, 게시글 리스트 무효화
  const { updatePostMutation } = useUpdateEditPostMutation(mode);

  // green-action 드랍다운 선택 로직
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  // '수정완료' 클릭시
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    // 드롭다운에서 선택한 값을 formData에 추가
    formData.append("action_type", Array.from(selectedKeys).join(", "));

    try {
      const isConfirmed = window.confirm("수정하시겠습니까?");
      if (isConfirmed) {
        if (!uploadedFileUrl) {
          alert("사진은 필수값입니다.");
          return;
        }

        // 새로운 file 업로드한 경우 url 반환
        const imgUrl = await uploadFileAndGetUrl(file);

        // post_id, imgUrl, formData 전달해서 수정내용 update
        updatePostMutation({ post_id, imgUrl, formData });
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      {/* 게시글 수정하기 모달창 */}
      <Modal
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent className="h-[740px]">
          {(onClose) => (
            <>
              <CustomConfirm
                text="취소 하시겠습니까?"
                mode="community"
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
                    <PostImgEdit
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
                          defaultValue={singlePostForEdit?.title || ""}
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
                          defaultValue={singlePostForEdit?.content || ""}
                          required
                          className="resize-none w-11/12 h-[150px] mt-3 bg-inherit focus:outline-none text-sm text-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                </ModalBody>
                {/* 취소, 작성 버튼 */}
                <ModalFooter className="flex justify-center mb-12 !p-0">
                  {/* <Button
                  variant="light"
                  onPress={onClose}
                  className="rounded-full !w-[110px] h-[27px] border-1"
                >
                  취소하기
                </Button> */}
                  <Button
                    type="submit"
                    onPress={onClose}
                    className="text-gray-500 rounded-full !w-[140px] h-[33px] border border-gray-400 bg-[#EFEFEF]"
                  >
                    수정완료
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditPostModal;
