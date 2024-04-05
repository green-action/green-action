import { supabase } from "@/utils/supabase/client";

export const getSinglePostForEdit = async (post_id: string) => {
  try {
    const { data, error } = await supabase
      .from("community_posts")
      .select()
      .eq("id", post_id);

    if (error) {
      throw error;
    }

    return data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
