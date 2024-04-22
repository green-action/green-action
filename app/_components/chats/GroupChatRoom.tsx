"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";
import type { ChatProps } from "@/app/_types/realtime-chats";
import {
  useGetGroupActionInfo,
  useGetMessagesList,
  userGetParticipantsInfo,
} from "@/app/_hooks/useQueries/chats";
import { sendMessage } from "@/app/_api/messages/privateChat-api";
import { QUERY_KEY_MESSAGES_LIST } from "@/app/_api/queryKeys";
import {
  changeRecruitingState,
  countParticipants,
  deleteParticipant,
  getRecruitingNumber,
} from "@/app/_api/messages/groupChat-api";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { IoPaperPlane } from "react-icons/io5";
import { IoReorderThreeOutline } from "react-icons/io5";
import { Avatar, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import personIcon from "/app/_assets/image/logo_icon/icon/mypage/person.png";

const GroupChatRoom = ({
  isOpen,
  onOpenChange,
  roomId,
  actionId,
}: ChatProps) => {
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  // 현재 로그인한 유저 uid
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  useEffect(() => {
    const messageSubscription = supabase
      .channel(`${roomId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },

        // 채팅 리스트 무효화 성공 - 리스트 전체를 무효화 (수정 필요)
        (payload) => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_MESSAGES_LIST],
          });
        },
      )
      .subscribe();

    return () => {
      messageSubscription.unsubscribe();
    };
  }, []);

  const { messagesList, isLoading, isError } = useGetMessagesList({
    roomId,
    loggedInUserUid,
  });

  // 채팅방 참가자 정보 가져오기(참가 타입, id, 닉네임, 프로필)
  const { participantsInfo, isParticipantsLoading, isParticipantsError } =
    userGetParticipantsInfo(roomId);

  // action정보 가져오기(id, 제목, 시작 및 종료일자, 모집인원, 사진1장 url)
  const { actionInfo, isActionInfoLoading, isActionInfoError } =
    useGetGroupActionInfo(actionId);

  if (isLoading || isParticipantsLoading || isActionInfoLoading) {
    <div>Loading</div>;
  }
  if (
    isError ||
    isParticipantsError ||
    isActionInfoError ||
    messagesList === undefined
  ) {
    <div>Error</div>;
  }

  // 메시지 보내기 핸들러
  const handleSendMessage = async () => {
    if (message === "") return;
    setMessage(""); // 메시지를 전송한 후에 입력 필드의 값을 비움

    await sendMessage({
      sender_uid: loggedInUserUid,
      room_id: roomId,
      content: message,
    });
  };

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
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="3xl"
      >
        <ModalContent className="max-w-[27%] h-[87%] overflow-y-auto scrollbar-hide rounded-[55px]">
          {(onClose) => (
            <>
              <ModalHeader className="fixed bg-white flex justify-between items-center gap-5 w-[27%] shadow-md h-28 z-10 px-8 rounded-tl-[55px] rounded-tr-[55px]">
                {/* 임시 - 버튼 클릭시 action 정보 띄울 예정 */}
                {/* <Tooltip
                  showArrow={true}
                  key="bottom"
                  placement="bottom"
                  content="green-action 상세페이지로 이동"
                  color="foreground"
                >
                  <button
                    className="bg-transparent w-8"
                  >
                  </button>
                </Tooltip> */}
                <div className="flex items-center gap-5">
                  <Avatar
                    showFallback
                    src={actionInfo?.img_url}
                    alt="greener_profile"
                    size="lg"
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-500 text-sm">Green action</span>
                    <span className="text-xl font-extrabold">
                      {actionInfo?.title}
                    </span>
                    <div className="flex gap-2 items-center">
                      <Image
                        src={personIcon}
                        alt="person-icon"
                        className="w-4 h-4"
                      />
                      <span className="text-gray-500 text-[15px]">
                        {participantsInfo?.length} /{" "}
                        {actionInfo?.recruit_number}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <IoReorderThreeOutline size={40} className="cursor-pointer" />
                </div>
              </ModalHeader>
              <ModalBody className="bg-[#F3F4F3] pt-32">
                <div className="flex justify-center">
                  <div className={`flex flex-col w-[100%]`}>
                    {messagesList?.map((message) => (
                      <div
                        className={`m-3 ${
                          message.sender_uid === loggedInUserUid
                            ? "self-end"
                            : "self-start"
                        }`}
                        key={message.id}
                      >
                        <div
                          className={`${
                            message.sender_uid === loggedInUserUid
                              ? "bg-[#D4DFD2] rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
                              : "bg-gray-300 text-black rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
                          } p-5 text-base`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="bg-[#F3F4F3] flex justify-center sticky">
                <div className="flex items-center justify-between px-8 w-[90%] mb-5 bg-white h-16 rounded-[50px]">
                  <input
                    className="w-[90%] h-[85%] pl-4"
                    type="text"
                    placeholder="send message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <div className="cursor-pointer" onClick={handleSendMessage}>
                    <IoPaperPlane size={25} />
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="3xl"
      >
        <ModalContent className="max-w-[30%] h-[80%] overflow-y-auto scrollbar-hide">
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1">
                <span className="mr-5">action 참여자 단체 채팅방</span>
                <button
                  className="bg-black text-white px-2"
                  onClick={() => handleCancelParticipate(onClose)}
                >
                  참여 취소하기
                </button>
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-center">
                  <div className="flex flex-col">
                    <div className="mb-10 font-bold text-3xl">채팅</div>
                    {messagesList?.map((message) => (
                      <div className="m-3" key={message.id}>
                        <div
                          className={`${
                            message.sender_uid === loggedInUserUid &&
                            "bg-gray-300"
                          }`}
                        >
                          {message.users?.display_name}
                        </div>
                        <div>{message.content}</div>
                      </div>
                    ))}
                    <div>
                      <Input
                        className="w-80 mb-5 mt-10"
                        placeholder="send message..."
                        value={message} // 입력 필드의 값을 상태로 설정
                        onChange={(e) => setMessage(e.target.value)} // 입력 필드의 값이 변경될 때마다 상태를 업데이트
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}
    </>
  );
};

export default GroupChatRoom;
