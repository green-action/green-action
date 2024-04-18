const FirstInputBox = () => {
  return (
    <>
      <div className="flex justify-between gap-[88px] w-[724px] h-[209px] border-1.5 border-gray-300 rounded-3xl pt-[21px] px-[28px] pb-[28px] mb-4 ">
        <div className="flex flex-col justify-center w-1/2 gap-6 ">
          <div className="">
            <p className="text-[13px] font-extrabold mb-1">활동 날짜</p>
            <div className="flex w-full gap-4 justify-between mb-[18px]">
              <div className="flex flex-col w-[134px] h-[31px]">
                <label
                  htmlFor="startDate"
                  className="text-[10px] text-gray-400 mb-1"
                >
                  시작일
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  required
                  type="date"
                  className="h-[40px] p-4 border-1.5 border-gray-300 rounded-full bg-inherit  text-xs text-gray-400"
                />
              </div>
              <div className="flex flex-col w-[134px] h-[31px]">
                <label
                  htmlFor="endDate"
                  className="text-[10px] text-gray-400 mb-1"
                >
                  종료일
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  required
                  type="date"
                  className="h-[40px] p-4 border-1.5 border-gray-300 rounded-full bg-inherit  text-xs text-gray-400"
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="maxParticipants">
              <span className="text-[13px] font-extrabold">모집 인원</span>
            </label>
            <div className="h-[33px] flex items-center mt-2 border-1.5 border-gray-300 rounded-full text-xs text-gray-400 pl-7">
              최대
              <input
                id="maxParticipants"
                name="maxParticipants"
                required
                className=" w-1/6 h-[30px] text-right mx-2 pr-4 bg-inherit focus:outline-none"
              />
              명
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center w-1/2  gap-2 ">
          <div className="mb-7">
            <div>
              <label
                htmlFor="activityLocation"
                className="text-[13px] font-extrabold"
              >
                활동 장소
              </label>
              <div className="w-[294px] h-[33px] mt-2 border-1.5 border-gray-300 rounded-full text-sm text-gray-400 pl-4">
                <input
                  type="text"
                  id="activityLocation"
                  name="activityLocation"
                  required
                  className="w-10/12 h-[30px] mx-4 pr-2 bg-inherit focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="openKakaoLink"
              className="text-[13px] font-extrabold"
            >
              카카오톡 오픈채팅방 링크
            </label>
            <div className="w-[294px] h-[33px] mt-2 border-1.5 border-gray-300 rounded-full text-sm text-gray-400 pl-4">
              <input
                type="url"
                id="openKakaoLink"
                name="openKakaoLink"
                required
                className="w-10/12 h-[30px] mx-4 pr-2 bg-inherit focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstInputBox;
