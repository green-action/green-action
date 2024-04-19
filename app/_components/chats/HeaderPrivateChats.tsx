import React from "react";
import { useSession } from "next-auth/react";
import { useResponsive } from "@/app/_hooks/responsive";
import {
  useGetActionTitleAndUrl,
  useGetMessageAndParticipantInfo,
  useGetMyPrivateRoomsInfo,
} from "@/app/_hooks/useQueries/chats";
import { Avatar } from "@nextui-org/react";

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

  console.log("combinedObjects", combinedObjects);

  return (
    <>
      <div className="flex flex-col bg-gray-200 p-4 mr-3 mb-3">
        <div className="flex mb-3">
          <span>green-action :</span>
          <span>액션 이름</span>
        </div>
        <div className="flex">
          <div>
            <Avatar showFallback src="" alt="defaultImg" className="mr-5" />
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span>상대방 닉네임</span>
                <span>운영중</span>
              </div>
              <div className="flex justify-between">
                <span>마지막 메시지</span>
                <span>시간</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderPrivateChats;
