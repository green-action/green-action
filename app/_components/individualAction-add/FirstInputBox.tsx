import React from "react";

const FirstInputBox = () => {
  return (
    <>
      <div className="flex justify-between w-full h-auto border-2 border-gray-300 rounded-3xl mb-4">
        {/* 왼 */}
        <div className="flex flex-col justify-center w-1/2 h-[230px] gap-2 p-4 pl-6 pr-12">
          <div className="mb-4">
            <p className="font-semibold mb-2">활동 날짜</p>
            <div className="flex w-full gap-4 justify-between">
              <div className="flex flex-col w-1/2">
                <label htmlFor="startDate" className="text-xs text-gray-400">
                  시작일
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  required
                  type="date"
                  className="h-[40px] p-4 border-2 border-gray-300 rounded-full bg-inherit  text-xs text-gray-400"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label htmlFor="endDate" className="text-xs text-gray-400">
                  종료일
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  required
                  type="date"
                  className="h-[40px] p-4 border-2 border-gray-300 rounded-full bg-inherit  text-xs text-gray-400"
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="maxParticipants" className="font-semibold mb-2">
              모집 인원
            </label>
            <div className="border-2 border-gray-300 rounded-full text-xs text-gray-400 pl-4">
              최대
              <input
                id="maxParticipants"
                name="maxParticipants"
                required
                className="w-1/4 h-[35px] text-right mx-4 pr-4  bg-inherit focus:outline-none"
              />
              명
            </div>
          </div>
        </div>
        {/* 오 */}
        <div className="flex flex-col justify-center w-1/2 h-[230px] gap-2 p-4 pl-6 pr-12">
          <div className="mb-7">
            <div>
              <label htmlFor="activityLocation" className="font-semibold mb-2">
                활동 장소
              </label>
              <div className="border-2 border-gray-300 rounded-full text-sm text-gray-400 pl-4">
                <input
                  type="text"
                  id="activityLocation"
                  name="activityLocation"
                  required
                  className="w-10/12 h-[35px] mx-4 pr-4 bg-inherit focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="openKakaoLink" className="font-semibold mb-2">
              카카오톡 오픈채팅방 링크
            </label>
            <div className="border-2 border-gray-300 rounded-full text-sm text-gray-400 pl-4">
              <input
                type="url"
                id="openKakaoLink"
                name="openKakaoLink"
                required
                className="w-10/12 h-[35px] mx-4 pr-4 bg-inherit focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstInputBox;
