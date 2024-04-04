import { useUpdateUserName } from "@/app/_hooks/useMutations/mypage";
import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { IoIosCamera } from "react-icons/io";
import { TfiPencil } from "react-icons/tfi";

const MyProfileEditModal = ({
  display_name,
  profile_img,
}: {
  display_name: string;
  profile_img: string;
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [editedName, setEditedName] = useState<string>(display_name); // 초기값 닉네임 떴다가 안떴다가 함

  const { updateName } = useUpdateUserName(
    "ed71fea7-2892-4769-b7d0-1f8ba330c213", // user_uid
    editedName,
  );

  const handleModalClose = () => {
    setEditedName(display_name);
  };

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleEditProfileClick = () => {
    onOpen();
  };

  // 모달 - 작성완료
  const handleEditProfileSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!editedName.trim()) {
      return alert("닉네임을 입력해주세요."); //바꾸기?
    }
    if (editedName.length >= 10) {
      return alert("닉네임을 10자 이내로 써주세요");
    }

    await updateName();
    onClose();
  };
  return (
    <>
      <TfiPencil
        color="gray"
        onClick={handleEditProfileClick}
        className="cursor-pointer"
      />

      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            //   NOTE 모달
            <div className="p-5 flex flex-col items-center">
              <form
                className="flex flex-col gap-5 items-center justify-center"
                onSubmit={handleEditProfileSubmit}
              >
                <ModalHeader>
                  <p className="text-lg">Profile</p>
                </ModalHeader>
                <div className="flex flex-col items-center gap-5">
                  <p className="text-[0.8rem] text-gray-600">
                    나중에 언제든지 변경할 수 있습니다.
                  </p>
                  <Avatar
                    showFallback
                    src={profile_img || ""}
                    className="w-[8rem] h-[8rem]"
                  />
                  <IoIosCamera size="35" />
                  <label htmlFor="user-display-name">사용자 이름</label>
                  <Input
                    type="text"
                    label="사용자 이름"
                    value={editedName}
                    defaultValue={display_name}
                    onChange={(e) => {
                      handleDisplayNameChange(e);
                    }}
                    id="User Display Name"
                    className="rounded"
                    placeholder="2 ~ 10자 이내"
                    maxLength={10}
                    minLength={2}
                    isRequired
                    variant="flat"
                  />
                </div>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit" color="success">
                    작성완료
                  </Button>
                </ModalFooter>
              </form>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyProfileEditModal;
