import React from "react";

const SecondInputBox = () => {
  return (
    <>
      <div className="flex w-full h-auto items-center pl-8 border-2 border-gray-300 rounded-3xl mb-4">
        <label htmlFor="activityTitle" className="font-semibold mr-3 w-[73px]">
          활동 제목
        </label>
        <input
          type="text"
          id="activityTitle"
          name="activityTitle"
          required
          className="w-10/12 h-[50px] mx-4 pr-4 bg-inherit focus:outline-none text-sm text-gray-400"
        />
      </div>
    </>
  );
};

export default SecondInputBox;
