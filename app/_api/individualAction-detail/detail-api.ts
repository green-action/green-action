import { supabase } from "@/utils/supabase/client";

export const getIndividualDetail = async (id: string) => {
  try {
    const { data: igAction, error } = await supabase
      .from("individual_green_actions")
      .select("*")
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
