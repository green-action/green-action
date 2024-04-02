import { supabase } from "@/utils/supabase/client";

export const getCommunityList = async () => {
  const { data: communityList, error } = await supabase
    .from("community_posts")
    .select();

  if (error) {
    console.log("error", error);
    throw error;
  }

  return communityList;
};

// user_uid에 해당하는 profile이미지, 닉네임 가져오기
export const getUserInfo = async (user_uid: string) => {
  // const {data, error} = await supabase.from('')
};
