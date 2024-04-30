import React from "react";
import { useDeleteCommunityPostMutation } from "@/app/_hooks/useMutations/community";
import { useGetCommunityCommentsList } from "@/app/_hooks/useQueries/comments";
import { useGetPostContents } from "@/app/_hooks/useQueries/community";
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
import { useSession } from "next-auth/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Likes from "../likes/Likes";
import AddComment from "./AddComment";
import CommunityPostComment from "./Comment";
import EditPostModal from "./EditPostModal";
import Image from "next/image";
import { ACTION_TYPE_PERSONAL } from "@/app/_api/constant";

import type { CommunityDetailProps } from "@/app/_types/community/community";

const CommunityDetailModal: React.FC<CommunityDetailProps> = ({
  isOpen,
  onOpenChange,
  post_id,
  mode,
}) => {
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();

  const { communityPost } = useGetPostContents(post_id);
  const { communityComments } = useGetCommunityCommentsList(post_id);
  const { deletePostMutation } = useDeleteCommunityPostMutation();

  const formattedDate = communityPost
    ? formatToLocaleDateString(communityPost.created_at)
    : "";

  const sortedLatestCommentsList = communityComments?.slice().sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const { display_name, profile_img } = communityPost?.users || {
    display_name: null,
    profile_img: null,
  };
  const imgSrc = profile_img || "";

  const handleDeletePost = () => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      deletePostMutation(post_id);
    }
  };

  return (
    <>
      <Modal
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent className="relative h-[740px] overflow-y-auto scrollbar-hide">
          {() => (
            <>
              <ModalHeader className="flex gap-2 items-center mt-6 mb-2 pb-1 ml-4">
                <Avatar
                  showFallback
                  src={imgSrc}
                  className="w-[30px] h-[30px] rounded-full mr-2"
                />
                <p className="font-semibold text-[14px]">{display_name}</p>
                <p className="font-normal text-xs">Greener</p>
              </ModalHeader>
              <ModalBody className="pb-0">
                <Image
                  width={500}
                  height={300}
                  src={communityPost?.img_url ?? "기본 이미지 URL"}
                  alt="Community Post"
                  className="mx-auto mb-2 w-[95%] h-[300px] rounded-2xl bg-slate-300 object-cover"
                />
                <div className="flex flex-col gap-2 w-[90%] mx-auto">
                  <div className="flex justify-between mb-2 ">
                    <div className="flex gap-2 items-center">
                      <p className="flex items-center justify-center rounded-full border-1.5 border-black text-xs text-center p-0.5 px-4 mr-1 w-[120px] h-[25px]">
                        {communityPost?.action_type === ACTION_TYPE_PERSONAL
                          ? "개인과 함께해요"
                          : "단체와 함께해요"}
                      </p>
                      <p className="text-[14px] font-extrabold">
                        {communityPost?.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Likes post_id={post_id} isOpen={isOpen} mode="" />
                    </div>
                  </div>
                  <p className=" mx-auto text-[12.5px] mb-5 w-[97%]">
                    {communityPost?.content}
                  </p>
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
                  <div className="flex flex-col mx-auto mb-2 w-[98%]">
                    <p className="text-xs text-gray-500 mb-[20px]">댓글</p>
                    {sortedLatestCommentsList?.length === 0 ? (
                      <p className="text-center text-[13px] text-gray-500 font-light mt-4 h-[55px]">
                        댓글로 Greener를 응원해보아요 🎉
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
                <div className="sticky flex items-end bottom-0 pt-3 mx-auto w-[90%] bg-white">
                  <AddComment
                    loggedInUserUid={loggedInUserUid}
                    post_id={post_id}
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <EditPostModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        onOpenChange={onEditOpenChange}
        post_id={post_id}
        mode={mode || ""}
      />
    </>
  );
};

export default CommunityDetailModal;
