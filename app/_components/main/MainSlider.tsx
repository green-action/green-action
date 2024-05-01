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
import SoomLoading from "/app/_assets/image/loading/SOOM_gif.gif";

const MainSlider = ({ mode }: { mode: string }) => {
  var desktopSettings = {
    autoplay: true,
    autoplaySpeed: 15000,
    dots: true,
    infinite: true,
    arrows: false,
    speed: 7000,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: true,
    pauseOnFocus: true,
  };

  const {
    data: communityPostsLikes,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = useFetchCommunityPostsLikes();

  const communityPostsByLikes = communityPostsLikes?.sort(
    (a, b) => b.communityLikes.length - a.communityLikes.length,
  );

  const {
    data: indivActionsBookmarks,
    isLoading: isActionsLoading,
    isError: isActionsError,
  } = useFetchIndivActionsBookmarks();

  const indivActionsByBookmarks = indivActionsBookmarks
    ?.slice()
    .sort((a, b) => b.actionBookmarks.length - a.actionBookmarks.length);

  if (isPostsLoading || isActionsLoading) {
    return (
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoading} alt="SoomLoading" unoptimized />
      </div>
    );
  }

  if (isPostsError || isActionsError) {
    return (
      <div className="flex justify-center items-center w-screen h-[500px]">
        ❌ ERROR : 이 페이지를 표시하는 도중 문제가 발생했습니다. 다른 페이지로
        이동하시거나 다시 방문해주세요.
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
      }   flex items-center justify-center 
      `}
    >
      {mode === MODE_COMMUNITY
        ? communityPostsByLikes?.slice(0, 8).map((communityPost) => (
            <div
              key={communityPost.id}
              className="flex items-center gap-3 h-[480px] "
            >
              <CommunityListPost
                communityPost={communityPost}
                mode={MODE_MAIN}
              />
            </div>
          ))
        : indivActionsByBookmarks?.slice(0, 8).map((action) => (
            <div key={action.id} className="flex items-center h-[550px]">
              <MyActionCard action={action as any} mode={MODE_MAIN} />
            </div>
          ))}
    </Slider>
  );
};

export default MainSlider;
