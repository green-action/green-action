import { getPostContents } from "@/app/_api/community/community-api";
import { QUERY_KEY_COMMUNITY_POST } from "@/app/_api/queryKeys";
import { CommunityDetailProps } from "@/app/_types/community/community";
import { formatToLocaleDateString } from "@/utils/date/date";
import {
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
import { useQuery } from "@tanstack/react-query";
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
  const handleLikeOnClick = async () => {
    if (!isLike) {
      setIsLike((prev) => !prev);
    } else if (isLike) {
      setIsLike((prev) => !prev);
    }
  };

  const {
    data: communityPost,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY_COMMUNITY_POST, post_id],
    queryFn: () => getPostContents(post_id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  const formattedDate = communityPost
    ? formatToLocaleDateString(communityPost.created_at)
    : "";

  // console.log("communityPost", communityPost);
  // user_uid로 게시글 작성자 정보 가져오기 필요!!! -> 리스트, 상세모달창 둘다 수정

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="h-[600px] overflow-y-auto scrollbar-hide">
          {() => (
            <>
              <ModalHeader className="flex gap-2 items-center mt-1 pb-1 ml-4">
                <div className="bg-black w-[30px] h-[30px] rounded-full mr-2" />
                <p className="font-semibold text-xs">뚜찌빠찌</p>
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
                    <form className="flex items-center border-1 border-gray-300 h-[30px] rounded-full mb-4">
                      <label className="w-[88%]">
                        <input
                          type="text"
                          id="activityTitle"
                          name="activityTitle"
                          required
                          className=" h-[34px] ml-5 pr-4 bg-inherit focus:outline-none text-xs text-gray-400"
                        />
                      </label>
                      <button
                        type="submit"
                        className="text-xs mr-2 cursor-pointer"
                      >
                        | 등록
                      </button>
                    </form>
                    {/* 댓글 1개 */}
                    <CommunityPostComment />
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
