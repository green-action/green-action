import React from "react";

const ImgUpload = () => {
  return (
    <>
      <div className="flex gap-2 w-full h-auto mb-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex border-2 border-dashed border-gray-300 rounded-3xl w-1/4 h-[200px]"
          >
            <div className="flex flex-col w-full h-full justify-end items-center mt-auto">
              <label
                htmlFor="fileInput"
                className="mb-4 text-4xl font-thin text-gray-500 cursor-pointer"
              >
                +
              </label>
              <input
                id="fileInput"
                type="file"
                accept=".png, .jpg, .jpeg"
                style={{ display: "none" }}
              />
              <p className="mb-px font-medium text-gray-500">Upload Image</p>
              <p className="text-xs mb-8 text-gray-400">or drag & drop</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImgUpload;
