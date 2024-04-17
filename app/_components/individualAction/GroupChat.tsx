import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";

import type { ChatProps } from "@/app/_types/realtime-chats";

import { QUERY_KEY_MESSAGES_LIST } from "@/app/_api/queryKeys";

import { useGetMessagesList } from "@/app/_hooks/useQueries/chats";
import { sendMessage } from "@/app/_api/messages/privateChat-api";

import { Input } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const GroupChat = ({ isOpen, onOpenChange, roomId }: ChatProps) => {
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  // 현재 로그인한 유저 uid
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  // console.log("roomId", roomId);

  useEffect(() => {
    const subscription = supabase
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
      subscription.unsubscribe();
    };
  }, []);

  const { messagesList, isLoading, isError } = useGetMessagesList({
    roomId,
    loggedInUserUid,
  });

  if (isLoading) {
    <div>Loading</div>;
  }
  if (isError || messagesList === undefined) {
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

  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="3xl"
      >
        <ModalContent className="max-w-[30%] h-[80%] overflow-y-auto scrollbar-hide">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                1:1 문의하기
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
      </Modal>
    </>
  );
};

export default GroupChat;
