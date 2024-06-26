import React, { useState } from "react";
import Image from "next/image";

import type { PostImgUploadProps } from "@/app/_types/community/community";

const PostImgUpload: React.FC<PostImgUploadProps> = ({
  uploadedFileUrl,
  setUploadedFileUrl,
  setFile,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleShowPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setUploadedFileUrl(imageUrl);
    setFile(file);
  };

  const handleDeleteImage = () => {
    setUploadedFileUrl("");
    setFile(null);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedFileUrl(imageUrl);
    setFile(file);
  };

  return (
    <>
      <div
        className={`flex mx-auto mt-7 mb-6 border-1.5 border-dashed border-gray-300 rounded-3xl w-[370px] h-[260px] ${
          isDragging ? "border-blue-400" : "border-gray-300"
        }`}
        onDragEnter={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragEnd}
        onDrop={handleDrop}
      >
        {uploadedFileUrl ? (
          <div className="relative w-full h-full">
            <Image
              width={410}
              height={295}
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
          <div className="flex flex-col w-full h-full justify-end items-center mt-auto">
            <label
              htmlFor={`fileInput`}
              className="mb-2 text-4xl font-thin text-gray-500 cursor-pointer"
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
            <p className="mb-px font-medium text-gray-500 text-sm">
              Upload Image
            </p>
            <p className="text-xs mb-20 text-gray-400">or drag & drop</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PostImgUpload;
