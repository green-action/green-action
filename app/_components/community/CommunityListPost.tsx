import type { CommunityPostObj } from "@/app/_types/community/community";

import Likes from "../likes/Likes";
import CommunityDetailModal from "./CommunityDetailModal";

import { Avatar, Card, useDisclosure } from "@nextui-org/react";
import { longStyle } from "./style";

import { useGetCommunityCommentsList } from "@/app/_hooks/useQueries/comments";
import { useGetPostContents } from "@/app/_hooks/useQueries/community";
import CommunitySkeleton from "./CommunitySkeleton";
import { useResponsive } from "@/app/_hooks/responsive";

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
  const { isDesktop, isLaptop, isMobile } = useResponsive();

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
    return (
      <div
        className={` ${
          mode === "main" &&
          "desktop:w-[410px] desktop:h-[295px] laptop:w-[287px] laptop:h-[207px]"
        }
            ${
              mode === "myPosts" &&
              "desktop:w-[356px] laptop:w-[327px] laptop:h-[400px]"
            }
          ${mode !== "main" && mode !== "myPosts" && "w-[31%] mb-2"}
        `}
      >
        {mode === "myPosts" && <CommunitySkeleton mode="myPosts" />}
        {mode === "main" && <CommunitySkeleton mode="main" />}
        {mode !== "myPosts" && mode !== "main" && <CommunitySkeleton />}
      </div>
    );
  }
  if (isPostError || isCommentsError) {
    return <div>Error</div>;
  }

  return (
    <>
      {isDesktop && (
        <div
          className={` ${
            mode === "main" && "desktop:w-[410px] desktop:h-[295px]"
          }
            ${mode === "myPosts" && "desktop:w-[356px]"}
          ${
            mode !== "main" &&
            mode !== "myPosts" &&
            "desktop:w-[410px] w-[140px] mb-2"
          }
        `}
        >
          {/* 게시글 이미지 */}
          <Card
            isFooterBlurred
            radius="lg"
            className={`shadow-none border-none desktop:w-[410px] desktop:h-[295px] mb-3 rounded-2xl 
          ${mode === "myPosts" && "desktop:w-[356px] desktop:h-[250px]"}
            ${mode === "main" && "desktop:w-full desktop:h-full"}
            `}
          >
            <div className="relative w-full desktop:h-[295px] overflow-hidden">
              <img
                onClick={() => onOpen()}
                alt="Community Post Image"
                className="object-cover w-full h-full cursor-pointer brightness-90"
                src={communityPost?.img_url}
              />
              {mode === "community" && (
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t"></div>
              )}
            </div>
            {/* 사진내부영역 - 아바타,작성자,좋아요 */}
            <div className="flex items-center justify-between pl-[24px] pr-[16px] absolute bottom-0 text-white w-full h-[66px]">
              <div className="flex items-center">
                <Avatar
                  showFallback
                  src={imgSrc || my_profile_img || ""}
                  className="rounded-full mr-4 w-[28px] h-[28px]"
                />
                <p
                  className={`text-white text-[16px] font-extrabold mr-3 ${
                    mode === "myPosts" && "desktop:text-[13px]"
                  }
                ${mode === "main" && "desktop:text-[16px]"}`}
                >
                  {display_name || my_display_name}
                </p>
                <span className="text-[14px]">Greener</span>
              </div>
              <div className="flex items-center">
                <div className={longStyle}>
                  <Likes
                    post_id={communityPost?.id as string}
                    isOpen={isOpen}
                    mode="desktop"
                  />
                </div>
              </div>
            </div>
          </Card>
          {/* 사진하단영역 - 함께해요, 제목 */}
          <div
            className={`flex justify-center items-center mt-4 ${
              mode !== "myPosts" && mode !== "main" && "desktop:w-[410px]"
            }           
          ${mode === "myPosts" && "desktop:w-[335px]"} 
           ${mode === "main" && "desktop:w-[400px]"} 
          `}
          >
            {/* 함께해요 */}
            <div
              className={`flex items-center justify-center ml-[24px] rounded-[24px] 
            border-2 border-[#3E3E3E] text-[13px] font-extrabold p-0.5 w-[150px] h-[31px]
          ${
            mode === "myPosts" &&
            "ml-[15px] desktop:text-[13px] desktop:w-[160px]"
          }  
          ${
            mode === "main" &&
            "desktop:ml-[20px] desktop:w-[180px] desktop:text-[14px] desktop:px-0 desktop:h-[28px]"
          }`}
            >
              {communityPost?.action_type}와 함께해요
            </div>
            <p
              className={`text-[15px] font-extrabold w-3/4 mx-[24px] overflow-hidden whitespace-nowrap overflow-ellipsis ${
                mode === "main" && "desktop:mx-[24px] desktop:text-[16px]"
              } ${
                mode === "myPosts" &&
                " desktop:ml-[24px] mr-0 desktop:text-[15px]"
              }
            `}
            >
              {communityPost?.title}
            </p>
          </div>
        </div>
      )}
      {isLaptop && (
        <div
          className={` ${mode === "main" && "laptop:w-[287px] laptop:h-[207px]"}
            ${mode === "myPosts" && "laptop:w-[327px] laptop:h-[400px]"}
          ${mode !== "main" && mode !== "myPosts" && "laptop:w-[433px] mb-2"}
        `}
        >
          {/* 게시글 이미지 */}
          <Card
            isFooterBlurred
            radius="lg"
            className={`shadow-none border-none laptop:w-[433px] laptop:h-[311px] mb-3 rounded-2xl 
          ${mode === "myPosts" && "laptop:w-[327px] laptop:h-[230px]"}
            ${mode === "main" && "laptop:w-full laptop:h-full "}
            `}
          >
            <div className="relative w-full laptop:h-[311px] overflow-hidden">
              <img
                onClick={() => onOpen()}
                alt="Community Post Image"
                className="object-cover w-full h-full cursor-pointer brightness-90"
                src={communityPost?.img_url}
              />
              {mode === "community" && (
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t"></div>
              )}
            </div>
            {/* 사진내부영역 - 아바타,작성자,좋아요 */}
            <div className="flex items-center justify-between pl-[24px] pr-[16px] absolute bottom-0 text-white w-full h-[66px]">
              <div className="flex items-center">
                <Avatar
                  showFallback
                  src={imgSrc || my_profile_img || ""}
                  className="rounded-full mr-4 w-[28px] h-[28px]"
                />
                <p
                  className={`text-white text-[16px] font-extrabold mr-3
                ${mode === "main" && "laptop:text-[13px]"}`}
                >
                  {display_name || my_display_name}
                </p>
                <span className="text-[14px]">Greener</span>
              </div>
              <div className="flex items-center">
                <div className={longStyle}>
                  <Likes
                    post_id={communityPost?.id as string}
                    isOpen={isOpen}
                    mode="laptop"
                  />
                </div>
              </div>
            </div>
          </Card>
          {/* 사진하단영역 - 함께해요, 제목 */}
          <div
            className={`flex justify-center items-center mt-4 ${
              mode !== "myPosts" && mode !== "main" && "laptop:w-[433px]"
            }           
          ${mode === "myPosts" && "laptop:w-[300px]"} 
           ${mode === "main" && "laptop:w-[275px]"} 
          `}
          >
            <div
              className={`flex items-center justify-center ml-[24px] rounded-[24px] 
            border-2 border-[#3E3E3E] text-[13px] font-extrabold p-0.5 w-[150px] h-[31px]
          ${
            mode === "myPosts" && "ml-[15px] laptop:text-[8pt] laptop:w-[140px]"
          }  
          ${
            mode === "main" &&
            "laptop:ml-[15px] laptop:text-[11px] laptop:px-0 laptop:w-[130px] laptop:h-[24px]"
          }`}
            >
              {communityPost?.action_type}와 함께해요
            </div>
            <p
              className={`text-[15px] font-extrabold w-3/4 mx-[24px] overflow-hidden whitespace-nowrap overflow-ellipsis ${
                mode === "main" && "laptop:mx-[15px] laptop:text-[13px]"
              } ${
                mode === "myPosts" && "laptop:ml-[15px] mr-0 laptop:text-[13px]"
              }
            `}
            >
              {communityPost?.title}
            </p>
          </div>
        </div>
      )}
      {isMobile && (
        <div className="mb-2">
          {/* 게시글 이미지 */}
          <Card
            isFooterBlurred
            radius="lg"
            className={`shadow-none border-none w-[140px] h-[98px] mb-3 rounded-2xl 
          ${
            mode === "myPosts" &&
            "desktop:w-[356px] laptop:w-[327px] desktop:h-[250px] laptop:h-[230px]"
          }
            ${
              mode === "main" &&
              "desktop:w-full desktop:h-full laptop:w-full laptop:h-full "
            }
            `}
          >
            <div className="relative w-full h-[98px] overflow-hidden">
              <img
                onClick={() => onOpen()}
                alt="Community Post Image"
                className="object-cover w-full h-full cursor-pointer brightness-90"
                src={communityPost?.img_url}
              />
              {mode === "community" && (
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t"></div>
              )}
            </div>
            {/* 사진내부영역 - 아바타,작성자,좋아요 */}
            <div className="flex items-center justify-between pl-[10px] absolute bottom-[8px] w-full h-[26px]">
              <div className="flex items-center">
                <Avatar
                  showFallback
                  src={imgSrc || my_profile_img || ""}
                  className="w-[18px] h-[18px] ml-[5px]"
                />
              </div>
              <div className="flex items-center">
                <div className={longStyle}>
                  <Likes
                    post_id={communityPost?.id as string}
                    isOpen={isOpen}
                    mode="mobile"
                  />
                </div>
              </div>
            </div>
          </Card>
          {/* 사진하단영역 - 함께해요, 제목 */}
          <div className="flex flex-col mt-4">
            <div
              className={`w-[110px] ml-[8px] text-[11px] font-semibold p-0.5 overflow-hidden whitespace-nowrap overflow-ellipsis`}
            >
              {communityPost?.title}
            </div>
            <p
              className={`text-[10px] text-[#8B8B8B] font-semibold mx-[10px] `}
            >
              {communityPost?.action_type}와 함께해요
            </p>
          </div>
        </div>
      )}
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
