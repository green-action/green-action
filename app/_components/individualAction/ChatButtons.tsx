import { MODE_ACTION_PAGE } from "@/app/_api/constant";
import {
  changeRecruitingState,
  checkUserExist,
  countParticipants,
  getChatRoomId,
  getRecruitingNumber,
  insertNewParticipant,
} from "@/app/_api/messages/groupChat-api";
import {
  checkPrivateChatRoomExist,
  getActionOwnerUid,
  insertNewPrivateChatRoom,
} from "@/app/_api/messages/privateChat-api";
import ChatsListModal from "@/app/_components/chats/ChatsListModal";
import GroupChat from "@/app/_components/chats/GroupChatRoom";
import PrivateChat from "@/app/_components/chats/PrivateChatRoom";
import { useResponsive } from "@/app/_hooks/responsive";
import { useDisclosure } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";

import type { chatButtonProps } from "@/app/_types/individualAction/indext";

// NOTE props에 any 있음 - 카톡링크 모달창 없애면 사라질 이슈임
const ChatButtons: React.FC<chatButtonProps> = ({
  loggedInUserUid,
  action_id,
}) => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const [actionOwnerUid, setActionOwnerUid] = useState("");

  // 채팅방 리스트 모달창
  const {
    isOpen: isChatsListModalOpen,
    onOpen: onChatsListModalOpen,
    onClose: onChatsListModalClose,
  } = useDisclosure();

  // 1:1 채팅방 모달창
  const {
    isOpen: isPrivateChatOpen,
    onOpen: onPrivateChatOpen,
    onClose: onPrivateChatClose,
    onOpenChange: onPrivateChatOpenChange,
  } = useDisclosure();

  // 단체 채팅방 모달창
  const {
    isOpen: isGroupChatOpen,
    onOpen: onGroupChatOpen,
    onOpenChange: onGroupChatOpenChange,
  } = useDisclosure();

  // 1:1 채팅방 room_id 담는 Ref
  const privateRoomIdRef = useRef("");

  // 단체 채팅방 room_id 담는 Ref
  const groupRoomIdRef = useRef("");

  // 액션장 uid 가져오기
  // TODO useQuery로 변경하기
  useEffect(() => {
    const fetchData = async (action_id: string) => {
      const response = await getActionOwnerUid(action_id);
      if (response) {
        setActionOwnerUid(response);
      }
    };
    fetchData(action_id);
  }, [action_id]);

  // 1:1 채팅방 열기
  const handleOpenPrivateChatRoom = async () => {
    if (!loggedInUserUid) {
      alert("로그인이 필요합니다");
      return;
    }

    // 1. 이미 1:1 채팅방이 존재하는지 먼저 확인 - 이미 있으면 string값, 없으면 null값 반환
    const exited_room_id = await checkPrivateChatRoomExist({
      user_uid: loggedInUserUid,
      action_id,
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
      action_id,
      loggedInUserUid,
    });

    // privateRoomIdRef에 room_id 설정
    if (new_room_id) {
      privateRoomIdRef.current = new_room_id;
    }

    // 채팅방 모달창 open
    onPrivateChatOpen();
  };

  const handleOpenPrivateChatsList = () => {
    onChatsListModalOpen();
  };

  // 단체 채팅방 열기
  const handleOpenGroupChatRoom = async () => {
    if (!loggedInUserUid) {
      alert("로그인이 필요합니다");
      return;
    }

    // 단체 채팅방 room_id 가져오기
    const room_id = await getChatRoomId(action_id);
    groupRoomIdRef.current = room_id;

    // 채팅에 참여중인지 여부 확인(참여중이면 id값 있음 / 미참여 상태이면 null)
    const participant_id = await checkUserExist({
      room_id,
      loggedInUserUid,
    });

    // 이미 참여중인 경우 처리
    if (participant_id) {
      onGroupChatOpen();
      return;
    }
    // 새로운 참여인 경우
    const isConfirm = window.confirm("green-action에 참여하시겠습니까?");
    if (isConfirm) {
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
          loggedInUserUid,
        });
      }

      // 채팅인원 +1(내가 참여했으니까) === 모집인원 -> '모집마감' 처리
      if (participantsNumber + 1 === recruitingNumber) {
        await changeRecruitingState({ action_id, mode: "in" });
      }

      // 채팅방 모달창 open
      onGroupChatOpen();
    }
  };

  return (
    <>
      <div
        className={`${
          isDesktop
            ? "border-1 border-[#bfbfbf] bg-[#fafafa] h-[74.7px] rounded-[20px] mb-[22px] text-center content-center font-semibold cursor-pointer"
            : isLaptop
            ? "border-1 border-[#bfbfbf] bg-[#fafafa] h-[74.7px] rounded-[20px] mb-[22px] text-center content-center font-semibold cursor-pointer"
            : "border-1 border-[#bfbfbf] bg-[#fafafa] ml-[28px] w-[305px] h-[47px] rounded-[20px] mb-[22px] text-center content-center font-semibold cursor-pointer"
        }`}
        onClick={
          // 로그인유저 = 액션장인 경우 - 1:1 채팅방 목록 열기
          // 로그인유저 = 일반 유저인 경우 - 1:1 문의 채팅방 열기
          actionOwnerUid === loggedInUserUid
            ? handleOpenPrivateChatsList
            : handleOpenPrivateChatRoom
        }
      >
        {actionOwnerUid === loggedInUserUid
          ? "1:1 문의 확인하기"
          : "1:1 문의하기"}
      </div>
      <div
        className={`${
          isDesktop
            ? "border-1 border-[#bfbfbf] bg-[#fafafa] h-[74.7px] rounded-[20px] text-center content-center font-semibold cursor-pointer"
            : isLaptop
            ? "border-1 border-[#bfbfbf] bg-[#fafafa] h-[74.7px] rounded-[20px] text-center content-center font-semibold cursor-pointer"
            : "border-1 border-[#bfbfbf] bg-[#fafafa] ml-[28px] w-[305px] h-[47px] rounded-[20px] text-center content-center font-semibold cursor-pointer"
        }`}
        key={"opaque"}
        color="warning"
        onClick={handleOpenGroupChatRoom}
      >
        {actionOwnerUid === loggedInUserUid ? "그룹채팅방 보기" : "참여하기"}
      </div>
      {/* 1:1문의 목록보기 */}
      {isChatsListModalOpen && (
        <ChatsListModal
          isOpen={isChatsListModalOpen}
          onOpen={onChatsListModalOpen}
          onClose={onChatsListModalClose}
          mode={MODE_ACTION_PAGE}
          action_id={action_id}
        />
      )}
      {/* 1:1문의 채팅방 */}
      {isPrivateChatOpen && (
        <PrivateChat
          isOpen={isPrivateChatOpen}
          onOpenChange={onPrivateChatOpenChange}
          roomId={privateRoomIdRef.current}
          actionId={action_id}
        />
      )}
      {/* 그룹채팅방 */}
      {isGroupChatOpen && (
        <GroupChat
          isOpen={isGroupChatOpen}
          onOpenChange={onGroupChatOpenChange}
          roomId={groupRoomIdRef.current}
          actionId={action_id}
        />
      )}
    </>
  );
};

export default ChatButtons;
