import type { CommunityPostObj } from "@/app/_types/community/community";

import Likes from "../likes/Likes";
import CommunityDetailModal from "./CommunityDetailModal";

import { Avatar, Card, CardFooter, useDisclosure } from "@nextui-org/react";
import { longStyle } from "./style";

const CommunityListPost = ({
  communityPost,
  mode,
}: {
  communityPost: CommunityPostObj | undefined;
  mode: string;
}) => {
  // 게시글 상세 모달창 open여부 props
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const post_id = communityPost?.id as string;

  // 게시글 작성자 정보
  const { display_name, profile_img } = communityPost?.users || {
    display_name: null,
    profile_img: null,
  };
  // profile_img가 null인 경우 undefined로 변환 (null이면 src안에서 타입에러 발생)
  const imgSrc = profile_img || "";

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
          className="border-none h-[240px] mb-3"
        >
          <img
            onClick={() => onOpen()}
            alt="Community Post Image"
            className="object-cover w-full h-[198px] cursor-pointer"
            src={communityPost?.img_url}
          />
          <CardFooter className="justify-between  border-white/20 border-1 overflow-hidden py-1 absolute bottom-0 w-[calc(100%)] shadow-small  z-10 pl-4 pr-1">
            <div className="flex items-center">
              <Avatar
                showFallback
                src={imgSrc}
                className="rounded-full mr-4 w-[26px] h-[26px]"
              />
              <p className="text-tiny text-black text-[13https://cdn.imweb.me/thumbnail/20220707/39dbbc8e6c313.jpgpx]">
                {display_name} Greener
              </p>
            </div>
            <div className="flex items-center">
              <div className={longStyle}>
                <Likes post_id={communityPost?.id as string} />
              </div>
            </div>
          </CardFooter>
        </Card>
        <div className="flex justify-center items-center">
          <div className="mr-2 rounded-full border-1 border-gray-300 text-xs text-center p-0.5 px-4 w-[135px]">
            {communityPost?.action_type}와 함께해요
          </div>
          <p className="text-xs w-3/4 mr-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
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
        />
      )}
    </>
  );
};

export default CommunityListPost;
