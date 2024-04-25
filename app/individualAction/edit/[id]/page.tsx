"use client";

import { MODE_INDIVIDUAL_ACTION_ADD } from "@/app/_api/constant";
import {
  insertImgUrls,
  uploadFilesAndGetUrls,
} from "@/app/_api/individualAction-add/add-api";
import {
  deleteImagesByIds,
  updateActionTextForm,
} from "@/app/_api/individualAction-edit/edit-api";
import CustomConfirm from "@/app/_components/customConfirm/CustomConfirm";
import SearchAddressModal from "@/app/_components/daumPostCode/SearchAddressModal";
import ImgEdit from "@/app/_components/individualAction-edit/ImgEdit";
import KakaoMap from "@/app/_components/kakaoMap/KakaoMap";
import SearchMapModal from "@/app/_components/kakaoMap/SearchMapModal";
import { useResponsive } from "@/app/_hooks/responsive";
import { useGetActionForEdit } from "@/app/_hooks/useQueries/individualAction-edit";
import { placeCoordinateType } from "@/app/_types/individualAction-detail/individualAction-detail";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import SoomLoading from "/app/_assets/image/loading/SOOM_gif.gif";

// TODO 장소 지도 좌표 등 수정하도록 해야
const EditActionPage = ({ params }: { params: { id: string } }) => {
  const [uploadedFileUrls, setUploadedFileUrls] = useState<
    { id: string; img_url: string }[]
  >([]);
  const [deleteFileIds, setDeleteFileIds] = useState<string[]>([]);
  const [files, setFiles] = useState<(File | undefined)[]>([]);
  const [activityLocation, setActivityLocation] = useState<string>(""); // 주소검색통해 set하기 위해 추가
  const [activityLocationMap, setActivityLocationMap] = useState<string>(""); // 지도 검색 완료 후 뜰 장소명 (렌더링 위해 useState 사용)
  const locationMapRef = useRef<placeCoordinateType | null>(null); // 지도 검색으로 장소 선택 시 해당 장소의 좌표 담을 useRef

  const { isDesktop, isLaptop, isMobile } = useResponsive();

  const router = useRouter();
  const { id: action_id } = params;

  // 페이지 접근시 action_id의 기존 데이터 가져오기
  const { originalActionData, isOriginalDataLoading, isOriginalDataError } =
    useGetActionForEdit(action_id);

  // uploadedFileUrls에 {id: img_id, img_url: img_url} 객체 배열을 set하기
  // (이미지 삭제 시 이미지id가 필요하기 때문)
  useEffect(() => {
    if (originalActionData) {
      const idsAndUrlsObjArray = [...originalActionData.green_action_images];
      const locationMap = originalActionData.location_map as any;
      setUploadedFileUrls(idsAndUrlsObjArray);
      setActivityLocation(originalActionData.location || "");
      setActivityLocationMap(locationMap?.placeName || "");
      locationMapRef.current = locationMap;
    }
  }, [originalActionData]);

  if (isOriginalDataLoading) {
    return (
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoading} alt="SoomLoading" />
      </div>
    );
  }
  if (isOriginalDataError) {
    return <div>Error</div>;
  }

  // 장소 입력 change
  const handleActivityLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setActivityLocation(e.target.value);
  };

  // 지도 검색 초기화
  const handleRemoveLocationMap = () => {
    setActivityLocationMap("");
    locationMapRef.current = null;
  };

  // '취소하기' 버튼 누를 시
  const handleCancelEdit = () => {
    if (window.confirm("정말 등록을 취소하시겠습니까?")) {
      // TODO 커스텀컨펌창으로 변경하기
      router.push(`/individualAction`);
    } else return;
  };

  // '수정완료' 클릭시
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const activityLocationMap = locationMapRef.current;
      // 1. action_id와 텍스트 formData 보내서 update
      await updateActionTextForm({
        action_id,
        formData,
        activityLocation,
        activityLocationMap,
      });

      // 2. 이미지 스토리지에 저장하기 + 이미지 url 배열 반환받기
      // 기존에 있던 이미지 외에, 새롭게 업로드한 이미지들이 file저장 + url반환됨
      const imgUrlsArray = await uploadFilesAndGetUrls({ files, action_id });

      // 3. 반환받은 url배열을 테이블에 insert
      await insertImgUrls({ action_id, imgUrlsArray });

      // 4. deleteFileIds 참고, 테이블에 해당 id 있으면 행 삭제
      // 기존에 스토리지에 있던 이미지를 삭제 요청한 경우 테이블에서 삭제해주는 로직
      await deleteImagesByIds(deleteFileIds);

      // 입력값 초기화
      const target = event.target as HTMLFormElement;
      target.reset();

      // 확인을 클릭하면 action_id의 상세페이지로 이동
      router.push(`/individualAction/detail/${action_id}`);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="desktop:w-[1920px] laptop:w-[1020px] mx-auto">
      {/* 전체 Wrapper */}
      <form onSubmit={handleSubmit} id="mainForm" method="post" />
      <div
        className={`flex flex-col desktop:w-[809px] 
      laptop:w-[809px] 
      phone:w-[291px] desktop:border-1.5 laptop:border-1.5
       desktop:border-gray-300 laptop:border-gray-300 phone:border-0 rounded-3xl mx-auto mb-12 mt-0
       ${
         (isDesktop || isLaptop) &&
         (locationMapRef.current ? "h-[1025px]" : "h-[830px]")
       }`}
      >
        {/* new green-action 타이틀 */}
        <div className="ml-8 my-[16px] phone:text-center">
          <span className="font-black text-[15px]">Edit Green-Action</span>
        </div>
        {isMobile && (
          <div className="flex flex-col mb-3">
            <FaChevronLeft
              className="relative bottom-8 left-4 cursor-pointer"
              onClick={() => router.push("/individualAction")}
            />
          </div>
        )}
        <hr className="border-t-1.5 desktop:border-gray-300 laptop:border-gray-300 phone:border-[#EDEDED]" />
        {/* 타이틀 아래 Wrapper */}
        <div className="w-full h-full mt-[31px] mb-[26px] desktop:mx-[44px] laptop:mx-[44px] phone:ml-auto">
          {/* 이미지 4장 자리*/}
          <ImgEdit
            uploadedFileUrls={uploadedFileUrls}
            setUploadedFileUrls={setUploadedFileUrls}
            deleteFileIds={deleteFileIds}
            setDeleteFileIds={setDeleteFileIds}
            files={files}
            setFiles={setFiles}
          />

          {(isDesktop || isLaptop) && (
            <div
              className={`flex justify-between gap-[57px] w-[724px]  border-1.5 border-gray-300 rounded-3xl pt-[21px] px-[28px] pb-[28px] mb-4
            ${locationMapRef.current ? "h-[420px]" : "h-[220px]"}`}
            >
              <div className="flex flex-col">
                <div className="flex gap-[87px]">
                  <div className="flex flex-col justify-start w-1/2 gap-6">
                    <div className="mb-2">
                      <p className="text-[13px] font-extrabold mb-2">
                        활동 날짜
                      </p>
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
                            defaultValue={originalActionData?.start_date || ""}
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
                            defaultValue={originalActionData?.end_date || ""}
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
                          defaultValue={
                            originalActionData?.recruit_number || ""
                          }
                          required
                          form="mainForm"
                          className=" w-1/6 h-[30px] text-right mx-2 pr-4 bg-inherit focus:outline-none"
                        />
                        명
                      </div>
                    </div>
                  </div>
                  {/* 우측칸 활동장소 */}
                  <div className="flex flex-col justify-start w-1/2  gap-2 ">
                    <div className="flex flex-col gap-2">
                      {/* <div className="flex flex-col"> */}
                      <label
                        htmlFor="activityLocation"
                        className="text-[13px] font-extrabold"
                      >
                        활동 장소
                      </label>
                      <SearchAddressModal
                        setActivityLocation={setActivityLocation}
                      />
                      {/* </div> */}
                      <div className="w-[294px] h-[33px] border-1.5 border-gray-300 rounded-full text-gray-400 pl-4">
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
                </div>
                {/* 지도 검색으로 장소선택 시 뜨게 할 지도(미리보기) */}
                {locationMapRef.current && (
                  <div className="w-[665px] h-[180px] mt-5">
                    <KakaoMap placeInfo={locationMapRef.current} />
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
                        defaultValue={originalActionData?.start_date || ""}
                        required
                        form="mainForm"
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
                        defaultValue={originalActionData?.end_date || ""}
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
                    <span className="text-[13px] font-extrabold">
                      모집 인원
                    </span>
                  </label>
                  <div className="h-[33px] flex items-center mt-2 border-1.5 border-gray-300 rounded-full text-xs text-gray-400 pl-7">
                    최대
                    <input
                      id="maxParticipants"
                      name="maxParticipants"
                      defaultValue={originalActionData?.recruit_number || ""}
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
                      <div className=" w-[294px] h-[33px] mt-2 border-1.5 border-gray-300 rounded-full text-sm text-gray-400 pl-4">
                        <input
                          type="text"
                          id="activityLocation"
                          name="activityLocation"
                          defaultValue={originalActionData?.location || ""}
                          required
                          form="mainForm"
                          className="w-10/12 h-[30px] mx-4 pr-2 bg-inherit focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 이미지아래 두번째 박스(활동 제목) */}
          <div className="flex desktop:w-[724px] laptop:w-[724px] phone:w-[291px] h-[53px] items-center pl-8 border-1.5 border-gray-300 rounded-3xl mb-4 mt-8">
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
              defaultValue={originalActionData?.title || ""}
              required
              form="mainForm"
              className="w-10/12 h-[50px] mx-4 pr-4 bg-inherit focus:outline-none text-sm text-gray-400"
            />
          </div>
          {/* 이미지 아래 세번째 박스(활동 소개) */}
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
              defaultValue={originalActionData?.content || ""}
              required
              form="mainForm"
              className="resize-none w-10/12 h-[100px] mx-4 mt-4 pr-4 bg-inherit focus:outline-none text-sm text-gray-400"
            />
          </div>
          {/* 수정, 취소 버튼 */}
          {(isDesktop || isLaptop) && (
            <div className="w-[724px] flex justify-center gap-4">
              <CustomConfirm
                text="수정하시겠습니까?"
                buttonName="수정완료"
                okFunction={() => handleSubmit}
                mode={MODE_INDIVIDUAL_ACTION_ADD}
              />
              <button
                onClick={handleCancelEdit}
                className="bg-gray-100 w-[170px] h-[40px] rounded-full border-1.5 border-gray-300 text-sm font-medium text-gray-500"
              >
                <span className="font-extrabold">취소하기</span>
              </button>
            </div>
          )}
          {isMobile && (
            <div className="w-full flex justify-center gap-4">
              <CustomConfirm
                text="수정하시겠습니까?"
                buttonName="수정완료"
                okFunction={() => handleSubmit}
                mode={MODE_INDIVIDUAL_ACTION_ADD}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditActionPage;
