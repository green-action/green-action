import React, { useEffect } from "react";
import HeaderGroupItem from "./HeaderGroupItem";
import { useGetMyGroupChatIds } from "@/app/_hooks/useQueries/chats";
import { useSession } from "next-auth/react";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";
import {
  QUERY_KEY_ALL_UNREAD_COUNT,
  QUERY_KEY_MY_GROUP_CHAT_IDS,
  QUERY_KEY_UNREAD_MESSAGES_COUNT,
} from "@/app/_api/queryKeys";

const HeaderGroupList = () => {
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  const queryClient = useQueryClient();

  const { roomIds, isRoomIdsLoading, isRoomIdsError } =
    useGetMyGroupChatIds(loggedInUserUid);

  useEffect(() => {
    // 채팅방 테이블 변경사항 구독 - 새 채팅방 insert될때 채팅방 리스트 실시간 업데이트
    const chatRoomsSubscription = supabase.channel(`{${loggedInUserUid}}`).on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "chat_rooms_info" },

      () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_MY_GROUP_CHAT_IDS],
        });
      },
    );

    return () => {
      chatRoomsSubscription.unsubscribe();
    };
  }, [loggedInUserUid]);

  useEffect(() => {
    // 채팅내용 구독 - room_id 별로 채팅내용 변경사항 구독
    const subscriptions = roomIds?.map((roomId) => {
      const subscription = supabase
        .channel(`${roomId}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "chat_messages" },

          () => {
            // 채팅방 개설은 되어있지만, 메시지가 하나도 없었던 경우 대비 -> 메시지 내용 없을때도 방 띄우게 만들면 삭제가능
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_MY_GROUP_CHAT_IDS],
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_UNREAD_MESSAGES_COUNT],
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_ALL_UNREAD_COUNT],
            });
            // TODO 채팅 메시지, 날짜 업데이트하는 무효화 추가필요
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

  if (isRoomIdsLoading) {
    return (
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoaing} alt="SoomLoading" />
      </div>
    );
  }

  if (isRoomIdsError) {
    return <div>Error</div>;
  }

  if (!roomIds) return [];

  return (
    <>
      {roomIds.length > 0 &&
        roomIds?.map((room_id) => <HeaderGroupItem room_id={room_id} />)}
    </>
  );
};

export default HeaderGroupList;
