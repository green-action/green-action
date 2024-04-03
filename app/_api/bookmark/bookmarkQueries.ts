import { supabase } from "@/utils/supabase/client";

export const getBookmark = async () => {
  let { data: bookmarks, error } = await supabase.from("bookmarks").select("*");

  if (error) {
    throw new Error(error?.message || "에러가 발생했습니다.");
  }
  return { bookmarks };
};

export const addBookmark = async (user_uid: string, action_id: string) => {
  const { data, error } = await supabase
    .from("bookmarks")
    .insert([{ user_uid, action_id }])
    .select();
  if (error) {
    throw new Error(error?.message || "An unknown error occurred");
  }
  return data;
};

export const removeBookmark = async (action_id: string) => {
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq(action_id, action_id);
};

export const getLikes = async () => {
  let { data: likes, error } = await supabase.from("likes").select("*");
  if (error) {
    throw new Error(error?.message || "에러가 발생했습니다.");
  }
  return { likes };
};
