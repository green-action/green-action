"use client";

import React, { useState } from "react";
import { updateUserPoint } from "@/app/_api/individualAction-add/add-api";
import { useInsertCommunityCommentMutation } from "@/app/_hooks/useMutations/comments";
import { useGetCurrentUerProfileImg } from "@/app/_hooks/useQueries/comments";
import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import PointModal from "./PointModal";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";

import type { AddCommentProps } from "@/app/_types/comments/comments";

const AddComment: React.FC<AddCommentProps> = ({
  loggedInUserUid,
  post_id,
}) => {
  const [showPointModal, setShowPointModal] = useState(false);
  const { insertCommentMutation } = useInsertCommunityCommentMutation();

  const { currentUserProfileImg, isLoading, isError } = loggedInUserUid
    ? useGetCurrentUerProfileImg(loggedInUserUid)
    : { currentUserProfileImg: null, isLoading: false, isError: false };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={SoomLoaing} alt="SoomLoading" unoptimized />
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  const handleInsertComment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const isConfirm = window.confirm("등록하시겠습니까?");
      if (isConfirm) {
        const formData = new FormData(e.target as HTMLFormElement);
        const content = formData.get("comment") as string;
        setShowPointModal(true);
        insertCommentMutation({ content, loggedInUserUid, post_id });

        await updateUserPoint(loggedInUserUid, { mode: "comment" });

        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <>
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
    </>
  );
};

export default AddComment;
