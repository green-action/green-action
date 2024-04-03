import { supabase } from "@/utils/supabase/client";
import { User } from "../_types";
import { metadata } from "../layout";

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
          profile_img: "",
          point: 0,
          introduction: "자기소개를 아직 작성하지 않았어요",
        },
      },
    });
    if (error) {
      throw error;
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
    console.log(data.user);
    if (!data || !data.user) {
      throw new Error("유저의 데이터정보가져오기 실패");
    }

    return data.user.user_metadata as User;
  } catch (error) {
    throw error;
  }
};

//로그아웃
export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
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
