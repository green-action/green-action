import React from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import {
  QUERY_KEY_ACTION_IDS_TITLES_URLS,
  QUERY_KEY_MESSAGES_PARTICIPANT_INFO,
  QUERY_KEY_MY_PRIVATE_ROOMS_IDS,
} from "@/app/_api/queryKeys";
import {
  getActionTitleAndUrl,
  getMyPrivateRoomInfos,
  getPrivateChatsList,
} from "@/app/_api/messages/headerPrivateList-api";

const HeaderPrivateChats = () => {
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  // data - 채팅방 id, 참가자 type, action id, 채팅방 type
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_MY_PRIVATE_ROOMS_IDS],
    queryFn: () => getMyPrivateRoomInfos(loggedInUserUid),
  });

  // 채팅방 별 action의 title, url
  const {
    data: actionIdsTitlesUrls,
    isLoading: isActionLoading,
    isError: isActionError,
  } = useQuery({
    queryKey: [QUERY_KEY_ACTION_IDS_TITLES_URLS],
    queryFn: () => {
      if (!data) return;

      const actionIds = data
        .filter((item) => item.chat_rooms_info !== null)
        .map((item) => item.chat_rooms_info?.action_id)
        .filter((id): id is string => typeof id === "string");

      if (actionIds.length === 0) return;

      return getActionTitleAndUrl(actionIds);
    },
    enabled: !!data,
  });

  // 마지막 메시지(내용, 시간), 채팅 상대방 정보(id, 닉네임, 프로필)
  const {
    data: messageAndParticipantInfo,
    isLoading: isMessageInfoLoading,
    isError: isMessageError,
  } = useQuery({
    queryKey: [QUERY_KEY_MESSAGES_PARTICIPANT_INFO],
    queryFn: () => {
      const roomIds = data?.map((item) => {
        return item.room_id;
      });

      if (!roomIds) return;

      return getPrivateChatsList({ loggedInUserUid, roomIds });
    },
    enabled: !!data,
  });

  if (isLoading || isActionLoading || isMessageInfoLoading) {
    <div>Loading</div>;
  }
  if (isError || isActionError || isMessageError) {
    <div>Error</div>;
  }

  console.log("messageAndParticipantInfo", messageAndParticipantInfo);

  return <div>HeaderPrivateChats</div>;
};

export default HeaderPrivateChats;
