"use client";

import { MODE_PREVIOUS, MODE_TODAY } from "@/app/_api/constant";
import {
  QUERY_KEY_MESSAGES_PARTICIPANT_INFO_PAGE,
  QUERY_KEY_PRIVATE_ROOM_IDS,
  QUERY_KEY_UNREAD_MESSAGES_COUNT,
} from "@/app/_api/queryKeys";
import { useResponsive } from "@/app/_hooks/responsive";
import {
  useGetPrivateList,
  useGetPrivateRoomIds,
} from "@/app/_hooks/useQueries/chats";
import { supabase } from "@/utils/supabase/client";
import { ModalBody } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import PagePrivateItem from "./PagePrivateItem";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";

import type {
  PrivateChat,
  pageChatsListProps,
} from "@/app/_types/realtime-chats";

const PageChatsList: React.FC<pageChatsListProps> = ({ action_id }) => {
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  const queryClient = useQueryClient();
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  const { roomIds, isLoading, isError } = useGetPrivateRoomIds(action_id);

  useEffect(() => {
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

  const { privateChatsList, privateChatListLoading, privateChatListError } =
    useGetPrivateList({
      roomIds,
      loggedInUserUid,
    });

  if (isLoading || privateChatListLoading) {
    return (
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoaing} alt="SoomLoading" unoptimized />
      </div>
    );
  }

  if (isError || privateChatListError) {
    return <div>Error</div>;
  }

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
                ? "w-full h-[130px]"
                : isLaptop
                ? "w-full h-[80px]"
                : isMobile && "w-[332px] h-[55px] rounded-t-[30px]"
            } fixed bg-white z-10 flex text-[20px] gap-8 items-end pl-11`}
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
      <ModalBody
        className={`bg-[#EAEAEA] pb-7 px-0 ${
          isDesktop ? "pt-36" : isLaptop ? "pt-[90px]" : isMobile && "pt-12"
        }`}
      >
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
                  mode={MODE_TODAY}
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
                  mode={MODE_PREVIOUS}
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
