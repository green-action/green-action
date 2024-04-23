"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "@/app/_api/messages/privateChat-api";
import {
  QUERY_KEY_ALL_UNREAD_COUNT,
  QUERY_KEY_MESSAGES_LIST,
  QUERY_KEY_UNREAD_MESSAGES_COUNT,
} from "@/app/_api/queryKeys";
import { Avatar } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import {
  useGetActionInfo,
  useGetMessagesList,
  useGetParticipantInfo,
  useUpdateUnread,
} from "@/app/_hooks/useQueries/chats";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";
import Image from "next/image";
import { IoPaperPlane } from "react-icons/io5";
import { useResponsive } from "@/app/_hooks/responsive";
import { formatToLocaleDateTimeString } from "@/utils/date/date";

import type { ChatProps } from "@/app/_types/realtime-chats";

type ChatPropsExceptActionId = Omit<ChatProps, "actionId">;

const PrivateChatRoom = ({
  isOpen,
  onOpenChange,
  roomId,
}: ChatPropsExceptActionId) => {
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const chatRoomRef = useRef<HTMLDivElement | null>(null);

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

    const subscription = supabase
      .channel(`${roomId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },

        // 채팅 리스트 무효화 성공 - 리스트 전체를 무효화 (수정 필요)
        () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_MESSAGES_LIST],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_ALL_UNREAD_COUNT],
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
  // TODO 스크롤이 위에 있을때 new message 개수 표시하는건 어떻게 처리해야할까?

  // 채팅방의 action정보
  const { actionInfo, isActionInfoLoading, isActionInfoError } =
    useGetActionInfo(roomId);

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
    isParticiPantLoading
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
    messagesList === undefined
  ) {
    return <div>Error</div>;
  }

  // console.log("actionInfo", actionInfo);
  // console.log("participantInfo", participantInfo);

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
      {isDesktop && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          size="3xl"
          ref={chatRoomRef}
        >
          <ModalContent className="relative max-w-[27%] h-[87%] overflow-y-auto scrollbar-hide rounded-[55px]">
            {(onClose) => (
              <>
                <ModalHeader className="fixed bg-white flex items-center gap-5 w-[27%] shadow-md h-28 z-10 px-8 rounded-tl-[55px] rounded-tr-[55px]">
                  <Avatar
                    showFallback
                    src={participantInfo?.profile_img || ""}
                    alt="greener_profile"
                    size="lg"
                  />
                  <div className="flex flex-col gap-0">
                    <span className="text-xl font-extrabold">
                      {participantInfo?.display_name}
                    </span>
                    <span className="text-gray-500 text-[15px] font-['Pretendard-ExtraLight']">
                      Greener
                    </span>
                  </div>
                </ModalHeader>
                <ModalBody className="bg-[#F3F4F3] pt-32 pb-0">
                  <div className="flex justify-center h-[100%]">
                    <div className={`flex flex-col w-[100%]`}>
                      {messagesList?.map((message) => (
                        <div
                          className={`m-3 max-w-[70%] ${
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
                  <div className="sticky bottom-0 w-[100%] mx-auto bg-[#F3F4F3] flex justify-center pt-2">
                    <div className="flex items-center justify-between px-8 mb-[34px] w-[90%] h-16 bg-white rounded-[50px]">
                      <input
                        className="w-[90%] h-[85%] pl-4 focus:outline-none "
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
                      <div
                        className="cursor-pointer"
                        onClick={handleSendMessage}
                      >
                        <IoPaperPlane size={25} />
                      </div>
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
      {isLaptop && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          size="3xl"
        >
          <ModalContent className="relative max-w-[500px] h-[87%] overflow-y-auto scrollbar-hide rounded-[55px]">
            {(onClose) => (
              <>
                <ModalHeader className="fixed bg-white flex items-center gap-5 w-[500px] shadow-md h-28 z-10 px-8 rounded-tl-[55px] rounded-tr-[55px]">
                  <Avatar
                    showFallback
                    src={participantInfo?.profile_img || ""}
                    alt="greener_profile"
                    size="lg"
                  />
                  <div className="flex flex-col gap-0">
                    <span className="text-xl font-extrabold">
                      {participantInfo?.display_name}
                    </span>
                    <span className="text-gray-500 text-[15px] font-['Pretendard-ExtraLight']">
                      Greener
                    </span>
                  </div>
                </ModalHeader>
                <ModalBody className="bg-[#F3F4F3] pt-32 pb-0">
                  <div className="flex justify-center h-[100%]">
                    <div className={`flex flex-col w-[100%]`}>
                      {messagesList?.map((message) => (
                        <div
                          className={`m-3 max-w-[70%]  ${
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
                  <div className="sticky bottom-0 w-[100%] mx-auto bg-[#F3F4F3] flex justify-center pt-2">
                    <div className="flex items-center justify-between px-8 mb-[34px] w-[90%] h-16 bg-white rounded-[50px]">
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
                      <div
                        className="cursor-pointer"
                        onClick={handleSendMessage}
                      >
                        <IoPaperPlane size={25} />
                      </div>
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
      {isMobile && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          size="3xl"
        >
          <ModalContent className="relative max-w-[332px] h-[87%] overflow-y-auto scrollbar-hide rounded-[55px]">
            {(onClose) => (
              <>
                <ModalHeader className="fixed bg-white flex items-center gap-5 w-[332px] shadow-md h-[73px] z-10 px-8 rounded-tl-[55px] rounded-tr-[55px]">
                  <Avatar
                    showFallback
                    src={participantInfo?.profile_img || ""}
                    alt="greener_profile"
                    size="md"
                  />
                  <div className="flex flex-col">
                    <span className="text-[15px] font-extrabold ">
                      {participantInfo?.display_name}
                    </span>
                    <span className="text-gray-500 text-[11px] font-['Pretendard-ExtraLight']">
                      Greener
                    </span>
                  </div>
                </ModalHeader>
                <ModalBody className="bg-[#F3F4F3] pt-24 pb-0">
                  <div className="flex justify-center h-[100%]">
                    <div className={`flex flex-col w-[100%]`}>
                      {messagesList?.map((message) => (
                        <div
                          className={`m-3 max-w-[70%]  ${
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
                            } p-5 text-[12px]`}
                          >
                            {message.content}
                          </div>
                          <div
                            className={`flex text-[11px] text-[#BEBEBE] mt-2 ${
                              message.sender_uid === loggedInUserUid
                                ? "justify-end"
                                : "justify-start"
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
                      <div
                        className="cursor-pointer"
                        onClick={handleSendMessage}
                      >
                        <IoPaperPlane size={25} />
                      </div>
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default PrivateChatRoom;
