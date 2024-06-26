"use client";

import React from "react";
import { useResponsive } from "@/app/_hooks/responsive";
import { Button } from "@nextui-org/react";
import SearchAddressModal from "../daumPostCode/SearchAddressModal";
import KakaoMap from "../kakaoMap/KakaoMap";
import SearchMapModal from "../kakaoMap/SearchMapModal";

import type { FirstInputBoxProps } from "@/app/_types/individualAction-add/individualAction-add";

const FirstInputBox: React.FC<FirstInputBoxProps> = ({
  activityLocation,
  setActivityLocation,
  handleActivityLocationChange,
  locationMapRef,
  activityLocationMap,
  setActivityLocationMap,
}) => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  const handleRemoveLocationMap = () => {
    setActivityLocationMap("");
    locationMapRef.current = null;
  };

  return (
    <div>
      <div
        className={`flex justify-between gap-[88px]  desktop:w-[724px] laptop:w-[724px] 
         phone:w-[291px]
      desktop:border-1.5 desktop:border-gray-300  
      laptop:border-1.5 laptop:border-gray-300
       phone:border-t-2  phone:border-[#EDEDED]
       desktop:rounded-3xl laptop:rounded-3xl pt-[21px] desktop:px-[28px] laptop:px-[28px] pb-[0px] mb-4 mr-6 phone:pl-0 bg-pin
       ${
         (isDesktop || isLaptop) &&
         (locationMapRef.current ? "h-[420px]" : "h-[220px]")
       }
       `}
      >
        {(isDesktop || isLaptop) && (
          <div className="flex flex-col">
            <div className="flex gap-[87px] items-start">
              <div className="flex flex-col justify-center w-1/2 gap-6">
                <div className="mb-2">
                  <p className="text-[13px] font-extrabold mb-2">활동 날짜</p>
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
                        form="mainForm"
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
                        form="mainForm"
                        className="h-[40px] p-4 border-1.5 border-gray-300 rounded-full bg-inherit  text-xs text-gray-400"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="maxParticipants">
                    <span className="text-[13px] font-extrabold">
                      모집 인원
                    </span>
                  </label>
                  <div className="h-[33px] flex items-center mt-2 border-1.5 border-gray-300 rounded-full text-xs text-gray-400 pl-7">
                    최대
                    <input
                      id="maxParticipants"
                      name="maxParticipants"
                      required
                      form="mainForm"
                      className="w-2/6 h-[30px] text-right mx-2 pr-4 bg-inherit focus:outline-none"
                    />
                    명
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center w-1/2 gap-2">
                <div className="">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="activityLocation"
                      className="text-[13px] font-extrabold"
                    >
                      활동 장소
                    </label>
                    <SearchAddressModal
                      setActivityLocation={setActivityLocation}
                    />
                  </div>
                  <div className="w-[294px] h-[33px] mt-2 border-1.5 border-gray-300 rounded-full text-gray-400 pl-4">
                    <input
                      type="text"
                      id="activityLocation"
                      name="activityLocation"
                      value={activityLocation}
                      onChange={handleActivityLocationChange}
                      form="mainForm"
                      required
                      className="text-[13px] w-[281px] h-[30px] bg-inherit focus:outline-none placeholder:text-[12px]"
                      placeholder="위치/주소를 입력해주세요. 도로명 주소검색도 가능해요."
                    />
                  </div>
                </div>
                <div className="flex flex-col w-[290px] gap-2">
                  <div className="flex gap-[10px] ">
                    <SearchMapModal
                      setActivityLocationMap={setActivityLocationMap}
                      locationMapRef={locationMapRef}
                    />
                    <Button
                      onClick={handleRemoveLocationMap}
                      className="bg-[#5B5B5B] text-white text-[12px] rounded-full desktop:w-[10px] h-[28px]"
                    >
                      초기화
                    </Button>
                  </div>
                  <input
                    id="activityLocationMap"
                    name="activityLocationMap"
                    value={activityLocationMap}
                    type="text"
                    form="mainForm"
                    placeholder="(선택) 지도에서 검색해주세요"
                    className="h-[33px] w-[290px] p-4 border-1.5 border-gray-300 rounded-full bg-inherit  text-xs text-gray-400"
                  />
                </div>
              </div>
            </div>
            {locationMapRef.current && (
              <div className="w-[665px] h-[180px] mt-5 ">
                <KakaoMap placeInfo={locationMapRef.current} />
              </div>
            )}
          </div>
        )}

        {isMobile && (
          <div className="flex flex-col justify-center gap-6 m-auto">
            <div>
              <p className="text-[13px] font-extrabold mb-1">활동 날짜</p>
              <div className="flex w-full gap-4 justify-between mb-[18px]">
                <div className="flex flex-col w-[136px] h-[31px]">
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
                    form="mainForm"
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
                    form="mainForm"
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
                  form="mainForm"
                  className=" w-1/6 h-[30px] text-right mx-2 pr-4 bg-inherit focus:outline-none"
                />
                명
              </div>
            </div>

            <div className="flex flex-col justify-center w-1/2 gap-2 ">
              <div className="mb-7">
                <div>
                  <label
                    htmlFor="activityLocation"
                    className="text-[13px] font-extrabold ml-3"
                  >
                    활동 장소
                  </label>
                  <SearchAddressModal
                    setActivityLocation={setActivityLocation}
                  />
                </div>
                <div className="w-[294px] h-[33px] mt-2 border-1.5 border-gray-300 rounded-full text-gray-400 pl-4">
                  <input
                    type="text"
                    id="activityLocation"
                    name="activityLocation"
                    value={activityLocation}
                    onChange={handleActivityLocationChange}
                    form="mainForm"
                    required
                    className="text-[13px] w-[281px] h-[30px] bg-inherit focus:outline-none placeholder:text-[12px]"
                    placeholder="위치/주소를 입력해주세요. 도로명 주소검색도 가능해요."
                  />
                </div>
              </div>
              <div className="flex flex-col w-[290px] gap-2">
                <div className="flex gap-[10px] ">
                  <SearchMapModal
                    setActivityLocationMap={setActivityLocationMap}
                    locationMapRef={locationMapRef}
                  />
                  <Button
                    onClick={handleRemoveLocationMap}
                    className="bg-[#5B5B5B] text-white text-[12px] rounded-full desktop:w-[10px] h-[28px]"
                  >
                    초기화
                  </Button>
                </div>
                <input
                  id="activityLocationMap"
                  name="activityLocationMap"
                  value={activityLocationMap}
                  type="text"
                  form="mainForm"
                  placeholder="(선택) 지도에서 검색해주세요"
                  className="h-[33px] w-[290px] p-4 border-1.5 border-gray-300 rounded-full bg-inherit  text-xs text-gray-400"
                />
              </div>
            </div>
            <div className="flex flex-col w-1/2  gap-2">
              {locationMapRef.current && (
                <div className="w-[310px] h-[150px] mt-[10px]">
                  <KakaoMap placeInfo={locationMapRef.current} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirstInputBox;
