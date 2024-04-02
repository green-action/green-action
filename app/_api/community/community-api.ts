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
