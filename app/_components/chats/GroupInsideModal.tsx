import {
  changeRecruitingState,
  countParticipants,
  deleteParticipant,
  getRecruitingNumber,
} from "@/app/_api/messages/groupChat-api";
import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";
import { IoIosChatboxes } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { LiaCrownSolid } from "react-icons/lia";
import personIcon from "/app/_assets/image/logo_icon/icon/mypage/person.png";

import { useResponsive } from "@/app/_hooks/responsive";

interface GroupInsideModalProps {
  onActionInfoClose: () => void;
  actionInfo:
    | {
        img_url: string;
        id: string;
        user_uid: string;
        title: string;
        recruit_number: number;
        is_recruiting: boolean;
        start_date: string | null;
        end_date: string | null;
      }
    | null
    | undefined;
  // participantsInfo: ParticipantInfo[] | undefined;
  // TODO any 해결필요
  // TODO any 해결 후 type 분리
  participantsInfo: any;
  roomId: string;
  actionId: string;
  onClose: () => void;
}

const GroupInsideModal: React.FC<GroupInsideModalProps> = ({
  onActionInfoClose,
  actionInfo,
  participantsInfo,
  roomId,
  actionId,
  onClose,
}) => {
  // 현재 로그인한 유저 uid
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  // TODO any 해결필요
  const ownerInfo = participantsInfo?.find((item: any) => {
    return item.participant_type === "방장";
  });

  const ownerNicknameImg = ownerInfo
    ? {
        display_name: ownerInfo.display_name,
        profile_img: ownerInfo.profile_img,
      }
    : null;

  // action 참여 취소 핸들러
  const handleCancelParticipate = async (onClose: () => void) => {
    const isConfirm = window.confirm("참여를 취소하시겠습니까?");
    if (isConfirm) {
      // 1. 채팅방 인원 === 모집인원 인지 확인하기
      // (맞으면 내가 나갔을때 '모집중'으로 바꿔야 함)

      // 현재 채팅방 인원 가져오기
      const participantsNumber = await countParticipants(roomId);

      // action 모집인원 가져오기
      const recruitingNumber = await getRecruitingNumber(roomId);

      if (participantsNumber === recruitingNumber) {
        await changeRecruitingState({ action_id: actionId, mode: "out" });
      }

      // 2. 참가자 테이블에서 삭제
      await deleteParticipant({ loggedInUserUid, roomId });
    }
    onClose();
  };

  return (
    <div className="absolute bottom-0 w-[100%] inset-0 z-30 flex bg-black bg-opacity-30">
      <div className="w-full flex justify-end">
        <div
          className={`bg-[#ffffff] 
          ${
            isDesktop
              ? "top-[130px] left-[40px] w-[390px] h-[750px]"
              : isLaptop
              ? "top-[112px] left-[37px] w-[250px] h-[480px]"
              : isMobile && "top-[90px] left-[32px] w-[253px] h-[380px]"
          }
          `}
        >
          <div className="flex flex-col w-full h-full">
            <div
              className={`self-start cursor-pointer ${
                isDesktop
                  ? "ml-6 mt-6 mb-1"
                  : isLaptop
                  ? "mt-3 ml-3"
                  : isMobile && "mt-3 ml-3"
              }`}
              onClick={() => {
                onActionInfoClose();
              }}
            >
              <IoCloseOutline size={isDesktop ? 30 : isLaptop ? 20 : 18} />
            </div>
            <div
              className={`w-full flex justify-center items-center ${
                isDesktop
                  ? "mb-3 h-[180px]"
                  : isLaptop
                  ? "mb-1 h-[120px]"
                  : isMobile && "mb-1 h-[80px]"
              }`}
            >
              <Image
                width={140}
                height={140}
                src={actionInfo?.img_url as string}
                alt="action-image"
                className={`object-cover rounded-[20%] ${
                  isDesktop
                    ? "w-[140px] h-[140px]"
                    : isLaptop
                    ? "w-[90px] h-[90px] my-2"
                    : isMobile && "w-[70px] h-[70px] my-5"
                }`}
              />
            </div>
            <div
              className={`flex flex-col items-center border-b-1 ${
                isDesktop ? "pb-6" : isLaptop ? "pb-3" : isMobile && "pb-2"
              }`}
            >
              <div className="flex items-center gap-3">
                <IoIosChatboxes
                  className="text-gray-500"
                  size={isDesktop ? 25 : isLaptop ? 14 : 13}
                />
                <span
                  className={`font-semibold ${
                    isDesktop
                      ? "text-[18px]"
                      : isLaptop
                      ? "text-[12px]"
                      : isMobile && "text-[12px]"
                  }`}
                >
                  {actionInfo?.title}
                </span>
              </div>
              <span
                className={`text-gray-400 mt-1 font-normal ${
                  isDesktop
                    ? "mb-5"
                    : isLaptop
                    ? "text-[10px] mb-2"
                    : isMobile && "text-[10px] mb-2"
                }`}
              >
                Green action
              </span>
              <div className="flex items-center text-sm text-gray-500 gap-5">
                <div className="flex flex-col justify-center items-center">
                  <span
                    className={`text-gray-400 ${
                      isDesktop
                        ? "text-xs"
                        : isLaptop
                        ? "text-[10px]"
                        : isMobile && "text-[9px]"
                    }`}
                  >
                    시작일
                  </span>
                  <span
                    className={`${
                      isLaptop ? "text-[10px]" : isMobile && "text-[10px]"
                    }`}
                  >
                    {actionInfo?.start_date}
                  </span>
                </div>
                <span className="text-gray-400">-</span>
                <div className="flex flex-col justify-center items-center">
                  <span
                    className={`text-gray-400 ${
                      isDesktop
                        ? "text-xs"
                        : isLaptop
                        ? "text-[10px]"
                        : isMobile && "text-[9px]"
                    }`}
                  >
                    종료일
                  </span>
                  <span
                    className={`${
                      isLaptop ? "text-[10px]" : isMobile && "text-[10px]"
                    }`}
                  >
                    {actionInfo?.end_date}
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`flex flex-col items-start pr-7 overflow-y-auto scrollbar-hide 
              ${
                isDesktop
                  ? `pt-5 pl-7 ${
                      loggedInUserUid === ownerInfo?.id
                        ? "pb-[20px]"
                        : "pb-[90px]"
                    }`
                  : isLaptop
                  ? `pt-3 pl-5 ${
                      loggedInUserUid === ownerInfo?.id
                        ? "pb-[20px]"
                        : "pb-[57px]"
                    }`
                  : isMobile &&
                    `pt-1 pl-1 ${
                      loggedInUserUid === ownerInfo?.id
                        ? "pb-[13px]"
                        : "pb-[50px]"
                    }`
              }
              `}
            >
              <div
                className={`flex items-center gap-4 w-full ${
                  isDesktop
                    ? "mb-6"
                    : isLaptop
                    ? "mb-4"
                    : isMobile && "mb-3 ml-4 mt-2"
                }`}
              >
                <span
                  className={`font-semibold ${
                    isDesktop
                      ? "ml-1"
                      : isLaptop
                      ? "text-xs"
                      : isMobile && "text-[10px]"
                  }`}
                >
                  참여자
                </span>
                <div className="flex gap-2 text-gray-500 items-center">
                  <Image
                    width={18}
                    height={18}
                    src={personIcon}
                    alt="person-icon"
                    className={`${
                      isDesktop
                        ? "w-[18px] h-[18px]"
                        : isLaptop
                        ? "w-[13px] h-[13px]"
                        : isMobile && "w-[9px] h-[9px]"
                    }`}
                  />
                  <span
                    className={`${
                      isLaptop ? "text-xs" : isMobile && "text-[9px]"
                    }`}
                  >
                    {participantsInfo?.length} / {actionInfo?.recruit_number}
                  </span>
                </div>
              </div>
              <div
                className={`flex flex-col ${
                  isDesktop
                    ? "gap-4"
                    : isLaptop
                    ? "gap-4"
                    : isMobile && "ml-3 gap-3"
                }`}
              >
                <div className="flex items-center gap-2 font-normal">
                  <Avatar
                    className={`mr-2 ${
                      isDesktop
                        ? "w-[35px] h-[35px]"
                        : isLaptop
                        ? "w-[26px] h-[26px]"
                        : isMobile && "w-[18px] h-[18px]"
                    }`}
                    src={ownerNicknameImg?.profile_img || ""}
                  />
                  <LiaCrownSolid
                    size={isDesktop ? 25 : isLaptop ? 18 : 13}
                    className="text-[#B3C8A1]"
                  />
                  <span
                    className={`${
                      isLaptop ? "text-xs" : isMobile && "text-[10px]"
                    }`}
                  >
                    {ownerNicknameImg?.display_name}
                  </span>
                </div>
                {participantsInfo?.map((participant: any) => (
                  <>
                    {participant.id !== ownerInfo?.id && (
                      <div className="flex items-center gap-4 font-normal">
                        <Avatar
                          src={participant.profile_img || ""}
                          alt="participant-profile"
                          className={`${
                            isDesktop
                              ? "w-[35px] h-[35px]"
                              : isLaptop
                              ? "w-[26px] h-[26px]"
                              : isMobile && "w-[18px] h-[18px]"
                          }`}
                        />
                        <span
                          className={`${
                            isLaptop ? "text-xs" : isMobile && "text-[10px]"
                          }`}
                        >
                          {participant.display_name}
                        </span>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
            {loggedInUserUid !== ownerInfo?.id && (
              <footer
                className={`absolute bottom-0 bg-white border-t-1 flex items-center justify-center gap-3 ${
                  isDesktop
                    ? "w-[390px] h-[72px]"
                    : isLaptop
                    ? "w-[250px] h-[48px]"
                    : isMobile && "w-[253px] h-[38px]"
                }`}
              >
                <HiOutlineArrowLeftOnRectangle
                  size={isDesktop ? 30 : isLaptop ? 20 : 10}
                  className="text-gray-700"
                />
                <span
                  className={`text-gray-700 font-semibold mr-3 cursor-pointer ${
                    isDesktop
                      ? "text-[17px]"
                      : isLaptop
                      ? "text-[13px]"
                      : isMobile && ""
                  }`}
                  onClick={() => handleCancelParticipate(onClose)}
                >
                  참여 취소하기
                </span>
              </footer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupInsideModal;
