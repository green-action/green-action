import { supabase } from "@/utils/supabase/client";

export const insertAction = async () => {
  const response = supabase.from("individual_green_actions").select("");
  return response;
};
