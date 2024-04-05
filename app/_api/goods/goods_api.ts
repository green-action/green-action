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
    // console.log(data![0]);
    if (!data || data.length === 0) {
      throw new Error("User not found or point data is missing");
    }
    return data![0];
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};

export const updatePoint = async ({
  loggedInUserUid,
  updatedPoint,
}: {
  loggedInUserUid: string;
  updatedPoint: number;
}) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update({ point: updatedPoint })
      .eq("id", loggedInUserUid);

    if (error) {
      throw new Error("Failed to update user point");
    }

    return data;
  } catch (error) {
    console.error("Error updating user point:", error);
    throw error;
  }
};
