// 내가 생성한 action (My Green Action) - 모집중->마감으로 상태 변경

import { supabase } from "@/utils/supabase/client";

// 모집마감도 -> 중 으로 토글로 바꿔야할지?
export const updateActionRecruiting = async (action_id: string) => {
  const { error } = await supabase
    .from("individual_green_actions")
    .update({ is_recruiting: false })
    .eq("id", action_id)
    .select();
  if (error) {
    console.error(`Failed to update data to Supabase - ${error.message}`);
  }
};

// 내가 생성한 action 조회
export const fetchMyGreenActions = async (user_uid: string) => {
  try {
    const { data, error } = await supabase
      .from("individual_green_actions")
      .select(
        // TODO 모두 가져올필요있는지 체크하기 *
        "*, actionImgUrls: green_action_images(img_url), actionBookmarks: bookmarks(id)",
      )
      .eq("user_uid", user_uid);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};

// 내가 쓴 커뮤니티 글 조회
export const fetchMyCommunityPosts = async (user_uid: string) => {
  try {
    const { data, error } = await supabase
      .from("community_posts")
      .select("*, communityLikes:likes(id)")
      .eq("user_uid", user_uid);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};

// 내가 찜한 action 조회
export const fetchBookmarkedActions = async (user_uid: string) => {
  try {
    const { data, error } = await supabase
      .from("bookmarks")
      .select(
        "bookmarkedAction:individual_green_actions(*, actionImgUrls:green_action_images(img_url), actionBookmarks:bookmarks(id))",
        // 북마크된 action의 이미지, 북마크수 가져오기 (외래키사용)
      )
      .eq("user_uid", user_uid);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};
