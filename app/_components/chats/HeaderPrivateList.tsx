import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useResponsive } from "@/app/_hooks/responsive";
import { supabase } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetActionTitleAndUrl,
  useGetMessageAndParticipantInfo,
  useGetMyPrivateRoomsInfo,
} from "@/app/_hooks/useQueries/chats";
import {
  QUERY_KEY_ACTION_IDS_TITLES_URLS,
  QUERY_KEY_MESSAGES_PARTICIPANT_INFO_HEADER,
} from "@/app/_api/queryKeys";
import HeaderPrivateItem from "./HeaderPrivateItem";
import Image from "next/image";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";

const HeaderPrivateList = () => {
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const queryClient = useQueryClient();

  // data - 채팅방 id, 나의 채팅참가자 type(방장 or 참가자), 채팅방 type(개인), action id
  const { data, isLoading, isError } =
    useGetMyPrivateRoomsInfo(loggedInUserUid);

  useEffect(() => {
    const roomIds = data?.map((item) => {
      return item.room_id;
    });

    // 채팅내용 구독 - room_id 별로 채팅내용 변경사항 구독
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
              // 채팅방 개설은 되어있지만, 메시지가 하나도 없었던 경우 대비
              queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_ACTION_IDS_TITLES_URLS],
              });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_MESSAGES_PARTICIPANT_INFO_HEADER],
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

  // 채팅방 테이블 변경사항 구독 - 새 채팅방 insert될때 채팅방 리스트 실시간 업데이트
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

  // 채팅방 별 action의 title, url
  const { actionIdsTitlesUrls, isActionLoading, isActionError } =
    useGetActionTitleAndUrl(data);

  // 마지막 메시지(내용, 시간), 채팅 상대방 정보(id, 닉네임, 프로필)
  const { messageAndParticipantInfo, isMessageInfoLoading, isMessageError } =
    useGetMessageAndParticipantInfo({
      loggedInUserUid,
      data,
    });

  if (isLoading || isActionLoading || isMessageInfoLoading) {
    return (
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoaing} alt="SoomLoading" />
      </div>
    );
  }
  if (isError || isActionError || isMessageError) {
    return <div>Error</div>;
  }

  // data, actionIdsTitlesUrls 안 들어온 경우
  if (!data || !actionIdsTitlesUrls) return [];

  // action_id 같은 것들끼리 객체 하나로 병합
  const mergedData = data
    .filter((item) => item.chat_rooms_info !== null)
    .map((item) => {
      // 각 채팅방의 action_id 추출
      const actionId = item.chat_rooms_info?.action_id;

      // action_id 형식이 올바르지 않은 경우
      if (!actionId || typeof actionId !== "string") {
        console.warn(`Invalid action id found in data: ${actionId}`);
        return null;
      }

      // actionIdsTitlesUrls에서 해당 action_id 추출
      const matchingAction = actionIdsTitlesUrls.find(
        (action) => action.id === actionId,
      );

      if (!matchingAction) {
        console.warn(`No matching action found for action id ${actionId}`);
        return null;
      }

      // chat_rooms_info, action_info 를 하나의 객체로 반환
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

  // room_id 같은 것들끼리 객체 하나로 병합
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

  // console.log("combinedObjects", combinedObjects);

  return (
    <>
      {combinedObjects?.map((eachRoomInfo) => (
        <HeaderPrivateItem eachRoomInfo={eachRoomInfo} />
      ))}
    </>
  );
};

export default HeaderPrivateList;
