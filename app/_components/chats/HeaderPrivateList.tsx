import { MODE_PREVIOUS, MODE_TODAY } from "@/app/_api/constant";
import {
  QUERY_KEY_ACTION_IDS_TITLES_URLS,
  QUERY_KEY_MESSAGES_PARTICIPANT_INFO_HEADER,
  QUERY_KEY_UNREAD_MESSAGES_COUNT,
} from "@/app/_api/queryKeys";
import { useResponsive } from "@/app/_hooks/responsive";
import {
  useGetActionTitleAndUrl,
  useGetMessageAndParticipantInfo,
  useGetMyPrivateRoomsInfo,
} from "@/app/_hooks/useQueries/chats";
import { CombinedObject } from "@/app/_types/realtime-chats";
import { supabase } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import HeaderPrivateItem from "./HeaderPrivateItem";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";

const HeaderPrivateList = () => {
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } =
    useGetMyPrivateRoomsInfo(loggedInUserUid);

  useEffect(() => {
    const roomIds = data?.map((item) => {
      return item.room_id;
    });

    const subscriptions = roomIds?.map((roomId) => {
      const subscription = supabase
        .channel(`${roomId}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "chat_messages" },

          () => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_MESSAGES_PARTICIPANT_INFO_HEADER],
            }),
              queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_ACTION_IDS_TITLES_URLS],
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
  }, [data]);

  useEffect(() => {
    const chatRoomsSubscription = supabase.channel(`{${loggedInUserUid}}`).on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "chat_rooms_info" },

      () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_ACTION_IDS_TITLES_URLS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_MESSAGES_PARTICIPANT_INFO_HEADER],
        });
      },
    );
    return () => {
      chatRoomsSubscription.unsubscribe();
    };
  }, []);

  const { actionIdsTitlesUrls, isActionLoading, isActionError } =
    useGetActionTitleAndUrl(data);

  const { messageAndParticipantInfo, isMessageInfoLoading, isMessageError } =
    useGetMessageAndParticipantInfo({
      loggedInUserUid,
      data,
    });

  if (isLoading || isActionLoading || isMessageInfoLoading) {
    return (
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoaing} alt="SoomLoading" unoptimized />
      </div>
    );
  }
  if (isError || isActionError || isMessageError) {
    return <div>Error</div>;
  }

  if (!data || !actionIdsTitlesUrls) return [];

  const mergedData = data
    .filter((item) => item.chat_rooms_info !== null)
    .map((item) => {
      const actionId = item.chat_rooms_info?.action_id;

      if (!actionId || typeof actionId !== "string") {
        console.warn(`Invalid action id found in data: ${actionId}`);
        return null;
      }

      const matchingAction = actionIdsTitlesUrls.find(
        (action) => action.id === actionId,
      );

      if (!matchingAction) {
        console.warn(`No matching action found for action id ${actionId}`);
        return null;
      }

      return {
        chat_rooms_info: {
          room_type: item?.chat_rooms_info?.room_type,
          room_id: item.room_id,
          participant_type: item.participant_type,
        },
        action_info: {
          action_id: actionId,
          action_title: matchingAction.title,
          action_imgUrl: matchingAction.firstUrl,
        },
      };
    });

  const filteredMergedData = mergedData.filter((item) => item !== null);

  const combinedObjects = messageAndParticipantInfo
    ?.map((message) => {
      const matchingMergedItem = filteredMergedData.find(
        (mergedItem) =>
          mergedItem?.chat_rooms_info?.room_id === message?.room_id,
      );

      if (!matchingMergedItem) {
        console.warn(
          `No matching mergedData found for message with room id ${message?.room_id}`,
        );
        return null;
      }

      return {
        message,
        ...matchingMergedItem,
      };
    })
    .filter((combined) => combined !== null);

  const todayMessages: (CombinedObject | null)[] | undefined = [];
  const previousMessages: (CombinedObject | null)[] | undefined = [];

  if (combinedObjects) {
    const today = new Date().toDateString();

    combinedObjects.map((eachRoomInfo: any) => {
      const messageDate = new Date(
        eachRoomInfo.message.created_at,
      ).toDateString();

      if (messageDate === today) {
        todayMessages.push(eachRoomInfo);
      } else {
        previousMessages.push(eachRoomInfo);
      }
    });
  }

  return (
    <div
      className={`${
        isDesktop
          ? "pt-10 px-10"
          : isLaptop
          ? "pt-7 px-8"
          : isMobile && "pt-2 px-5"
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
          {todayMessages?.map((eachRoomInfo) => (
            <HeaderPrivateItem eachRoomInfo={eachRoomInfo} mode={MODE_TODAY} />
          ))}
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
          {previousMessages?.map((eachRoomInfo) => (
            <HeaderPrivateItem
              eachRoomInfo={eachRoomInfo}
              mode={MODE_PREVIOUS}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderPrivateList;
