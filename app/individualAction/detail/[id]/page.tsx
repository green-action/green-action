"use client";
import React from "react";
import { useSession } from "next-auth/react";
import KakaoShareButton from "@/app/_components/kakaoShare/KakaoShare";
import Bookmark from "@/app/_components/bookmark/Bookmark";
import {
  useActionImages,
  useIndividualAction,
} from "@/app/_hooks/useQueries/individualActions";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Avatar, CircularProgress } from "@nextui-org/react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import calendar from "/app/_assets/image/logo_icon/icon/mypage/image 127.png";
import mapPin from "/app/_assets/image/logo_icon/icon/mypage/image 169.png";
import person from "/app/_assets/image/logo_icon/icon/mypage/image 166.png";
import editAction from "/app/_assets/image/logo_icon/icon/mypage/image 55.png";
import delAction from "/app/_assets/image/logo_icon/icon/mypage/Group 131.png";
import nextBtn from "/app/_assets/image/logo_icon/icon/mypage/Group 133.png";
import prevBtn from "/app/_assets/image/logo_icon/icon/mypage/Group 132.png";
import { useDeleteAction } from "@/app/_hooks/useMutations/mypage";

const DetailPage = () => {
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
    <div className="w-[1920px] m-auto mt-[62px]">
      <div className="w-[1576.3px] mb-[25px] mx-[171px]">
        <Breadcrumbs>
          <BreadcrumbItem href="/individualAction">Green-action</BreadcrumbItem>
          <BreadcrumbItem href="/individualAction">
            개인과 함께 해요
          </BreadcrumbItem>
          <BreadcrumbItem href="">{detail.title}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="flex flex-row w-[1576.3px] h-auto mx-[171px] content-center">
        <div className="w-[439.34px] mr-[43px]">
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
          <div
            className="border-1 border-[#bfbfbf] bg-[#fafafa] h-[74.7px] rounded-[20px] text-center content-center font-semibold cursor-pointer"
            key={"opaque"}
            color="warning"
            onClick={() => handleOpen()}
          >
            참여하기
          </div>
          <Modal backdrop={"opaque"} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Green-action 참여 오픈채팅방
                  </ModalHeader>
                  <ModalBody>
                    <a href={detail.kakao_link!}>{detail.kakao_link}</a>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      className="bg-[#929292] opacity-50 text-white"
                      onPress={onClose}
                    >
                      닫기
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <div className="flex justify-center mt-[67px]">
            <KakaoShareButton description={detail.content!} />
          </div>
        </div>
        <div className="w-[1093.92px]">
          <div className="border-1 border-[#bfbfbf] mb-[15px] h-[343.11px] rounded-[20px]">
            <div className="h-[139px] mt-[33px] mb-[54px] mx-[63px]">
              <div className="flex justify-between items-center">
                <div className="w-[147px] h-10 bg-[#f1f1f1] rounded-3xl text-[15px] text-[#797979] font-bold text-center content-center">
                  Green-action
                </div>
                {user_uid === detail.user_uid ? (
                  <div className="flex">
                    <Image
                      src={editAction}
                      alt="수정"
                      className="size-[19px] mr-[30px] cursor-pointer"
                      onClick={handleEditClick}
                    />
                    <Image
                      src={delAction}
                      alt="삭제"
                      className="size-[17px] cursor-pointer"
                      onClick={handleDeleteClick}
                    />
                  </div>
                ) : null}
              </div>
              <div className="flex justify-between mt-[51px] border-b-2 border-[#bfbfbf]">
                <p className="font-bold text-xl pb-[27px]">{detail.title}</p>
                <div className="flex flex-row text-sm items-center mr-[20px] pb-[20px]">
                  <div
                    className={`w-[57px] h-[18px] rounded-[5px] content-center text-center text-white mr-[35px] ${
                      detail.is_recruiting ? "bg-[#B3C8A1]" : "bg-[#5F5F5F]"
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
            <div className="m-[78px] flex justify-between">
              <div>
                <div className="mb-[37px] font-semibold text-[11px] text-[#848484]">
                  상세내용
                </div>
                <div className="w-[327.92px]">
                  <p className="font-medium text-[11px] text-[#848484] leading-[170%]">
                    {detail.content}
                  </p>
                </div>
              </div>
              <div className="rounded-[20px]">
                {" "}
                {imgUrl!.length === 1 ? (
                  <img
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
                          <img
                            src={item.img_url}
                            alt="green_action_image"
                            className="w-[387px] h-[390px]  rounded-[20px]"
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
  );
};

export default DetailPage;
