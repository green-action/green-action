import { supabase } from "@/utils/supabase/client";

// 액션별 1:1 채팅방 room_id들 배열로 가져오기
export const getPrivateRoomIds = async (action_id: string) => {
  const { data, error } = await supabase
    .from("chat_rooms_info")
    // sender_uid와 연결된 테이블가서 display_name가져오기, content중 가장 최근꺼 하나만 가져오기
    .select("id")
    .eq("action_id", action_id)
    .eq("room_type", "개인");

  if (error) {
    console.log("error", error.message);
    throw error;
  }
  const roomIds = data.map((item) => {
    return item.id;
  });
  return roomIds;
};
