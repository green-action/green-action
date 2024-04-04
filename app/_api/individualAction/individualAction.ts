import { supabase } from "@/utils/supabase/client";

export const getAllIndividual = async () => {
  try {
    const { data: individualActions, error } = await supabase
      .from("individual_green_actions")
      .select("*");

    if (error) {
      throw new Error("Failed to fetch individual_green_actions from database");
    }
    return individualActions;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};

export const getAllImages = async (actionId: string) => {
  try {
    const { data, error } = await supabase
      .from("green_action_images")
      .select("img_url")
      .eq("action_id", actionId);
    console.log("Fetched images data:", data);

    if (error) {
      throw new Error(
        `Failed to fetch green_action_images from database: ${error.message}`,
      );
    }

    return data;
  } catch (error) {
    console.error("Error fetching action image:", error);
    throw error;
  }
};
