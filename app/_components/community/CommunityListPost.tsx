import type { CommunityPostObj } from "@/app/_types/community/community";

import Likes from "../likes/Likes";
import CommunityDetailModal from "./CommunityDetailModal";

import { Avatar, Card, useDisclosure } from "@nextui-org/react";
import { longStyle } from "./style";

import { useGetCommunityCommentsList } from "@/app/_hooks/useQueries/comments";
import { useGetPostContents } from "@/app/_hooks/useQueries/community";
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
        <CommunitySkeleton mode="myPosts" />
      </div>
    );
  }
  if (isPostError || isCommentsError) {
    return <div>Error</div>;
  }

  return (
    <>
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
        <Card
          isFooterBlurred
          radius="lg"
          className={`shadow-none border-none desktop:w-[410px] desktop:h-[295px] laptop:w-[433px] laptop:h-[311px] mb-3 rounded-2xl ${
            mode === "myPosts" &&
            "desktop:w-[356px] laptop:w-[327px] desktop:h-[250px] laptop:h-[230px]"
          }
            ${
              mode === "main" &&
              "desktop:w-full desktop:h-full laptop:w-full laptop:h-full "
            }
            `}
        >
          <div className="relative w-full desktop:h-[295px] laptop:h-[311px] overflow-hidden">
            <img
              onClick={() => onOpen()}
              alt="Community Post Image"
              className="object-cover w-full h-full cursor-pointer brightness-90"
              src={communityPost?.img_url}
            />
            {mode === "community" && (
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t"></div>
            )}
            {mode === "main" && (
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t-main"></div>
            )}
            {/*  bg-linear-gradient(to top, #4b4a4a, transparent)*/}
          </div>
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
                ${mode === "main" && "desktop:text-[16px] laptop:text-[13px]"}`}
              >
                {display_name || my_display_name}
              </p>
              <span className="text-[14px]">Greener</span>
            </div>
            <div className="flex items-center">
              <div className={longStyle}>
                <Likes post_id={communityPost?.id as string} isOpen={isOpen} />
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
        <div
          className={`flex justify-center items-center mt-4 ${
            mode !== "myPosts" &&
            mode !== "main" &&
            "desktop:w-[410px] laptop:w-[433px]"
          }           
          ${mode === "myPosts" && "desktop:w-[335px] laptop:w-[300px]"} 
           ${
             mode === "main" &&
             "desktop:w-[400px] laptop:w-[275px] bg-white/35 rounded-3xl mx-[10px] py-[5px]"
           } 
          `}
        >
          <div
            className={`flex items-center justify-center ml-[24px] rounded-[24px] 
            border-2 border-[#3E3E3E] text-[13px] font-extrabold p-0.5 w-[150px] h-[31px]
          ${
            mode === "myPosts" &&
            "ml-[15px] desktop:text-[13px] laptop:text-[8pt] desktop:w-[160px] laptop:w-[140px]"
          }  
          ${
            mode === "main" &&
            "desktop:ml-[10px] laptop:ml-[5px] desktop:w-[180px] desktop:text-[14px] laptop:text-[11px] desktop:px-0 laptop:px-0 laptop:w-[130px] desktop:h-[28px] laptop:h-[24px]"
          }`}
          >
            {communityPost?.action_type}와 함께해요
          </div>
          <p
            className={`text-[15px] font-extrabold w-3/4 mx-[24px] overflow-hidden whitespace-nowrap overflow-ellipsis ${
              mode === "main" &&
              "desktop:mx-[24px] laptop:mx-[15px] desktop:text-[16px] laptop:text-[13px]"
            } ${
              mode === "myPosts" &&
              " desktop:ml-[24px] laptop:ml-[15px] mr-0 desktop:text-[15px] laptop:text-[13px]"
            }
            `}
          >
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
