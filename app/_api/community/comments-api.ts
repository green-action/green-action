import { supabase } from "@/utils/supabase/client";
import { InsertComment } from "@/app/_types/community/community";

// post_id로 상세모달창 댓글리스트 가져오기
export const getCommunityCommentsList = async (post_id: string) => {
  try {
    const { data, error } = await supabase
      .from("community_comments")
      .select(`*, users(display_name, profile_img)`)
      .eq("post_id", post_id);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

// 댓글 insert
export const insertCommunityComment = async ({
  content,
  loggedInUserUid,
  post_id,
}: InsertComment) => {
  try {
    const { error } = await supabase
      .from("community_comments")
      .insert([{ content, post_id, user_uid: loggedInUserUid }]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error inserting comment:", error);
    throw error;
  }
};
