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

// 로그인유저가 참가자 테이블에 이미 있는지 확인 - 참가자의 participant_id 반환
export const checkUserExist = async ({
  room_id,
  loggedInUserUid,
}: {
  room_id: string;
  loggedInUserUid: string;
}) => {
  try {
    const { data, error } = await supabase
      .from("chat_participants")
      .select("id")
      .eq("room_id", room_id)
      .eq("participant_uid", loggedInUserUid);

    if (error) {
      console.log("error", error.message);
      throw error;
    }

    // 데이터가 있으면 첫 번째 아이템의 id 반환, 없으면 빈 값 반환
    return data.length > 0 ? data[0].id : null;
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};

// 새롭게 참여하는 경우 - 참가자 테이블에 insert
export const insertNewParticipant = async ({
  room_id,
  loggedInUserUid,
}: {
  room_id: string;
  loggedInUserUid: string;
}) => {
  try {
    const { error } = await supabase.from("chat_participants").insert({
      room_id,
      participant_uid: loggedInUserUid,
      participant_type: "참가자",
    });

    if (error) {
      console.log("error", error.message);
      throw error;
    }
  } catch (error) {
    console.error("error >>", error);
    throw error;
  }
};
