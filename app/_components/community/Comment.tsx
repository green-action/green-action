import { CommentProps } from "@/app/_types/community/community";
import React from "react";

const CommunityPostComment = ({ comment }: { comment: CommentProps }) => {
  return (
    <>
      {" "}
      <div className="flex justify-between">
        <div className="flex w-[90%] mx-auto mb-4">
          <div className="bg-black mr-2 w-[20px] h-[20px] rounded-full"></div>
          <div className="flex flex-col justify-between">
            <p className="text-xs mt-1 mb-1">스파르타 Greener</p>
            <p className="text-xs text-gray-500">{comment.content}</p>
          </div>
        </div>
        <div className="flex items-center">
          <button className="text-xs font-light w-[30px] h-1/4 text-center">
            수정
          </button>
          <button className="text-xs font-light w-[30px] h-1/4 text-center">
            삭제
          </button>
        </div>
      </div>
    </>
  );
};

export default CommunityPostComment;
