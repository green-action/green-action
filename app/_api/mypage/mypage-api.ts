import { supabase } from "@/utils/supabase/client";

// 내 유저정보 가져오기
export const fetchUserInfo = async (user_uid: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select(
        "*, actionImgUrls: green_action_images(img_url), actionBookmarks: bookmarks(id)",
      )
      .eq("user_uid", user_uid);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
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

// 내 프로필 자기소개 수정
// export const updateMyIntro = async (editedIntro: string) => {
//   const { error } = await supabase.auth.updateUser({
//     data: { introduction: editedIntro },
//   });
//   if (error) {
//     console.error(error.message);
//   }
// };
