import React from "react";
import type { PostImgUploadProps } from "@/app/_types/community/community";

const PostImgUpload = ({
  uploadedFileUrl,
  setUploadedFileUrl,
  setFile,
}: PostImgUploadProps) => {
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

  return (
    <>
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
            <p className="mb-px font-medium text-gray-500">Upload Image</p>
            <p className="text-xs mb-14 text-gray-400">or drag & drop</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PostImgUpload;
