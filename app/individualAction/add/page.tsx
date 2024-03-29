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
