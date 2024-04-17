import {
  useFetchCommunityPostsLikes,
  useFetchIndivActionsBookmarks,
} from "@/app/_hooks/useQueries/main";
import { Card, Skeleton } from "@nextui-org/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import CommunityListPost from "../community/CommunityListPost";
import MyActionCard from "../mypage/MyActionCard";

// export const revalidate = 0;

const LaptopMainSlidder = ({ mode }: { mode: string }) => {
  // FIXME 메인페이지 mode action 인 경우 모집중인 것만 뜨게할지?

  var settings = {
    autoplay: true,
    autoplaySpeed: 15000,
    // fade: true,
    dots: true,
    infinite: true,
    arrows: false,
    speed: 10000,
    slidesToShow: 3,
    slidesToScroll: 3,
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

  if (isPostsLoading || isActionsLoading) {
    return (
      <Card className="w-[200px]" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </Card>
    );
  }

  return (
    //  높이 설정해도 아래만 늘어나고 카드 위가 잘리는 문제 (그림자 등)
    // <div className="h-[300px]">
    <Slider
      {...settings}
      className={`${
        mode === "community" ? "h-[300px]" : "h-[430px]"
      }  laptop:w-[904px] flex items-center justify-center`}
    >
      {mode === "community"
        ? communityPostsByLikes?.slice(0, 8).map(
            // 좋아요 수 최다 상위 8개 포스트만 가져오기
            (communityPost) => (
              <div
                key={communityPost.id}
                className="flex items-center gap-3 h-[480px]"
              >
                <CommunityListPost communityPost={communityPost} mode="main" />
              </div>
            ),
          )
        : indivActionsByBookmarks?.slice(0, 8).map(
            (
              action, // 북마크 수 최다 상위 8개 action
            ) => (
              <div key={action.id} className="flex items-center h-[480px]">
                <MyActionCard action={action} mode="main" />
              </div>
            ),
          )}
    </Slider>
  );
};

export default LaptopMainSlidder;
