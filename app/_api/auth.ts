import { supabase } from "@/utils/supabase/client";

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

    logoutUser();
    return data;
  } catch (error) {
    console.error("회원가입 오류:", error);
    throw error;
  }
};

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

export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { user };
};
