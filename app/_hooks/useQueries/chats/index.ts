import { useQuery } from "@tanstack/react-query";
import {
  getActionParticipantsInfo,
  getMessages,
} from "@/app/_api/messages/privateChat-api";
import {
  QUERY_KEY_ACTION_IDS_TITLES_URLS,
  QUERY_KEY_ACTION_PARTICIPANTS_INFO,
  QUERY_KEY_ALL_UNREAD_COUNT,
  QUERY_KEY_CHAT_ACTION_INFO,
  QUERY_KEY_GROUP_ACTION_INFO,
  QUERY_KEY_GROUP_LIST_ACTIONS_INFO,
  QUERY_KEY_GROUP_PARTICIPANTS_COUNT,
  QUERY_KEY_GROUP_PARTICIPANTS_INFO,
  QUERY_KEY_LAST_MESSAGE_INFO,
  QUERY_KEY_MESSAGES_LIST,
  QUERY_KEY_MESSAGES_PARTICIPANT_INFO_HEADER,
  QUERY_KEY_MESSAGES_PARTICIPANT_INFO_PAGE,
  QUERY_KEY_MY_GROUP_CHAT_IDS,
  QUERY_KEY_MY_PRIVATE_ROOMS_IDS,
  QUERY_KEY_PRIVATE_PARTICIPANT_INFO,
  QUERY_KEY_PRIVATE_ROOM_IDS,
  QUERY_KEY_UNREAD_MESSAGES_COUNT,
  QUERY_KEY_UPDATE_UNREAD,
} from "@/app/_api/queryKeys";
import {
  getActionTitleAndUrl,
  getAllUnreadCount,
  getMyPrivateRoomInfos,
  getPrivateChatsList,
  getUnreadMessageCount,
  updateUnreadMessageCount,
} from "@/app/_api/messages/headerPrivateList-api";

import type {
  PrivateChatsListItem,
  PrivateRoomsInfoType,
} from "@/app/_types/realtime-chats";
import {
  getActionInfo,
  getParticipantInfo,
  getPrivateRoomIds,
} from "@/app/_api/messages/pagePrivateList-api";
import {
  getGroupActionInfo,
  getLastMessageInfo,
  getMyGroupChatIds,
  getParticipantsCount,
  getParticipantsInfo,
} from "@/app/_api/messages/groupChat-api";

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
      if (!data) return [];

      const actionIds = data
        .filter((item) => item.chat_rooms_info !== null)
        .map((item) => item.chat_rooms_info?.action_id)
        .filter((id): id is string => typeof id === "string");

      if (actionIds.length === 0) return [];

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

export const useUpdateUnread = ({
  loggedInUserUid,
  roomId,
}: {
  loggedInUserUid: string;
  roomId: string;
}) => {
  const {
    data,
    isLoading: isUpdateUnreadLoading,
    isError: isUpdateUnreadError,
  } = useQuery({
    queryKey: [QUERY_KEY_UPDATE_UNREAD],
    queryFn: () => updateUnreadMessageCount({ loggedInUserUid, roomId }),
  });

  return { data, isUpdateUnreadLoading, isUpdateUnreadError };
};

export const useGetActionInfo = (room_id: string) => {
  const {
    data: actionInfo,
    isLoading: isActionInfoLoading,
    isError: isActionInfoError,
  } = useQuery({
    queryKey: [QUERY_KEY_CHAT_ACTION_INFO, room_id],
    queryFn: () => getActionInfo(room_id),
  });

  return { actionInfo, isActionInfoLoading, isActionInfoError };
};

export const useGetParticipantInfo = ({
  loggedInUserUid,
  room_id,
}: {
  loggedInUserUid: string;
  room_id: string;
}) => {
  const {
    data: participantInfo,
    isLoading: isParticiPantLoading,
    isError: isParticiPantError,
  } = useQuery({
    queryKey: [QUERY_KEY_PRIVATE_PARTICIPANT_INFO],
    queryFn: () => getParticipantInfo({ loggedInUserUid, room_id }),
  });

  return { participantInfo, isParticiPantLoading, isParticiPantError };
};

export const useGetAllUnreadCount = (loggedInUserUid: string) => {
  const {
    data: allUnreadCount,
    isLoading: isAllUnreadCountLoading,
    isError: isAllUnreadCountError,
  } = useQuery({
    queryKey: [QUERY_KEY_ALL_UNREAD_COUNT],
    queryFn: () => getAllUnreadCount(loggedInUserUid),
    enabled: !!loggedInUserUid,
  });
  return { allUnreadCount, isAllUnreadCountLoading, isAllUnreadCountError };
};

export const userGetParticipantsInfo = (room_id: string) => {
  const {
    data: participantsInfo,
    isLoading: isParticipantsLoading,
    isError: isParticipantsError,
  } = useQuery({
    queryKey: [QUERY_KEY_GROUP_PARTICIPANTS_INFO],
    queryFn: () => getParticipantsInfo(room_id),
  });

  return { participantsInfo, isParticipantsLoading, isParticipantsError };
};

export const useGetGroupActionInfo = (action_id: string) => {
  const {
    data: actionInfo,
    isLoading: isActionInfoLoading,
    isError: isActionInfoError,
  } = useQuery({
    queryKey: [QUERY_KEY_GROUP_ACTION_INFO],
    queryFn: () => getGroupActionInfo(action_id),
  });

  return { actionInfo, isActionInfoLoading, isActionInfoError };
};

export const useGetMyGroupChatIds = (loggedInUserUid: string) => {
  const {
    data: roomIds,
    isLoading: isRoomIdsLoading,
    isError: isRoomIdsError,
  } = useQuery({
    queryKey: [QUERY_KEY_MY_GROUP_CHAT_IDS],
    queryFn: () => getMyGroupChatIds(loggedInUserUid),
  });

  return { roomIds, isRoomIdsLoading, isRoomIdsError };
};

export const useGetGroupParticipantsCount = (room_id: string) => {
  const {
    data: participantsCount,
    isLoading: isParticipantsCountLoading,
    isError: isParticipantsError,
  } = useQuery({
    queryKey: [QUERY_KEY_GROUP_PARTICIPANTS_COUNT, room_id],
    queryFn: () => getParticipantsCount(room_id),
  });

  return { participantsCount, isParticipantsCountLoading, isParticipantsError };
};

export const useGetLastMessageInfo = (room_id: string) => {
  const {
    data: lastMessageInfo,
    isLoading: isLastMessageInfoLoading,
    isError: isLastMessageInfoError,
  } = useQuery({
    queryKey: [QUERY_KEY_LAST_MESSAGE_INFO, room_id],
    queryFn: () => getLastMessageInfo(room_id),
  });

  return { lastMessageInfo, isLastMessageInfoLoading, isLastMessageInfoError };
};

export const useGetActionParticipantsInfo = (action_id: string) => {
  const {
    data: actionParticipantsInfo,
    isLoading: isActionParticipantsLoading,
    isError: isActionParticipantsError,
  } = useQuery({
    queryKey: [QUERY_KEY_ACTION_PARTICIPANTS_INFO, action_id],
    queryFn: () => getActionParticipantsInfo(action_id),
  });

  return {
    actionParticipantsInfo: actionParticipantsInfo || [],
    isActionParticipantsLoading,
    isActionParticipantsError,
  };
};
