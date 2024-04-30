"use client";
import React, { useState } from "react";
import Image from "next/image";

import type { ImgUpdateProps } from "@/app/_types/individualAction-add/individualAction-add";

const ImgEdit: React.FC<ImgUpdateProps> = ({
  uploadedFileUrls,
  setUploadedFileUrls,
  setDeleteFileIds,
  setFiles,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleShowPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setUploadedFileUrls((prev) => [...prev, { id: "", img_url: imageUrl }]);
    setFiles((prev) => [...prev, file]);
  };

  const handleDeleteImage = (index: number, deletedId: string) => {
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
    setUploadedFileUrls((prev) => [...prev, { id: "", img_url: imageUrl }]);
    setFiles((prev) => [...prev, file]);
  };

  return (
    <>
      <div
        className={`desktop:flex laptop:flex phone:grid phone:grid-cols-2 gap-2 h-auto mb-[23px] ${
          isDragging ? "border-blue-400" : "border-gray-300"
        }`}
        onDragEnter={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragEnd}
        onDrop={handleDrop}
      >
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex border-2 border-dashed border-gray-300 rounded-3xl 
            desktop:w-[175px] desktop:h-[177px] 
             laptop:w-[175px] laptop:h-[177px]
            phone:w-[141px] phone:h-[143px]"
          >
            {uploadedFileUrls[index] ? (
              <div className="relative w-full h-full">
                <Image
                  width={175}
                  height={177}
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
                <p className="text-sm font-medium text-gray-500">
                  Upload Image
                </p>
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
