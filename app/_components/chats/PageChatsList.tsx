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
import { PrivateChat } from "@/app/_types/realtime-chats";

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
  const { isDesktop, isLaptop, isMobile } = useResponsive();

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
              // 채팅방 개설은 되어있지만, 메시지가 하나도 없었던 경우 대비 -> 메시지 내용 없을때도 방 띄우게 만들면 삭제가능
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

  // 오늘 알림, 이전 알림 리스트 분리
  const today = new Date().toDateString();

  const todayChats: (PrivateChat | null)[] | undefined = [];
  const previousChats: (PrivateChat | null)[] | undefined = [];

  privateChatsList?.map((privateChat) => {
    if (!privateChat) return [];

    if (privateChat.created_at) {
      const messageDate = new Date(privateChat.created_at).toDateString();

      if (messageDate === today) {
        todayChats.push(privateChat);
      } else {
        previousChats.push(privateChat);
      }
    }
  });

  return (
    <>
      <header className="flex items-end gap-1 z-10 px-0">
        <div className="flex w-full flex-col">
          <div
            className={`${
              isDesktop
                ? "w-full"
                : isLaptop
                ? "w-full"
                : isMobile && "w-[332px] rounded-t-[55px]"
            } fixed bg-white z-10 flex text-[20px] gap-8 h-[13%] items-end pl-11`}
          >
            <div
              className={`pb-2
                ${isDesktop && "border-b-3 border-black font-black text-black"}
                ${
                  isLaptop &&
                  "border-b-2 border-black font-black text-black text-base"
                }
                ${
                  isMobile &&
                  "border-b-2 border-black font-black text-black text-sm"
                } 
                `}
            >
              1:1 문의 목록
            </div>
          </div>
        </div>
      </header>
      <ModalBody className="bg-[#EAEAEA] pt-[22%] pb-7 px-0">
        <div
          className={`${
            isDesktop ? "px-10" : isLaptop ? "px-8" : isMobile && "px-5 pt-3"
          }`}
        >
          <div className="flex flex-col">
            <div
              className={`ml-2 mt-2 font-black ${
                isDesktop
                  ? "text-[18px] mb-5"
                  : isLaptop
                  ? "text-[15px] mb-2"
                  : isMobile && "text-[13px] mb-2"
              }`}
            >
              오늘 받은 알림
            </div>
            <div
              className={`${
                isDesktop ? "mb-7" : isLaptop ? "mb-5" : isMobile && "mb-2"
              }`}
            >
              {todayChats?.map((privateChat) => (
                <PagePrivateItem
                  key={privateChat?.room_id}
                  privateChat={privateChat}
                  actionId={action_id}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className={`ml-2 mt-2 font-black ${
                isDesktop
                  ? "text-[18px] mb-5"
                  : isLaptop
                  ? "text-[15px] mb-2"
                  : isMobile && "text-[13px] mb-2"
              }`}
            >
              이전 알림
            </div>
            <div>
              {previousChats?.map((privateChat) => (
                <PagePrivateItem
                  key={privateChat?.room_id}
                  privateChat={privateChat}
                  actionId={action_id}
                />
              ))}
            </div>
          </div>
        </div>
      </ModalBody>
    </>
  );
};

export default PageChatsList;
