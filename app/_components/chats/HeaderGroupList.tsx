import React, { useEffect } from "react";
import HeaderGroupItem from "./HeaderGroupItem";
import {
  useGetLastDates,
  useGetMyGroupChatIds,
} from "@/app/_hooks/useQueries/chats";
import { useSession } from "next-auth/react";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";
import {
  QUERY_KEY_ALL_UNREAD_COUNT,
  QUERY_KEY_GROUP_PARTICIPANTS_COUNT,
  QUERY_KEY_LAST_MESSAGE_INFO,
  QUERY_KEY_MY_GROUP_CHAT_IDS,
  QUERY_KEY_UNREAD_MESSAGES_COUNT,
} from "@/app/_api/queryKeys";
import { MODE_PREVIOUS, MODE_TODAY } from "@/app/_api/constant";

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
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_GROUP_PARTICIPANTS_COUNT],
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
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_LAST_MESSAGE_INFO, roomId],
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

  // 마지막 메시지 날짜에 따라 채팅방 id를 오늘/이전 알림으로 나누기 위해 가져옴
  const { lastDates, isLastDatesLoading, isLastDatesError } =
    useGetLastDates(roomIds);

  if (isRoomIdsLoading || isLastDatesLoading) {
    return (
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoaing} alt="SoomLoading" />
      </div>
    );
  }

  if (isRoomIdsError || isLastDatesError) {
    return <div>Error</div>;
  }

  if (!roomIds || !lastDates) return [];

  const today = new Date().toDateString();
  // TODO any 해결필요
  const todayRoomIdsDates: any = [];
  const previousRoomIdsDates: any = [];

  lastDates?.map((item) => {
    if (item === null) return [];

    const itemDate = new Date(item.created_at).toDateString();

    if (itemDate === today) {
      todayRoomIdsDates.push(item);
    } else {
      previousRoomIdsDates.push(item);
    }
  });

  return (
    <div className="px-10 pt-8">
      <div className="flex flex-col">
        <div className="mb-5 ml-2 mt-2 text-[18px] font-black">
          오늘 받은 알림
        </div>
        <div className="mb-7">
          {/* TODO any 해결 필요 */}
          {todayRoomIdsDates?.map((idDate: any) => (
            <HeaderGroupItem room_id={idDate.room_id} mode={MODE_TODAY} />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mb-5 ml-2 mt-2 text-[18px] font-black">이전 알림</div>
        <div>
          {/* TODO any 해결 필요 */}
          {previousRoomIdsDates?.map((idDate: any) => (
            <HeaderGroupItem room_id={idDate.room_id} mode={MODE_PREVIOUS} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderGroupList;
