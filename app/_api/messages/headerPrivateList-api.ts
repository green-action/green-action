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

  // 참가중인 방 중 '개인'방인것만 filtering
  const filteredData = data.filter((item) => {
    return item.chat_rooms_info?.room_type === "개인";
  });

  return filteredData;
};

export const getActionTitleAndUrl = async (actionIds: string[]) => {
  const { data, error } = await supabase
    .from("individual_green_actions")
    .select("title, green_action_images(img_url)")
    .in("id", actionIds);

  if (error) {
    console.log("error", error.message);
    throw error;
  }

  // const selectOneUrl = data.map((item)=>{
  //   return
  // })

  return data;
};
