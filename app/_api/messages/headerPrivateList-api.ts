import { supabase } from "@/utils/supabase/client";

export const getMyPrivateRoomInfos = async (loggedInUserUid: string) => {
  // 참가자 테이블 - 참가중인 채팅방id들, 본인의 참가자 타입 가져오기
  const { data, error } = await supabase
    .from("chat_participants")
    .select("room_id, participant_type, chat_rooms_info(action_id, room_type)")
    .eq("participant_uid", loggedInUserUid);

  if (error) {
    console.log("error", error.message);
    throw error;
  }

  // 참가중인 방 중 '개인'방만 filtering
  const filteredData = data.filter((item) => {
    return item.chat_rooms_info?.room_type === "개인";
  });

  return filteredData;
};

export const getActionTitleAndUrl = async (actionIds: string[]) => {
  const { data, error } = await supabase
    .from("individual_green_actions")
    .select("id, title, green_action_images(img_url)")
    .in("id", actionIds);

  if (error) {
    console.log("error", error.message);
    throw error;
  }

  const selectOneUrlArray = data.map((item) => {
    const firstUrl = item.green_action_images[0].img_url;
    return { id: item.id, title: item.title, firstUrl: firstUrl };
  });

  return selectOneUrlArray;
};

// TODO 성공하면 pagePrivateList-api, 사용처도 같이 업데이트하기
// 채팅방 리스트 가져오기 (마지막 메시지, 메시지 시간, 채팅 상대의 닉네임, 프로필이미지)
export const getPrivateChatsList = async ({
  loggedInUserUid,
  roomIds,
}: {
  loggedInUserUid: string;
  roomIds: string[];
}) => {
  const chatPromises = roomIds.map(async (roomId) => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("created_at, content, room_id, sender_uid")
      .eq("room_id", roomId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      console.log(
        `Error fetching chat messages for room ${roomId}: ${error.message}`,
      );
      throw error;
    }

    if (data && data.length > 0) {
      return data[0]; // 가장 최신 메시지 반환
    } else {
      // 메시지 없이 빈 채팅방인 경우
      return;
    }
  });

  const chatList = await Promise.all(chatPromises);

  // chatList에서 undefined 값 제거하고 값 있는 채팅만 필터링하여 새로운 배열 반환
  const filteredChatList = chatList.filter((chat) => chat !== undefined);

  // 각 채팅 메시지의 room_id 배열 추출
  const filteredRoomIds = filteredChatList.map((chat) => chat?.room_id);

  // 채팅 상대방의 display_name, profile_img 가져오기
  const { data: participantData, error } = await supabase
    .from("chat_participants")
    .select("participant_uid, users(id, display_name, profile_img)")
    .in("room_id", filteredRoomIds);

  if (error) {
    console.log("error", error.message);
    throw error;
  }

  const filteredParticipantNotME = participantData.filter((person) => {
    return person.participant_uid !== loggedInUserUid;
  });

  return [{ ...filteredChatList, ...filteredParticipantNotME }];
};
