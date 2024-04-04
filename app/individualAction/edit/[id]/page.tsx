"use client";

import { getUser } from "@/app/_api/auth";
import {
  insertActionTextForm,
  insertImgUrls,
  uploadFilesAndGetUrls,
} from "@/app/_api/individualAction-add/add-api";
import {
  getActionForEdit,
  updateActionTextForm,
} from "@/app/_api/individualAction-edit/edit-api";
import { QUERY_KEY_INDIVIDUALACTION_FOR_EDIT } from "@/app/_api/queryKeys";
import ImgUpload from "@/app/_components/individualAction-add/ImgUpload";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditActionPage = ({ params }: { params: { id: string } }) => {
  const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<(File | undefined)[]>([]);
  const router = useRouter();
  const { id: action_id } = params;

  // 페이지 접근시 action_id의 기존 데이터 가져오기
  const {
    data: originalActionData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY_INDIVIDUALACTION_FOR_EDIT],
    // 데이터 가져오면서 동시에 이미지url을 useState에 set
    queryFn: async () => {
      try {
        // getActionForEdit 함수 호출하여 데이터 가져오기
        const data = await getActionForEdit(action_id);

        // 가져온 데이터를 사용하여 이미지 URL 설정
        const urls = data.green_action_images.map(
          (image: { img_url: string }) => image.img_url,
        );
        setUploadedFileUrls(urls);

        // 가져온 데이터 반환
        return data;
      } catch (error) {
        throw new Error("Error fetching data");
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  // '수정완료' 클릭시
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 제출 동작 방지

    const formData = new FormData(event.currentTarget); // 폼 데이터 생성

    try {
      // 확인창 표시
      const isConfirmed = window.confirm("등록하시겠습니까?");
      if (isConfirmed) {
        // 1. action_id와 텍스트 formData 보내서 update
        await updateActionTextForm({
          action_id,
          formData,
        });

        // 2. 이미지 스토리지에 저장하기 + 이미지 url 배열 반환받기
        // const imgUrlsArray = await uploadFilesAndGetUrls({ files, action_id });

        // // 3. 이미지url들 table에 넣기 - action_id에 id사용
        // await insertImgUrls({ action_id, imgUrlsArray });

        // 입력값 초기화
        const target = event.target as HTMLFormElement;
        target.reset();

        // 확인을 클릭하면 action_id의 상세페이지로 이동
        router.push(`/individualAction/detail/${action_id}`);
      }
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  return (
    <>
      {/* 전체 박스 */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-[900px] h-auto border-2 border-gray-300 rounded-3xl mx-auto mb-12 mt-8">
          {/* new green-action 타이틀 */}
          <div className="m-4 ml-8 text-md font-semibold">New Green-Action</div>
          <hr className="border-t-2 border-gray-300" />
          {/* 안쪽 박스 */}
          <div className="p-10 w-full h-full">
            {/* 이미지 4장 자리*/}
            <ImgUpload
              uploadedFileUrls={uploadedFileUrls}
              setUploadedFileUrls={setUploadedFileUrls}
              files={files}
              setFiles={setFiles}
            />
            {/* 이미지아래 첫번째 박스 */}
            <div className="flex justify-between w-full h-auto border-2 border-gray-300 rounded-3xl mb-4">
              {/* 왼 */}
              <div className="flex flex-col justify-center w-1/2 h-[230px] gap-2 p-4 pl-6 pr-12">
                <div className="mb-4">
                  <p className="font-semibold mb-2">활동 날짜</p>
                  <div className="flex w-full gap-4 justify-between">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="startDate"
                        className="text-xs text-gray-400"
                      >
                        시작일
                      </label>
                      <input
                        id="startDate"
                        name="startDate"
                        defaultValue={originalActionData?.start_date || ""}
                        required
                        type="date"
                        className="h-[40px] p-4 border-2 border-gray-300 rounded-full bg-inherit  text-xs text-gray-400"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="endDate"
                        className="text-xs text-gray-400"
                      >
                        종료일
                      </label>
                      <input
                        id="endDate"
                        name="endDate"
                        defaultValue={originalActionData?.end_date || ""}
                        required
                        type="date"
                        className="h-[40px] p-4 border-2 border-gray-300 rounded-full bg-inherit  text-xs text-gray-400"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="maxParticipants"
                    className="font-semibold mb-2"
                  >
                    모집 인원
                  </label>
                  <div className="border-2 border-gray-300 rounded-full text-xs text-gray-400 pl-4">
                    최대
                    <input
                      id="maxParticipants"
                      name="maxParticipants"
                      defaultValue={originalActionData?.recruit_number || ""}
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
                    <label
                      htmlFor="activityLocation"
                      className="font-semibold mb-2"
                    >
                      활동 장소
                    </label>
                    <div className="border-2 border-gray-300 rounded-full text-sm text-gray-400 pl-4">
                      <input
                        type="text"
                        id="activityLocation"
                        name="activityLocation"
                        defaultValue={originalActionData?.location || ""}
                        required
                        className="w-10/12 h-[35px] mx-4 pr-4 bg-inherit focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="openKakaoLink" className="font-semibold mb-2">
                    오픈 채팅방 링크
                  </label>
                  <div className="border-2 border-gray-300 rounded-full text-sm text-gray-400 pl-4">
                    <input
                      type="url"
                      id="openKakaoLink"
                      name="openKakaoLink"
                      defaultValue={originalActionData?.kakao_link || ""}
                      required
                      className="w-10/12 h-[35px] mx-4 pr-4 bg-inherit focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 이미지아래 두번째 박스(활동 제목) */}
            <div className="flex w-full h-auto items-center pl-8 border-2 border-gray-300 rounded-3xl mb-4">
              <label htmlFor="activityTitle" className="font-semibold mr-8">
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
            <div className="flex items-start w-full h-auto pl-8 border-2 border-gray-300 rounded-3xl mb-8">
              <label
                htmlFor="activityDescription"
                className="font-semibold mr-8 mt-4"
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
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="bg-gray-100 w-40 h-10 rounded-full border-2 border-gray-300 text-sm font-medium text-gray-500"
              >
                수정완료
              </button>
              <button className="bg-gray-100 w-40 h-10 rounded-full border-2 border-gray-300 text-sm font-medium text-gray-500">
                취소하기
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditActionPage;
