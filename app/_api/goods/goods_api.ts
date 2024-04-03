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

export const updatePoint = async ({
  id,
  newPoint,
}: {
  id: string;
  newPoint: number;
}) => {
  // const { data, error } = await supabase.auth.updateUser({
  //   data: { point: newPoint },
  // });
  const { data, error } = await supabase
    .from("users")
    .update({ point: newPoint })
    .eq("id", id);
};

// export const getLoginUserInfo = async()=>{

// }
