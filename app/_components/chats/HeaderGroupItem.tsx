import React from "react";
import { Avatar, useDisclosure } from "@nextui-org/react";
import { LiaCrownSolid } from "react-icons/lia";
import PrivateChatRoom from "./PrivateChatRoom";
import Image from "next/image";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";
import {
  useGetActionInfo,
  useGetGroupParticipantsCount,
  useGetUnreadCount,
} from "@/app/_hooks/useQueries/chats";
import { formatToLocaleDateTimeString } from "@/utils/date/date";
import { useSession } from "next-auth/react";
import GroupChatRoom from "./GroupChatRoom";

const HeaderGroupItem = ({ room_id }: { room_id: string }) => {
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  // 단체 채팅방 모달창
  const {
    isOpen: isGroupChatOpen,
    onOpen: onGroupChatOpen,
    onOpenChange: onGroupChatOpenChange,
  } = useDisclosure();

  // 날짜 형식 변경
  // const formattedDate = privateChat
  // ? formatToLocaleDateTimeString(privateChat.created_at ?? "")
  // : "";

  // 채팅방의 action정보
  const { actionInfo, isActionInfoLoading, isActionInfoError } =
    useGetActionInfo(room_id);

  // 안읽은 메시지 수
  const { unreadCount, isLoading, isError } = useGetUnreadCount({
    loggedInUserUid,
    room_id,
  });

  // 그룹방 참여인원
  const { participantsCount, isParticipantsCountLoading, isParticipantsError } =
    useGetGroupParticipantsCount(room_id);

  if (isActionInfoLoading || isLoading || isParticipantsCountLoading) {
    return (
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoaing} alt="SoomLoading" />
      </div>
    );
  }

  if (
    isActionInfoError ||
    isError ||
    isParticipantsError ||
    unreadCount === undefined
  ) {
    return <div>Error</div>;
  }

  return (
    <div
      //   key={room_id}
      className="flex flex-col bg-white p-4 mr-3 mb-3 cursor-pointer rounded-2xl px-7 py-5"
      onClick={() => {
        // onPrivateChatOpen();
      }}
    >
      <div className="flex mb-3 justify-between">
        <div className="flex gap-3">
          <span className="font-bold text-lg">{actionInfo?.title}</span>
          <span>
            {/* {loggedInUserUid === actionInfo?.user_uid && (
              <LiaCrownSolid size={20} />
            )} */}
          </span>
        </div>
        <div className="text-sm text-gray-500">날짜</div>
        <div>
          {participantsCount} / {actionInfo?.recruit_number}
        </div>
      </div>
      <div className="flex">
        <div>
          <img
            src={actionInfo?.action_url}
            alt="action-image"
            className="mr-7 w-[70px] h-[70px] object-cover rounded-2xl"
          />
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="font-bold text-lg">닉네임</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">메시지</span>
              {unreadCount > 0 && (
                <div className="bg-[#B3C8A1] w-7 h-7 rounded-full text-white font-extrabold flex justify-center items-center">
                  {unreadCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* 그룹채팅방 */}
      {isGroupChatOpen && (
        <GroupChatRoom
          isOpen={isGroupChatOpen}
          onOpenChange={onGroupChatOpenChange}
          //  TODO props 확인 필요
          roomId={room_id}
          actionId=""
        />
      )}
    </div>
  );
};

export default HeaderGroupItem;
