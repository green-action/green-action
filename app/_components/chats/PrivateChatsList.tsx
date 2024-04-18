"use client";

import React, { useEffect, useState } from "react";
import { useResponsive } from "@/app/_hooks/responsive";

import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
} from "@nextui-org/react";
import {
  getPrivateChatsList,
  getPrivateRoomIds,
} from "@/app/_api/messages/privateChat-api";
import { supabase } from "@/utils/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  QUERY_KEY_PRIVATE_CHATS_LIST,
  QUERY_KEY_PRIVATE_ROOM_IDS,
} from "@/app/_api/queryKeys";

const PrivateChatsList = ({
  onClose,
  action_id,
}: {
  onClose: () => void;
  action_id: string;
}) => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  // const [roomIds, setRoomIds] = useState<string[]>([]);

  const queryClient = useQueryClient();

  // 채팅방 room_id 배열 가져오기
  const { data: roomIds, error } = useQuery({
    queryKey: [QUERY_KEY_PRIVATE_ROOM_IDS],
    queryFn: async () => {
      const response = await getPrivateRoomIds(action_id);
      // setRoomIds(response);
      return response;
    },
  });

  // console.log("roomIds", roomIds);
  // console.log("test", test);

  useEffect(() => {
    // const fetchData = async () => {
    //   const response = await getPrivateRoomIds(action_id);
    //   return setRoomIds(response);
    // };

    // fetchData();

    // const handleNewChatRoom = (payload: any) => {
    //   fetchData();
    // };

    // // 채팅내용 구독 - room_id 별로 채팅내용 변경사항 구독
    // const subscriptions = roomIds.map((roomId) => {
    //   const subscription = supabase
    //     .channel(`${roomId}`)
    //     .on(
    //       "postgres_changes",
    //       { event: "INSERT", schema: "public", table: "chat_messages" },
    //       // 해당 채팅방 최신화 - 채팅 내용들 가져온 쿼리키 무효화
    //       (payload) => {
    //         queryClient.invalidateQueries({
    //           // queryKey: [QUERY_KEY_PRIVATE_ROOMS_LIST],
    //         });
    //       },
    //     )
    //     .subscribe();

    //   return subscription;
    // });

    // 채팅방 테이블 변경사항 구독 (새 채팅방 insert될때 채팅방 리스트 실시간 업데이트)
    const chatRoomsSubscription = supabase.channel(`{${action_id}}`).on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "chat_rooms_info" },
      // (payload) => handleNewChatRoom(payload),

      // // 채팅방 리스트 무효화
      (payload) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_PRIVATE_ROOM_IDS],
        });
      },
    );

    return () => {
      // subscriptions.map((subscription) => {
      //   return subscription.unsubscribe();
      // });
      chatRoomsSubscription.unsubscribe();
    };
    // 새로운 채팅방이 insert됐을때 useEffect 다시 실행 -> 다시 map이 돌면서 새 채팅방도 구독해준다.
  }, []);

  useEffect(() => {
    // 채팅내용 구독 - room_id 별로 채팅내용 변경사항 구독
    const subscriptions = roomIds?.map((roomId) => {
      const subscription = supabase
        .channel(`${roomId}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "chat_messages" },
          // 해당 채팅방 최신화 - 채팅 내용들 가져온 쿼리키 무효화
          (payload) => {
            queryClient.invalidateQueries({
              // queryKey: [QUERY_KEY_PRIVATE_ROOMS_LIST],
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

  // // 채팅방 room_id 배열 가져오기
  // const { data, error } = useQuery({
  //   queryKey: [QUERY_KEY_PRIVATE_ROOM_IDS],
  //   queryFn: async () => {
  //     const response = await getPrivateRoomIds(action_id);
  //     setRoomIds(response);
  //     console.log("roomIds", roomIds);
  //     return response;
  //   },
  // });

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

  // 해당 읽었는지 안읽었는지는 chat_messages에 column을 하나 더 추가해야할듯 (isRead)
  // 읽었는지 안읽었는지를 어떻게 파악하는건지??

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        1:1채팅방 리스트 in 액션페이지
      </ModalHeader>
      <ModalBody>
        <div
          className={`${
            isDesktop &&
            "flex bg-gray-300 w-[90%] h-[10%] justify-center items-center mx-auto"
          }`}
        >
          <div>
            <Avatar showFallback src="" alt="" className="mx-3" />
          </div>
          <div className="w-[90%]">
            <div className="flex justify-between mr-7 mb-2">
              <p>닉네임</p>
              <p>시간</p>
            </div>
            <div>
              <p>마지막 메시지</p>
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
  );
};

export default PrivateChatsList;
