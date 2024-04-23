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
