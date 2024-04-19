"use client";

import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { supabase } from "@/utils/supabase/client";
import {
  QUERY_KEY_PRIVATE_CHATS_LIST,
  QUERY_KEY_PRIVATE_ROOM_IDS,
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
              queryKey: [QUERY_KEY_PRIVATE_CHATS_LIST],
            }),
              // 채팅방 개설은 되어있지만, 메시지가 하나도 없었던 경우 대비
              queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_PRIVATE_ROOM_IDS],
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

  // TODO 해당 읽었는지 안읽었는지는 chat_messages에 column을 하나 더 추가해야할듯 (isRead)
  // 읽었는지 안읽었는지를 어떻게 파악하는건지??

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        1:1채팅방 리스트 in 액션페이지
      </ModalHeader>
      <ModalBody>
        {privateChatsList?.map((privateChat) => (
          <PagePrivateItem
            key={privateChat?.room_id}
            privateChat={privateChat}
          />
        ))}
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
  );
};

export default PageChatsList;
