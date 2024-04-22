"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";
import type { ChatProps } from "@/app/_types/realtime-chats";
import {
  useGetGroupActionInfo,
  useGetMessagesList,
  useUpdateUnread,
  userGetParticipantsInfo,
} from "@/app/_hooks/useQueries/chats";
import { sendMessage } from "@/app/_api/messages/privateChat-api";
import {
  QUERY_KEY_ALL_UNREAD_COUNT,
  QUERY_KEY_MESSAGES_LIST,
  QUERY_KEY_UNREAD_MESSAGES_COUNT,
} from "@/app/_api/queryKeys";
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
  useDisclosure,
} from "@nextui-org/react";
import { IoPaperPlane } from "react-icons/io5";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosChatboxes } from "react-icons/io";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";
import { LiaCrownSolid } from "react-icons/lia";
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

  // 액션정보 모달창
  const {
    isOpen: isActionInfoOpen,
    onOpen: onActionInfoOpen,
    onOpenChange: onActionInfoChange,
    onClose: onActionInfoClose,
  } = useDisclosure();

  // 현재 로그인한 유저 uid
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY_UNREAD_MESSAGES_COUNT],
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY_ALL_UNREAD_COUNT],
    });

    const messageSubscription = supabase
      .channel(`${roomId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },

        // TODO 안읽은 메시지 (헤더 아이콘) 같이 무효화하기
        // TODO 헤더 채팅리스트도 무효화 (얘는 리스트에서 해줘야할듯?)
        // 채팅 리스트 무효화 성공 - 리스트 전체를 무효화 (수정 필요)
        () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_MESSAGES_LIST],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_ALL_UNREAD_COUNT],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_UNREAD_MESSAGES_COUNT],
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

  // 안읽은 메시지 update useQuery가져오기
  const { data, isUpdateUnreadLoading, isUpdateUnreadError } = useUpdateUnread({
    loggedInUserUid,
    roomId,
  });

  // 채팅방 참가자 정보 가져오기(참가 타입, id, 닉네임, 프로필)
  const { participantsInfo, isParticipantsLoading, isParticipantsError } =
    userGetParticipantsInfo(roomId);

  // action정보 가져오기(id, 제목, 시작 및 종료일자, 모집인원, 사진1장 url)
  const { actionInfo, isActionInfoLoading, isActionInfoError } =
    useGetGroupActionInfo(actionId);

  if (
    isLoading ||
    isUpdateUnreadLoading ||
    isParticipantsLoading ||
    isActionInfoLoading
  ) {
    <div>Loading</div>;
  }
  if (
    isError ||
    isUpdateUnreadError ||
    isParticipantsError ||
    isActionInfoError ||
    messagesList === undefined
  ) {
    <div>Error</div>;
  }

  const ownerInfo = participantsInfo?.find((item) => {
    return item.participant_type === "방장";
  });

  const ownerNicknameImg = ownerInfo
    ? {
        display_name: ownerInfo.display_name,
        profile_img: ownerInfo.profile_img,
      }
    : null;

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
        <ModalContent className="max-w-[27%] h-[87%] overflow-y-auto scrollbar-hide rounded-[55px] relative">
          {(onClose) => (
            <>
              <ModalHeader className="fixed bg-white flex justify-between items-center gap-5 w-[27%] shadow-md h-28 z-10 px-8 rounded-tl-[55px] rounded-tr-[55px]">
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
                        className="w-4 h-4 object-cover"
                      />
                      <span className="text-gray-500 text-[15px]">
                        {participantsInfo?.length} /{" "}
                        {actionInfo?.recruit_number}
                      </span>
                    </div>
                  </div>
                  <button
                    className="bg-black text-white px-2"
                    onClick={() => handleCancelParticipate(onClose)}
                  >
                    참여 취소하기
                  </button>
                </div>
                <div>
                  <IoReorderThreeOutline
                    size={40}
                    className="cursor-pointer"
                    onClick={() => onActionInfoOpen()}
                  />
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
                        {message.sender_uid !== loggedInUserUid && (
                          <div className="flex items-start mb-1">
                            <Avatar
                              showFallback
                              src={message.users?.profile_img || ""} // 프로필 이미지 URL
                              alt="profile-img"
                              className="w-11 h-11 rounded-full mr-4"
                            />
                            <div>
                              <span className="font-semibold mr-2">
                                {message.users?.display_name}
                              </span>
                              <div className="bg-gray-300 text-black rounded-tr-2xl rounded-bl-2xl rounded-br-2xl p-5 text-base">
                                {message.content}
                              </div>
                            </div>
                          </div>
                        )}
                        {message.sender_uid === loggedInUserUid && (
                          <div className="bg-[#D4DFD2] rounded-tl-2xl rounded-bl-2xl rounded-br-2xl p-5 text-base">
                            {message.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="bg-[#F3F4F3] flex justify-center">
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
              {/* action info 모달창 */}
              {isActionInfoOpen && (
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
                            <IoIosChatboxes
                              className="text-gray-500"
                              size={25}
                            />
                            <span className="font-extrabold text-[18px]">
                              {actionInfo?.title}
                            </span>
                          </div>
                          <span className="text-gray-400 mb-4">
                            Green action
                          </span>
                          <span className="text-gray-500 mb-2">
                            {actionInfo?.start_date}~{actionInfo?.end_date}
                          </span>
                          {/* <div className="flex items-center">
                            <LiaCrownSolid />
                            <Avatar
                              showFallback
                              src={ownerNicknameImg?.profile_img || ""}
                              alt="owner_profile"
                            />
                            <span>{ownerNicknameImg?.display_name}</span>
                          </div> */}
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
                              {participantsInfo?.length} /{" "}
                              {actionInfo?.recruit_number}
                            </span>
                          </div>
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 font-extrabold">
                              <Avatar className="mr-2" />
                              <LiaCrownSolid size={20} />
                              <span>닉네임</span>
                            </div>
                            <div className="flex items-center gap-4 font-extrabold">
                              <Avatar />
                              <span>닉네임</span>
                            </div>
                          </div>
                        </div>
                        <footer className="absolute bottom-0 w-[75%] h-[9%] border-t-1 flex items-center justify-center gap-3">
                          <HiOutlineArrowLeftOnRectangle
                            size={30}
                            className="text-gray-700"
                          />
                          <span className="text-gray-700 text-[17px] font-extrabold mr-3">
                            참여 취소하기
                          </span>
                        </footer>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatRoom;
