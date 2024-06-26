const ThirdInputBox = () => {
  return (
    <>
      <div className="flex items-start desktop:w-[724px] laptop:w-[724px] h-[137px] phone:w-[291px] pl-8 border-1.5 border-gray-300 rounded-3xl mb-5 relative">
        <label
          htmlFor="activityDescription"
          className="text-[13px] font-semibold mr-3 mt-4 w-[73px]"
        >
          활동 소개
        </label>
        <textarea
          id="activityDescription"
          name="activityDescription"
          form="mainForm"
          required
          className="resize-none w-10/12 h-[100px] mx-4 mt-4 pr-4 bg-inherit focus:outline-none text-sm text-gray-400"
        />
      </div>
    </>
  );
};

export default ThirdInputBox;
