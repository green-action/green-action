import React from "react";
import type { AddCommentProps } from "@/app/_types/comments/comments";
import { useInsertCommunityCommentMutation } from "@/app/_hooks/useMutations/comments";

const AddComment = ({ loggedInUserUid, post_id }: AddCommentProps) => {
  // 댓글 등록 mutation
  const { insertCommentMutation } = useInsertCommunityCommentMutation();

  // 댓글 등록 핸들러
  const handleInsertComment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const isConfirm = window.confirm("등록하시겠습니까?");
      if (isConfirm) {
        const formData = new FormData(e.target as HTMLFormElement);
        const content = formData.get("comment") as string;
        insertCommentMutation({ content, loggedInUserUid, post_id });

        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <>
      {/* 댓글 등록 - 로그인 상태일 때만 보이게 */}
      <form
        onSubmit={handleInsertComment}
        className="flex items-center border-1 border-gray-300 h-[30px] rounded-full mb-4"
      >
        <label className="w-[88%]">
          {loggedInUserUid ? (
            <input
              type="text"
              id="comment"
              name="comment"
              required
              className="w-[90%] h-[28px] ml-5 pr-4 bg-inherit focus:outline-none text-xs text-gray-400"
            />
          ) : (
            <input
              type="text"
              id="comment"
              name="comment"
              placeholder="로그인이 필요합니다."
              readOnly
              required
              className="w-[90%] h-[28px] ml-5 pr-4 bg-inherit focus:outline-none text-xs text-gray-400"
            />
          )}
        </label>
        <button type="submit" className="text-xs mr-2 cursor-pointer">
          | 등록
        </button>
      </form>
    </>
  );
};

export default AddComment;