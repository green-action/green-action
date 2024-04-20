"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  insertImgUrls,
  uploadFilesAndGetUrls,
} from "@/app/_api/individualAction-add/add-api";
import {
  deleteImagesByIds,
  updateActionTextForm,
} from "@/app/_api/individualAction-edit/edit-api";
import CustomConfirm from "@/app/_components/customConfirm/CustomConfirm";
import ImgEdit from "@/app/_components/individualAction-edit/ImgEdit";
import { useGetActionForEdit } from "@/app/_hooks/useQueries/individualAction-edit";
import { useResponsive } from "@/app/_hooks/responsive";
import { FaChevronLeft } from "react-icons/fa6";

// TODO 장소 지도 좌표 등 수정하도록 해야
const EditActionPage = ({ params }: { params: { id: string } }) => {
  const [uploadedFileUrls, setUploadedFileUrls] = useState<
    { id: string; img_url: string }[]
  >([]);
  const [deleteFileIds, setDeleteFileIds] = useState<string[]>([]);
  const [files, setFiles] = useState<(File | undefined)[]>([]);
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
      setUploadedFileUrls(idsAndUrlsObjArray);
    }
  }, [originalActionData]);

  if (isOriginalDataLoading) {
    return <div>Loading...</div>;
  }
  if (isOriginalDataError) {
    return <div>Error</div>;
  }

  // '수정완료' 클릭시
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      // 1. action_id와 텍스트 formData 보내서 update
      await updateActionTextForm({
        action_id,
        formData,
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
      <form onSubmit={handleSubmit}>
        <div
          className="flex flex-col desktop:w-[809px] 
      laptop:w-[809px] h-[826px] 
      phone:w-[291px] desktop:border-1.5 laptop:border-1.5
       desktop:border-gray-300 laptop:border-gray-300 phone:border-0 rounded-3xl mx-auto mb-12 mt-0 "
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

            {/* 이미지아래 첫번째 박스(날짜, 장소, 인원, 링크) */}
            {/* <div className="flex justify-between gap-[88px] w-[724px] h-[209px] border-1.5 border-gray-300 rounded-3xl pt-[21px] px-[28px] pb-[28px] mb-4 "> */}
            {/* <div className="flex flex-col justify-center w-1/2 gap-6">
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
                        defaultValue={originalActionData?.start_date || ""}
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
                        defaultValue={originalActionData?.end_date || ""}
                        required
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
                    <div className=" w-[294px] h-[33px] mt-2 border-1.5 border-gray-300 rounded-full text-sm text-gray-400 pl-4">
                      <input
                        type="text"
                        id="activityLocation"
                        name="activityLocation"
                        defaultValue={originalActionData?.location || ""}
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
                      defaultValue={originalActionData?.kakao_link || ""}
                      required
                      className="w-10/12 h-[30px] mx-4 pr-2 bg-inherit focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div> */}

            {(isDesktop || isLaptop) && (
              <div className="flex justify-between gap-[88px] w-[724px] h-[209px] border-1.5 border-gray-300 rounded-3xl pt-[21px] px-[28px] pb-[28px] mb-4 ">
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
                          defaultValue={originalActionData?.start_date || ""}
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
                          defaultValue={originalActionData?.end_date || ""}
                          required
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
                      <div className=" w-[294px] h-[33px] mt-2 border-1.5 border-gray-300 rounded-full text-sm text-gray-400 pl-4">
                        <input
                          type="text"
                          id="activityLocation"
                          name="activityLocation"
                          defaultValue={originalActionData?.location || ""}
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
                        defaultValue={originalActionData?.kakao_link || ""}
                        required
                        className="w-10/12 h-[30px] mx-4 pr-2 bg-inherit focus:outline-none"
                      />
                    </div>
                  </div>
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
                          defaultValue={originalActionData?.kakao_link || ""}
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
                  mode="individualAdd"
                />
                <button className="bg-gray-100 w-[170px] h-[40px] rounded-full border-1.5 border-gray-300 text-sm font-medium text-gray-500">
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
                  mode="individualAdd"
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditActionPage;
