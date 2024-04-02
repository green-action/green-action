import { supabase } from "@/utils/supabase/client";

import type { User } from "@/utils/supabase/type";

//회원가입

export const signUpNewUser = async (
  email: string,
  password: string,
  display_name: string,
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    await supabase.auth.updateUser({
      data: {
        display_name: display_name,
      },
    });

    return data;
  } catch (error) {
    console.error("회원가입 오류:", error);
    throw error;
  }
};
