"use client";

import { uploadFileAndGetUrl } from "@/app/_api/community/community-api";
import {
  getSinglePostForEdit,
  updateEditedPost,
} from "@/app/_api/community/communityEdit-api";
import {
  QUERY_KEY_COMMUNITYLIST,
  QUERY_KEY_COMMUNITY_POST,
  QUERY_KEY_COMMUNITY_POST_FOR_EDIT,
} from "@/app/_api/queryKeys";
import { CommunityEditMutation } from "@/app/_types/community/community";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

interface EditPostProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  post_id: string;
}

const EditPostModal = ({
  isOpen,
  onOpen,
  onOpenChange,
  post_id,
}: EditPostProps) => {
  // 드랍다운 선택된 key 상태관리
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["Green-action 선택하기"]),
  );

  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>("");
  const [file, setFile] = useState<File | undefined | null>(null);

  const queryClient = useQueryClient();

  // post_id 데이터 가져오기 useQuery
  // (데이터 가져옴과 동시에 이미지url 바로 set하기, action_type set하기)
  const {
    data: singlePostForEdit,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY_COMMUNITY_POST_FOR_EDIT],
    queryFn: async () => {
      try {
        const data = await getSinglePostForEdit(post_id);
        setUploadedFileUrl(data.img_url);
        if (data.action_type === "개인") {
          setSelectedKeys(new Set(["개인과 함께해요"]));
        }
        setSelectedKeys(new Set(["단체와 함께해요"]));
        return data;
      } catch (error) {}
    },
  });

  // 게시글 수정 mutation - 상세모달창 정보 무효화
  const { mutate: updatePostMutation } = useMutation({
    mutationFn: ({ post_id, imgUrl, formData }: CommunityEditMutation) =>
      updateEditedPost({
        post_id,
        imgUrl,
        formData,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_COMMUNITYLIST],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_COMMUNITY_POST],
      });
    },
  });

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
                          className="absolute top-2 right-3 w-5 h-5 p-0 bg-gray-300 rounded-full"
                        >
                          <span className="absolute text-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            x
                          </span>
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
                        defaultValue={singlePostForEdit?.title || ""}
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
                        defaultValue={singlePostForEdit?.content || ""}
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
                  수정완료
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditPostModal;
