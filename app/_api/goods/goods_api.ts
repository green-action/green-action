import { supabase } from "@/utils/supabase/client";

export const getGoods = async () => {
  try {
    const { data: goods, error } = await supabase.from("goods").select("*");
    if (error) {
      throw new Error("Failed to fetch goods from database");
    }
    return goods;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};
