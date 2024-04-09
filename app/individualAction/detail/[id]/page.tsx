"use client";
import KakaoShareButton from "@/app/_components/kakaoShare/KakaoShare";
import {
  useActionImages,
  useIndividualAction,
} from "@/app/_hooks/useQueries/individualActions";
import { Avatar, Chip, CircularProgress } from "@nextui-org/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";
import React from "react";
import { FaRegCalendar } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSession } from "next-auth/react";
import { RxPerson } from "react-icons/rx";
import Bookmark from "@/app/_components/bookmark/Bookmark";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import calendar from "/app/_assets/image/logo_icon/icon/mypage/image 127.png";
import mapPin from "/app/_assets/image/logo_icon/icon/mypage/image 169.png";
import person from "/app/_assets/image/logo_icon/icon/mypage/image 166.png";
import editAction from "/app/_assets/image/logo_icon/icon/mypage/image 55.png";
import deleteAction from "/app/_assets/image/logo_icon/icon/mypage/Group 131.png";

import Image from "next/image";

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

  // 참여하기 모달창
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };

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

  const mode = "detailPage";

  if (isError) return <div>Error fetching details...</div>;
  return (
    <div className="w-[1920px] border-red-400 border-2 m-auto mt-[62px]">
      <div className="w-[1576.3px] border-2 mb-[25px] mx-[171px]">bread</div>
      <div className="flex flex-row w-[1576.3px] border-2 border-blue-500 h-auto mx-[171px] content-center">
        <div
          className="border-2 border-yellow-500
         w-[439.34px] mr-[43px]"
        >
          <div className="border-1 border-[#bfbfbf]  h-[232.96px] rounded-[20px] mb-7">
            <div className="flex w-[336.78px] h-[95px] mt-[48px] ml-[54px] border-b-2 border-[#d9d9d9]">
              <Avatar
                showFallback
                src={detail.users?.profile_img || ""}
                className="w-[73.43px] h-[73.43px] mr-[31px]"
              />

              <div>
                <div className="mb-[15px] font-semibold text-[10px] font-[#848484]">
                  작성자
                </div>
                <div className="flex">
                  <div className="mr-[32px] font-semibold text-[15px]">
                    {detail.users?.display_name}
                  </div>
                  <div className="font-normal text-[13px]">Greener</div>
                </div>
              </div>
            </div>
            <div className="w-[336.78px] mt-[25px] ml-[54px] text-[10px] font-[#848484]">
              {detail.users?.introduction}
            </div>
          </div>
          <div className="border-1 border-[#bfbfbf] bg-[#fafafa] h-[74.7px] rounded-[20px] mb-[22px] text-center content-center font-semibold cursor-pointer">
            1:1 채팅하기
          </div>
          <div className="border-1 border-[#bfbfbf] bg-[#fafafa] h-[74.7px] rounded-[20px] text-center content-center font-semibold cursor-pointer">
            참여하기
          </div>
          <div>4</div>
        </div>
        <div
          className="border-2 border-green-500
         w-[1093.92px]"
        >
          <div className="border-1 border-[#bfbfbf] mb-[15px] h-[343.11px] rounded-[20px]">
            <div className="h-[139px] mt-[33px] mb-[54px] mx-[63px]">
              <div className="flex justify-between items-center">
                <div className="w-[147px] h-10 bg-[#f1f1f1] rounded-3xl text-[15px] text-[#797979] font-bold text-center content-center">
                  Green-action
                </div>
                <div className="flex">
                  <Image
                    src={editAction}
                    alt="수정"
                    className="size-[19px] mr-[30px] cursor-pointer"
                  />
                  <Image
                    src={deleteAction}
                    alt="삭제"
                    className="size-[17px] cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-[51px] border-b-2 border-[#bfbfbf]">
                <p className="font-bold text-xl">{detail.title}</p>
                <div className="flex flex-row text-sm items-center mr-[20px]">
                  <div
                    className="w-[57px] h-[18px] rounded-[5px] content-center text-center text-white mr-[35px] 
                    ${detail.is_recruiting ? bg-[#B3C8A1] : bg-[#5F5F5F]}"
                  >
                    {detail.is_recruiting ? "모집중" : "모집마감"}
                  </div>
                  <Image
                    src={person}
                    alt="사람 아이콘"
                    className="w-[31px] h-[30px] float-end mr-1"
                  />
                  <p className="float-end mr-[20px] font-[13px]">
                    {detail.recruit_number}
                  </p>
                  <Bookmark action_id={params.id} mode={mode} />
                </div>
              </div>
            </div>
            <div className="ml-[77px] w-[284px]">
              <div className="border-b-1 border-[#bfbfbf] w-[284px] text-xs">
                <div className="mb-[9px]">
                  <Image
                    src={calendar}
                    alt="달력 아이콘"
                    className="w-[15.19px] h-[16.46px] float-left mr-[16px] ml-[2.74px]"
                  />
                  <p className="float-left mr-8 font-semibold text-[11px] text-[#848484]">
                    날짜
                  </p>
                  <p className="font-medium text-[13px] text-[#1e1e1e]">
                    {detail.start_date} ~ {detail.end_date}
                  </p>
                </div>
              </div>
              <div className="flex mt-[7px] items-center">
                <Image
                  src={mapPin}
                  alt="위치 아이콘"
                  className="float-left mr-[15px] size-[20.26px]"
                />
                <p className="float-left mr-8 font-semibold text-[11px] text-[#848484]">
                  장소
                </p>
                <p className="font-semibold text-[13px] text-[#1e1e1e]">
                  {detail.location}
                </p>
              </div>
            </div>
          </div>
          <div className="border-1 border-[#bfbfbf] h-[545.69px] rounded-[20px]">
            2-2
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
