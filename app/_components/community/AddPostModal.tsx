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
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { LuPencilLine } from "react-icons/lu";

const AddPostModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
  const [file, setFile] = useState<File | undefined | null>(null);

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

  // 드랍다운
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["선택해주세요"]),
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  return (
    <>
      {/* 글쓰기 버튼 */}
      <Button
        className="fixed bottom-16 right-16 rounded-full w-20 h-20 bg-gray-300 flex items-center justify-center"
        onPress={onOpen}
      >
        <LuPencilLine className="w-8 h-8" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="h-[600px]">
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center py-3 px-6 font-medium text-xs">
                New Post
              </ModalHeader>
              <hr className="border-t-1 border-gray-300" />
              <ModalBody>
                {/* 이미지 업로드 */}
                <div className="flex mx-auto mt-4 border-1.5 border-dashed border-gray-300 rounded-3xl w-4/5 h-[220px]">
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
                      <DropdownItem key="참여한 action 1">
                        참여한 action 1
                      </DropdownItem>
                      <DropdownItem key="참여한 action 2">
                        참여한 action 2
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
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

export default AddPostModal;
