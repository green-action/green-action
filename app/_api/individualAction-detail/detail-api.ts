import { supabase } from "@/utils/supabase/client";

export const getIndividualDetail = async (id: string) => {
  try {
    const { data: igAction, error } = await supabase
      .from("individual_green_actions")
      .select(`*, users(display_name, introduction, profile_img)`)
      .eq("id", id);
    if (error) {
      throw new Error("Failed to fetch individual_green_actions from database");
    }
    return igAction;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};

// export const getWriter = async (id:string)=>{
//   try {
//     const { data, error } = await supabase
//     .from('auth.user')
//     .select('*')
//     .eq('id', id);
//   } catch (error) {

//   }
// }

// 이미지 가져오기
export const getImages = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("green_action_images")
      .select("img_url")
      .eq("action_id", id);
    if (error) {
      throw new Error("Failed to fetch green_action_images from database");
    }
    return data;
  } catch (error) {
    console.error("Error fetching action image : ", error);
    throw error;
  }
};
