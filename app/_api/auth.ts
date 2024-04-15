import { supabase } from "@/utils/supabase/client";
import { User } from "../_types";
// import { useSession } from "next-auth/react";

// const session = useSession();

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

    //사용자 정보 데이터베이스에 추가
    const user = data?.user;
    console.log(data.user);
    if (!user) {
      throw new Error("사용자 정보를 가져올 수 없습니다.");
    }
    const { id: authUserID } = user;
    const { data: userData, error: userDataError } = await supabase
      .from("users")
      .insert({ id: authUserID, email, display_name });

    if (userDataError) {
      throw userDataError;
    }

    return data;
  } catch (error) {
    console.error("회원가입 오류:", error);
    throw error;
  }
};

//supabase 로그인
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

//supabase 로그아웃
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

//카카오
export const logInWithKakao = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) throw error.message;

  // const user = session.data?.user;
  // const { data: kakaoUserData, error: kakaoUserDataError } = await supabase
  //   .from("users")
  //   .insert({
  //     id: user?.user_uid,
  //     email: user?.email,
  //     display_name: user?.name,
  //     profile_img: user?.image,
  //   });

  // console.log(kakaoUserData);

  // if (kakaoUserDataError) {
  //   throw kakaoUserDataError.message;
  // }

  return data;
};

//구글 소셜 로그인
