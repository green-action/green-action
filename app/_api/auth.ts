import { supabase } from "@/utils/supabase/client";
import { User } from "../_types";

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

    // 사용자 정보 데이터베이스에 추가
    const { data: userData, error: userDataError } = await supabase
      .from("users")
      .insert({ id: data.user?.id, email, display_name });

    if (userDataError) {
      throw userDataError;
    }

    return data;
  } catch (error) {
    console.error("회원가입 오류:", error);
    throw error;
  }
};

//로그인
export const signInUser = async (
  email: string,
  password: string,
): Promise<User> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!data || !data.user) {
      throw new Error("유저의 데이터정보가져오기 실패");
    }

    const user = data.user;
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (fetchError) throw fetchError;
    return userData as User;
  } catch (error) {
    throw error;
  }
};

//로그아웃
export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut({
      scope: "global",
    });
    if (error) {
      throw error;
    }
  } catch (error) {
    console.log(error);
  }
};

// getUser - auth-user 정보 가져오기
export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { user };
};

export const logInWithKakao = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
  });
  if (error) throw error.message;
};
