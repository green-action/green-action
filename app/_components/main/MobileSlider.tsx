import { MODE_COMMUNITY, MODE_MAIN } from "@/app/_api/constant";
import {
  useFetchCommunityPostsLikes,
  useFetchIndivActionsBookmarks,
} from "@/app/_hooks/useQueries/main";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import CommunityListPost from "../community/CommunityListPost";
import MyActionCard from "../mypage/MyActionCard";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";

const MobileSlider = ({ mode }: { mode: string }) => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 15000,
    dots: true,
    infinite: true,
    arrows: false,
    speed: 7000,
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
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoaing} alt="SoomLoading" unoptimized />
      </div>
    );
  }

  return (
    <Slider
      {...settings}
      className={`${
        mode === MODE_COMMUNITY ? "h-[200px]" : "h-[200px]"
      }   phone:w-[360px] mt-11`}
    >
      {mode === MODE_COMMUNITY
        ? communityPostsByLikes?.slice(0, 8).map(
            // 좋아요 수 최다 상위 8개 포스트만 가져오기
            (communityPost) => (
              <div
                key={communityPost.id}
                className="flex items-center w-full h-[200px]"
              >
                <CommunityListPost
                  communityPost={communityPost}
                  mode={MODE_MAIN}
                />
              </div>
            ),
          )
        : indivActionsByBookmarks?.slice(0, 8).map(
            (
              action, // 북마크 수 최다 상위 8개 action
            ) => (
              <div key={action.id} className="flex items-center h-[200px]">
                <MyActionCard action={action as any} mode={MODE_MAIN} />
              </div>
            ),
          )}
    </Slider>
  );
};

export default MobileSlider;
