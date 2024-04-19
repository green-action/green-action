import React from "react";
import { useSession } from "next-auth/react";
import { useResponsive } from "@/app/_hooks/responsive";
import {
  useGetActionTitleAndUrl,
  useGetMessageAndParticipantInfo,
  useGetMyPrivateRoomsInfo,
} from "@/app/_hooks/useQueries/chats";

const HeaderPrivateChats = () => {
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  // data - 채팅방 id, 나의 채팅참가자 type(방장 or 참가자), 채팅방 type(개인), action id
  const { data, isLoading, isError } =
    useGetMyPrivateRoomsInfo(loggedInUserUid);

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

  // null 값을 필터링하여 최종 결과를 반환합니다.
  const filteredMergedData = mergedData.filter((item) => item !== null);

  // messageAndParticipantInfo와 mergedData.chat_rooms_info.room_id가 같은 요소들을 묶어서 객체 배열로 만듭니다.
  const combinedObjects = messageAndParticipantInfo
    ?.map((message) => {
      const matchingMergedItem = filteredMergedData.find(
        (mergedItem) =>
          mergedItem?.chat_rooms_info?.room_id === message?.room_id,
      );

      if (!matchingMergedItem) {
        // 메시지와 매칭되는 mergedData가 없으면 처리합니다.
        console.warn(
          `No matching mergedData found for message with room id ${message?.room_id}`,
        );
        return null; // 또는 다른 처리 방법을 선택할 수 있습니다.
      }

      // 메시지와 매칭되는 mergedData를 포함한 객체를 반환합니다.
      return {
        message,
        ...matchingMergedItem,
      };
    })
    .filter((combined) => combined !== null);

  console.log("combinedObjects", combinedObjects);

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
