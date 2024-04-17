"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { supabase } from "@/utils/supabase/client";

import type { MessageType } from "@/app/_types/realtime-chats";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages, sendMessage } from "@/app/_api/messages/privateChat-api";

import { Input } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface PrivateChatProps {
  isOpen: boolean;
  onOpenChange: () => void;
  roomId: string;
}

const PrivateChat = ({ isOpen, onOpenChange, roomId }: PrivateChatProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    (MessageType | { [key: string]: any })[]
  >([]);

  console.log("roomId", roomId);

  const queryClient = useQueryClient();

  // 현재 로그인한 유저 uid
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  const action_id = "0cabf4aa-e1bc-4a8d-b754-f9661bf9875a";

  useEffect(() => {
    const subscription = supabase
      .channel(`${roomId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },

        // 채팅 리스트 무효화 성공 - 리스트 전체를 무효화 (수정 필요)
        (payload) => {
          queryClient.invalidateQueries({
            queryKey: ["messagesList"],
          });
        },

        // 시도 1. messages를 상태로 관리하기
        // (payload) => {
        //   // Update the specific part of the query data
        //   const newMessage = payload.new;
        //   setMessages((prevMessages) => [...prevMessages, newMessage]); // messages 업데이트
        // },

        // 시도 2. setQueryData 리팩토링 시도1
        // (payload) => {
        //   // Update the specific part of the query data
        //   const newMessage = payload.new;
        //   queryClient.setQueryData(
        //     ["messagesList", loggedInUserUid],
        //     (prevData) => {
        //       [...prevData, newMessage];
        //     },
        //   );
        // },

        // 시도 3. setQueryData 리팩토링 시도2
        // (payload) => {
        //   // Update the specific part of the query data
        //   const newMessage = payload.new;
        //   queryClient.setQueryData(
        //     ["messagesList"],
        //     (prevData: MessageType[]) => {
        //       // Check if prevData is an array, if not, initialize it as an empty array
        //       const newData = Array.isArray(prevData)
        //         ? [...prevData, newMessage]
        //         : [newMessage];
        //       return newData;
        //     },
        //   );
        // },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const {
    data: messagesList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["messagesList", loggedInUserUid],
    queryFn: getMessages,
    // // messageList를 message 상태에 넣어서 리스트 관리 시도
    // queryFn: async () => {
    //   const response = await getMessages();
    //   if (response) {
    //     setMessages(response); // 초기 데이터 설정
    //   }
    //   return response; // 데이터 반환
    // },
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

export default PrivateChat;
