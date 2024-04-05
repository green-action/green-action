import { useQueryUser } from "@/app/_hooks/useQueries/user";
import { CommentProps } from "@/app/_types/community/community";
import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";

const CommunityPostComment = ({ comment }: { comment: CommentProps }) => {
  // 현재 로그인한 유저 uid
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  // 댓글 작성자 정보 가져오기
  const { display_name, profile_img } = comment?.users || {
    display_name: null,
    profile_img: null,
  };

  // profile_img가 null인 경우 undefined로 변환해주는 과정 (null이면 src안에서 타입에러 발생)
  const imgSrc = profile_img || "";

  const { data: users } = useQueryUser();
  const user_uid = users?.user?.user_metadata.sub;

  return (
    <>
      <div className="flex justify-between" key={comment.id}>
        <div className="flex w-[90%] mx-auto mb-4">
          <Avatar
            showFallback
            src={imgSrc}
            className="mr-2 w-[20px] h-[20px] rounded-full"
          />
          <div className="flex flex-col justify-between">
            <p className="text-xs mt-1 mb-1">{display_name} Greener</p>
            <p className="text-xs text-gray-500">{comment.content}</p>
          </div>
        </div>
        <div className="flex items-center">
          {comment.user_uid === loggedInUserUid && (
            <>
              <button className="text-xs font-light w-[30px] h-1/4 text-center">
                수정
              </button>
              <button className="text-xs font-light w-[30px] h-1/4 text-center">
                삭제
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CommunityPostComment;
