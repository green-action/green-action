import {
  insertProfileImgUrl,
  uploadProfileFileAndGetUrl,
} from "@/app/_api/mypage/mypage-profile-api";
import { useUpdateUserName } from "@/app/_hooks/useMutations/mypage";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { TfiPencil } from "react-icons/tfi";
import ProfileImgUpload from "./ProfileImgUpload";

const MyProfileEditModal = ({
  user_uid,
  display_name,
  profile_img,
}: {
  user_uid: string;
  display_name: string;
  profile_img: string;
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [editedName, setEditedName] = useState<string>(display_name); // 초기값 닉네임 떴다가 안떴다가 함
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
  const [file, setFile] = useState<File | undefined>();

  const { updateName } = useUpdateUserName(
    "ed71fea7-2892-4769-b7d0-1f8ba330c213", // user_uid
    editedName,
  );

  // 모달창 '작성완료'없이 닫을 시 초기화
  const handleModalClose = () => {
    setEditedName(display_name);
    setUploadedFileUrl("");
    setFile(undefined);
  };

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleEditProfileClick = () => {
    onOpen();
  };

  // NOTE TODO 기존 이미지 업로드시 ?
  // 모달창 - 작성완료
  const handleEditProfileSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!editedName.trim()) {
      return alert("닉네임을 입력해주세요."); // 바꾸기?
    }
    if (editedName.length >= 10) {
      return alert("닉네임을 10자 이내로 써주세요");
    }

    // 이미지 stroage url 받아오기
    const imgUrl = await uploadProfileFileAndGetUrl({ file, user_uid });
    // 받아온 img url 을 users table에 업데이트
    await insertProfileImgUrl({ user_uid, imgUrl });
    // 닉네임 업데이트
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
                  <ProfileImgUpload
                    uploadedFileUrl={uploadedFileUrl}
                    setUploadedFileUrl={setUploadedFileUrl}
                    file={file}
                    setFile={setFile}
                    profile_img={profile_img}
                  />
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
                    취소
                  </Button>
                  <Button type="submit" variant="light" color="primary">
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
