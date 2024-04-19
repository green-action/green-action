import React from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import {
  QUERY_KEY_ACTION_IDS_TITLES_URLS,
  QUERY_KEY_MESSAGES_PARTICIPANT_INFO_HEADER,
  QUERY_KEY_MY_PRIVATE_ROOMS_IDS,
} from "@/app/_api/queryKeys";
import {
  getActionTitleAndUrl,
  getMyPrivateRoomInfos,
  getPrivateChatsList,
} from "@/app/_api/messages/headerPrivateList-api";
import { useResponsive } from "@/app/_hooks/responsive";

const HeaderPrivateChats = () => {
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  // data - 채팅방 id, 나의 참가자 type, action id, 채팅방 type
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

  if (isLoading || isActionLoading || isMessageInfoLoading) {
    <div>Loading</div>;
  }
  if (isError || isActionError || isMessageError) {
    <div>Error</div>;
  }

  // 먼저 data와 actionIdsTitlesUrls가 모두 로드되었는지 확인합니다.
  if (!data || !actionIdsTitlesUrls) return [];

  // data에서 chat_rooms_info가 null이 아닌 것들만 필터링하여 해당 action_id를 추출합니다.
  const mergedData = data
    .filter((item) => item.chat_rooms_info !== null)
    .map((item) => {
      const actionId = item.chat_rooms_info?.action_id;

      if (!actionId || typeof actionId !== "string") {
        console.warn(`Invalid action id found in data: ${actionId}`);
        return null; // 올바르지 않은 action_id는 건너뜁니다.
      }

      // actionIdsTitlesUrls에서 해당 action_id에 해당하는 데이터를 찾습니다.
      const matchingAction = actionIdsTitlesUrls.find(
        (action) => action.id === actionId,
      );

      if (!matchingAction) {
        // 만약 해당 action_id에 대한 title과 url이 없으면 처리합니다. (예: 데이터 일치하지 않음)
        console.warn(`No matching action found for action id ${actionId}`);
        return null; // 또는 다른 처리 방법을 선택할 수 있습니다.
      }

      // 해당 action_id에 대한 title과 url을 포함한 객체를 반환합니다.
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
  console.log("mergedData", mergedData);

  return (
    <>
      <div className={`${isDesktop} && "flex flex-col"`}>
        <div className={`${isDesktop} && "flex"`}>
          <p>green-action :</p>
          <p>{}</p>
        </div>
      </div>
    </>
  );
};

export default HeaderPrivateChats;
