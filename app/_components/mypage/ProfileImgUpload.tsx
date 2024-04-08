import { ProfileImgUploadProps } from "@/app/_types/mypage/mypage";
import { Avatar } from "@nextui-org/react";
import React from "react";
import { IoIosCamera } from "react-icons/io";

const ProfileImgUpload = ({
  uploadedFileUrl,
  setUploadedFileUrl,
  file,
  setFile,
  profile_img,
}: ProfileImgUploadProps) => {
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
    setFile(undefined); // ?
  };

  return (
    <>
      <button
        //  누를 시 모달이 닫히는 문제
        onClick={handleDeleteImage}
        color="default"
        className="absolute top-[9.2rem] right-[9rem]"
      >
        x
      </button>
      <Avatar
        showFallback
        src={uploadedFileUrl ? uploadedFileUrl : profile_img}
        className="w-[9rem] h-[9rem]"
      />
      <div className="absolute bottom-[15rem] right-[9rem]">
        <label htmlFor={`fileInput`} className="cursor-pointer">
          <IoIosCamera size="35" />
        </label>
        <input
          id={`fileInput`}
          type="file"
          accept=".png, .jpg, .jpeg"
          hidden
          onChange={handleShowPreview}
        />
      </div>
    </>
  );
};

export default ProfileImgUpload;
