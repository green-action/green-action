import type { CommunityPostObj } from "@/app/_types/community/community";

import Likes from "../likes/Likes";
import CommunityDetailModal from "./CommunityDetailModal";

import { Avatar, Card, useDisclosure } from "@nextui-org/react";
import { longStyle } from "./style";

import {
  MODE_COMMUNITY,
  MODE_DESKTOP,
  MODE_LAPTOP,
  MODE_MAIN,
  MODE_MAIN_DESKTOP,
  MODE_MAIN_DESKTOP_COUNT,
  MODE_MAIN_LAPTOP,
  MODE_MAIN_LAPTOP_COUNT,
  MODE_MOBILE,
  MODE_MY_POSTS,
} from "@/app/_api/constant";
import { useResponsive } from "@/app/_hooks/responsive";
import { useGetCommunityCommentsList } from "@/app/_hooks/useQueries/comments";
import { useGetPostContents } from "@/app/_hooks/useQueries/community";
import { useEffect, useRef } from "react";
import { GoArrowRight, GoHeartFill } from "react-icons/go";
import CommunitySkeleton from "./CommunitySkeleton";

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

  const loader = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try {
      const observer = new IntersectionObserver((items) => {
        items.forEach((item) => {
          if (item.isIntersecting) {
            console.log(item.target);
          }
        });
      });
      if (loader.current) {
        observer.observe(loader.current);
      }

      // 컴포넌트가 언마운트될 때 observer를 정리합니다.
      return () => observer.disconnect();
    } catch {}
  }, [loader.current]);

  const post_id = communityPost?.id as string;

  // 게시글 정보 처리상태 가져오기
  const { isPostLoading, isPostError } = useGetPostContents(post_id);

  // 댓글 리스트 처리상태 가져오기
  const { isCommentsLoading, isCommentsError } =
    useGetCommunityCommentsList(post_id);

  // 게시글 작성자 정보
  const { display_name, profile_img } = (mode !== MODE_MY_POSTS &&
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
          mode === MODE_MAIN &&
          "desktop:w-[410px] desktop:h-[295px] laptop:w-[287px] laptop:h-[207px]"
        }
            ${
              mode === MODE_MY_POSTS &&
              "desktop:w-[356px] laptop:w-[327px] laptop:h-[400px]"
            }
          ${mode !== MODE_MAIN && mode !== MODE_MY_POSTS && "w-[31%] mb-2"}
        `}
      >
        {mode === MODE_MY_POSTS && <CommunitySkeleton mode={MODE_MY_POSTS} />}
        {mode === MODE_MAIN && <CommunitySkeleton mode={MODE_MAIN} />}
        {mode !== MODE_MY_POSTS && mode !== MODE_MAIN && <CommunitySkeleton />}
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
          ref={loader}
          className={` ${
            mode === MODE_MAIN && "desktop:w-[410px] desktop:h-[295px]"
          }
            ${mode === MODE_MY_POSTS && "desktop:w-[356px]"}
          ${
            mode !== MODE_MAIN &&
            mode !== MODE_MY_POSTS &&
            "desktop:w-[410px] w-[140px] mb-2"
          }
        `}
        >
          {/* 게시글 이미지 */}
          <Card
            isFooterBlurred
            radius="lg"
            className={`shadow-none border-none desktop:w-[410px] desktop:h-[295px] mb-3 rounded-2xl 
          ${mode === MODE_MY_POSTS && "desktop:w-[356px] desktop:h-[250px]"}
            ${mode === MODE_MAIN && "desktop:w-full desktop:h-full"}
            `}
          >
            <div className="relative w-full desktop:h-[295px] overflow-hidden">
              {mode !== MODE_MAIN ? (
                <img // main 이 아닌 경우
                  onClick={() => onOpen()}
                  alt="Community Post Image"
                  className="object-cover w-full h-full cursor-pointer brightness-90"
                  src={communityPost?.img_url}
                />
              ) : (
                <img
                  alt="Community Post Image"
                  className="object-cover w-full h-full brightness-90"
                  src={communityPost?.img_url}
                />
              )}
              {(mode === MODE_COMMUNITY || mode === MODE_MY_POSTS) && (
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t"></div>
              )}
              {mode === MODE_MAIN && (
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t-main"></div>
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
                    mode === MODE_MY_POSTS && "desktop:text-[13px]"
                  }
                ${mode === MODE_MAIN && "desktop:text-[16px]"}`}
                >
                  {display_name || my_display_name}
                </p>
                <span className="text-[14px]">Greener</span>
              </div>
              <div className="flex items-center">
                <div className={longStyle}>
                  {mode === MODE_MAIN ? (
                    <Likes
                      post_id={communityPost?.id as string}
                      isOpen={isOpen}
                      mode={MODE_MAIN_DESKTOP}
                    />
                  ) : (
                    <Likes
                      post_id={communityPost?.id as string}
                      isOpen={isOpen}
                      mode={MODE_DESKTOP}
                    />
                  )}
                </div>
              </div>
            </div>
          </Card>
          {/* 사진하단영역 - 함께해요, 제목 */}
          <div
            className={`flex justify-center mt-4 ${
              mode !== MODE_MY_POSTS &&
              mode !== MODE_MAIN &&
              "w-[410px] items-center"
            }           
          ${mode === MODE_MY_POSTS && "w-[335px] items-center"} 
           ${
             mode === MODE_MAIN &&
             "bg-[#F9F9F9]/70 p-[30px] rounded-2xl w-full h-[120px] flex-col items-start justify-center"
           } 
          `}
          >
            {/* 함께해요 */}
            {mode === MODE_MAIN ? (
              // 모드 메인인 경우 개인/단체와 함께해요 옆에 Likes 도 띄우기
              <div className="w-full flex items-center justify-between">
                <div
                  className={`flex items-center justify-center rounded-[24px] 
            border-2 border-[#3E3E3E]  font-extrabold p-0.5
            ml-[0px] w-[112px] h-[28px] text-[14px] mb-[10px]
          `}
                >
                  {communityPost?.action_type}와 함께해요
                </div>
                <div className="flex gap-2 items-center mb-3">
                  <GoHeartFill className="size-[18px] mb-1" />
                  <Likes // 좋아요 수
                    post_id={communityPost?.id as string}
                    isOpen={true}
                    mode={MODE_MAIN_DESKTOP_COUNT}
                  />
                </div>
              </div>
            ) : (
              // 모드 메인이 아닌 경우
              <div
                className={`flex items-center justify-center rounded-[24px] 
            border-2 border-[#3E3E3E]  font-extrabold p-0.5  h-[31px]
            ${
              mode !== MODE_MY_POSTS && "ml-[24px] text-[13px] w-[150px] "
            }           
          ${
            mode === MODE_MY_POSTS && "ml-[15px] desktop:text-[13px] w-[135px]"
          }`}
              >
                {communityPost?.action_type}와 함께해요
              </div>
            )}

            {/* mode main이 아닌 경우 제목만 */}
            {mode !== MODE_MAIN && (
              <p
                className={`text-[15px] font-extrabold w-3/4 mx-[24px] overflow-hidden whitespace-nowrap overflow-ellipsis 
                } ${
                  mode === MODE_MY_POSTS &&
                  " desktop:ml-[10px] mr-0 desktop:text-[15px]"
                }
            `}
              >
                {communityPost?.title}
              </p>
            )}
            {/* mode main 인 경우 제목, 화살표 */}
            {mode === MODE_MAIN && (
              <div className="flex items-center">
                <p
                  className={`font-extrabold w-[320px] overflow-hidden whitespace-nowrap overflow-ellipsis text-[16px] 
            `}
                >
                  {communityPost?.title}
                </p>
                <GoArrowRight
                  size="35"
                  color="#7E7E7E"
                  className="cursor-pointer"
                  onClick={() => onOpen()}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {isLaptop && (
        <div
          ref={loader}
          className={` ${
            mode === MODE_MAIN && "laptop:w-[287px] laptop:h-[207px]"
          }
            ${mode === MODE_MY_POSTS && "laptop:w-[327px] laptop:h-[400px]"}
          ${mode !== MODE_MAIN && mode !== MODE_MY_POSTS && "w-[433px] mb-2"}
        `}
        >
          {/* 게시글 이미지 */}
          <Card
            isFooterBlurred
            radius="lg"
            className={`shadow-none border-none laptop:w-[433px] laptop:h-[311px] mb-3 rounded-2xl 
          ${mode === MODE_MY_POSTS && "laptop:w-[327px] laptop:h-[230px]"}
            ${mode === MODE_MAIN && "laptop:w-full laptop:h-full "}
            `}
          >
            <div className="relative w-full laptop:h-[311px] overflow-hidden">
              {mode !== MODE_MAIN ? (
                <img // main 이 아닌 경우
                  onClick={() => onOpen()}
                  alt="Community Post Image"
                  className="object-cover w-full h-full cursor-pointer brightness-90"
                  src={communityPost?.img_url}
                />
              ) : (
                <img
                  alt="Community Post Image"
                  className="object-cover w-full h-full brightness-90"
                  src={communityPost?.img_url}
                />
              )}
              {(mode === MODE_COMMUNITY || mode === MODE_MY_POSTS) && (
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t"></div>
              )}
              {mode === MODE_MAIN && (
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t-main"></div>
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
                ${mode === MODE_MAIN && "laptop:text-[13px]"}`}
                >
                  {display_name || my_display_name}
                </p>
                <span
                  className={`text-[14px] ${mode === MODE_MAIN && "hidden"}`}
                >
                  Greener
                </span>
              </div>
              <div className="flex items-center">
                <div className={longStyle}>
                  {mode === MODE_MAIN ? (
                    <Likes
                      post_id={communityPost?.id as string}
                      isOpen={isOpen}
                      mode={MODE_MAIN_LAPTOP}
                    />
                  ) : (
                    <Likes
                      post_id={communityPost?.id as string}
                      isOpen={isOpen}
                      mode={MODE_LAPTOP}
                    />
                  )}
                </div>
              </div>
            </div>
          </Card>
          {/* 사진하단영역 - 함께해요, 제목 */}
          <div
            className={`flex mt-4 ${
              mode !== MODE_MY_POSTS &&
              mode !== MODE_MAIN &&
              "justify-center items-center laptop:w-[433px]"
            }           
          ${
            mode === MODE_MY_POSTS &&
            "justify-center items-center laptop:w-[300px]"
          } 
           ${
             mode === MODE_MAIN &&
             "flex-col items-start bg-[#F9F9F9]/70 p-4 rounded-xl w-[287px] h-[88px]"
           } 
          `}
          >
            {mode === MODE_MAIN ? (
              // 모드가 메인인 경우 함께해요, 하트아이콘 좋아요수
              <div className="w-full flex items-center justify-between">
                <div
                  className={`flex items-center justify-center rounded-[24px] 
            border-2 border-[#3E3E3E]  font-extrabold p-0.5
           text-[11px] w-[90px] h-[24px] mb-3`}
                >
                  {communityPost?.action_type}와 함께해요
                </div>
                <div className="flex gap-2 items-center mb-3">
                  <GoHeartFill className="size-[15px] mb-1" />
                  <Likes // 좋아요 수
                    post_id={communityPost?.id as string}
                    isOpen={true}
                    mode={MODE_MAIN_LAPTOP_COUNT}
                  />
                </div>
              </div>
            ) : (
              // 모드가 메인이 아닌 경우 그냥 함께해요 띄우기
              <div
                className={`flex items-center justify-center rounded-[24px] 
            border-2 border-[#3E3E3E]  font-extrabold p-0.5 h-[31px]
            ${mode !== MODE_MY_POSTS && "ml-[24px] text-[13px] w-[150px]"}
          ${
            mode === MODE_MY_POSTS &&
            "p-0 ml-[15px] laptop:text-[11px] laptop:w-[125px]"
          }  
        `}
              >
                {communityPost?.action_type}와 함께해요
              </div>
            )}

            {/* mode main이 아닌 경우 제목만 */}
            {mode !== MODE_MAIN && (
              <p
                className={`text-[15px] font-extrabold w-3/4 mx-[24px] overflow-hidden whitespace-nowrap overflow-ellipsis 
                } ${mode === MODE_MY_POSTS && "ml-[10px] mr-0 text-[11px]"}
            `}
              >
                {communityPost?.title}
              </p>
            )}
            {/* mode main 인 경우 제목, 화살표 */}
            {mode === MODE_MAIN && (
              <div className="flex items-center">
                <p
                  className={`font-extrabold w-[225px] overflow-hidden whitespace-nowrap overflow-ellipsis text-[13px] 
            `}
                >
                  {communityPost?.title}
                </p>
                <GoArrowRight
                  size="25"
                  color="#7E7E7E"
                  className="cursor-pointer"
                  onClick={() => onOpen()}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {isMobile && (
        <div className="mb-2" ref={loader}>
          {/* 게시글 이미지 */}
          <Card
            isFooterBlurred
            radius="lg"
            className={`shadow-none border-none w-[140px] h-[98px] mb-3 rounded-2xl 
          ${
            mode === MODE_MY_POSTS &&
            "desktop:w-[356px] laptop:w-[327px] desktop:h-[250px] laptop:h-[230px]"
          }
            ${
              mode === MODE_MAIN &&
              "desktop:w-full desktop:h-full laptop:w-full laptop:h-full phone:w-full phone:h-full"
            }
            `}
          >
            <div className="relative w-full h-[98px] overflow-hidden">
              <img
                onClick={() => onOpen()}
                alt="Community Post Image"
                className={`object-cover w-full h-full brightness-90 ${
                  mode === MODE_MAIN ? "" : "cursor-pointer"
                }`}
                src={communityPost?.img_url}
              />
              {mode === MODE_COMMUNITY && (
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
                    mode={MODE_MOBILE}
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
