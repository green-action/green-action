"use client";

import React, { useEffect } from "react";
import SearchAddressModal from "../daumPostCode/SearchAddressModal";
import SearchMapModal from "../kakaoMap/SearchMapModal";
import KakakoMap from "../kakaoMap/KakakoMap";
import { useResponsive } from "@/app/_hooks/responsive";

import type { placeCoordinateType } from "@/app/_types/individualAction-detail/individualAction-detail";
import { Button } from "@nextui-org/react";

const FirstInputBox = ({
  activityLocation,
  setActivityLocation,
  handleActivityLocationChange,
  locationCoorRef,
  activityLocationMap,
  setActivityLocationMap,
}: {
  activityLocation: string;
  setActivityLocation: React.Dispatch<React.SetStateAction<string>>;
  handleActivityLocationChange: any;
  locationCoorRef: React.MutableRefObject<placeCoordinateType | null>;
  activityLocationMap: string;
  setActivityLocationMap: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  const handleRemoveLocationMap = () => {
    setActivityLocationMap("");
    locationCoorRef.current = null;
  };

  return (
    <div>
      <div
        className="flex justify-between gap-[88px]  desktop:w-[724px] laptop:w-[724px] 
        desktop:h-[396px] laptop:h-[396px] phone:w-[291px]
      desktop:border-1.5 desktop:border-gray-300  
      laptop:border-1.5 laptop:border-gray-300
       phone:border-t-2  phone:border-[#EDEDED]
       desktop:rounded-3xl laptop:rounded-3xl pt-[21px] desktop:px-[28px] laptop:px-[28px] pb-[28px] mb-4 mr-6 phone:pl-0"
      >
        {(isDesktop || isLaptop) && (
          <div className="flex gap-[57px]">
            <div>
              <div className="flex flex-col justify-center w-1/2 gap-6">
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
                      // w-1/6 h-[30px] text-right mx-2 pr-4
                      className="w-2/6 h-[30px] text-right mx-2 pr-4 bg-inherit focus:outline-none"
                    />
                    명
                  </div>
                </div>
                <div className="flex flex-col justify-center w-1/2 gap-2">
                  <div className="">
                    {/* mb-7 */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="activityLocation"
                        className="text-[13px] font-extrabold"
                      >
                        활동 장소
                      </label>
                      {/* 도로명주소 검색 - 보류? */}
                      <SearchAddressModal
                        activityLocation={activityLocation}
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
                        locationCoorRef={locationCoorRef}
                      />
                      {/*넓이가 안먹힘 */}
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
            </div>
            {/*  </div> */}
            <div className="flex flex-col w-1/2  gap-2 mt-[8px]">
              {/* <div className="mb-7">
            <div>
              <div className="flex items-center gap-5">
                  <div className="w-[294px] h-[33px] mt-2 border-1.5 border-gray-300 rounded-full text-sm text-gray-400 pl-4">
                    <input
                      type="text"
                      id="activityLocation"
                      name="activityLocation"
                      value={activityLocation}
                      onChange={handleActivityLocationChange}
                      form="mainForm"
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
                {/* 도로명주소 검색 - 보류 * /}
                <SearchAddressModal
                  activityLocation={activityLocation}
                  setActivityLocation={setActivityLocation}
                />
              </div>
              <div className="w-[294px] h-[33px] mt-2 border-1.5 border-gray-300 rounded-full text-sm text-gray-400 pl-4">
                <input
                  type="text"
                  id="activityLocation"
                  name="activityLocation"
                  value={activityLocation}
                  onChange={handleActivityLocationChange}
                  form="mainForm"
                  required
                  className="w-10/12 h-[30px] mx-4 pr-2 bg-inherit focus:outline-none"
                />
              </div>
            </div>
          </div> */}
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
                    form="mainForm"
                    required
                    className="w-10/12 h-[30px] mx-4 pr-2 bg-inherit focus:outline-none"
                  />
                </div>
              </div>
              {/* 지도 검색으로 장소선택 시 뜨게 할 지도(미리보기) */}
              {locationCoorRef.current && (
                <div className="w-[310px] h-[220px] mt-[41px]">
                  <KakakoMap
                    placeCoordinate={locationCoorRef.current}
                    activityLocationMap={activityLocationMap}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {isMobile && (
          <>
            <div className="flex flex-col justify-center gap-6 m-auto">
              <div className="">
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
                      className="text-[13px] font-extrabold"
                    >
                      활동 장소
                    </label>
                    {/* 도로명주소 검색 - 보류 */}
                    <SearchAddressModal
                      activityLocation={activityLocation}
                      setActivityLocation={setActivityLocation}
                    />
                    <div className="w-[281px] h-[33px] mt-2 border-1.5 border-gray-300 rounded-full text-sm text-gray-400 pl-4">
                      <input
                        type="text"
                        id="activityLocation"
                        name="activityLocation"
                        value={activityLocation}
                        onChange={handleActivityLocationChange}
                        form="mainForm"
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
                  <div className="w-[281px] h-[33px] mt-2 border-1.5 border-gray-300 rounded-full text-sm text-gray-400 pl-4">
                    <input
                      type="url"
                      id="openKakaoLink"
                      name="openKakaoLink"
                      required
                      form="mainForm"
                      className="w-10/12 h-[30px] mx-4 pr-2 bg-inherit focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FirstInputBox;
