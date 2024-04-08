import { supabase } from "@/utils/supabase/client";

// 커뮤니티 글, 해당 글의 좋아요(like)목록 가져오기
export const fetchCommunityPostsLikes = async () => {
  try {
    const { data, error } = await supabase
      .from("community_posts")
      .select("*, users(display_name, profile_img), communityLikes:likes(id)");
    // .limit(8);
    // 개수제한이 문제, 가져올때 likes.length ? 기준이여야
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};

// 개인 green action, 해당 캠페인의 북마크(bookmarks)목록 가져오기
export const fetchIndivActionsBookmarks = async () => {
  try {
    const { data, error } = await supabase
      .from("individual_green_actions")
      .select(
        "*, actionImgUrls: green_action_images(img_url), actionBookmarks:bookmarks(id)",
      );
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};
