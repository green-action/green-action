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
    autoplaySpeed: 3000,
    // fade: true,
    dots: true,
    infinite: true,
    arrows: false,
    speed: 2000,
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
    //  높이 설정해도 아래만 늘어나고 카드 위가 잘리는 문제 (그림자 등)
    // <div className="h-[300px]">
    <Slider
      // {{ isDesktop && (' ...desktopSettings ')}}
      {...desktopSettings}
      className={`${
        mode === "community" ? "h-[400px]" : "h-[550px]"
      }  desktop:w-[1750px] laptop:w-[904px] flex items-center justify-center`}
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

export default MainSlider;
