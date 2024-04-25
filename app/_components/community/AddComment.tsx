"use client";
import React, { useState } from "react";

import type { AddCommentProps } from "@/app/_types/comments/comments";

import { useInsertCommunityCommentMutation } from "@/app/_hooks/useMutations/comments";
import { useGetCurrentUerProfileImg } from "@/app/_hooks/useQueries/comments";

import { Avatar } from "@nextui-org/react";

import { updateUserPoint } from "@/app/_api/individualAction-add/add-api";
import Image from "next/image";
import PointModal from "./PointModal";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";

const AddComment = ({ loggedInUserUid, post_id }: AddCommentProps) => {
  // 로그인한 유저 프로필이미지
  const { currentUserProfileImg, isLoading, isError } = loggedInUserUid
    ? useGetCurrentUerProfileImg(loggedInUserUid)
    : { currentUserProfileImg: null, isLoading: false, isError: false };

  // 댓글 등록 mutation
  const { insertCommentMutation } = useInsertCommunityCommentMutation();

  // PointModal을 위한 상태관리
  const [showPointModal, setShowPointModal] = useState(false);

  // custom confirm창을 위한 상태관리
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={SoomLoaing} alt="SoomLoading" />
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  // 댓글 등록 핸들러 (기존)
  const handleInsertComment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const isConfirm = window.confirm("등록하시겠습니까?");
      if (isConfirm) {
        const formData = new FormData(e.target as HTMLFormElement);
        const content = formData.get("comment") as string;
        setShowPointModal(true);
        insertCommentMutation({ content, loggedInUserUid, post_id });

        // 200포인트 업데이트
        await updateUserPoint(loggedInUserUid, { mode: "comment" });

        // 입력값 초기화
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <>
      {/* 댓글 등록 */}
      <Avatar
        showFallback
        src={currentUserProfileImg || ""}
        className="w-[35px] h-[35px] rounded-full mr-2 mb-5"
      />
      <form
        onSubmit={handleInsertComment}
        className={`w-[100%] flex items-center border-1 border-gray-300 h-[35px] rounded-full mb-5 ${
          !loggedInUserUid ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <label className="w-[88%]">
          <input
            type="text"
            id="comment"
            name="comment"
            placeholder={loggedInUserUid ? "댓글 쓰기" : "로그인이 필요합니다."}
            readOnly={!loggedInUserUid}
            required
            className="w-[90%] h-[28px] ml-5 pr-4 bg-inherit focus:outline-none text-xs text-gray-400"
          />
        </label>
        <button
          type="submit"
          className="text-xs mr-2 cursor-pointer"
          disabled={!loggedInUserUid}
        >
          | 등록
        </button>
      </form>
      {showPointModal && (
        <PointModal
          isOpen={showPointModal}
          onCloseFn={() => setShowPointModal(false)}
          point={100}
        />
      )}
      {/* {isConfirmOpen && (
        <CustomConfirm
          text="등록하시겠습니까?"
          mode="addComment"
          // okFunction={() => handleInsertComment}
          okFunction={() => handleConfirm}
        />
      )} */}
    </>
  );
};

export default AddComment;
