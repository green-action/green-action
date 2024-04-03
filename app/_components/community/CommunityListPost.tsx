import { CommunityPostObj } from "@/app/_types/community/community";
import { Button, Card, CardFooter, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommunityDetailModal from "./CommunityDetailModal";

const CommunityListPost = ({
  communityPost,
}: {
  communityPost: CommunityPostObj | undefined;
}) => {
  const [isLike, setIsLike] = useState(false);
  // 커뮤니티 디테일 모달창 props
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const post_id = communityPost?.id as string;

  // communityPost.user_uid 로 유저의 프로필이미지, 닉네임 가져오기
  // (카드에서 작성자 정보 보여주기)

  const handleLikeOnClick = async () => {
    if (!isLike) {
      setIsLike((prev) => !prev);
    } else if (isLike) {
      setIsLike((prev) => !prev);
    }
  };

  return (
    <>
      <div className=" w-[31%] mb-2 ">
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
              <div className="rounded-full bg-black mr-4 w-[26px] h-[26px]"></div>
              <p className="text-tiny text-black text-[13https://cdn.imweb.me/thumbnail/20220707/39dbbc8e6c313.jpgpx]">
                뚜찌빠찌 Greener
              </p>
            </div>
            <div className="flex items-center">
              <Button
                className="text-white bg-transparent !p-0"
                radius="lg"
                size="sm"
              >
                <>
                  {isLike ? (
                    <>
                      <FaHeart
                        onClick={handleLikeOnClick}
                        className="hover:cursor-pointer text-rose-600 text-[15px]"
                      />
                      <p className="text-xs text-black">3</p>
                    </>
                  ) : (
                    <>
                      <FaRegHeart
                        onClick={handleLikeOnClick}
                        className="hover:cursor-pointer text-rose-600 text-[15px]"
                      />
                      <p className="text-xs text-black">3</p>
                    </>
                  )}
                </>
              </Button>
            </div>
          </CardFooter>
        </Card>
        <div className="flex justify-center items-center">
          <div className="mr-2 rounded-full border-1 border-gray-300 text-xs p-0.5 px-4 w-[128px]">
            {communityPost?.action_type}와 함께해요
          </div>
          <p className="text-xs w-3/4 mr-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {communityPost?.content}
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
