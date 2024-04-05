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

export const getPoint = async (id: string) => {
  try {
    const { data } = await supabase.from("users").select("point").eq("id", id);
    return data![0];
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};

export const updatePoint = async ({
  user_uid,
  updatedPoint,
}: {
  user_uid: string;
  updatedPoint: number;
}) => {
  const { data, error } = await supabase
    .from("users")
    .update({ point: updatedPoint })
    .eq("id", user_uid);

  if (error) {
    throw new Error("Failed to update user point");
  }
};
