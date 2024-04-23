import { MODE_COMMUNITY, MODE_MAIN } from "@/app/_api/constant";
import { useResponsive } from "@/app/_hooks/responsive";
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

// export const revalidate = 0;

const MainSlider = ({ mode }: { mode: string }) => {
  // FIXME 메인페이지 mode action 인 경우 모집중인 것만 뜨게할지?
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  var desktopSettings = {
    autoplay: true,
    autoplaySpeed: 15000,
    // fade: true,
    dots: true,
    infinite: true,
    arrows: false,
    speed: 9000,
    slidesToShow: 4,
    slidesToScroll: 4,
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
        <Image className="" src={SoomLoaing} alt="SoomLoading" />
      </div>
    );
  }

  return (
    <Slider
      {...desktopSettings}
      className={`${
        mode === MODE_COMMUNITY
          ? "h-[510px] desktop:w-[1750px]"
          : "h-[600px] desktop:w-[1600px]"
      }   flex items-center justify-center`}
    >
      {mode === MODE_COMMUNITY
        ? communityPostsByLikes?.slice(0, 8).map(
            // 좋아요 수 최다 상위 8개 포스트만 가져오기
            (communityPost) => (
              <div
                key={communityPost.id}
                className="flex items-center gap-3 h-[480px] "
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
              <div key={action.id} className="flex items-center h-[550px]">
                <MyActionCard action={action} mode={MODE_MAIN} />
              </div>
            ),
          )}
    </Slider>
  );
};

export default MainSlider;
