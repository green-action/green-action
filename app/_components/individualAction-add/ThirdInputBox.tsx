import React from "react";

const ThirdInputBox = () => {
  return (
    <>
      <div className="flex items-start w-full h-auto pl-8 border-2 border-gray-300 rounded-3xl mb-8">
        <label
          htmlFor="activityDescription"
          className="font-semibold mr-3 mt-4 w-[73px]"
        >
          활동 소개
        </label>
        <textarea
          id="activityDescription"
          name="activityDescription"
          required
          className="resize-none w-10/12 h-[100px] mx-4 mt-4 pr-4 bg-inherit focus:outline-none text-sm text-gray-400"
        />
      </div>
    </>
  );
};

export default ThirdInputBox;
