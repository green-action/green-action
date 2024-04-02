import { supabase } from "@/utils/supabase/client";

export const getGroupAction = async () => {
  const { data: groupGreenActions, error } = await supabase
    .from("group_green_actions")
    .select("*");
  if (error) {
    throw new Error(error?.message || "에러가 발생했습니다.");
  }
  return { groupGreenActions, error };
};
