"use client";

import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";

import {
  QUERY_KEY_PRIVATE_CHATS_LIST,
  QUERY_KEY_PRIVATE_ROOM_IDS,
} from "@/app/_api/queryKeys";

import {
  getPrivateChatsList,
  getPrivateRoomIds,
} from "@/app/_api/messages/privateChat-api";

import { useResponsive } from "@/app/_hooks/responsive";

import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
} from "@nextui-org/react";

const PrivateChatsList = ({
  onClose,
  action_id,
}: {
  onClose: () => void;
  action_id: string;
}) => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const queryClient = useQueryClient();

  // 채팅방 room_id 배열 가져오기
  const { data: roomIds, error } = useQuery({
    queryKey: [QUERY_KEY_PRIVATE_ROOM_IDS],
    queryFn: async () => {
      const response = await getPrivateRoomIds(action_id);
      return response;
    },
  });

  useEffect(() => {
    // 채팅방 테이블 변경사항 구독 - 새 채팅방 insert될때 채팅방 리스트 실시간 업데이트
    const chatRoomsSubscription = supabase.channel(`{${action_id}}`).on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "chat_rooms_info" },

      (payload) => {
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

          (payload) => {
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
  const { data: privateChatsList, error: privateChatListError } = useQuery({
    queryKey: [QUERY_KEY_PRIVATE_CHATS_LIST],
    queryFn: async () => {
      if (roomIds) {
        return await getPrivateChatsList(roomIds);
      }
      return [];
    },
    enabled: !!roomIds,
  });

  if (error || privateChatListError) {
    return <div>Error</div>;
  }

  console.log("privateChatsList", privateChatsList);

  // TODO 해당 읽었는지 안읽었는지는 chat_messages에 column을 하나 더 추가해야할듯 (isRead)
  // 읽었는지 안읽었는지를 어떻게 파악하는건지??

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        1:1채팅방 리스트 in 액션페이지
      </ModalHeader>
      <ModalBody>
        {privateChatsList?.map((privateChat) => (
          <>
            {privateChat && (
              <div
                className={`${
                  isDesktop &&
                  "flex bg-gray-300 w-[90%] h-[10%] justify-center items-center mx-auto"
                }`}
              >
                <div>
                  <Avatar
                    showFallback
                    src={privateChat?.users?.profile_img || ""}
                    alt=""
                    className="mx-3"
                  />
                </div>
                <div className="w-[90%]">
                  <div className="flex justify-between mr-7 mb-2">
                    <p>{privateChat?.users?.display_name}</p>
                    <p>{privateChat?.created_at}</p>
                  </div>
                  <div>
                    <p>{privateChat?.content}</p>
                  </div>
                </div>
              </div>
            )}
          </>
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

export default PrivateChatsList;
