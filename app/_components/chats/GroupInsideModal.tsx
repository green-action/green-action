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
          className={`bg-[#ffffff] w-[75%] h-[750px]
          ${
            isDesktop
              ? "top-[130px] left-[40px] "
              : isLaptop
              ? "top-[112px] left-[37px]"
              : isMobile && ""
          }
          `}
        >
          <div className="flex flex-col w-full h-full">
            <div
              className={`self-start cursor-pointer ${
                isDesktop
                  ? "ml-6 mt-6 mb-6"
                  : isLaptop
                  ? "mt-2 ml-2"
                  : isMobile && ""
              }`}
              onClick={() => {
                onActionInfoClose();
              }}
            >
              <IoCloseOutline size={isDesktop ? 40 : isLaptop ? 23 : 18} />
            </div>
            <div
              className={`w-full flex justify-center items-center ${
                isDesktop
                  ? "mb-7 h-[180px]"
                  : isLaptop
                  ? "mb-1 h-[130px]"
                  : isMobile && "mb-1 h-[80px]"
              }`}
            >
              <img
                src={actionInfo?.img_url || ""}
                alt="action-image"
                className={`object-cover rounded-[20%] 
                ${
                  isDesktop
                    ? "w-[150px] h-[150px]"
                    : isLaptop
                    ? "w-[100px] h-[100px]"
                    : isMobile && "w-[80px] h-[80px]"
                }`}
              />
            </div>
            <div className="flex flex-col items-center border-b-1 pb-6">
              <div className="flex items-center gap-3">
                <IoIosChatboxes className="text-gray-500" size={25} />
                <span className="font-extrabold text-[18px]">
                  {actionInfo?.title}
                </span>
              </div>
              <span className="text-gray-400 mb-3">Green action</span>
              <span className="text-gray-500 mb-1">
                {actionInfo?.start_date} ~ {actionInfo?.end_date}
              </span>
            </div>
            <div
              className={`flex flex-col items-start pl-7 pr-7 pt-5 overflow-y-auto scrollbar-hide ${
                loggedInUserUid === ownerInfo?.id ? "pb-[20px]" : "pb-[90px]"
              }`}
            >
              <div className="flex items-center gap-4 w-full mb-6">
                <span className="font-extrabold ml-1">참여자</span>
                <div className="flex gap-2 text-gray-500 items-center">
                  <Image
                    src={personIcon}
                    alt="person-icon"
                    className="w-[18px] h-[18px]"
                  />
                  <span>
                    {participantsInfo?.length} / {actionInfo?.recruit_number}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 font-extrabold">
                  <Avatar
                    className="mr-2 w-[35px] h-[35px]"
                    src={ownerNicknameImg?.profile_img || ""}
                  />
                  <LiaCrownSolid size={25} className="text-[#B3C8A1]" />
                  <span>{ownerNicknameImg?.display_name}</span>
                </div>
                {/* TODO any 해결 필요 */}
                {participantsInfo?.map((participant: any) => (
                  <>
                    {participant.id !== ownerInfo?.id && (
                      <div className="flex items-center gap-4 font-extrabold">
                        <Avatar
                          src={participant.profile_img || ""}
                          alt="participant-profile"
                          className={`w-[35px] h-[35px]`}
                        />
                        <span>{participant.display_name}</span>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
            {loggedInUserUid !== ownerInfo?.id && (
              <footer className="absolute bottom-0 bg-white w-[75%] h-[72px] border-t-1 flex items-center justify-center gap-3">
                <HiOutlineArrowLeftOnRectangle
                  size={30}
                  className="text-gray-700"
                />
                <span
                  className="text-gray-700 text-[17px] font-extrabold mr-3 cursor-pointer"
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
