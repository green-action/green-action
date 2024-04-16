import { supabase } from "@/utils/supabase/client";

export const sendMessage = async ({
  user_uid,
  action_id,
  content,
}: {
  user_uid: string;
  action_id: string;
  content: string;
}) => {
  const { error } = await supabase.from("messages").insert({
    user_uid,
    action_id,
    content,
  });

  if (error) {
    console.log("error", error.message);
  }
};

export const getMessages = async () => {
  const { data, error } = await supabase
    .from("messages")
    .select("*, users(*)")
    .order("created_at", { ascending: true });

  if (error) {
    console.log("error", error.message);
  }
  return data;
};
