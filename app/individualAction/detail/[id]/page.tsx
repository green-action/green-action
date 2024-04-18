"use client";

import React, { useRef } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import {
  checkPrivateChatRoomExist,
  insertNewPrivateChatRoom,
} from "@/app/_api/messages/privateChat-api";

import {
  useActionImages,
  useIndividualAction,
} from "@/app/_hooks/useQueries/individualActions";
import { useDeleteAction } from "@/app/_hooks/useMutations/mypage";
import { useResponsive } from "@/app/_hooks/responsive";

import KakaoShareButton from "@/app/_components/kakaoShare/KakaoShare";
import Bookmark from "@/app/_components/bookmark/Bookmark";
import TopButton from "@/app/_components/TopButton";
import PrivateChat from "@/app/_components/chats/PrivateChat";
import GroupChat from "@/app/_components/chats/GroupChat";
import Image from "next/image";

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

import calendar from "/app/_assets/image/logo_icon/icon/mypage/image 127.png";
import mapPin from "/app/_assets/image/logo_icon/icon/mypage/image 169.png";
import person from "/app/_assets/image/logo_icon/icon/mypage/image 166.png";
import editAction from "/app/_assets/image/logo_icon/icon/mypage/image 55.png";
import delAction from "/app/_assets/image/logo_icon/icon/mypage/Group 131.png";
import nextBtn from "/app/_assets/image/logo_icon/icon/mypage/Group 133.png";
import prevBtn from "/app/_assets/image/logo_icon/icon/mypage/Group 132.png";
import {
  changeRecruitingState,
  checkUserExist,
  countParticipants,
  getChatRoomId,
  getRecruitingNumber,
  insertNewParticipant,
} from "@/app/_api/messages/groupChat-api";

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

  // 참여하기 모달창
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };

  // 1:1 채팅방 모달창
  const {
    isOpen: isPrivateChatOpen,
    onOpen: onPrivateChatOpen,
    onOpenChange: onPrivateChatOpenChange,
  } = useDisclosure();

  // 1:1 채팅방 room_id 담는 Ref
  const privateRoomIdRef = useRef("");

  // 단체 채팅방 모달창
  const {
    isOpen: isGroupChatOpen,
    onOpen: onGroupChatOpen,
    onOpenChange: onGroupChatOpenChange,
  } = useDisclosure();

  // 단체 채팅방 room_id 담는 Ref
  const groupRoomIdRef = useRef("");

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

  // console.log("이미지url : ", imgUrl);

  if (isLoading || !individualAction)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="success" aria-label="Loading..." />
      </div>
    );
  const detail = individualAction![0];
  // console.log(detail);

  const mode = "detailPage";

  if (isError) return <div>Error fetching details...</div>;

  // 1:1 채팅방 모달 열기
  const handleOpenPrivateChatRoom = async () => {
    // TODO 로그인한 유저가 액션장이면 1:1채팅하기 버튼 안보이게 or 문구 수정
    // 본인이 방장인 경우, '1:1채팅 목록 확인' 이런식으로 버튼 이름 바꿔야겠어
    // 누르면 목록 보여주는 모달창 여는 로직 -> 채팅방 클릭시 채팅방 모달창 open

    // 1. 이미 1:1 채팅방이 존재하는지 먼저 확인 - 이미 있으면 string값, 없으면 null값 반환
    const exited_room_id = await checkPrivateChatRoomExist({
      user_uid,
      action_id: params.id,
    });

    // 1) exited_room_id가 있으면 (1:1채팅방 이미 열려있는 경우) -> 모달에 전달
    // privateRoomIdRef에 room_id 설정 -> 1:1채팅 모달 props로 넘겨주기
    if (exited_room_id) {
      // privateRoomIdRef에 room_id 설정
      privateRoomIdRef.current = exited_room_id;

      // 채팅방 모달창 open
      onPrivateChatOpen();
      return; // 함수 종료
    }

    // 2) exited_room_id가 없으면 (1:1채팅방 아직 안열린 경우)
    // -> chat_rooms_info 테이블, chat_participants 테이블에 insert하기 -> room_id 반환
    const new_room_id = await insertNewPrivateChatRoom({
      action_id: params.id,
      loggedInUserUid: user_uid,
    });

    // privateRoomIdRef에 room_id 설정
    if (new_room_id) {
      privateRoomIdRef.current = new_room_id;
    }

    // 채팅방 모달창 open
    onPrivateChatOpen();
  };

  // 단체 채팅방 클릭 핸들러
  const handleOpenGroupChatRoom = async () => {
    const action_id = params.id;

    // 단체 채팅방 room_id 가져오기
    const room_id = await getChatRoomId(action_id);
    groupRoomIdRef.current = room_id;

    // 채팅에 참여중인지 여부 확인(참여중이면 id값 있음 / 미참여 상태이면 null)
    const participant_id = await checkUserExist({
      room_id,
      loggedInUserUid: user_uid,
    });

    // 이미 참여중인 경우 처리
    if (participant_id) {
      onGroupChatOpen();
      return;
    }

    // 현재 채팅방 인원 가져오기
    const participantsNumber = await countParticipants(room_id);

    // action 모집인원 가져오기
    const recruitingNumber = await getRecruitingNumber(room_id);

    // 채팅인원 === 모집인원 -> alert띄우기
    if (participantsNumber === recruitingNumber) {
      alert("모집마감 되었습니다.");
      return;
    }

    // 채팅인원 < 모집인원 -> 참가자 테이블에 insert
    if (participantsNumber < recruitingNumber) {
      await insertNewParticipant({
        room_id,
        loggedInUserUid: user_uid,
      });
    }

    // 채팅인원 +1(내가 참여했으니까) === 모집인원 -> '모집마감' 처리
    if (participantsNumber + 1 === recruitingNumber) {
      await changeRecruitingState({ action_id, mode: "in" });
    }

    // <기존 성공했던 코드 - api 분리 전>
    // 채팅 인원 파악, 해당 action의 모집인원
    // 채팅인원 === 모집인원 된 경우 -> 모집상태 '모집마감'으로 변경
    // await countParticipants({
    //   room_id,
    //   action_id,
    // });

    // 채팅방 모달창 open
    onGroupChatOpen();
  };

  return (
    <div className="mx-auto desktop:mt-[62px] laptop:mt-[113px] mb-[30px]">
      <TopButton />
      <div className="">
        <div className="desktop:w-[1576.3px] mb-[25px] laptop:w-[912px] mx-auto">
          <Breadcrumbs>
            <BreadcrumbItem href="/individualAction">
              Green-action
            </BreadcrumbItem>
            <BreadcrumbItem href="/individualAction">
              개인과 함께 해요
            </BreadcrumbItem>
            <BreadcrumbItem href="">{detail.title}</BreadcrumbItem>
          </Breadcrumbs>
        </div>
        {/* 전체 contents */}
        <div
          className="flex flex-row desktop:w-[1576.3px] h-auto mb-96 content-center
      laptop:w-[912px] mx-auto"
        >
          {/* 왼쪽 */}
          <div
            className="desktop:w-[439.34px] desktop:mr-[43px]
        laptop:w-[264px] laptop:h-[233px] laptop:mr-[17px]"
          >
            <div className="border-1 border-[#bfbfbf] h-[232.96px] rounded-[20px] mb-7">
              <div
                className="flex items-center desktop:w-[336.78px] desktop:h-[95px] mt-[48px] desktop:ml-[54px] border-b-2 border-[#d9d9d9]
            laptop:mx-[20px] laptop:px-2 laptop:pb-[25px]"
              >
                <Avatar
                  showFallback
                  src={detail.users?.profile_img || ""}
                  className="w-[73.43px] h-[73.43px] desktop:mr-[31px] laptop:mr-[17px]"
                />
                {isDesktop && (
                  <div>
                    <div className="desktop:mb-[15px] font-semibold text-[10px] font-[#848484]">
                      작성자
                    </div>
                    <div className="flex">
                      <div className="desktop:mr-[32px] font-semibold text-[15px]">
                        {detail.users?.display_name}
                      </div>
                      <div className="font-normal text-[13px]">Greener</div>
                    </div>
                  </div>
                )}
                {isLaptop && (
                  <div>
                    <div className="desktop:mb-[15px] font-semibold text-[10px] font-[#848484]">
                      작성자
                    </div>

                    <div className="font-semibold text-[15px]">
                      {detail.users?.display_name}
                    </div>
                    <div className="font-normal text-[13px]">Greener</div>
                  </div>
                )}
              </div>
              {isDesktop && (
                <div className="desktop:w-[336.78px] desktop:mt-[25px] desktop:ml-[54px] text-[10px] font-[#848484]">
                  {detail.users?.introduction}
                </div>
              )}
              {isLaptop && (
                <div className="w-[200px] mt-[20px] ml-[30px] text-[10px] font-[#848484]">
                  {detail.users?.introduction}
                </div>
              )}
            </div>
            <div
              className="border-1 border-[#bfbfbf] bg-[#fafafa] h-[74.7px] rounded-[20px] mb-[22px] text-center content-center font-semibold cursor-pointer"
              onClick={handleOpenPrivateChatRoom}
            >
              1:1 채팅하기
            </div>
            <div
              className="border-1 border-[#bfbfbf] bg-[#fafafa] h-[74.7px] rounded-[20px] text-center content-center font-semibold cursor-pointer"
              key={"opaque"}
              color="warning"
              // onClick={() => handleOpen()}
              onClick={handleOpenGroupChatRoom}
            >
              참여하기
            </div>
            <Modal
              backdrop={"opaque"}
              isOpen={isOpen}
              onClose={onClose}
              placement="center"
            >
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
            {isPrivateChatOpen && (
              <PrivateChat
                isOpen={isPrivateChatOpen}
                onOpenChange={onPrivateChatOpenChange}
                roomId={privateRoomIdRef.current}
              />
            )}
            {isGroupChatOpen && (
              <GroupChat
                isOpen={isGroupChatOpen}
                onOpenChange={onGroupChatOpenChange}
                roomId={groupRoomIdRef.current}
                actionId={params.id}
              />
            )}
            <div className="flex justify-center mt-[67px]">
              <KakaoShareButton description={detail.content!} />
            </div>
          </div>
          {/* 오른쪽 */}
          <div className="desktop:w-[1093.92px] laptop:w-[631px]">
            {/* 2-1 */}
            <div className="border-1 border-[#bfbfbf] mb-[15px] h-[343.11px] rounded-[20px]">
              {/* 그린액션, title, bookmark */}
              <div className="desktop:h-[139px] mt-[33px] desktop:mb-[54px] desktop:mx-[63px]  laptop:mx-[33px]">
                <div className="flex justify-between items-center">
                  <div className="w-[147px] h-10 bg-[#f1f1f1] rounded-3xl text-[15px] text-[#797979] font-bold text-center content-center">
                    Green-action
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
                <div
                  className="flex justify-between mt-[51px] border-b-2 border-[#bfbfbf]
             "
                >
                  <p className="font-bold text-xl pb-[27px]">{detail.title}</p>
                  <div className="flex flex-row text-sm items-center desktop:mr-[20px] desktop:pb-[20px]">
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
              {/* 날짜 장소 */}
              <div className="desktop:ml-[77px] w-[284px]  laptop:ml-[58px]  laptop:mt-[60px]">
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
            {/* 2-2 */}
            {isDesktop && (
              <div className="border-1 border-[#bfbfbf] desktop:h-[545.69px] rounded-[20px]">
                <div className="desktop:m-[78px] flex justify-between">
                  <div>
                    <div className="desktop:mb-[37px] font-semibold text-[11px] text-[#848484]">
                      상세내용
                    </div>
                    <div className="desktop:w-[327.92px]">
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
            )}
            {isLaptop && (
              <div className="border-1 border-[#bfbfbf] h-[728px] rounded-[20px]">
                <div className="mx-auto mt-[74px] justify-center w-[387px]">
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
                    <div className="w-[327.92px]">
                      <p className="font-medium text-[11px] text-[#848484] leading-[170%]">
                        {detail.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
