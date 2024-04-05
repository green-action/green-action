import { deleteCommentPost } from "@/app/_api/community/comments-api";
import { QEURY_KEY_COMMUNITY_COMMENTS_LIST } from "@/app/_api/queryKeys";
import { CommentProps } from "@/app/_types/community/community";
import { Avatar } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const CommunityPostComment = ({ comment }: { comment: CommentProps }) => {
  // 현재 로그인한 유저 uid
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  const comment_id = comment.id;

  // 댓글 작성자 정보 가져오기
  const { display_name, profile_img } = comment?.users || {
    display_name: null,
    profile_img: null,
  };
  const queryClient = useQueryClient();

  // 댓글 삭제 mutation
  const { mutate: deleteCommentMutation } = useMutation({
    mutationFn: (comment_id: string) => deleteCommentPost(comment_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QEURY_KEY_COMMUNITY_COMMENTS_LIST],
      });
    },
  });

  // profile_img가 null인 경우 undefined로 변환해주는 과정 (null이면 src안에서 타입에러 발생)
  const imgSrc = profile_img || "";

  // 댓글 수정
  const handleEditComment = () => {};
  // 댓글 삭제
  const handleDeleteComment = () => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      deleteCommentMutation(comment.id);
    }
  };

  return (
    <>
      <div className="flex justify-between " key={comment.id}>
        <div className="flex w-[90%] mx-auto mb-4 ">
          <Avatar
            showFallback
            src={imgSrc}
            className="mr-2 w-[20px] h-[20px] rounded-full"
          />
          <div className="flex w-full justify-between">
            <div className="flex flex-col justify-between">
              <p className="text-xs mt-0.5 mb-1">{display_name} Greener</p>
              <p className="text-xs text-gray-500">{comment.content}</p>
            </div>
            <div className="flex items-center">
              {comment.user_uid === loggedInUserUid && (
                <div className="flex">
                  <button
                    className="text-xs font-light w-[30px] h-1/4 text-center"
                    onClick={handleEditComment}
                  >
                    수정
                  </button>
                  <button
                    className="text-xs font-light w-[30px] h-1/4 text-center"
                    onClick={handleDeleteComment}
                  >
                    삭제
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
