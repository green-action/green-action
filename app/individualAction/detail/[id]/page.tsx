"use client";
import KakaoShareButton from "@/app/_components/kakaoShare/KakaoShare";
import {
  useActionImages,
  useIndividualAction,
} from "@/app/_hooks/useQueries/individualActions";
import { Avatar, CircularProgress } from "@nextui-org/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";
import React from "react";
import { FaRegCalendar } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetchUserInfo } from "@/app/_hooks/useQueries/mypage";
import { useSession } from "next-auth/react";
import { User } from "@/app/_types";

const DetailPage = () => {
  const session = useSession();
  const user_uid = session?.data?.user.user_uid || "";
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // const { data, isLoading: fetchUserInfoLoading } = useFetchUserInfo(user_uid);
  // const { display_name, introduction, profile_img } = (data as User) || "";

  const { id: postId } = useParams<Params>();
  const params = { id: postId };
  const {
    data: individualAction,
    isLoading: individualActionLoading,
    isError: individualActionError,
  } = useIndividualAction({ params });

  // 상세 이미지 가져오기
  const {
    data: imgUrl,
    isLoading: actionImagesLoading,
    isError: actionImagesError,
  } = useActionImages({ params });

  // 두 요청이 모두 완료되었는지 확인
  const isLoading = individualActionLoading || actionImagesLoading;
  const isError = individualActionError || actionImagesError;

  console.log("이미지url : ", imgUrl);

  if (isLoading || !individualAction)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="success" aria-label="Loading..." />
      </div>
    );
  const detail = individualAction![0];
  console.log(detail);

  if (isError) return <div>Error fetching details...</div>;
  return (
    <>
      <div className="flex flex-col w-[1200px] h-auto mx-auto m-5">
        <div className="grid grid-cols-4 grid-rows-4 gap-4">
          <div className="col-span-1 row-span-1 border-2 border-gray-300 rounded-3xl">
            <div className="mt-5 ml-5 mr-5 mb-3 border-b-2 border-b-gray-300 content-center">
              <div className="flex gap-4 items-center">
                <Avatar
                  showFallback
                  src={detail.users?.profile_img || ""}
                  className="w-[2.5rem] h-[2.5rem]"
                />
                <div className="flex flex-col gap-[0.1rem] w-[9rem]">
                  <p className="text-[0.7rem]">작성자</p>
                  <p className="font-bold text-sm">
                    {detail.users?.display_name} Greener
                  </p>
                </div>
              </div>
              <div className="flex items-end pb-2"></div>
            </div>
            <div className="ml-5">
              <p className="text-[0.8rem]">{detail.users?.introduction}</p>
            </div>
          </div>
          <div className="col-span-3 row-span-1 border-2 border-gray-300 rounded-3xl">
            <p>제목 : {detail.title}</p>
            <div className=" border-gray-300 divide-y">
              <FaRegCalendar className="float-left mr-3" />
              <p>
                날짜&nbsp;&nbsp; {detail.start_date} ~ {detail.end_date}
              </p>
              <LuMapPin className="float-left mr-3" />
              <p>장소&nbsp;&nbsp; {detail.location}</p>
            </div>
          </div>

          <div className="col-span-1 row-span-1">
            <div className="p-2 mb-4 border-2 border-gray-300 rounded-3xl text-center font-extrabold">
              1:1 채팅하기
            </div>
            <div className="p-2 mb-4 border-2 border-gray-300 rounded-3xl text-center font-extrabold">
              참여하기
            </div>
          </div>
          <div className="col-span-3 row-span-3 border-2 border-gray-300 rounded-3xl flex justify-around pt-12">
            <div>
              <p className="text-neutral-600">상세내용</p>
              <br />
              <p className="text-neutral-600">{detail.content}</p>
            </div>
            {/* 이미지 슬라이드 */}
            <Slider {...settings} className="w-[250px] h-[250px]">
              {imgUrl?.map((item) => {
                return (
                  <div>
                    <img
                      src={item.img_url}
                      alt="green_action_image"
                      className="w-[250px] h-[250px]"
                    />
                  </div>
                );
              })}
            </Slider>
          </div>

          <div className="col-span-1 row-span-1">
            {/* 5번 카카오톡 공유 자리 */}
            <KakaoShareButton description={detail.content!} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
