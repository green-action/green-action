import React from "react";
import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import personIcon from "/app/_assets/image/logo_icon/icon/mypage/person.png";
import { IoCloseOutline } from "react-icons/io5";
import { LiaCrownSolid } from "react-icons/lia";
import { IoIosChatboxes } from "react-icons/io";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";
import { useSession } from "next-auth/react";
import {
  changeRecruitingState,
  countParticipants,
  deleteParticipant,
  getRecruitingNumber,
} from "@/app/_api/messages/groupChat-api";

import type { ParticipantInfo } from "@/app/_types/realtime-chats";

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
  participantsInfo: ParticipantInfo[] | undefined;
  roomId: string;
  actionId: string;
  onClose: () => void;
}

const GroupInsideModal = ({
  onActionInfoClose,
  actionInfo,
  participantsInfo,
  roomId,
  actionId,
  onClose,
}: GroupInsideModalProps) => {
  // 현재 로그인한 유저 uid
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  const ownerInfo = participantsInfo?.find((item) => {
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
      await deleteParticipant(loggedInUserUid);
    }
    onClose();
  };

  return (
    <div className="absolute fixed inset-0 z-30 flex bg-black bg-opacity-30">
      <div className="w-full flex justify-end">
        <div
          className="desktop:w-[75%] desktop:h-[100%] desktop:top-[130px] desktop:left-[40px] 
        bg-[#ffffff] laptop:w-[218px] laptop:h-[240px] laptop:top-[114px] laptop:left-[37px]
        w-[218px] h-[255px] top-[112px] left-[39px]"
        >
          <div className="flex flex-col w-full h-full">
            <div
              className="self-start cursor-pointer ml-6 mt-6"
              onClick={() => {
                onActionInfoClose();
              }}
            >
              <IoCloseOutline size={40} />
            </div>
            <div className="w-full h-[25%] flex justify-center items-center mb-3">
              <img
                src={actionInfo?.img_url || ""}
                alt="action-image"
                className="object-cover w-[37%] h-[78%] rounded-[20%]"
              />
            </div>
            <div className="flex flex-col items-center border-b-1 pb-10">
              <div className="flex items-center gap-3">
                <IoIosChatboxes className="text-gray-500" size={25} />
                <span className="font-extrabold text-[18px]">
                  {actionInfo?.title}
                </span>
              </div>
              <span className="text-gray-400 mb-4">Green action</span>
              <span className="text-gray-500 mb-2">
                {actionInfo?.start_date}~{actionInfo?.end_date}
              </span>
            </div>
            <div className="flex flex-col items-start pl-10 pt-4">
              <span className="font-extrabold">참여자</span>
              <div className="flex mt-2 mb-4 gap-2 text-gray-500">
                <Image
                  src={personIcon}
                  alt="person-icon"
                  className="w-[20px] h-[20px]"
                />
                <span>
                  {participantsInfo?.length} / {actionInfo?.recruit_number}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 font-extrabold">
                  <Avatar
                    className="mr-2"
                    src={ownerNicknameImg?.profile_img || ""}
                  />
                  <LiaCrownSolid size={25} className="text-[#B3C8A1]" />
                  <span>{ownerNicknameImg?.display_name}</span>
                </div>
                {participantsInfo?.map((participant) => (
                  <>
                    {participant.id !== ownerInfo?.id && (
                      <div className="flex items-center gap-4 font-extrabold">
                        <Avatar
                          src={participant.profile_img || ""}
                          alt="participant-profile"
                        />
                        <span>{participant.display_name}</span>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
            {loggedInUserUid !== ownerInfo?.id && (
              <footer className="absolute bottom-0 w-[75%] h-[9%] border-t-1 flex items-center justify-center gap-3">
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
