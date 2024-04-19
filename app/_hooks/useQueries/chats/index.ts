import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/app/_api/messages/privateChat-api";
import {
  QUERY_KEY_ACTION_IDS_TITLES_URLS,
  QUERY_KEY_MESSAGES_LIST,
  QUERY_KEY_MESSAGES_PARTICIPANT_INFO_HEADER,
  QUERY_KEY_MESSAGES_PARTICIPANT_INFO_PAGE,
  QUERY_KEY_MY_PRIVATE_ROOMS_IDS,
  QUERY_KEY_PRIVATE_ROOM_IDS,
  QUERY_KEY_UNREAD_MESSAGES_COUNT,
} from "@/app/_api/queryKeys";
import {
  getActionTitleAndUrl,
  getMyPrivateRoomInfos,
  getPrivateChatsList,
  getUnreadMessageCount,
} from "@/app/_api/messages/headerPrivateList-api";

import type {
  PrivateChatsListItem,
  PrivateRoomsInfoType,
} from "@/app/_types/realtime-chats";
import { getPrivateRoomIds } from "@/app/_api/messages/pagePrivateList-api";

export const useGetMessagesList = ({
  roomId,
  loggedInUserUid,
}: {
  roomId: string;
  loggedInUserUid: string;
}) => {
  const {
    data: messagesList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY_MESSAGES_LIST, loggedInUserUid],
    queryFn: () => getMessages(roomId),
  });

  return { messagesList, isLoading, isError };
};

export const useGetMyPrivateRoomsInfo = (loggedInUserUid: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_MY_PRIVATE_ROOMS_IDS],
    queryFn: () => getMyPrivateRoomInfos(loggedInUserUid),
  });

  return { data, isLoading, isError };
};

export const useGetActionTitleAndUrl = (
  data: PrivateRoomsInfoType[] | undefined,
) => {
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

  return { actionIdsTitlesUrls, isActionLoading, isActionError };
};

export const useGetMessageAndParticipantInfo = ({
  loggedInUserUid,
  data,
}: PrivateChatsListItem) => {
  const {
    data: messageAndParticipantInfo,
    isLoading: isMessageInfoLoading,
    isError: isMessageError,
  } = useQuery({
    queryKey: [QUERY_KEY_MESSAGES_PARTICIPANT_INFO_HEADER],
    queryFn: () => {
      const roomIds = data?.map((item) => {
        return item.room_id;
      });

      if (!roomIds) return;

      return getPrivateChatsList({ loggedInUserUid, roomIds });
    },
    enabled: !!data,
  });

  return { messageAndParticipantInfo, isMessageInfoLoading, isMessageError };
};

export const useGetPrivateRoomIds = (action_id: string) => {
  const {
    data: roomIds,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY_PRIVATE_ROOM_IDS],
    queryFn: async () => {
      const response = await getPrivateRoomIds(action_id);
      return response;
    },
  });

  return { roomIds, isLoading, isError };
};

export const useGetPrivateList = ({
  roomIds,
  loggedInUserUid,
}: {
  roomIds: string[] | undefined;
  loggedInUserUid: string;
}) => {
  const {
    data: privateChatsList,
    isLoading: privateChatListLoading,
    isError: privateChatListError,
  } = useQuery({
    queryKey: [QUERY_KEY_MESSAGES_PARTICIPANT_INFO_PAGE],
    queryFn: async () => {
      if (roomIds) {
        return await getPrivateChatsList({ loggedInUserUid, roomIds });
      }
      return [];
    },
    enabled: !!roomIds,
  });

  return { privateChatsList, privateChatListLoading, privateChatListError };
};

export const useGetUnreadCount = ({
  loggedInUserUid,
  room_id,
}: {
  loggedInUserUid: string;
  room_id: string;
}) => {
  const {
    data: unreadCount,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY_UNREAD_MESSAGES_COUNT, room_id],
    queryFn: () => getUnreadMessageCount({ loggedInUserUid, room_id }),
  });

  return { unreadCount, isLoading, isError };
};
