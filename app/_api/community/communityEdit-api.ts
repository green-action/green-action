import { CommunityEditMutation } from "@/app/_types/community/community";
import { supabase } from "@/utils/supabase/client";

// 수정할 데이터 가져오기
export const getSinglePostForEdit = async (post_id: string) => {
  try {
    const { data, error } = await supabase
      .from("community_posts")
      .select()
      .eq("id", post_id);

    if (error) {
      throw error;
    }

    return data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 게시글 수정 update
// 1. 스토리지 업로드 + 이미지 url 반환
export const uploadFileAndGetUrl = async (file: File) => {
  try {
    // file 있으면 - 스토리지 업로드 + url 반환 -> formData + url을 update
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
    console.error(error);
    throw error;
  }
};

// 2. formData update (url은 있으면 넣고, 없으면 넣지말기)
export const updateEditedPost = async ({
  post_id,
  imgUrl,
  formData,
}: CommunityEditMutation) => {
  try {
    // formData에서 업데이트할 텍스트 데이터 추출
    const nextData = {
      title: String(formData.get("activityTitle")),
      content: String(formData.get("activityDescription")),
      action_type: String(formData.get("action_type")).substring(0, 2),
    };

    // 이미지 URL 업데이트할 객체 생성
    const imageData = imgUrl ? { img_url: imgUrl } : {};

    // 데이터 업데이트
    const { error: updateError } = await supabase
      .from("community_posts")
      .update({ ...nextData, ...imageData })
      .eq("id", post_id);

    if (updateError) {
      throw updateError;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
