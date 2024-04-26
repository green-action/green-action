import { supabase } from "@/utils/supabase/client";

// 내가 쓴 커뮤니티 글 조회
export const fetchMyCommunityList = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("community_posts")
      .select("id")
      .eq("user_uid", id);
    if (error) {
      throw new Error("Failed to fetch community_posts from database");
    }
    return data;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};

// 댓글 작성자 정보 가져오기
export const fetchCommentWriterInfo = async (id: string) => {
  try {
    const { data: commentWriter, error } = await supabase
      .from("users")
      .select("display_name")
      .eq("id", id)
      .single();
    if (error) {
      throw new Error("Failed to fetch community_posts from database");
    }
    return commentWriter;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};

// 알림 테이블에서 알림 데이터 가져오기
export const fetchMyPushList = async (id: string) => {
  try {
    const { data: newAlarm, error } = await supabase
      .from("alarm")
      .select("*")
      .eq("targetId", id)
      .order("created_at", { ascending: false });
    // 내림차순
    if (error) {
      throw new Error("Failed to fetch alarm from database");
    }
    return newAlarm;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};

// 안읽은 push 읽음처리
export const updateUnreadPush = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("alarm")
      .update({ isRead: true })
      .eq("id", id);

    if (error) {
      throw new Error("Failed to update alarm unread from database");
    }
    return data;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};

// 안읽은 알림 총 개수 가져오기
export const unreadPushCount = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("alarm")
      .select("id")
      .eq("isRead", false)
      .eq("targetId", id);

    if (error) {
      throw new Error("Failed to count unread alarm from database");
    }
    return data.length;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};
