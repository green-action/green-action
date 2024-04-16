import { supabase } from "@/utils/supabase/client";

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

// 메시지 리스트 가져오기
export const getMessages = async () => {
  const { data, error } = await supabase
    .from("chat_messages")
    .select("*, users(display_name, profile_img)")
    .order("created_at", { ascending: true });

  if (error) {
    console.log("error", error.message);
  }
  return data;
};
