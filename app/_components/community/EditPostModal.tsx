"use client";

import { uploadFileAndGetUrl } from "@/app/_api/community/community-api";
import { MODE_COMMUNITY } from "@/app/_api/constant";
import { useUpdateEditPostMutation } from "@/app/_hooks/useMutations/community";
import { useGetSinglePostForEdit } from "@/app/_hooks/useQueries/community";
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
import React, { useEffect, useState } from "react";
import CustomConfirm from "../customConfirm/CustomConfirm";
import AlertModal from "./AlertModal";
import PostImgEdit from "./PostImgEdit";

import type { EditPostProps } from "@/app/_types/community/community";

const EditPostModal: React.FC<EditPostProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  post_id,
  mode,
}) => {
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["Green-action 선택하기"]),
  );
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>("");
  const [file, setFile] = useState<File | undefined | null>(null);

  const { singlePostForEdit } = useGetSinglePostForEdit(post_id);

  useEffect(() => {
    if (singlePostForEdit) {
      setUploadedFileUrl(singlePostForEdit.img_url);
    }
    if (singlePostForEdit?.action_type === "개인") {
      setSelectedKeys(new Set(["개인과 함께해요"]));
    }
    setSelectedKeys(new Set(["단체와 함께해요"]));
  }, [singlePostForEdit]);

  const { updatePostMutation } = useUpdateEditPostMutation(mode);

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("action_type", Array.from(selectedKeys).join(", "));

    try {
      if (!uploadedFileUrl) {
        setMessage("사진은 필수값입니다.");
        setIsOpenAlertModal(true);
        return;
      }

      const imgUrl = await uploadFileAndGetUrl(file);

      updatePostMutation({ post_id, imgUrl, formData });

      onClose();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
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
                    <PostImgEdit
                      uploadedFileUrl={uploadedFileUrl}
                      setUploadedFileUrl={setUploadedFileUrl}
                      setFile={setFile}
                    />
                    <div className="flex flex-col gap-3">
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
                <ModalFooter className="flex justify-center mb-12 !p-0">
                  <CustomConfirm
                    text="수정하시겠습니까?"
                    buttonName="수정완료"
                    okFunction={() => handleSubmit}
                  />
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
      {isOpenAlertModal && (
        <AlertModal
          isOpen={isOpenAlertModal}
          onClose={() => setIsOpenAlertModal(false)}
          message={message}
        />
      )}
    </>
  );
};

export default EditPostModal;
