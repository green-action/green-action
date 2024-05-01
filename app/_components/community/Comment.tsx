import { useState } from "react";
import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import {
  useDeleteCommentMutation,
  useEditCommentMutation,
} from "@/app/_hooks/useMutations/comments";

import type { CommentProps } from "@/app/_types/community/community";

const CommunityPostComment: React.FC<CommentProps> = ({ comment }) => {
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  const comment_id = comment.id;

  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content!);

  const { display_name, profile_img } = comment?.users || {
    display_name: null,
    profile_img: null,
  };

  const { deleteCommentMutation } = useDeleteCommentMutation();
  const { editCommentMutation } = useEditCommentMutation();

  const imgSrc = profile_img || "";

  const handleDeleteComment = () => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      deleteCommentMutation(comment_id);
    }
  };

  const handleEditComment = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    editCommentMutation({ comment_id, editedComment });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedComment(comment.content!); // t
  };

  return (
    <>
      <div className="flex justify-between " key={comment.id}>
        <div className="flex w-[90%] mx-auto mb-4 ">
          <Avatar
            showFallback
            src={imgSrc}
            className="mr-2 w-[25px] h-[25px] rounded-full"
          />
          <div className="flex w-full justify-between">
            {isEditing ? (
              <input
                type="text"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                autoFocus
              />
            ) : (
              <div className="flex flex-col justify-between">
                <p className=" mt-0.2 mb-1">
                  <span className="text-[14px] font-extrabold mr-1">
                    {display_name}
                  </span>
                  <span className="text-[12px] font-thin">Greener</span>
                </p>
                <p className="text-xs text-gray-500 mb-1">{comment.content}</p>
              </div>
            )}
            <div className="flex items-center">
              {comment.user_uid === loggedInUserUid && (
                <div className="flex">
                  <button
                    className="text-xs font-light w-[30px] h-1/4 text-center"
                    onClick={isEditing ? handleSaveEdit : handleEditComment}
                  >
                    {isEditing ? "저장" : "수정"}
                  </button>
                  <button
                    className="text-xs font-light w-[30px] h-1/4 text-center"
                    onClick={isEditing ? handleCancelEdit : handleDeleteComment}
                  >
                    {isEditing ? "취소" : "삭제"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CommunityPostComment;
