"use client";

import {
  getActionId,
  insertAction,
} from "@/app/_api/individualAction-add/add-api";
import ImgUpload from "@/app/_components/individualAction-add/ImgUpload";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddAction = () => {
  const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<(File | undefined)[]>([]);
  const router = useRouter();

  // 임시 user_uid로 일단 테스트하기
  // 현재 로그인한 유저의 uid가져오기로 수정해야 함
  const currentUserUId = "55e7ec4c-473f-4754-af5e-9eae5c587b81";

  // '등록완료' 클릭시
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 제출 동작 방지

    const formData = new FormData(event.currentTarget); // 폼 데이터 생성

    try {
      // 1. id와 텍스트 입력값들 formData로 보내기 - insert
      await insertAction({ formData, currentUserUId });

      // 2. id뽑아오기 - action_id로 써야됨
      const action_id = await getActionId(currentUserUId);

      // 3. 이미지 스토리지에 저장하기

      // 4. 스토리지에 저장된 이미지의 url 뽑아서 이미지url table에 넣기 - action_id에 id사용

      // 입력값 재설정
      const target = event.target as HTMLFormElement;
      target.reset();

      // 확인창 표시
      const confirmed = window.confirm("등록하시겠습니까?");
      if (confirmed) {
        // 확인을 클릭하면 action_id의 상세페이지로 이동
        // router.push("/");
      }
    } catch (error) {
      // 오류 처리
      console.error("Error inserting data:", error);
    }
  };

  return (
    <>
      {/* 헤더 */}
      <div className="w-full h-28 bg-slate-400 mb-14">Header</div>
      {/* 전체 박스 */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-[900px] h-auto border-2 border-gray-300 rounded-3xl mx-auto mb-12">
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
                required
                className="resize-none w-10/12 h-[100px] mx-4 mt-4 pr-4 bg-inherit focus:outline-none text-sm text-gray-400"
              />
            </div>
            {/* 등록, 취소 버튼 */}
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="bg-gray-100 w-40 h-10 rounded-full border-2 border-gray-300 text-sm font-medium text-gray-500"
              >
                등록완료
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

export default AddAction;
