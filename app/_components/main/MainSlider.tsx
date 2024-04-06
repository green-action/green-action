import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  useFetchCommunityPostsLikes,
  useFetchIndivActionsBookmarks,
} from "@/app/_hooks/useQueries/main";
import CommunityListPost from "../community/CommunityListPost";
import { CircularProgress } from "@nextui-org/react";
import MyActionCard from "../mypage/MyActionCard";

// export const revalidate = 0;

const MainSlider = ({ mode }: { mode: string }) => {
  // FIXME 근데 메인페이지 mode action 인 경우 모집중인 것만 뜨게할지?

  var settings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    // variableWidth: true,
    adaptiveHeight: true,
  };

  const { data: communityPostsLikes, isLoading: isPostsLoading } =
    useFetchCommunityPostsLikes();

  const communityPostsByLikes = communityPostsLikes?.sort(
    (a, b) => b.communityLikes.length - a.communityLikes.length,
  );

  const { data: indivActionsBookmarks, isLoading: isActionsLoading } =
    useFetchIndivActionsBookmarks();

  const indivActionsByBookmarks = indivActionsBookmarks
    ?.slice()
    .sort((a, b) => b.actionBookmarks.length - a.actionBookmarks.length);
  //   console.log("🐰 ~ data : ", indivActionsBookmarks);

  if (isPostsLoading || isActionsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="success" label="Loading..." />
      </div>
    );
  }

  return (
    //  높이 설정해도 아래만 늘어나고 카드 위가 잘리는 ? 문제 (그림자 등)
    // <div className="h-[300px]">
    <Slider
      {...settings}
      className={`${
        mode === "community" ? "h-[350px]" : "h-[450px]"
      }  w-[1350px]`}
    >
      {/* bg-pink-200 */}
      {/* <div className="w-300"> */}
      {mode === "community"
        ? communityPostsByLikes?.slice(0, 8).map(
            // 좋아요 수 최다 상위 8개 포스트만 가져오기
            (communityPost) => (
              <div key={communityPost.id} className="flex items-center gap-3 ">
                <CommunityListPost communityPost={communityPost} mode="main" />
              </div>
            ),
          )
        : indivActionsByBookmarks?.slice(0, 8).map(
            (
              action, // 북마크 수 최다 상위 8개 action
            ) => (
              <div key={action.id} className="flex items-center">
                <MyActionCard action={action} mode="main" />
              </div>
            ),
          )}
    </Slider>
    // </div>
  );
};

export default MainSlider;
