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

// 채팅방의 action정보 가져오기
export const getActionInfo = async (room_id: string) => {
  const { data, error } = await supabase
    .from("chat_rooms_info")
    .select("individual_green_actions(id, title, recruit_number, user_uid)")
    .eq("id", room_id);

  if (error) {
    console.log("error", error.message);
    throw error;
  }

  const action_id = data[0].individual_green_actions?.id;
  const title = data[0].individual_green_actions?.title;
  const recruit_number = data[0].individual_green_actions?.recruit_number;
  const user_uid = data[0].individual_green_actions?.user_uid;
  if (!action_id) return;

  const { data: actionUrl, error: actionUrlError } = await supabase
    .from("individual_green_actions")
    .select("green_action_images(img_url)")
    .eq("id", action_id)
    .order("created_at", { ascending: false })
    .limit(1);

  if (actionUrlError) {
    console.log("error", actionUrlError.message);
    throw actionUrlError;
  }

  const action_url = actionUrl[0].green_action_images[0].img_url;

  return { action_id, title, action_url, recruit_number, user_uid };
};

// 채팅방의 상대방 정보 가져오기
export const getParticipantInfo = async ({
  loggedInUserUid,
  room_id,
}: {
  loggedInUserUid: string;
  room_id: string;
}) => {
  const { data, error } = await supabase
    .from("chat_participants")
    .select("users(id, display_name, profile_img)")
    .eq("room_id", room_id)
    .neq("participant_uid", loggedInUserUid);

  if (error) {
    console.log("error", error.message);
    throw error;
  }

  return data[0].users;
};
