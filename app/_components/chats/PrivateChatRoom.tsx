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

  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

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
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_MY_PRIVATE_ROOMS_IDS],
          });
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

  const { data, isUpdateUnreadLoading, isUpdateUnreadError } = useUpdateUnread({
    loggedInUserUid,
    roomId,
  });

  // action정보 가져오기(id, 제목, 시작 및 종료일자, 모집인원, 사진1장 url)
  const { actionInfo, isActionInfoLoading, isActionInfoError } =
    useGetGroupActionInfo(actionId);

  const {
    actionParticipantsInfo,
    isActionParticipantsLoading,
    isActionParticipantsError,
  } = useGetActionParticipantsInfo(actionId);

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
        <Image className="" src={SoomLoaing} alt="SoomLoading" unoptimized />
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

  const handleSendMessage = async () => {
    if (message === "") return;
    setMessage("");

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
          className={`scrollbar-hide rounded-[30px]
            ${isActionInfoOpen ? "overflow-hidden" : "overflow-y-auto"}
            ${
              isDesktop
                ? "w-[520px] h-[750px] "
                : isLaptop
                ? "w-[325px] h-[480px]"
                : isMobile && "w-[332px] h-[380px]"
            }
            `}
        >
          {(onPrivateChatClose) => (
            <>
              <ModalHeader
                className={`fixed bg-white flex justify-between items-center shadow-md z-10 px-8 rounded-tl-[30px] rounded-tr-[30px] ${
                  isDesktop
                    ? "w-[520px] h-28 gap-5"
                    : isLaptop
                    ? "w-[325px] h-[70px]"
                    : isMobile && "w-[332px] h-[70px]"
                }`}
              >
                <div
                  className={`flex items-center ${
                    isDesktop
                      ? "gap-5 ml-2"
                      : isLaptop
                      ? "gap-4 ml-2"
                      : isMobile && "gap-4 ml-0"
                  }`}
                >
                  <Avatar
                    showFallback
                    src={participantInfo?.profile_img || ""}
                    alt="greener_profile"
                    size={`${isDesktop ? "lg" : "md"}`}
                    className={`${isLaptop && "w-[40px] h-[40px]"}`}
                  />
                  <div className="flex flex-col gap-0">
                    <span
                      className={`font-semibold py-0 m-0 ${
                        isDesktop
                          ? "text-xl"
                          : isLaptop
                          ? "text-[17px]"
                          : isMobile && "text-[15px]"
                      }`}
                    >
                      {participantInfo?.display_name}
                    </span>
                    <span
                      className={`text-gray-500 font-extralight font-['Pretendard'] ${
                        isDesktop
                          ? "text-[15px]"
                          : isLaptop
                          ? "text-[13px]"
                          : isMobile && "text-[11px]"
                      }`}
                    >
                      Greener
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <IoReorderThreeOutline
                    size={`${isDesktop ? 40 : isLaptop ? 35 : 27}`}
                    className="cursor-pointer"
                    onClick={() => onActionInfoOpen()}
                  />
                </div>
              </ModalHeader>
              <ModalBody
                className={`bg-[#F3F4F3] pb-0 px-0 ${
                  isDesktop ? "pt-32" : isLaptop ? "pt-24" : isMobile && "pt-24"
                }`}
              >
                <div className="flex justify-center h-[100%]">
                  <div className={`flex flex-col w-[100%]`}>
                    {messagesList?.map((message) => (
                      <div
                        className={`m-3 max-w-[70%] font-
                        ${
                          (isDesktop || isLaptop) &&
                          (message.sender_uid === loggedInUserUid
                            ? "self-end mr-8"
                            : "self-start ml-8")
                        }
                        ${
                          isMobile &&
                          (message.sender_uid === loggedInUserUid
                            ? "self-end mr-5"
                            : "self-start ml-5")
                        }
                       `}
                        key={message.id}
                      >
                        <div
                          className={` 
                          ${
                            isDesktop
                              ? "text-base p-5"
                              : isLaptop
                              ? "text-sm p-3"
                              : isMobile && "text-[12px] p-2"
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
                  <div
                    className={`flex items-center justify-between px-8 w-[90%] bg-white rounded-[50px] ${
                      isDesktop
                        ? "mb-[34px] h-16"
                        : isLaptop
                        ? "mb-[20px] h-12"
                        : isMobile && "mb-[17px] h-10"
                    }`}
                  >
                    <input
                      className={`w-[90%] h-[85%] focus:outline-none ${
                        isDesktop
                          ? "pl-4"
                          : isLaptop
                          ? "pl-2"
                          : isMobile && "pl-0"
                      }`}
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
              </ModalBody>
              {isActionInfoOpen && (
                <GroupInsideModal
                  onActionInfoClose={onActionInfoClose}
                  actionInfo={actionInfo}
                  participantsInfo={actionParticipantsInfo}
                  roomId={roomId}
                  actionId={actionId}
                  onClose={onPrivateChatClose}
                />
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PrivateChatRoom;
