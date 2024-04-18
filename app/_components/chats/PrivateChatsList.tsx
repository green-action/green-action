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
import { getPrivateRoomIds } from "@/app/_api/messages/privateChat-api";
import { supabase } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

const PrivateChatsList = ({
  onClose,
  action_id,
}: {
  onClose: () => void;
  action_id: string;
}) => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const [roomIds, setRoomIds] = useState<string[]>([]);

  const queryClient = useQueryClient();

  // 채팅방 목록 가져오기 -> useQuery? realtime구독? (마지막 메시지 바뀔때마다 업데이트 되어야하는데...)
  // realtime 구독을 한다면, map으로 모든 room을 구독해야하는지? useEffect안에서 구독을 map으로 돌리는게 가능한건지?
  // 방이 삭제, 추가 되거나 원래 있던방에서 새로운 메시지가 오는 경우 바로바로 update가 되어야 해.

  // 아마도?!
  // action_id에 해당하는 room id들 전부 가져와서 배열에 넣기
  // useEffect로 room id들 map해서 전부 다 구독하기 + 채팅방 rooms_info 테이블도 같이 구독하기(새로운 채팅방 추가될때 바로 업데이트 되도록)
  // useQuery로 room id에 해당하는 닉네임, 아바타, 마지막 메시지, 마지막 메시지 시간 가져오기
  // -> 구독하고 insert했을때 실행되는 함수 부분에 '가져온 정보 무효화'하는 로직 넣어주기
  // 가져온 정보들은 채팅방 jsx map으로 뿌려주기

  useEffect(() => {
    // 채팅방 room_id 배열 가져오기
    const fetchData = async () => {
      const response = await getPrivateRoomIds(action_id);
      setRoomIds(response);
    };
    fetchData();
  }, [action_id]);

  useEffect(() => {
    // 채팅내용 구독 - room_id 별로 채팅내용 변경사항 구독
    // subscriptions 배열 선언
    const subscriptions = roomIds.map((roomId) => {
      const subscription = supabase
        .channel(`${roomId}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "chat_messages" },
          // 채팅방 리스트 무효화
          (payload) => {
            queryClient.invalidateQueries({
              // queryKey: [QUERY_KEY_PRIVATE_ROOMS_LIST],
            });
          },
        )
        .subscribe();

      return subscription; // subscription을 반환하여 배열에 추가
    });

    // console.log("subscriptions", subscriptions);

    // 채팅방 테이블 변경사항 구독
    const chatRoomsSubscription = supabase.channel(`{${action_id}}`).on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "chat_rooms_info" },

      // 채팅방 리스트 무효화
      (payload) => {
        queryClient.invalidateQueries({
          // queryKey: [QUERY_KEY_PRIVATE_ROOMS_LIST],
        });
      },
    );

    return () => {
      subscriptions.map((subscription) => {
        return subscription.unsubscribe();
      });
      chatRoomsSubscription.unsubscribe();
    };
    // 새로운 채팅방이 insert됐을때, 이 방도 구독해야되는데 이부분은 어떻게 처리하지?
  }, [roomIds]);

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
