"use client";

import { sendMessage } from "@/app/_api/messages/privateChat-api";
import {
  QUERY_KEY_ALL_UNREAD_COUNT,
  QUERY_KEY_MESSAGES_LIST,
  QUERY_KEY_MY_PRIVATE_ROOMS_IDS,
  QUERY_KEY_UNREAD_MESSAGES_COUNT,
  QUERY_KEY_UPDATE_UNREAD,
} from "@/app/_api/queryKeys";
import { useResponsive } from "@/app/_hooks/responsive";
import {
  useGetActionParticipantsInfo,
  useGetGroupActionInfo,
  useGetMessagesList,
  useGetParticipantInfo,
  useUpdateUnread,
} from "@/app/_hooks/useQueries/chats";
import { formatToLocaleDateTimeString } from "@/utils/date/date";
import { supabase } from "@/utils/supabase/client";
import {
  Avatar,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoPaperPlane, IoReorderThreeOutline } from "react-icons/io5";
import GroupInsideModal from "./GroupInsideModal";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";

import type { ChatProps } from "@/app/_types/realtime-chats";

const PrivateChatRoom: React.FC<ChatProps> = ({
  isOpen,
  onOpenChange,
  roomId,
  actionId,
}) => {
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const chatRoomRef = useRef<HTMLDivElement | null>(null);

  // 현재 로그인한 유저 uid
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  // 액션정보 모달창
  const {
    isOpen: isActionInfoOpen,
    onOpen: onActionInfoOpen,
    onOpenChange: onActionInfoChange,
    onClose: onActionInfoClose,
  } = useDisclosure();

  useEffect(() => {
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }

    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY_UNREAD_MESSAGES_COUNT],
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY_ALL_UNREAD_COUNT],
    });

    const subscription = supabase
      .channel(`${roomId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },

        // TODO 채팅 리스트 무효화 성공 - 리스트 전체를 무효화 (수정 필요 - setQueryData 등)
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
          // header 개인채팅 리스트 가져오기 무효화
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_MY_PRIVATE_ROOMS_IDS],
          });
          // 메시지 insert되면 리스트의 안읽수 업데이트도 같이 되어야함
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_UPDATE_UNREAD],
          });
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [roomId]);

  const { messagesList, isLoading, isError } = useGetMessagesList({
    roomId,
    loggedInUserUid,
  });

  // 안읽은 메시지 update useQuery가져오기
  const { data, isUpdateUnreadLoading, isUpdateUnreadError } = useUpdateUnread({
    loggedInUserUid,
    roomId,
  });

  // // 채팅방의 action정보, 참가자 정보
  // const { actionInfo, isActionInfoLoading, isActionInfoError } =
  //   useGetActionInfo(roomId);

  // action정보 가져오기(id, 제목, 시작 및 종료일자, 모집인원, 사진1장 url)
  const { actionInfo, isActionInfoLoading, isActionInfoError } =
    useGetGroupActionInfo(actionId);

  // action 참여자 정보
  const {
    actionParticipantsInfo,
    isActionParticipantsLoading,
    isActionParticipantsError,
  } = useGetActionParticipantsInfo(actionId);

  // 채팅방 상대방의 id, 닉네임, 이미지
  const { participantInfo, isParticiPantLoading, isParticiPantError } =
    useGetParticipantInfo({
      loggedInUserUid,
      room_id: roomId,
    });

  if (
    isLoading ||
    isUpdateUnreadLoading ||
    isActionInfoLoading ||
    isParticiPantLoading ||
    isActionParticipantsLoading
  ) {
    return (
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoaing} alt="SoomLoading" />
      </div>
    );
  }

  if (
    isError ||
    isUpdateUnreadError ||
    isActionInfoError ||
    isParticiPantError ||
    isActionParticipantsError ||
    messagesList === undefined ||
    actionParticipantsInfo === undefined
  ) {
    return <div>Error</div>;
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

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="3xl"
        ref={chatRoomRef}
        className="relative"
      >
        <ModalContent
          className={`scrollbar-hide rounded-[55px] h-[87%] 
            ${isActionInfoOpen ? "overflow-hidden" : "overflow-y-auto"}
            ${
              isDesktop
                ? "max-w-[27%]"
                : isLaptop
                ? "max-w-[500px] "
                : isMobile && "max-w-[332px]"
            }
            `}
        >
          {(onClose) => (
            <>
              <ModalHeader
                className={`fixed bg-white flex justify-between items-center gap-5 shadow-md z-10 px-8 rounded-tl-[55px] rounded-tr-[55px] ${
                  isDesktop
                    ? "w-[27%] h-28"
                    : isLaptop
                    ? "w-[500px] h-28"
                    : isMobile && "w-[332px] h-[73px]"
                }`}
              >
                <div className="flex gap-5 ml-2">
                  <Avatar
                    showFallback
                    src={participantInfo?.profile_img || ""}
                    alt="greener_profile"
                    size={`${isDesktop || isLaptop ? "lg" : "md"}`}
                  />
                  <div
                    className={`flex flex-col ${
                      isDesktop || (isLaptop && "gap-0")
                    }`}
                  >
                    <span
                      className={`font-extrabold ${
                        isDesktop || isLaptop
                          ? "text-xl"
                          : isMobile && "text-[15px]"
                      }`}
                    >
                      {participantInfo?.display_name}
                    </span>
                    <span
                      className={`text-gray-500 font-['Pretendard-ExtraLight'] ${
                        isDesktop
                          ? "text-[15px]"
                          : isLaptop
                          ? "text-[15px]"
                          : isMobile && "text-[11px]"
                      }`}
                    >
                      Greener
                    </span>
                  </div>
                </div>
                <div>
                  <IoReorderThreeOutline
                    size={`${isDesktop || isLaptop ? 40 : 27}`}
                    className="cursor-pointer"
                    onClick={() => onActionInfoOpen()}
                  />
                </div>
              </ModalHeader>
              <ModalBody
                className={`bg-[#F3F4F3] pb-0 px-0 ${
                  isDesktop ? "pt-32" : isLaptop ? "pt-32" : isMobile && "pt-24"
                }`}
              >
                <div className="flex justify-center h-[100%]">
                  <div className={`flex flex-col w-[100%]`}>
                    {messagesList?.map((message) => (
                      <div
                        className={`m-3 max-w-[70%] 
                        ${
                          (isDesktop || isLaptop) &&
                          (message.sender_uid === loggedInUserUid
                            ? "self-end mr-8"
                            : "self-start ml-8")
                        }
                        ${
                          isMobile &&
                          (message.sender_uid === loggedInUserUid
                            ? "self-end"
                            : "self-start")
                        }
                       `}
                        key={message.id}
                      >
                        <div
                          className={`p-5 
                          ${
                            isDesktop || isLaptop
                              ? "text-base"
                              : isMobile && "text-[12px]"
                          }
                          ${
                            message.sender_uid === loggedInUserUid
                              ? "bg-[#D4DFD2] rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
                              : "bg-gray-300 text-black rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
                          }
                          `}
                        >
                          {message.content}
                        </div>
                        <div
                          className={`flex text-[11px] text-[#BEBEBE] mt-2 ${
                            message.sender_uid === loggedInUserUid
                              ? "justify-end mr-2"
                              : "justify-start ml-2"
                          }`}
                        >
                          {formatToLocaleDateTimeString(
                            message.created_at,
                          ).substring(12)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sticky bottom-0 w-[100%] mx-auto bg-[#F3F4F3] flex justify-center pt-2">
                  <div className="flex items-center justify-between px-8 mb-[34px] w-[90%] h-16 bg-white rounded-[50px]">
                    <input
                      className="w-[90%] h-[85%] pl-4 focus:outline-none"
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
                </div>
                {isActionInfoOpen && (
                  <GroupInsideModal
                    onActionInfoClose={onActionInfoClose}
                    actionInfo={actionInfo}
                    participantsInfo={actionParticipantsInfo}
                    roomId={roomId}
                    actionId={actionId}
                    onClose={onClose}
                  />
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PrivateChatRoom;
