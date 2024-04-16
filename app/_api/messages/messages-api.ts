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
  }
  return data;
};

// 1. 이미 있는 방인지 먼저 확인하기
// 참가자 테이블 접근 -> 로그인 유저 uid로 내가 참여중인 방의 room_id 리스트 뽑기

// 채팅방 테이블 접근 -> room_id리스트 중 room_id 일치 + room_type이 '개인'인 것 뽑기

// 1) 이미 방이 있으면 -> room_id 반환
// 2) 방 없으면 -> chat_rooms_info테이블, chat_participants 테이블에 insert하기 -> room_id 반환

// 2. 반환받은 room_id를 1:1채팅 모달에 넘겨주기
// -> channel명을 room_id로 설정하기

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
