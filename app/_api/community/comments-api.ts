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

    return;
  } catch (error) {
    console.error("Error inserting comment:", error);
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async (comment_id: string) => {
  try {
    const { data, error } = await supabase
      .from("community_comments")
      .delete()
      .eq("id", comment_id);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

// 댓글 수정
export const editComment = async ({
  comment_id,
  editedComment,
}: {
  comment_id: string;
  editedComment: string;
}) => {
  try {
    const { data, error } = await supabase
      .from("community_comments")
      .update({ content: editedComment })
      .eq("id", comment_id);
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

// 현재 로그인한 유저 프로필이미지 가져오기
export const getCurrentUserProfileImg = async (user_uid: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("profile_img")
      .eq("id", user_uid);

    if (error) {
      throw error;
    }

    return data[0].profile_img;
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};
