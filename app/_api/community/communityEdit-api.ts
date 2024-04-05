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
export const uploadFileAndGetUrl = async ({
  file,
}: {
  post_id: string;
  file: File;
  formData: FormData;
}) => {
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

    // file 없으면 - url없이 텍스트 formData만 update

    // post_id 해당 id찾아서 ->
    // formData update하는 로직 (url은 있으면 넣고 없으면 말고) -> 없으면 부분은 ? 이걸로 할수있으려나
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 2. formData update (url은 있으면 넣고 없으면 말고) -> 없으면 부분은 ? 이걸로 할수있으려나
