import { supabase } from "@/utils/supabase/client";

// 단체방 room_id 가져오기 - 채팅방 테이블 접근
export const getChatRoomId = async (action_id: string) => {
  try {
    const { data: room_id, error } = await supabase
      .from("chat_rooms_info")
      .select("id")
      .eq("action_id", action_id)
      .eq("room_type", "단체");

    if (error) {
      console.log("error", error.message);
      throw error;
    }

    const roomId = room_id[0].id;
    return roomId;
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};
