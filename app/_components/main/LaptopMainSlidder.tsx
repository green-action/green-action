import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  useFetchCommunityPostsLikes,
  useFetchIndivActionsBookmarks,
} from "@/app/_hooks/useQueries/main";
import CommunityListPost from "../community/CommunityListPost";
import MyActionCard from "../mypage/MyActionCard";
import { MODE_COMMUNITY, MODE_MAIN } from "@/app/_api/constant";
import SoomLoading from "/app/_assets/image/loading/SOOM_gif.gif";

const LaptopMainSlidder = ({ mode }: { mode: string }) => {
  var settings = {
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
        <Image className="" src={SoomLoading} alt="SoomLoading" unoptimized />
      </div>
    );
  }

  return (
    <Slider
      {...settings}
      className={`${
        mode === MODE_COMMUNITY ? "h-[400px]" : "h-[500px]"
      }  laptop:w-[904px] flex items-center justify-center`}
    >
      {mode === MODE_COMMUNITY
        ? communityPostsByLikes?.slice(0, 8).map((communityPost) => (
            <div
              key={communityPost.id}
              className="flex items-center gap-3 h-[480px]"
            >
              <CommunityListPost
                communityPost={communityPost}
                mode={MODE_MAIN}
              />
            </div>
          ))
        : indivActionsByBookmarks?.slice(0, 8).map((action) => (
            <div key={action.id} className="flex items-center h-[480px]">
              <MyActionCard action={action as any} mode={MODE_MAIN} />
            </div>
          ))}
    </Slider>
  );
};

export default LaptopMainSlidder;
