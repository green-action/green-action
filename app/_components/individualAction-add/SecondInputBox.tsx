const SecondInputBox = () => {
  return (
    <>
      <div className="flex desktop:w-[724px] laptop:w-[724px] phone:w-[291px] h-[53px] items-center pl-8 border-1.5 border-gray-300 rounded-3xl mb-4">
        <label
          htmlFor="activityTitle"
          className="text-[13px] font-extrabold mr-3 w-[73px]"
        >
          활동 제목
        </label>
        <input
          type="text"
          id="activityTitle"
          name="activityTitle"
          form="mainForm"
          required
          className="w-10/12 h-[50px] mx-4 pr-4 bg-inherit focus:outline-none text-sm text-gray-400"
        />
      </div>
    </>
  );
};

export default SecondInputBox;
