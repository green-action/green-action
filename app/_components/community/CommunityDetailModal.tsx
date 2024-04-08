import { useSession } from "next-auth/react";

import type { CommunityDetailProps } from "@/app/_types/community/community";

import { useDeleteCommunityPostMutation } from "@/app/_hooks/useMutations/community";
import { useGetCommunityCommentsList } from "@/app/_hooks/useQueries/comments";
import { useGetPostContents } from "@/app/_hooks/useQueries/community";

import Likes from "../likes/Likes";
import CommunityPostComment from "./Comment";
import EditPostModal from "./EditPostModal";
import AddComment from "./AddComment";

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

import { formatToLocaleDateString } from "@/utils/date/date";
import { HiOutlineDotsVertical } from "react-icons/hi";

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

  // 게시글 정보 가져오기
  const { communityPost } = useGetPostContents(post_id);

  // 댓글 리스트 가져오기
  const { communityComments } = useGetCommunityCommentsList(post_id);

  // 게시글 삭제 mutation
  const { deletePostMutation } = useDeleteCommunityPostMutation();

  // 날짜 형식 변경
  const formattedDate = communityPost
    ? formatToLocaleDateString(communityPost.created_at)
    : "";

  // 댓글 리스트 최신순 정렬
  const sortedLatestCommentsList = communityComments?.slice().sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  // 게시글 작성자 닉네임, 프로필 이미지 가져오기
  const { display_name, profile_img } = communityPost?.users || {
    display_name: null,
    profile_img: null,
  };
  // profile_img가 null인 경우 undefined로 변환 (null이면 src안에서 타입에러 발생)
  const imgSrc = profile_img || "";

  // 게시글 삭제 핸들러
  const handleDeletePost = () => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      deletePostMutation(post_id);
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
                  {/* 두번째 줄 : 활동 내용 */}
                  <p className=" mx-auto text-xs mb-5 w-[97%]">
                    {communityPost?.content}
                  </p>
                  {/* 세번째 줄 : 작성일, dot 드롭다운 */}
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
                    {/* 댓글 등록 */}
                    <AddComment
                      loggedInUserUid={loggedInUserUid}
                      post_id={post_id}
                    />
                    {/* 댓글 map */}
                    {sortedLatestCommentsList?.length === 0 ? (
                      <p className="text-center text-[13px] font-light mt-4">
                        첫 댓글의 주인공이 되어보세요 🎉
                      </p>
                    ) : (
                      sortedLatestCommentsList?.map((comment) => (
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
        onOpenChange={onEditOpenChange}
        post_id={post_id}
        mode={mode || ""}
      />
    </>
  );
};

export default CommunityDetailModal;
