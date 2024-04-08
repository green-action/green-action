"use client";

import React from "react";
import type { ImgUpdateProps } from "@/app/_types/individualAction-add/individualAction-add";

const ImgEdit = ({
  uploadedFileUrls,
  setUploadedFileUrls,
  setDeleteFileIds,
  setFiles,
}: ImgUpdateProps) => {
  // 이미지 미리보기 띄우기
  const handleShowPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setUploadedFileUrls((prev) => [...prev, { id: "", img_url: imageUrl }]);
    setFiles((prev) => [...prev, file]);
  };

  // 미리보기 이미지 삭제
  const handleDeleteImage = (index: number, deletedId: string) => {
    // deletedId가 null이 아닌 경우 이미지id를 배열에 추가
    // (이 이미지id 배열을 이용해서, 테이블에서 해당id가 있으면 행을 삭제할 예정)
    if (deletedId) {
      setDeleteFileIds((prev) => {
        return [...prev, deletedId];
      });
    }
    setUploadedFileUrls((prev) => {
      const updatedUrls = [...prev];
      updatedUrls.splice(index, 1);
      return updatedUrls;
    });
    setFiles((prev) => {
      const updateFiles = [...prev];
      updateFiles.splice(index, 1);
      return updateFiles;
    });
  };

  return (
    <>
      <div className="flex gap-2 w-full h-auto mb-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex border-2 border-dashed border-gray-300 rounded-3xl w-1/4 h-[200px]"
          >
            {/* 이미지 업로드한 경우 */}
            {uploadedFileUrls[index] ? (
              <div className="relative w-full h-full">
                <img
                  src={uploadedFileUrls[index].img_url}
                  alt={`Uploaded Image ${index}`}
                  className="w-full h-full rounded-3xl object-cover"
                />
                <button
                  onClick={() =>
                    handleDeleteImage(index, uploadedFileUrls[index].id)
                  }
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
                  htmlFor={`fileInput-${index}`}
                  className="mb-4 text-4xl font-thin text-gray-500 cursor-pointer"
                >
                  +
                </label>
                <input
                  id={`fileInput-${index}`}
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleShowPreview}
                />
                <p className="mb-px font-medium text-gray-500">Upload Image</p>
                <p className="text-xs mb-8 text-gray-400">or drag & drop</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ImgEdit;
