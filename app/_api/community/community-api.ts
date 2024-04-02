import { supabase } from "@/utils/supabase/client";

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
// 1. 텍스트(개인, 단체 포함) formData를 테이블에 insert -> post_id를 반환
export const insertCommunityPostTextForm = async ({
  formData,
  currentUserUId,
}: {
  formData: FormData;
  currentUserUId: string;
}) => {
  try {
    const inputData = {
      user_uid: currentUserUId,
      title: String(formData.get("activityTitle")),
      content: String(formData.get("activityDescription")),
      action_type: String(formData.get("action_type")).substring(0, 2),
      action_id: null,
    };

    const { data, error } = await supabase
      .from("community_posts")
      .insert(inputData)
      .select("id");

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};
// 2. 이미지 스토리지에 업로드 후 url 반환
// 3. post_id의 img_url에 url insert
