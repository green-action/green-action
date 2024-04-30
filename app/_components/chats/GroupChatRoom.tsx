"use client";

import { sendMessage } from "@/app/_api/messages/privateChat-api";
import {
  QUERY_KEY_ALL_UNREAD_COUNT,
  QUERY_KEY_MESSAGES_LIST,
  QUERY_KEY_UNREAD_MESSAGES_COUNT,
} from "@/app/_api/queryKeys";
import {
  useGetGroupActionInfo,
  useGetMessagesList,
  useUpdateUnread,
  userGetParticipantsInfo,
} from "@/app/_hooks/useQueries/chats";
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
import personIcon from "/app/_assets/image/logo_icon/icon/mypage/person.png";
import { useResponsive } from "@/app/_hooks/responsive";

import type { ChatProps } from "@/app/_types/realtime-chats";

const GroupChatRoom: React.FC<ChatProps> = ({
  isOpen,
  onOpenChange,
  roomId,
  actionId,
}) => {
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const chatRoomRef = useRef<HTMLDivElement | null>(null);
  const { isDesktop, isLaptop, isMobile } = useResponsive();

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
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }

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

  const { data, isUpdateUnreadLoading, isUpdateUnreadError } = useUpdateUnread({
    loggedInUserUid,
    roomId,
  });

  const { participantsInfo, isParticipantsLoading, isParticipantsError } =
    userGetParticipantsInfo(roomId);

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
        className="relative"
        ref={chatRoomRef}
      >
        <ModalContent
          className={`relative scrollbar-hide rounded-[30px] 
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
          {(onClose) => (
            <>
              <ModalHeader
                className={`fixed bg-white flex justify-between items-center gap-5 shadow-md z-10 px-8 rounded-tl-[30px] rounded-tr-[30px] ${
                  isDesktop
                    ? "w-[520px] h-28"
                    : isLaptop
                    ? "w-[325px] h-[65px]"
                    : isMobile && "w-[332px] h-[70px]"
                }`}
              >
                <div
                  className={`flex items-center ${
                    isDesktop
                      ? "gap-5 ml-2"
                      : isLaptop
                      ? "gap-4"
                      : isMobile && "gap-4"
                  }`}
                >
                  <Avatar
                    showFallback
                    src={actionInfo?.img_url}
                    alt="action_profile"
                    size={`${isDesktop ? "lg" : "md"}`}
                    className={`${
                      isLaptop
                        ? "w-[35px] h-[35px]"
                        : isMobile && "w-[30px] h-[30px]"
                    }`}
                  />
                  <div
                    className={`flex flex-col gap-0.5 font-normal ${
                      isLaptop ? "h-[70px]" : isMobile && "h-[70px]"
                    }`}
                  >
                    <span
                      className={`text-gray-500 ${
                        isDesktop
                          ? "text-sm"
                          : isLaptop
                          ? "text-[10px] h-[15px] mb-0.5"
                          : isMobile && "text-[10px] h-[15px] mb-0.5"
                      }`}
                    >
                      Green action
                    </span>
                    <span
                      className={`font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis ${
                        isDesktop
                          ? "text-xl max-w-[280px]"
                          : isLaptop
                          ? "text-[14px] max-w-[170px] h-[20px] mb-1"
                          : isMobile &&
                            "text-[13px] max-w-[170px] h-[20px] mb-1"
                      }`}
                    >
                      {actionInfo?.title}
                    </span>
                    <div className="flex gap-2 items-center">
                      <Image
                        src={personIcon}
                        alt="person-icon"
                        className={`object-cover ${
                          isDesktop
                            ? "w-4 h-4"
                            : isLaptop
                            ? "w-3 h-3"
                            : isMobile && "w-3 h-3"
                        }`}
                      />
                      <span
                        className={`text-gray-500 ${
                          isDesktop
                            ? "text-[15px]"
                            : isLaptop
                            ? "text-[12px] h-[15px] flex items-center"
                            : isMobile &&
                              "text-[10px] h-[15px] flex items-center"
                        }`}
                      >
                        {participantsInfo?.length} /{" "}
                        {actionInfo?.recruit_number}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <IoReorderThreeOutline
                    size={`${isDesktop ? 40 : isLaptop ? 30 : 27}`}
                    className="cursor-pointer"
                    onClick={() => onActionInfoOpen()}
                  />
                </div>
              </ModalHeader>
              <ModalBody
                className={`bg-[#F3F4F3] pb-0 px-0 ${
                  isDesktop ? "pt-32" : isLaptop ? "pt-24" : isMobile && "pt-20"
                }`}
              >
                <div className="flex justify-center">
                  <div className={`flex flex-col w-[100%]`}>
                    {messagesList?.map((message) => (
                      <div
                        className={`max-w-[70%] 
                        ${
                          isDesktop &&
                          (message.sender_uid === loggedInUserUid
                            ? "self-end mr-3"
                            : "self-start ml-3")
                        }
                        ${
                          isLaptop &&
                          (message.sender_uid === loggedInUserUid
                            ? "self-end text-xs"
                            : "self-start")
                        }
                        ${
                          isMobile &&
                          (message.sender_uid === loggedInUserUid
                            ? "self-end text-xs"
                            : "self-start text-xs")
                        }
                        `}
                        key={message.id}
                      >
                        {message.sender_uid !== loggedInUserUid && (
                          <div className="flex items-start mb-1">
                            <Avatar
                              showFallback
                              src={message.users?.profile_img || ""} // 프로필 이미지 URL
                              alt="profile-img"
                              className={`rounded-full ${
                                isDesktop
                                  ? "w-11 h-11 mr-4 ml-4"
                                  : isLaptop
                                  ? "w-8 h-8 ml-4 mr-2"
                                  : isMobile && "w-7 h-7 mr-2 ml-3"
                              }`}
                            />
                            <div>
                              <span
                                className={`font-semibold mr-2 ${
                                  isDesktop
                                    ? ""
                                    : isLaptop
                                    ? "text-sm"
                                    : isMobile && "text-xs"
                                }`}
                              >
                                {message.users?.display_name}
                              </span>
                              <div
                                className={`bg-gray-300 text-black rounded-tr-2xl rounded-bl-2xl rounded-br-2xl ${
                                  isDesktop
                                    ? "text-base mb-3 p-5"
                                    : isLaptop
                                    ? "text-sm mb-2 p-3 mt-1"
                                    : isMobile && "text-xs mb-2 mt-1 p-3"
                                }`}
                              >
                                {message.content}
                              </div>
                            </div>
                          </div>
                        )}
                        {message.sender_uid === loggedInUserUid && (
                          <div
                            className={`bg-[#D4DFD2] rounded-tl-2xl rounded-bl-2xl rounded-br-2xl ${
                              isDesktop
                                ? "text-base p-5 mr-4 mb-3"
                                : isLaptop
                                ? "text-sm p-3 mr-4 mt-2"
                                : isMobile && "text-xs mt-1 mr-3 p-3"
                            }`}
                          >
                            {message.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sticky bottom-0 w-[100%] mx-auto bg-[#F3F4F3] flex justify-center pt-2">
                  <div
                    className={`flex items-center justify-between w-[90%] bg-white rounded-[50px] ${
                      isDesktop
                        ? "mb-[34px] h-16 px-8"
                        : isLaptop
                        ? "mb-[20px] h-12 px-8"
                        : isMobile && "mb-[17px] h-10 px-5"
                    }`}
                  >
                    <input
                      className={`w-[90%] h-[85%] focus:outline-none ${
                        isDesktop
                          ? "pl-4"
                          : isLaptop
                          ? "pl-2"
                          : isMobile && "pl-1"
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
                {isActionInfoOpen && (
                  <GroupInsideModal
                    onActionInfoClose={onActionInfoClose}
                    actionInfo={actionInfo}
                    participantsInfo={participantsInfo}
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

export default GroupChatRoom;
