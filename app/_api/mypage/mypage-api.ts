import { supabase } from "@/utils/supabase/client";

// 내 유저정보 가져오기
export const fetchUserInfo = async (user_uid: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user_uid);
    // console.log("🐰 ~ fetchUserInfo ~ data : ", data);
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error(error);
  }
};

// 닉네임 수정
export const updateUserName = async (user_uid: string, editedName: string) => {
  const { error } = await supabase
    .from("users")
    .update({ display_name: editedName })
    .eq("id", user_uid)
    .select();
  if (error) {
    console.error(`Failed to update data to Supabase - ${error.message}`);
  }
};

// 자기소개 수정
export const updateUserIntro = async (
  user_uid: string,
  editedIntro: string,
) => {
  const { error } = await supabase
    .from("users")
    .update({ introduction: editedIntro })
    .eq("id", user_uid)
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
