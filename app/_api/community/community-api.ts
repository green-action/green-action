import { supabase } from "@/utils/supabase/client";

// 커뮤니티 리스트 가져오기 + user_uid로 작성자 닉네임, 프로필이미지 join테이블
export const getCommunityList = async () => {
  const { data: communityList, error } = await supabase
    .from("community_posts")
    .select();

  if (error) {
    console.log("error", error);
    throw error;
  }

  return communityList;
};

// user_uid에 해당하는 profile이미지, 닉네임 가져오기 (리스트에 보여줄)
export const getUserInfo = async (user_uid: string) => {
  // const {data, error} = await supabase.from('')
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
  currentUserUId,
}: {
  formData: FormData;
  currentUserUId: string;
}): Promise<string | null> => {
  try {
    const inputData = {
      user_uid: currentUserUId,
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

// post_id로 커뮤니티 상세모달창 정보 가져오기
export const getPostContents = async (post_id: string) => {
  try {
    const { data, error } = await supabase
      .from("community_posts")
      .select("*")
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

// post_id로 상세모달창 댓글리스트 가져오기
export const getCommunityCommentsList = async (post_id: string) => {
  try {
    const { data, error } = await supabase
      .from("community_comments")
      .select()
      .eq("post_id", post_id);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};
