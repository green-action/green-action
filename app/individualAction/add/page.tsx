"use client";

import { insertAction } from "@/app/_api/individualAction-add/add-api";
import { useRouter } from "next/navigation";
import React from "react";

const AddAction = () => {
  // 현재 로그인한 유저의 id가져오기
  // 임시 user_uid로 일단 테스트하기
  const currentUserUId = "55e7ec4c-473f-4754-af5e-9eae5c587b81";

  // id와 입력값들 insert api로 보내기
  // (입력값들을 formData로 관리할지?)

  const router = useRouter(); // useRouter 훅 사용

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 제출 동작 방지

    const formData = new FormData(event.currentTarget); // 폼 데이터 생성
    console.log("formData", formData);

    try {
      // Supabase에 데이터 삽입
      await insertAction(formData);

      // 입력값 재설정
      const target = event.target as HTMLFormElement;
      target.reset();

      // 확인창 표시
      const confirmed = window.confirm("등록하시겠습니까?");
      if (confirmed) {
        // 확인을 클릭하면 페이지 이동
        router.push("/");
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
      <div className="flex flex-col w-[900px] h-auto border-2 border-gray-300 rounded-3xl mx-auto mb-12">
        {/* new green-action */}
        <div className="m-4 ml-8 text-md font-semibold">New Green-Action</div>
        <hr className="border-t-2 border-gray-300" />
        {/* 안쪽 박스 */}
        <div className="p-10 w-full h-full">
          {/* 이미지 4장 자리*/}
          <div className="flex gap-2 w-full h-auto mb-8">
            <div className="flex border-2 border-dashed border-gray-300 rounded-3xl w-1/4 h-[200px]">
              <div className="flex flex-col w-full h-full justify-end items-center mt-auto">
                <p className="mb-4 text-4xl font-thin text-gray-500 cursor-pointer">
                  +
                </p>
                <p className="mb-px font-medium text-gray-500">Upload Image</p>
                <p className="text-xs mb-8 text-gray-400">or drag & drop</p>
              </div>
            </div>
            <div className="flex border-2 border-dashed border-gray-300 rounded-3xl w-1/4 h-[200px]">
              <div className="flex flex-col w-full h-full justify-end items-center mt-auto">
                <p className="mb-4 text-4xl font-thin text-gray-500 cursor-pointer">
                  +
                </p>
                <p className="mb-px font-medium text-gray-500">Upload Image</p>
                <p className="text-xs mb-8 text-gray-400">or drag & drop</p>
              </div>
            </div>
            <div className="flex border-2 border-dashed border-gray-300 rounded-3xl w-1/4 h-[200px]">
              <div className="flex flex-col w-full h-full justify-end items-center mt-auto">
                <p className="mb-4 text-4xl font-thin text-gray-500 cursor-pointer">
                  +
                </p>
                <p className="mb-px font-medium text-gray-500">Upload Image</p>
                <p className="text-xs mb-8 text-gray-400">or drag & drop</p>
              </div>
            </div>
            <div className="flex border-2 border-dashed border-gray-300 rounded-3xl w-1/4 h-[200px]">
              <div className="flex flex-col w-full h-full justify-end items-center mt-auto">
                <p className="mb-4 text-4xl font-thin text-gray-500 cursor-pointer">
                  +
                </p>
                <p className="mb-px font-medium text-gray-500">Upload Image</p>
                <p className="text-xs mb-8 text-gray-400">or drag & drop</p>
              </div>
            </div>
          </div>
          {/* 이미지아래 첫번째 박스 */}
          <div className="flex justify-between w-full h-auto border-2 border-gray-300 rounded-3xl mb-4">
            {/* 왼 */}
            <div className="flex flex-col justify-center w-1/2 h-[230px] gap-2 p-4 pl-6 pr-12">
              <div className="mb-4">
                <p className="font-semibold mb-2">활동 날짜</p>
                <div className="flex w-full gap-4 justify-between">
                  <div className="flex flex-col w-1/2">
                    <p className="text-xs text-gray-400">시작일</p>
                    <input
                      type="date"
                      className="h-[40px] p-4 border-2 border-gray-300 rounded-full bg-inherit  text-xs text-gray-400"
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <p className="text-xs text-gray-400">종료일</p>
                    <input
                      type="date"
                      className="h-[40px] p-4 border-2 border-gray-300 rounded-full bg-inherit  text-xs text-gray-400"
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-2">모집 인원</p>
                <div className="border-2 border-gray-300 rounded-full text-xs text-gray-400 pl-4">
                  최대
                  <input className="w-1/4 h-[35px] text-right mx-4 pr-4  bg-inherit focus:outline-none" />
                  명
                </div>
              </div>
            </div>
            {/* 오 */}
            <div className="flex flex-col justify-center w-1/2 h-[230px] gap-2 p-4 pl-6 pr-12">
              <div className="mb-7">
                <div>
                  <p className="font-semibold mb-2">활동 장소</p>
                  <div className="border-2 border-gray-300 rounded-full text-sm text-gray-400 pl-4">
                    <input className="w-10/12 h-[35px] mx-4 pr-4 bg-inherit focus:outline-none" />
                  </div>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-2">오픈 채팅방 링크</p>
                <div className="border-2 border-gray-300 rounded-full text-sm text-gray-400 pl-4">
                  <input className="w-10/12 h-[35px] mx-4 pr-4 bg-inherit focus:outline-none" />
                </div>
              </div>
            </div>
          </div>
          {/* 이미지아래 두번째 박스(활동 제목) */}
          <div className="flex w-full h-auto items-center pl-8 border-2 border-gray-300 rounded-3xl mb-4">
            <p className="font-semibold mr-8">활동 제목</p>
            <input className="w-10/12 h-[50px] mx-4 pr-4 bg-inherit focus:outline-none text-sm text-gray-400" />
          </div>
          {/* 이미지 아래 세번째 박스(활동 소개) */}
          <div className="flex items-start w-full h-auto pl-8 border-2 border-gray-300 rounded-3xl mb-8">
            <p className="font-semibold mr-8 mt-4">활동 소개</p>
            <textarea className="resize-none w-10/12 h-[100px] mx-4 mt-4 pr-4 bg-inherit focus:outline-none text-sm text-gray-400" />
          </div>
          {/* 등록, 취소 버튼 */}
          <div className="flex justify-center gap-4">
            <button className="bg-gray-100 w-40 h-10 rounded-full border-2 border-gray-300 text-sm font-medium text-gray-500">
              등록완료
            </button>
            <button className="bg-gray-100 w-40 h-10 rounded-full border-2 border-gray-300 text-sm font-medium text-gray-500">
              취소하기
            </button>
          </div>
        </div>
      </div>

      {/* 이미지 업로드 */}
      <div className="flex justify-center">
        <div className="w-1/2 h-96 bg-slate-400 mb-14">이미지업로드</div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* 입력창 */}
        <div className="flex flex-col item-center justify-center ml-80 mb-20">
          <div className="flex gap-16">
            <label htmlFor="startDate">시작일 :</label>
            <input type="date" id="startDate" name="startDate" required />
            <label htmlFor="endDate">종료일 :</label>
            <input type="date" id="endDate" name="endDate" required />
          </div>
          <div className="flex gap-16">
            <label htmlFor="activityTitle">활동 제목 :</label>
            <input
              type="text"
              id="activityTitle"
              name="activityTitle"
              required
            />
          </div>
          <div className="flex gap-16">
            <label htmlFor="activityDescription">활동 내용 소개 :</label>
            <input
              type="text"
              id="activityDescription"
              name="activityDescription"
              required
            />
          </div>
          <div className="flex gap-16">
            <label htmlFor="activityLocation">활동 장소 :</label>
            <input
              type="text"
              id="activityLocation"
              name="activityLocation"
              required
            />
            <label htmlFor="maxParticipants">최대 모집 인원 :</label>
            <input
              type="number"
              id="maxParticipants"
              name="maxParticipants"
              required
            />
          </div>
          <div className="flex gap-16">
            <label htmlFor="openKakaoLink">오픈카톡링크 (필수) :</label>
            <input
              type="url"
              id="openKakaoLink"
              name="openKakaoLink"
              required
            />
          </div>
        </div>
        {/* 등록버튼 */}
        <div className="flex justify-end mr-40">
          <button type="submit">등록완료</button>
        </div>
      </form>
    </>
  );
};

export default AddAction;
