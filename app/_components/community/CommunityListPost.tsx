import type { CommunityPostObj } from "@/app/_types/community/community";

import Likes from "../likes/Likes";
import CommunityDetailModal from "./CommunityDetailModal";

import { Avatar, Card, Spinner, useDisclosure } from "@nextui-org/react";
import { longStyle } from "./style";

import { useGetPostContents } from "@/app/_hooks/useQueries/community";
import { useGetCommunityCommentsList } from "@/app/_hooks/useQueries/comments";

const CommunityListPost = ({
  communityPost,
  mode,
  my_display_name,
  my_profile_img,
}: {
  communityPost: CommunityPostObj | undefined;
  mode: string;
  my_display_name?: string;
  my_profile_img?: string | null;
}) => {
  // 게시글 상세 모달창 open여부 props
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const post_id = communityPost?.id as string;

  // 게시글 정보 처리상태 가져오기
  const { isPostLoading, isPostError } = useGetPostContents(post_id);

  // 댓글 리스트 처리상태 가져오기
  const { isCommentsLoading, isCommentsError } =
    useGetCommunityCommentsList(post_id);

  // 게시글 작성자 정보
  const { display_name, profile_img } = (mode !== "myPosts" &&
    communityPost?.users) || {
    display_name: null,
    profile_img: null,
  };
  // profile_img가 null인 경우 undefined로 변환 (null이면 src안에서 타입에러 발생)
  const imgSrc = profile_img || "";

  if (isPostLoading || isCommentsLoading) {
    return <Spinner color="danger" />;
  }
  if (isPostError || isCommentsError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div
        className={` ${
          mode === "main" ? "w-[330px] h-[600px]" : "w-[31%] mb-2"
        }`}
      >
        <Card
          isFooterBlurred
          radius="lg"
          className="border-none w-[410px] h-[295px] mb-3 rounded-2xl"
        >
          <div className="relative w-full h-[295px] overflow-hidden">
            <img
              onClick={() => onOpen()}
              alt="Community Post Image"
              className="object-cover w-full h-full cursor-pointer brightness-90"
              src={communityPost?.img_url}
            />
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#737373] to-transparent"></div>
          </div>
          <div className="flex items-center justify-between pl-[24px] pr-[16px] absolute bottom-0 text-white w-full h-[66px]">
            <div className="flex items-center">
              <Avatar
                showFallback
                src={imgSrc || my_profile_img || ""}
                className="rounded-full mr-4 w-[28px] h-[28px]"
              />
              <p className="text-white text-[16px] font-extrabold mr-3">
                {display_name || my_display_name}
              </p>
              <span className="text-[14px]">Greener</span>
            </div>
            <div className="flex items-center">
              <div className={longStyle}>
                <Likes post_id={communityPost?.id as string} />
              </div>
            </div>
          </div>
          {/* <CardFooter className="justify-between overflow-hidden py-1 absolute bottom-0 w-[calc(100%)]  pl-4 pr-1 bg-transparent">
            <div className="flex items-center">
              <Avatar
                showFallback
                src={imgSrc || my_profile_img || ""}
                className="rounded-full mr-4 w-[26px] h-[26px]"
              />
              <p className="text-tiny text-white text-[13https://cdn.imweb.me/thumbnail/20220707/39dbbc8e6c313.jpgpx]">
                {display_name || my_display_name} Greener
              </p>
            </div>
            <div className="flex items-center">
              <div className={longStyle}>
                <Likes post_id={communityPost?.id as string} />
              </div>
            </div>
          </CardFooter> */}
        </Card>
        <div className="flex justify-center items-center mt-4">
          <div className="flex items-center justify-center ml-[24px] rounded-full border-2 border-black text-[13px] font-extrabold p-0.5 px-4 w-[150px] h-[31px] ">
            {communityPost?.action_type}와 함께해요
          </div>
          <p className="text-[15px] font-extrabold w-3/4 ml-[27px] mr-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {communityPost?.title}
          </p>
        </div>
      </div>
      {isOpen && (
        <CommunityDetailModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          post_id={post_id}
          mode={mode}
        />
      )}
    </>
  );
};

export default CommunityListPost;
