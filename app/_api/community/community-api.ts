import { supabase } from "@/utils/supabase/client";

// 커뮤니티 리스트 가져오기 - 작성자 정보도 함께
export const getCommunityList = async () => {
  const { data: communityList, error } = await supabase
    .from("community_posts")
    .select(`*, users(display_name, profile_img)`);

  if (error) {
    console.log("error", error);
    throw error;
  }

  return communityList;
};

// 커뮤니티 글 등록하기
// 1. 이미지 스토리지에 업로드 후 url 반환
export const uploadFileAndGetUrl = async (file: File | null | undefined) => {
  try {
    // 스토리지에 이미지파일 업로드
    if (file) {
      const uuid = crypto.randomUUID();
      const fileName = `${(file.name, uuid)}`;
      const { error } = await supabase.storage
        .from("community")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Error uploading file:", error);
        return null;
      }

      // 이미지 url 가져오기
      const imgUrl = await supabase.storage
        .from("community")
        .getPublicUrl(fileName);

      if (!imgUrl || !imgUrl.data) {
        console.error("Error getting public URL for file:", imgUrl);
        throw new Error("Error getting public URL for file");
      }

      const uploadedImgUrl = imgUrl.data.publicUrl;
      return uploadedImgUrl;
    }
    // 파일이 없는 경우
    return null;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

// 2. 이미지url, 텍스트 입력값 formData를 테이블에 insert -> post_id 반환
export const insertCommunityPostFormData = async ({
  formData,
  loggedInUserUid,
}: {
  formData: FormData;
  loggedInUserUid: string;
}): Promise<string | null> => {
  try {
    const inputData = {
      user_uid: loggedInUserUid,
      title: String(formData.get("activityTitle")),
      content: String(formData.get("activityDescription")),
      action_type: String(formData.get("action_type")).substring(0, 2),
      action_id: null,
      img_url: String(formData.get("image_url")),
    };

    const { data, error } = await supabase
      .from("community_posts")
      .insert(inputData)
      .select("id");

    if (error) {
      throw error;
    }

    // post_id 반환
    const post_id = data ? data[0]?.id : null;
    return post_id;
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

// 커뮤니티 글 삭제하기
export const deleteCommunityPost = async (post_id: string) => {
  try {
    const { data, error } = await supabase
      .from("community_posts")
      .delete()
      .eq("id", post_id);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

// post_id로 커뮤니티 상세모달창 정보 가져오기 - 작성자 정보도 함께
export const getPostContents = async (post_id: string) => {
  try {
    const { data, error } = await supabase
      .from("community_posts")
      .select(`*, users(display_name, profile_img)`)
      .eq("id", post_id);
    if (error) {
      throw error;
    }

    return data[0];
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};
