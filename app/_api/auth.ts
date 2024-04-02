import { supabase } from "@/utils/supabase/client";

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
      options: {
        data: {
          display_name,
        },
      },
    });
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("회원가입 오류:", error);
    throw error;
  }
};

//로ㅓㄱ인
export const singInUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!data || data.user) {
      throw Error("유저의데이터가 일치하지 않습니다");
    }
  } catch (error) {
    throw error;
  }
};

//로그아웃
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  } catch (error) {
    console.log(error);
  }
};
