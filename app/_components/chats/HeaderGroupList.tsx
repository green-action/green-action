import { MODE_PREVIOUS, MODE_TODAY } from "@/app/_api/constant";
import {
  QUERY_KEY_ALL_UNREAD_COUNT,
  QUERY_KEY_GROUP_PARTICIPANTS_COUNT,
  QUERY_KEY_LAST_MESSAGE_INFO,
  QUERY_KEY_MY_GROUP_CHAT_IDS,
  QUERY_KEY_UNREAD_MESSAGES_COUNT,
} from "@/app/_api/queryKeys";
import { useResponsive } from "@/app/_hooks/responsive";
import {
  useGetLastDates,
  useGetMyGroupChatIds,
} from "@/app/_hooks/useQueries/chats";
import { LastDates } from "@/app/_types/realtime-chats";
import { supabase } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import HeaderGroupItem from "./HeaderGroupItem";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";

const HeaderGroupList = () => {
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const queryClient = useQueryClient();

  const { roomIds, isRoomIdsLoading, isRoomIdsError } =
    useGetMyGroupChatIds(loggedInUserUid);

  useEffect(() => {
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
    const subscriptions = roomIds?.map((roomId) => {
      const subscription = supabase
        .channel(`${roomId}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "chat_messages" },

          () => {
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

  const { lastDates, isLastDatesLoading, isLastDatesError } =
    useGetLastDates(roomIds);

  if (isRoomIdsLoading || isLastDatesLoading) {
    return (
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoaing} alt="SoomLoading" unoptimized />
      </div>
    );
  }

  if (isRoomIdsError || isLastDatesError) {
    return <div>Error</div>;
  }

  if (!roomIds || !lastDates) return [];

  const today = new Date().toDateString();

  const todayRoomIdsDates: (LastDates | null)[] | undefined = [];
  const previousRoomIdsDates: (LastDates | null)[] | undefined = [];

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
    <div
      className={`${
        isDesktop
          ? "px-10 pt-10"
          : isLaptop
          ? "px-8 pt-7"
          : isMobile && "px-5 pt-2"
      }`}
    >
      <div className="flex flex-col">
        <div
          className={`ml-2 mt-2 font-semibold ${
            isDesktop
              ? "text-[18px] mb-5"
              : isLaptop
              ? "text-[15px] mb-2"
              : isMobile && "text-[13px] mb-2"
          }`}
        >
          오늘 받은 알림
        </div>
        <div className={`${isDesktop && "mb-2"}`}>
          {todayRoomIdsDates?.map(
            (idDate) =>
              idDate && (
                <HeaderGroupItem room_id={idDate.room_id} mode={MODE_TODAY} />
              ),
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div
          className={`ml-2 mt-2 font-semibold ${
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
          {previousRoomIdsDates?.map(
            (idDate) =>
              idDate && (
                <HeaderGroupItem
                  room_id={idDate.room_id}
                  mode={MODE_PREVIOUS}
                />
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderGroupList;
