"use client";

import { ImgUploadProps } from "@/app/_types/individualAction-add/individualAction-add";
import React, { useState } from "react";

const ImgUpload = ({ uploadedFileUrl, setUploadedFileUrl }: ImgUploadProps) => {
  const [files, setFiles] = useState<(File | undefined)[]>([]);

  // 이미지 미리보기 띄우기
  const handleShowPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setUploadedFileUrl((prev) => [...prev, imageUrl]);
    setFiles((prev) => [...prev, file]);
  };

  return (
    <>
      <div className="flex gap-2 w-full h-auto mb-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex border-2 border-dashed border-gray-300 rounded-3xl w-1/4 h-[200px]"
          >
            {uploadedFileUrl[index] ? (
              <img
                src={uploadedFileUrl[index]}
                alt={`Uploaded Image ${index}`}
                className="w-full h-full rounded-3xl object-cover"
              />
            ) : (
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

export default ImgUpload;
