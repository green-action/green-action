"use client";

import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { supabase } from "@/utils/supabase/client";
import {
  QUERY_KEY_MESSAGES_PARTICIPANT_INFO_PAGE,
  QUERY_KEY_PRIVATE_ROOM_IDS,
  QUERY_KEY_UNREAD_MESSAGES_COUNT,
} from "@/app/_api/queryKeys";
import { ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import PagePrivateItem from "./PagePrivateItem";
import { useResponsive } from "@/app/_hooks/responsive";
import {
  useGetPrivateList,
  useGetPrivateRoomIds,
} from "@/app/_hooks/useQueries/chats";
import Image from "next/image";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";

const PageChatsList = ({
  onClose,
  action_id,
}: {
  onClose: () => void;
  action_id: string;
}) => {
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  const queryClient = useQueryClient();

  // 채팅방 room_id 배열 가져오기
  const { roomIds, isLoading, isError } = useGetPrivateRoomIds(action_id);

  useEffect(() => {
    // 채팅방 테이블 변경사항 구독 - 새 채팅방 insert될때 채팅방 리스트 실시간 업데이트
    const chatRoomsSubscription = supabase.channel(`{${action_id}}`).on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "chat_rooms_info" },

      () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_PRIVATE_ROOM_IDS],
        });
      },
    );
    return () => {
      chatRoomsSubscription.unsubscribe();
    };
  }, [action_id]);

  useEffect(() => {
    // 채팅내용 구독 - room_id 별로 채팅내용 변경사항 구독
    const subscriptions = roomIds?.map((roomId) => {
      const subscription = supabase
        .channel(`${roomId}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "chat_messages" },

          () => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_MESSAGES_PARTICIPANT_INFO_PAGE],
            }),
              // 채팅방 개설은 되어있지만, 메시지가 하나도 없었던 경우 대비
              queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_PRIVATE_ROOM_IDS],
              });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_UNREAD_MESSAGES_COUNT],
            });
          },
        )
        .subscribe();

      return subscription;
    });

    return () => {
      subscriptions?.map((subscription) => {
        return subscription.unsubscribe();
      });
    };
  }, [roomIds]);

  // 채팅방 리스트 가져오기
  const { privateChatsList, privateChatListLoading, privateChatListError } =
    useGetPrivateList({
      roomIds,
      loggedInUserUid,
    });

  if (isLoading || privateChatListLoading) {
    return (
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoaing} alt="SoomLoading" />
      </div>
    );
  }

  if (isError || privateChatListError) {
    return <div>Error</div>;
  }

  // console.log("privateChatsList", privateChatsList);

  // TODO 해당 읽었는지 안읽었는지는 chat_messages에 column을 하나 더 추가해야할듯 (isRead)
  // 읽었는지 안읽었는지를 어떻게 파악하는건지??

  return (
    <>
      {/* <ModalHeader className="flex flex-col gap-1 bg-[#D4DFD2] h-20 rounded-bl-3xl rounded-br-3xl"> */}
      <ModalHeader className="flex flex-col gap-1 z-10 shadow-md px-7 py-5">
        <div className="text-gray-500 text-sm">green-action</div>
        <div>1:1 문의 목록</div>
      </ModalHeader>
      <ModalBody className="bg-[#EAEAEA] pt-10 pb-7">
        {privateChatsList?.map((privateChat) => (
          <PagePrivateItem
            key={privateChat?.room_id}
            privateChat={privateChat}
          />
        ))}
      </ModalBody>
      <ModalFooter className="bg-[#EAEAEA] flex justify-start">
        <Button color="default" onPress={onClose}>
          close
        </Button>
      </ModalFooter>
    </>
  );
};

export default PageChatsList;
