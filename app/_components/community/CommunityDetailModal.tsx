import {
  getCommunityCommentsList,
  insertCommunityComment,
} from "@/app/_api/community/comments-api";
import {
  deleteCommunityPost,
  getPostContents,
} from "@/app/_api/community/community-api";
import {
  QEURY_KEY_COMMUNITY_COMMENTS_LIST,
  QUERY_KEY_COMMUNITYLIST,
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
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Likes from "../likes/Likes";
import CommunityPostComment from "./Comment";
import EditPostModal from "./EditPostModal";

const CommunityDetailModal = ({
  isOpen,
  onOpenChange,
  post_id,
  mode,
}: CommunityDetailProps) => {
  // 현재 로그인한 유저 uid
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  // 게시글 수정 모달창 open여부
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const queryClient = useQueryClient();

  // 게시글 정보 가져오기 useQuery
  const {
    data: communityPost,
    isLoading: postIsLoading,
    isError: postIsError,
  } = useQuery({
    queryKey: [QUERY_KEY_COMMUNITY_POST, post_id],
    queryFn: () => getPostContents(post_id),
  });

  // 댓글 리스트 가져오기 useQuery
  const {
    data: communityComments,
    isLoading: commentsIsLoading,
    isError: commentsIsError,
  } = useQuery({
    queryKey: [QEURY_KEY_COMMUNITY_COMMENTS_LIST],
    queryFn: () => getCommunityCommentsList(post_id),
  });

  // 게시글 삭제 mutation
  const { mutate: deletePostMutation } = useMutation({
    mutationFn: (post_id: string) => deleteCommunityPost(post_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_COMMUNITYLIST],
      });
    },
  });

  // 댓글 등록 mutation
  const { mutate: insertCommentMutation } = useMutation({
    mutationFn: async ({
      content,
      loggedInUserUid,
      post_id,
    }: {
      content: string;
      loggedInUserUid: string;
      post_id: string;
    }) => {
      await insertCommunityComment({ content, loggedInUserUid, post_id });
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

  // 게시글 작성자 닉네임, 프로필 이미지 가져오기
  const { display_name, profile_img } = communityPost?.users || {
    display_name: null,
    profile_img: null,
  };
  // profile_img가 null인 경우 undefined로 변환해주는 과정 (null이면 src안에서 타입에러 발생)
  const imgSrc = profile_img || "";

  // 날짜 형식 변경
  const formattedDate = communityPost
    ? formatToLocaleDateString(communityPost.created_at)
    : "";

  // 게시글 삭제 핸들러
  const handleDeletePost = () => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      deletePostMutation(post_id);
    }
  };

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
                {/* 게시글 이미지 */}
                <img
                  src={communityPost?.img_url ?? "기본 이미지 URL"}
                  alt="Community Post"
                  className="mx-auto mb-1 w-[96%] h-[260px] rounded-2xl bg-slate-300"
                />
                {/* 이미지 아래 전체 wrapper */}
                <div className="flex flex-col gap-2 w-[90%] mx-auto">
                  {/* 첫 줄 - 개인과 함께해요, 게시글 제목, 좋아요버튼 */}
                  <div className="flex justify-between mb-2 ">
                    <div className="flex gap-2 items-center">
                      <p className=" rounded-full border-1 border-gray-300 text-xs text-center p-0.5 px-4 mr-0.5 w-[120px]">
                        {communityPost?.action_type}과 함께해요
                      </p>
                      <p className="text-[13px] font-semibold">
                        {communityPost?.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Likes post_id={post_id} />
                    </div>
                  </div>
                  {/* 두번째 줄 : 활동 내용 -> 내용 긴 경우 ...더보기 처리하기*/}
                  <p className=" mx-auto text-xs mb-5 w-[97%]">
                    {communityPost?.content}
                  </p>
                  {/* 세번째 줄 : 작성일, dot 드롭다운 -> dot은 내가 쓴 글 일 때만 보이게 */}
                  <div className="flex justify-between items-end ">
                    <p className="text-[11px]">{formattedDate}</p>
                    {loggedInUserUid === communityPost?.user_uid && (
                      <Dropdown>
                        <DropdownTrigger>
                          <Button className="bg-transparent mb-1 !p-0 mx-0 h-[12px] flex justify-end">
                            <HiOutlineDotsVertical className="cursor-pointer" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                          <DropdownItem
                            key="수정"
                            onClick={() => {
                              onEditOpen();
                            }}
                          >
                            수정
                          </DropdownItem>
                          <DropdownItem
                            key="삭제"
                            className="text-danger"
                            color="danger"
                            onClick={handleDeletePost}
                          >
                            삭제
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    )}
                  </div>
                  <hr className="mb-1" />
                  {/* 댓글 전체 wrapper */}
                  <div className="flex flex-col mx-auto mb-2 w-[95%]">
                    <p className="text-xs mb-1">댓글</p>
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
                      <button
                        type="submit"
                        className="text-xs mr-2 cursor-pointer"
                      >
                        | 등록
                      </button>
                    </form>
                    {/* 댓글 map */}
                    {communityComments?.length === 0 ? (
                      <p className="text-center text-[13px] font-light mt-4">
                        첫 댓글의 주인공이 되어보세요 🎉
                      </p>
                    ) : (
                      communityComments?.map((comment) => (
                        <CommunityPostComment
                          key={comment.id}
                          comment={comment}
                        />
                      ))
                    )}
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <EditPostModal
        isOpen={isEditOpen}
        onOpen={onEditOpen}
        onOpenChange={onEditOpenChange}
        post_id={post_id}
        mode={mode || ""}
      />
    </>
  );
};

export default CommunityDetailModal;
