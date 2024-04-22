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
  Button,
  useDisclosure,
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

              {isActionInfoOpen && (
                <Modal
                  isOpen={isActionInfoOpen}
                  onOpenChange={onActionInfoOpen}
                  className="w-[300px] absolute"
                >
                  <ModalContent>
                    {() => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          Modal Title
                        </ModalHeader>
                        <ModalBody>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nullam pulvinar risus non risus hendrerit
                            venenatis. Pellentesque sit amet hendrerit risus,
                            sed porttitor quam.
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nullam pulvinar risus non risus hendrerit
                            venenatis. Pellentesque sit amet hendrerit risus,
                            sed porttitor quam.
                          </p>
                          <p>
                            Magna exercitation reprehenderit magna aute tempor
                            cupidatat consequat elit dolor adipisicing. Mollit
                            dolor eiusmod sunt ex incididunt cillum quis. Velit
                            duis sit officia eiusmod Lorem aliqua enim laboris
                            do dolor eiusmod. Et mollit incididunt nisi
                            consectetur esse laborum eiusmod pariatur proident
                            Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                          </p>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="light"
                            onClick={() => onActionInfoClose()}
                          >
                            Close
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatRoom;
