"use client";
import KakaoShareButton from "@/app/_components/kakaoShare/KakaoShare";
import {
  useActionImages,
  useIndividualAction,
} from "@/app/_hooks/useQueries/individualActions";
import { CircularProgress } from "@nextui-org/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";
import React from "react";
import { FaRegCalendar } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DetailPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { id: postId } = useParams<Params>();
  const params = { id: postId };
  const {
    data: individualAction,
    isLoading: individualActionLoading,
    isError: individualActionError,
  } = useIndividualAction({ params });

  // 이미지 가져오기
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
      <div>
        <CircularProgress color="success" aria-label="Loading..." />
      </div>
    );
  const detail = individualAction![0];
  console.log(detail);

  // 작성자 이름, 자기소개 가져오기
  // const userId = detail.user_uid;
  // userId를 가진 유저정보를 auth에서 가져와서

  if (isError) return <div>Error fetching details...</div>;
  return (
    <>
      <div>개인그린디테일page</div>
      <div className="flex flex-col w-[1200px] h-auto mx-auto m-5">
        <div className="grid grid-cols-4 grid-rows-4 gap-4">
          <div className="col-span-1 row-span-1 border-2 border-gray-300 rounded-3xl">
            작성자 : {detail.users?.display_name}
            <hr />
            {detail.users?.introduction}
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
            <div className="p-2 mb-4 border-2 border-gray-300 rounded-3xl">
              1:1 채팅하기
            </div>
            <div className="p-2 mb-4 border-2 border-gray-300 rounded-3xl">
              참여하기
            </div>
          </div>
          <div className="col-span-3 row-span-3 border-2 border-gray-300 rounded-3xl flex justify-center pt-20">
            <p>상세내용 : {detail.content}</p>

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

          <div className="col-span-1 row-span-1 border-2 border-gray-300 rounded-3xl">
            {/* 5번 카카오톡 공유 자리 */}
            <KakaoShareButton description={detail.content!} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
