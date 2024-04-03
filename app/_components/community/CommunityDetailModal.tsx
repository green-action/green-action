import {
  getCommunityCommentsList,
  insertCommunityComment,
} from "@/app/_api/community/comments-api";
import { getPostContents } from "@/app/_api/community/community-api";
import {
  QEURY_KEY_COMMUNITY_COMMENTS_LIST,
  QUERY_KEY_COMMUNITY_POST,
} from "@/app/_api/queryKeys";
import { CommunityDetailProps } from "@/app/_types/community/community";
import { formatToLocaleDateString } from "@/utils/date/date";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import CommunityPostComment from "./Comment";

const CommunityDetailModal = ({
  isOpen,
  onOpenChange,
  post_id,
}: CommunityDetailProps) => {
  const [isLike, setIsLike] = useState(false);
  const queryClient = useQueryClient();

  // 임시 user_uid로 일단 테스트하기
  // 현재 로그인한 유저의 uid가져오기로 수정해야 함
  const currentUserUid = "55e7ec4c-473f-4754-af5e-9eae5c587b81";

  const handleLikeOnClick = async () => {
    if (!isLike) {
      setIsLike((prev) => !prev);
    } else if (isLike) {
      setIsLike((prev) => !prev);
    }
  };

  // 게시글 정보 가져오기
  const {
    data: communityPost,
    isLoading: postIsLoading,
    isError: postIsError,
  } = useQuery({
    queryKey: [QUERY_KEY_COMMUNITY_POST, post_id],
    queryFn: () => getPostContents(post_id),
  });

  // 댓글 리스트 가져오기
  const {
    data: communityComments,
    isLoading: commentsIsLoading,
    isError: commentsIsError,
  } = useQuery({
    queryKey: [QEURY_KEY_COMMUNITY_COMMENTS_LIST],
    queryFn: () => getCommunityCommentsList(post_id),
  });

  // 댓글 등록 mutation
  const { mutate: insertCommentMutation } = useMutation({
    mutationFn: async ({
      content,
      currentUserUid,
      post_id,
    }: {
      content: string;
      currentUserUid: string;
      post_id: string;
    }) => {
      await insertCommunityComment({ content, currentUserUid, post_id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QEURY_KEY_COMMUNITY_COMMENTS_LIST],
      });
    },
  });

  if (postIsLoading || commentsIsLoading) {
    return <div>Loading...</div>;
  }
  if (postIsError || commentsIsError) {
    return <div>Error</div>;
  }

  const { display_name, profile_img } = communityPost?.users || {
    display_name: null,
    profile_img: null,
  };
  // null인 경우 undefined로 변환해주는 과정 (null이면 src안에서 타입에러 발생)
  const imgSrc = profile_img || "";

  // 날짜 형식 변경
  const formattedDate = communityPost
    ? formatToLocaleDateString(communityPost.created_at)
    : "";

  // 댓글 등록 핸들러
  const handleInsertComment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const isConfirm = window.confirm("등록하시겠습니까?");
      if (isConfirm) {
        const formData = new FormData(e.target as HTMLFormElement);
        const content = formData.get("comment") as string;
        insertCommentMutation({ content, currentUserUid, post_id });

        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="h-[600px] overflow-y-auto scrollbar-hide">
          {() => (
            <>
              <ModalHeader className="flex gap-2 items-center mt-1 pb-1 ml-4">
                <Avatar
                  showFallback
                  src={imgSrc}
                  className="w-[30px] h-[30px] rounded-full mr-2"
                />
                <p className="font-semibold text-xs">{display_name}</p>
                <p className="font-normal text-xs">Greener</p>
              </ModalHeader>
              <ModalBody>
                {/* 이미지 자리 */}
                <img
                  src={communityPost?.img_url ?? "기본 이미지 URL"}
                  alt="Community Post"
                  className="mx-auto mb-1 w-[96%] h-[260px] rounded-2xl bg-slate-300"
                />
                {/* 이미지 아래 전체 wrapper */}
                <div className="flex flex-col gap-2 w-[90%] mx-auto">
                  {/* 첫 줄 */}
                  <div className="flex justify-between mb-2 ">
                    <div className="flex gap-2 items-center">
                      <p className=" rounded-full border-1 border-gray-300 text-xs p-0.5 px-4 w-[110px]">
                        {communityPost?.action_type}과 함께해요
                      </p>
                      <p className="text-[13px] font-semibold">
                        {communityPost?.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isLike ? (
                        <>
                          <FaHeart
                            onClick={handleLikeOnClick}
                            className="hover:cursor-pointer text-rose-600 text-[17px]"
                          />
                          <p className="text-xs text-black">3</p>
                        </>
                      ) : (
                        <>
                          <FaRegHeart
                            onClick={handleLikeOnClick}
                            className="hover:cursor-pointer text-rose-600 text-[17px]"
                          />
                          <p className="text-xs text-black">3</p>
                        </>
                      )}
                    </div>
                  </div>
                  {/* 두번째 : 활동 내용 -> ...더보기 처리하기*/}
                  <p className=" mx-auto text-xs mb-5 w-[97%]">
                    {communityPost?.content}
                  </p>
                  {/* 세번째 : 작성일, dot -> 내가 쓴 글 일 때만 보이게 */}
                  <div className="flex justify-between items-end ">
                    <p className="text-[11px]">{formattedDate}</p>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          className="bg-transparent mb-1 !p-0 mx-0 h-[12px] "
                          style={{ width: "2px" }}
                        >
                          <HiOutlineDotsVertical className="cursor-pointer" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="수정">수정</DropdownItem>
                        <DropdownItem
                          key="삭제"
                          className="text-danger"
                          color="danger"
                        >
                          삭제
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <hr className="mb-1" />
                  {/* 댓글 wrapper */}
                  <div className="flex flex-col mx-auto mb-2 w-[95%]">
                    <p className="text-xs mb-1">댓글</p>
                    {/* 댓글 등록 - 로그인 상태일 때만 보이게 */}
                    <form
                      onSubmit={handleInsertComment}
                      className="flex items-center border-1 border-gray-300 h-[30px] rounded-full mb-4"
                    >
                      <label className="w-[88%]">
                        <input
                          type="text"
                          id="comment"
                          name="comment"
                          required
                          className="w-[90%] h-[28px] ml-5 pr-4 bg-inherit focus:outline-none text-xs text-gray-400"
                        />
                      </label>
                      <button
                        type="submit"
                        className="text-xs mr-2 cursor-pointer"
                      >
                        | 등록
                      </button>
                    </form>
                    {/* 댓글 */}
                    {communityComments?.map((comment) => (
                      <CommunityPostComment
                        key={comment.id}
                        comment={comment}
                      />
                    ))}
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommunityDetailModal;
