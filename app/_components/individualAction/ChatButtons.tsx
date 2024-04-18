import React, { useEffect, useRef, useState } from "react";

import {
  checkPrivateChatRoomExist,
  getActionOwnerUid,
  insertNewPrivateChatRoom,
} from "@/app/_api/messages/privateChat-api";

import {
  changeRecruitingState,
  checkUserExist,
  countParticipants,
  getChatRoomId,
  getRecruitingNumber,
  insertNewParticipant,
} from "@/app/_api/messages/groupChat-api";
import { useDisclosure } from "@nextui-org/react";

import PrivateChat from "@/app/_components/chats/PrivateChat";
import GroupChat from "@/app/_components/chats/GroupChat";
import ChatsListModal from "@/app/_components/chats/ChatsListModal";

const ChatButtons = ({
  loggedInUserUid,
  action_id,
}: {
  loggedInUserUid: string;
  action_id: string;
}) => {
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

  // 액션장 uid 가져오기
  useEffect(() => {
    const fetchData = async (action_id: string) => {
      const response = await getActionOwnerUid(action_id);
      if (response) {
        setActionOwnerUid(response);
      }
    };
    fetchData(action_id);
  }, [action_id]);

  // 1:1 채팅방 모달 열기
  const handleOpenPrivateChatRoom = async () => {
    // TODO 로그인한 유저가 액션장이면 1:1채팅하기 버튼 안보이게 or 문구 수정
    // 본인이 방장인 경우, '1:1채팅 목록 확인' 이런식으로 버튼 이름 바꿔야겠어
    // 누르면 목록 보여주는 모달창 여는 로직 -> 채팅방 클릭시 채팅방 모달창 open

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

  // 단체 채팅방 클릭 핸들러
  const handleOpenGroupChatRoom = async () => {
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
    <>
      <div
        className="border-1 border-[#bfbfbf] bg-[#fafafa] h-[74.7px] rounded-[20px] mb-[22px] text-center content-center font-semibold cursor-pointer"
        onClick={
          // 로그인유저 = 액션장인 경우 - 1:1 채팅방 목록 열기
          // 로그인유저 = 일반 유저인 경우 - 1:1 문의 채팅방 열기
          actionOwnerUid === loggedInUserUid
            ? handleOpenPrivateChatsList
            : handleOpenPrivateChatRoom
        }
      >
        {actionOwnerUid === loggedInUserUid
          ? "1:1 문의방 목록보기"
          : "1:1 문의하기"}
      </div>
      <div
        className="border-1 border-[#bfbfbf] bg-[#fafafa] h-[74.7px] rounded-[20px] text-center content-center font-semibold cursor-pointer"
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
          mode="actionPage"
          action_id={action_id}
        />
      )}
      {/* 1:1문의 채팅방 */}
      {/* TODO 로그인 유저 = 액션장 -> 채팅방 리스트 한번 열고, 그 다음에 방 클릭시 해당 방 모달을 보여주기 */}
      {isPrivateChatOpen && (
        <PrivateChat
          isOpen={isPrivateChatOpen}
          onOpenChange={onPrivateChatOpenChange}
          roomId={privateRoomIdRef.current}
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
