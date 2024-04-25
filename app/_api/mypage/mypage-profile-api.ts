import {
  InsertProfileImgUrls,
  ProfileFileUpload,
} from "@/app/_types/mypage/mypage";
import { supabase } from "@/utils/supabase/client";

// 내 유저정보 가져오기
export const fetchUserInfo = async (user_uid: string | undefined) => {
  if (!user_uid) {
    console.error("User UID is undefined or invalid.");
    return null;
  }
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user_uid);
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

// 닉네임 수정
export const updateUserName = async (user_uid: string, editedName: string) => {
  const { error } = await supabase
    .from("users")
    .update({ display_name: editedName })
    .eq("id", user_uid)
    .select();
  if (error) {
    console.error(`Failed to update data to Supabase - ${error.message}`);
  }
};

// 자기소개 수정
export const updateUserIntro = async (
  user_uid: string,
  editedIntro: string,
) => {
  const { error } = await supabase
    .from("users")
    .update({ introduction: editedIntro })
    .eq("id", user_uid)
    .select();
  if (error) {
    console.error(`Failed to update data to Supabase - ${error.message}`);
  }
};

// 프로필 이미지 (아바타) 수정(등록)
export const uploadProfileImgFileAndInsertIntoTable = async ({
  user_uid,
  file,
}: ProfileFileUpload) => {
  try {
    if (file) {
      // supabase stroage에 이미지 업로드
      const fileName = `${(file.name, crypto.randomUUID())}`;
      const filePath = `${user_uid}/${fileName}`;
      const { error } = await supabase.storage
        .from("user_profile")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });
      if (error) {
        console.error("Error uploading file:", error.message);
        return null;
      }

      // url 가져오기
      const imgUrl = await supabase.storage
        .from("user_profile")
        .getPublicUrl(filePath);

      if (!imgUrl || !imgUrl.data) {
        console.error("Error getting public URL for file:", imgUrl);
        throw new Error("Error getting public URL for file");
      }
      // 가져온 url 테이블에 insert 하기 (아래 함수 사용)
      insertProfileImgUrl({ user_uid, imgUrl: imgUrl.data.publicUrl });
      return imgUrl.data.publicUrl;
    }
  } catch (error) {
    console.error("Error uploading files and getting URLs:", error);
  }
};

// 프로필이미지 url table에 넣기
export const insertProfileImgUrl = async ({
  user_uid,
  imgUrl,
}: InsertProfileImgUrls) => {
  try {
    const { error } = await supabase
      .from("users")
      .update({
        profile_img: imgUrl,
      })
      .eq("id", user_uid);
    if (error) {
      throw error;
    }
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
