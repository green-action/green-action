import { supabase } from "@/utils/supabase/client";

export const getFilterBookmark = async (action_id: string) => {
  let { data: filterBookmark } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("action_id", action_id);
  return { filterBookmark };
};

export const addBookmark = async ({
  user_uid,
  action_id,
}: {
  user_uid: string;
  action_id: string;
}) => {
  const { data, error } = await supabase
    .from("bookmarks")
    .insert([{ user_uid, action_id }])
    .select();
  if (error) {
    throw new Error(error?.message || "An unknown error occurred");
  }
  return data;
};

export const removeBookmark = async (user_uid: string) => {
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("user_uid", user_uid);
};

export const getFilterLikes = async (post_id: string) => {
  const { data: likes, error } = await supabase
    .from("likes")
    .select("*")
    .eq("post_id", post_id);
  if (error) {
    throw new Error(error?.message || "에러가 발생했습니다.");
  }
  return { likes };
};

export const addLikes = async ({
  user_uid,
  post_id,
}: {
  user_uid: string;
  post_id: string;
}) => {
  const { data, error } = await supabase
    .from("likes")
    .insert([{ user_uid, post_id }])
    .select();
  if (error) {
    throw new Error(error?.message || "An unknown error occurred");
  }
  return data;
};

export const removeLike = async (user_uid: string) => {
  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("user_uid", user_uid);
};
