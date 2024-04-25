"use client";

import { useSession } from "next-auth/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";

import { useResponsive } from "@/app/_hooks/responsive";
import { useDeleteAction } from "@/app/_hooks/useMutations/mypage";
import {
  useActionImages,
  useIndividualAction,
} from "@/app/_hooks/useQueries/individualActions";

import TopButton from "@/app/_components/TopButton";
import Bookmark from "@/app/_components/bookmark/Bookmark";
import KakaoShareButton from "@/app/_components/kakaoShare/KakaoShare";
import Image from "next/image";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  CircularProgress,
} from "@nextui-org/react";

import ChatButtons from "@/app/_components/individualAction/ChatButtons";
import KakaoMap from "@/app/_components/kakaoMap/KakaoMap";
import person from "/app/_assets/image/individualAction/person.png";
import delAction from "/app/_assets/image/logo_icon/icon/mypage/Group 131.png";
import prevBtn from "/app/_assets/image/logo_icon/icon/mypage/Group 132.png";
import nextBtn from "/app/_assets/image/logo_icon/icon/mypage/Group 133.png";
import calendar from "/app/_assets/image/logo_icon/icon/mypage/image 127.png";
import mapPin from "/app/_assets/image/logo_icon/icon/mypage/image 169.png";
import editAction from "/app/_assets/image/logo_icon/icon/mypage/image 55.png";

import { MODE_DETAIL_PAGE } from "@/app/_api/constant";

const DetailPage = () => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const session = useSession();
  const user_uid = session?.data?.user.user_uid || "";

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    //오른쪽 화살표
    nextArrow: (
      <Image
        src={nextBtn}
        alt="오른쪽 버튼"
        className="size-[27px] ml-[12px]"
      />
    ),
    //왼쪽 화살표
    prevArrow: (
      <Image src={prevBtn} alt="왼쪽 버튼" className="size-[27px] mr-[12px]" />
    ),
  };

  const { id: postId } = useParams<Params>();
  const params = { id: postId };
  const {
    data: individualAction,
    isLoading: individualActionLoading,
    isError: individualActionError,
  } = useIndividualAction({ params });

  const router = useRouter();
  const { deleteAction } = useDeleteAction(postId);
  // 게시글 수정
  const handleEditClick = () => {
    router.push(`/individualAction/edit/${postId}`);
  };

  // 게시글 삭제
  const handleDeleteClick = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteAction();
      router.push("/individualAction");
    } else return;
  };

  // 상세 이미지 가져오기
  const {
    data: imgUrl,
    isLoading: actionImagesLoading,
    isError: actionImagesError,
  } = useActionImages({ params });

  // 두 요청이 모두 완료되었는지 확인
  const isLoading = individualActionLoading || actionImagesLoading;
  const isError = individualActionError || actionImagesError;

  if (isLoading || !individualAction)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="success" aria-label="Loading..." />
      </div>
    );
  const detail = individualAction![0];
  const locationMap = detail.location_map as any;

  if (isError) return <div>Error fetching details...</div>;

  return (
    <>
      {isDesktop && (
        <div className="mx-auto desktop:mt-[62px] mb-[30px]">
          <TopButton />
          <div className="">
            <div className="desktop:w-[1576.3px] mb-[25px] mx-auto">
              <Breadcrumbs>
                <BreadcrumbItem href="/individualAction">
                  Green Action
                </BreadcrumbItem>
                <BreadcrumbItem href="/individualAction">
                  개인과 함께 해요
                </BreadcrumbItem>
                <BreadcrumbItem href="">{detail.title}</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            {/* 전체 contents */}
            <div className="flex flex-row desktop:w-[1576.3px] h-auto mb-96 content-center mx-auto">
              {/* 왼쪽 */}
              <div className="desktop:w-[439.34px] desktop:mr-[43px]">
                <div className="border-1 border-[#bfbfbf] h-[232.96px] rounded-[20px] mb-7">
                  <div className="flex items-center desktop:w-[336.78px] desktop:h-[95px] mt-[30px] desktop:ml-[54px] border-b-2 border-[#d9d9d9]">
                    <Avatar
                      showFallback
                      src={detail.users?.profile_img || ""}
                      className="w-[73.43px] h-[73.43px] desktop:mr-[31px]"
                    />
                    <div>
                      <div className="desktop:mb-[15px] font-semibold text-[13px] font-[#848484]">
                        작성자
                      </div>
                      <div className="flex">
                        <div className="desktop:mr-[32px] font-semibold text-[15px]">
                          {detail.users?.display_name}
                        </div>
                        <div className="font-normal text-[13px]">Greener</div>
                      </div>
                    </div>
                  </div>
                  <div className="desktop:w-[336.78px] desktop:mt-[25px] desktop:ml-[54px] text-[14px] font-[#848484]">
                    {detail.users?.introduction}
                  </div>
                </div>
                <ChatButtons loggedInUserUid={user_uid} action_id={params.id} />
                <div className="flex justify-center mt-[67px]">
                  <KakaoShareButton description={detail.content!} />
                </div>
              </div>
              {/* 오른쪽 */}
              <div className="desktop:w-[1093.92px]">
                {/* 2-1 */}
                <div className="border-1 border-[#bfbfbf] mb-[15px] h-[527px] rounded-[20px]">
                  {/* 그린액션, title, bookmark */}
                  <div className="desktop:h-[139px] mt-[33px] desktop:mb-[54px] desktop:mx-[63px]">
                    <div className="flex justify-between items-center">
                      <div className="w-[147px] h-10 bg-[#f1f1f1] rounded-3xl text-[15px] text-[#797979] font-bold text-center content-center">
                        Green Action
                      </div>
                      {user_uid === detail.user_uid ? (
                        <div className="flex">
                          <Image
                            src={editAction}
                            alt="수정"
                            className="desktop:size-[19px] desktop:mr-[30px] cursor-pointer"
                            onClick={handleEditClick}
                          />
                          <Image
                            src={delAction}
                            alt="삭제"
                            className="desktop:size-[17px] cursor-pointer"
                            onClick={handleDeleteClick}
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className="flex justify-between mt-[51px] border-b-2 border-[#bfbfbf]">
                      <p className="font-bold text-xl pb-[27px]">
                        {detail.title}
                      </p>
                      <div className="flex flex-row text-sm items-center desktop:mr-[20px] desktop:pb-[20px]">
                        <div
                          className={`w-[57px] h-[18px] rounded-[5px] content-center text-center text-white mr-[35px] ${
                            detail.is_recruiting
                              ? "bg-[#B3C8A1]"
                              : "bg-[#5F5F5F]"
                          }`}
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
                        <Bookmark
                          action_id={params.id}
                          mode={MODE_DETAIL_PAGE}
                        />
                      </div>
                    </div>
                  </div>
                  {/* 날짜 장소 */}
                  <div className="flex gap-[269px]">
                    <div className="desktop:ml-[77px] w-[284px]">
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
                        <p className="float-left mr-7 font-semibold text-[11px] text-[#848484] w-[25px]">
                          장소
                        </p>
                        <p className="font-semibold text-[13px] text-[#1e1e1e]">
                          {detail.location}
                        </p>
                      </div>
                      {locationMap && ( // action생성 시 지도 위치 같이 등록되었을 때만 뜨도록 함
                        <div className="flex mt-[7px] items-center border-t-1 border-[#bfbfbf] w-[284px] pt-[9px] ">
                          <Image
                            src={mapPin}
                            alt="위치 아이콘"
                            className="float-left mr-[15px] size-[20.26px]"
                          />
                          <p className="float-left mr-3 font-semibold text-[11px] text-[#848484]">
                            지도 위치
                          </p>
                          <p className="font-semibold text-[13px] text-[#1e1e1e]">
                            {locationMap?.placeName}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* 카카오맵 추가 */}
                    {locationMap && (
                      <div className="w-[387px] h-[239px]">
                        <KakaoMap
                          placeInfo={locationMap}
                          // supabase.d.ts 직접 수정하는게 아니면 as any 라고 해야?
                        />
                      </div>
                    )}
                  </div>
                </div>
                {/* 2-2 */}
                <div className="border-1 border-[#bfbfbf] desktop:h-[545.69px] rounded-[20px]">
                  <div className="desktop:m-[78px] flex justify-between">
                    <div>
                      <div className="desktop:mb-[37px] font-semibold text-[13px] text-[#848484]">
                        상세내용
                      </div>
                      <div className="desktop:w-[380px]">
                        <p className="font-medium text-[15px] text-[#1e1e1e] leading-[170%]">
                          {detail.content}
                        </p>
                      </div>
                    </div>
                    <div className="rounded-[20px]">
                      {" "}
                      {imgUrl!.length === 1 ? (
                        <Image
                          width={387}
                          height={390}
                          src={imgUrl![0].img_url}
                          alt="green_action_image"
                          className="w-[387px] h-[390px] rounded-[20px]"
                        />
                      ) : (
                        <Slider
                          {...settings}
                          className="w-[387px] h-[390px] rounded-[20px]"
                        >
                          {imgUrl?.map((item) => {
                            return (
                              <div>
                                <Image
                                  width={387}
                                  height={390}
                                  src={item.img_url}
                                  alt="green_action_image"
                                  className="w-[387px] h-[390px] rounded-[20px]"
                                />
                              </div>
                            );
                          })}
                        </Slider>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLaptop && (
        <div className="mx-auto laptop:mt-[113px] mb-[30px]">
          <TopButton />
          <div className="">
            <div className="mb-[25px] laptop:w-[912px] mx-auto">
              <Breadcrumbs>
                <BreadcrumbItem href="/individualAction">
                  Green Action
                </BreadcrumbItem>
                <BreadcrumbItem href="/individualAction">
                  개인과 함께 해요
                </BreadcrumbItem>
                <BreadcrumbItem href="">{detail.title}</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            {/* 전체 contents */}
            <div className="flex flex-row h-auto mb-96 content-center laptop:w-[912px] mx-auto">
              {/* 왼쪽 */}
              <div className="laptop:w-[264px] laptop:min-h-[233px] laptop:mr-[17px]">
                <div className="border-1 border-[#bfbfbf] h-[232.96px] rounded-[20px] mb-7">
                  <div className="flex items-center mt-[30px] border-b-2 border-[#d9d9d9] laptop:mx-[15px] laptop:px-2 laptop:pb-[25px]">
                    <Avatar
                      showFallback
                      src={detail.users?.profile_img || ""}
                      className="w-[73.43px] h-[73.43px] laptop:mr-[17px]"
                    />

                    <div>
                      <div className="desktop:mb-[15px] font-semibold text-[10px] font-[#848484]">
                        작성자
                      </div>

                      <div className="font-semibold text-[14px]">
                        {detail.users?.display_name}
                      </div>
                      <div className="font-normal text-[13px]">Greener</div>
                    </div>
                  </div>

                  <div className="w-[200px] mt-[20px] ml-[30px] text-[12px] font-[#848484] mb-2">
                    {detail.users?.introduction}
                  </div>
                </div>
                <ChatButtons loggedInUserUid={user_uid} action_id={params.id} />
                <div className="flex justify-center mt-[67px]">
                  <KakaoShareButton description={detail.content!} />
                </div>
              </div>
              {/* 오른쪽 */}
              <div className="laptop:w-[631px]">
                {/* 2-1 */}
                {/* 높이 527? */}
                <div className="border-1 border-[#bfbfbf] mb-[15px] min-h-[400px] rounded-[20px] pb-7">
                  {/* 그린액션, title, bookmark */}
                  <div className="mt-[33px] laptop:mx-[33px]">
                    <div className="flex justify-between items-center">
                      <div className="w-[147px] h-10 bg-[#f1f1f1] rounded-3xl text-[15px] text-[#797979] font-bold text-center content-center">
                        Green Action
                      </div>
                      {user_uid === detail.user_uid ? (
                        <div className="flex">
                          <Image
                            src={editAction}
                            alt="수정"
                            className="laptop:size-[19px] laptop:mr-[30px] cursor-pointer"
                            onClick={handleEditClick}
                          />
                          <Image
                            src={delAction}
                            alt="삭제"
                            className="laptop:size-[17px] cursor-pointer"
                            onClick={handleDeleteClick}
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className="flex justify-between mt-[51px] border-b-2 border-[#bfbfbf]">
                      <p className="font-bold text-xl pb-[27px] laptop:pl-[10px] w-[360px]">
                        {detail.title}
                      </p>
                      <div className="flex flex-row text-sm items-center">
                        <div
                          className={`w-[57px] h-[18px] rounded-[5px] content-center text-center text-white mr-[35px] ${
                            detail.is_recruiting
                              ? "bg-[#B3C8A1]"
                              : "bg-[#5F5F5F]"
                          }`}
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
                        <Bookmark
                          action_id={params.id}
                          mode={MODE_DETAIL_PAGE}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[25px]">
                    {/* 날짜 장소 */}
                    <div className="w-[284px] laptop:ml-[58px] laptop:mt-[60px]">
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
                        <p className="float-left mr-7 font-semibold text-[11px] text-[#848484] w-[25px]">
                          장소
                        </p>
                        <p className="font-semibold text-[13px] text-[#1e1e1e]">
                          {detail.location}
                        </p>
                      </div>
                      {locationMap && ( // action생성 시 지도 위치 같이 등록되었을 때만 뜨도록 함
                        <div className="flex mt-[7px] items-center border-t-1 border-[#bfbfbf] w-[284px] pt-[9px] ">
                          <Image
                            src={mapPin}
                            alt="위치 아이콘"
                            className="float-left mr-[15px] size-[20.26px]"
                          />
                          <p className="float-left mr-3 font-semibold text-[11px] text-[#848484]">
                            지도 위치
                          </p>
                          <p className="font-semibold text-[13px] text-[#1e1e1e]">
                            {locationMap?.placeName}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* 카카오맵 추가 */}
                    {locationMap && (
                      <div className="w-[230px] h-[160px] mt-[30px]">
                        <KakaoMap placeInfo={locationMap} />
                      </div>
                    )}
                  </div>
                </div>
                {/* 2-2 */}

                <div className="border-1 border-[#bfbfbf] min-h-[728px] rounded-[20px] pb-10">
                  <div className="mx-auto mt-[74px] justify-center w-[387px]">
                    <div className="rounded-[20px]">
                      {" "}
                      {imgUrl!.length === 1 ? (
                        <Image
                          src={imgUrl![0].img_url}
                          alt="green_action_image"
                          className="w-[387px] h-[390px] rounded-[20px]"
                        />
                      ) : (
                        <Slider
                          {...settings}
                          className="w-[387px] h-[390px] rounded-[20px]"
                        >
                          {imgUrl?.map((item) => {
                            return (
                              <div>
                                <Image
                                  src={item.img_url}
                                  alt="green_action_image"
                                  className="w-[387px] h-[390px] rounded-[20px]"
                                />
                              </div>
                            );
                          })}
                        </Slider>
                      )}
                    </div>
                    <div>
                      <div className="mt-[86px] mb-[37px] font-semibold text-[11px] text-[#848484]">
                        상세내용
                      </div>
                      <div className="w-full">
                        <p className="font-medium text-[14px] text-[#1e1e1e] leading-[170%]">
                          {detail.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <div className="w-[360px] mx-auto mt-[64px] mb-[30px]">
          <TopButton />
          <div className="w-[360px]">
            {/* 전체 contents */}
            <div className="flex flex-col h-auto mb-96 content-center w-[350px] mx-auto">
              {/* 위 */}
              <div>
                {/* 2-1 */}
                <div>
                  {/* 그린액션, title, bookmark */}
                  <div className="p-[20px] border-b-3 border-[#EDEDED]">
                    <div className="flex justify-between items-center">
                      <div
                        className={`w-[57px] h-[18px] rounded-[9px] content-center text-center text-[12px] text-white ${
                          detail.is_recruiting ? "bg-[#B3C8A1]" : "bg-[#5F5F5F]"
                        }`}
                      >
                        {detail.is_recruiting ? "모집중" : "모집마감"}
                      </div>
                      {user_uid === detail.user_uid ? (
                        <div className="flex">
                          <Image
                            src={editAction}
                            alt="수정"
                            className="size-[15px] mr-[10px] cursor-pointer"
                            onClick={handleEditClick}
                          />
                          <Image
                            src={delAction}
                            alt="삭제"
                            className="size-[15px] cursor-pointer"
                            onClick={handleDeleteClick}
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-col mt-[51px]">
                      <p className="font-bold text-xl pb-[27px]">
                        {detail.title}
                      </p>
                      <div className="flex flex-row text-sm items-center">
                        <Image
                          src={person}
                          alt="사람 아이콘"
                          className="size-[25px] float-left mr-1"
                        />
                        <p className="mr-[20px] font-[13px]">
                          {detail.recruit_number}
                        </p>
                        <Bookmark
                          action_id={params.id}
                          mode={MODE_DETAIL_PAGE}
                        />
                      </div>
                      {/* 날짜 장소 */}
                      <div className="w-[284px] mx-auto mt-[35px]">
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
                          <p className="float-left mr-7 font-semibold text-[11px] text-[#848484] w-[25px]">
                            장소
                          </p>
                          <p className="font-semibold text-[13px] text-[#1e1e1e]">
                            {detail.location}
                          </p>
                        </div>
                        {locationMap && ( // action생성 시 지도 위치 같이 등록되었을 때만 뜨도록 함
                          <div className="flex mt-[7px] items-center border-t-1 border-[#bfbfbf] w-[284px] pt-[9px] ">
                            <Image
                              src={mapPin}
                              alt="위치 아이콘"
                              className="float-left mr-[15px] size-[20.26px]"
                            />
                            <p className="float-left mr-3 font-semibold text-[11px] text-[#848484]">
                              지도 위치
                            </p>
                            <p className="font-semibold text-[13px] text-[#1e1e1e]">
                              {locationMap?.placeName}
                            </p>
                          </div>
                        )}
                      </div>
                      {/* 카카오맵 추가 */}
                      <div className="flex justify-center">
                        {locationMap && (
                          <div className="w-[200px] h-[150px] mt-[20px] ">
                            <KakaoMap placeInfo={locationMap} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* 2-2 */}

                <div>
                  <div className="mx-auto mt-[55px] justify-center w-[272px]">
                    <div className="rounded-[20px]">
                      {" "}
                      {imgUrl!.length === 1 ? (
                        <Image
                          src={imgUrl![0].img_url}
                          alt="green_action_image"
                          className="w-[272px] h-[275px] rounded-[20px]"
                        />
                      ) : (
                        <Slider
                          {...settings}
                          className="w-[272px] h-[275px] rounded-[20px]"
                        >
                          {imgUrl?.map((item) => {
                            return (
                              <div>
                                <Image
                                  src={item.img_url}
                                  alt="green_action_image"
                                  className="w-[272px] h-[275px] rounded-[20px]"
                                />
                              </div>
                            );
                          })}
                        </Slider>
                      )}
                    </div>
                    <div>
                      <div className="mt-[62px] mb-[37px] font-semibold text-[11px] text-[#848484]">
                        상세내용
                      </div>
                      <div className="w-[259px]">
                        <p className="font-medium text-[11px] text-[#848484] leading-[170%] mb-[70px]">
                          {detail.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 아래 */}
              <div className="border-t-3 border-[#EDEDED] py-[40px]">
                <div className="flex items-center ml-[35px]">
                  <Avatar
                    showFallback
                    src={detail.users?.profile_img || ""}
                    className="size-[43px] mr-[18px]"
                  />

                  <div>
                    <div className="font-semibold text-[15px]">
                      {detail.users?.display_name}{" "}
                      <span className="text-[13px] text-[#8B8B8B]">
                        Greener
                      </span>
                    </div>
                    <div className="w-[185px] text-[10px] text-[#848484]">
                      {detail.users?.introduction}
                    </div>
                  </div>
                </div>
              </div>
              <ChatButtons loggedInUserUid={user_uid} action_id={params.id} />
              <div className="flex justify-center mt-[64px]">
                <KakaoShareButton description={detail.content!} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailPage;
