import { supabase } from "@/utils/supabase/client";

// 메시지 리스트 가져오기
export const getMessages = async () => {
  const { data, error } = await supabase
    .from("chat_messages")
    .select("*, users(display_name, profile_img)")
    .order("created_at", { ascending: true });
  // 개수 100개쯤 제한? -> 무한스크롤 10개씩 증가할수있음

  if (error) {
    console.log("error", error.message);
    throw error;
  }
  return data;
};

// 1. 이미 1:1방 존재하는지 먼저 확인하기
export const checkChatRoomExist = async ({
  user_uid,
  action_id,
}: {
  user_uid: string;
  action_id: string;
}) => {
  try {
    // 1) 참가자 테이블 접근 -> 로그인 유저 uid로 내가 참여중인 방의 room_id 리스트 뽑기
    const { data: roomsList, error: roomsListError } = await supabase
      .from("chat_participants")
      .select("room_id")
      .eq("participant_uid", user_uid);

    if (roomsListError) {
      console.log("error", roomsListError.message);
      throw roomsListError;
    }

    // 2) roomsList에서 room_id 리스트 추출
    const roomIds = roomsList?.map((room) => room.room_id) || [];

    // 3) 채팅방 테이블 접근 -> room_id리스트 중 room_id 일치 + room_type이 '개인'인 것 + action_id 일치하는것 뽑기
    const { data: room_id, error: roomIdError } = await supabase
      .from("chat_rooms_info")
      .select("id")
      .in("id", roomIds) // roomsList에서 가져온 room_id 리스트 중에 포함되는 것만 선택
      .eq("room_type", "개인")
      .eq("action_id", action_id);

    if (roomIdError) {
      console.log("error", roomIdError.message);
      throw roomIdError;
    }

    if (room_id && room_id.length > 0) {
      return room_id[0].id; // room_id 값이 있으면 해당 값 반환 - 이미 1:1 방이 있는 경우
    } else {
      return null; // 값이 없으면 null 반환 - 아직 1:1방이 열리지 않은 경우
    }
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};

// 메시지 보내기
export const sendMessage = async ({
  sender_uid,
  action_id,
  content,
}: {
  sender_uid: string;
  action_id: string;
  content: string;
}) => {
  const { error } = await supabase.from("chat_messages").insert({
    sender_uid,
    action_id,
    content,
    room_id: "0f6c67c5-6ce3-4972-9839-c0ffa8e6fae4",
  });

  if (error) {
    console.log("error", error.message);
  }
};
