import React from "react";

import type { ProfileImgUploadProps } from "@/app/_types/mypage/mypage";

import { Avatar } from "@nextui-org/react";
import { IoIosCamera } from "react-icons/io";

const ProfileImgUpload = ({
  uploadedFileUrl,
  setUploadedFileUrl,
  setFile,
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
  // 기존 프로필 이미지 있을 경우 해당 이미지 삭제
  const handleDeleteImage = () => {
    setUploadedFileUrl("");
    setFile(undefined);
  };

  return (
    <>
      {uploadedFileUrl && (
        <button
          //  누를 시 모달이 닫히는 문제 - form 안 button이라 form태그로 제출되어서? -> type="reset"으로 해결
          onClick={handleDeleteImage}
          color="default"
          className="absolute top-[9.2rem] right-[9rem]"
          type="reset"
        >
          x
        </button>
      )}
      <Avatar
        showFallback
        src={uploadedFileUrl}
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
