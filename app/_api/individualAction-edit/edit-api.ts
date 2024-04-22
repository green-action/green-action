import { supabase } from "@/utils/supabase/client";

import type {
  FileUpload,
  FormDataType,
  InsertImgUrls,
} from "@/app/_types/individualAction-add/individualAction-add";
import type { placeCoordinateType } from "@/app/_types/individualAction-detail/individualAction-detail";

// 수정할 action_id의 데이터 가져오기
// (외래키 연결된 green_action_images 테이블에서 이미지 url도 함께 가져오기)
export const getActionForEdit = async (action_id: string) => {
  try {
    const { data, error } = await supabase
      .from("individual_green_actions")
      .select(`*, green_action_images(img_url, id)`)
      .eq("id", action_id);

    if (error) {
      throw error;
    }
    return data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 개인액션 수정 시작

// 1. 텍스트 formData 업데이트 함수
type FormDataWithoutUid = Omit<FormDataType, "user_uid">;
export const updateActionTextForm = async ({
  action_id,
  formData,
  activityLocation,
  activityLocationMap,
}: {
  action_id: string;
  formData: FormData;
  activityLocation: string;
  activityLocationMap: placeCoordinateType | null;
}) => {
  try {
    // 업데이트할 텍스트 데이터
    const nextData: FormDataWithoutUid = {
      title: String(formData.get("activityTitle")),
      content: String(formData.get("activityDescription")),
      start_date: String(formData.get("startDate")),
      end_date: String(formData.get("endDate")),
      location: activityLocation,
      location_map: activityLocationMap,
      recruit_number: Number(formData.get("maxParticipants")),
      kakao_link: String(formData.get("openKakaoLink")),
    };

    // supabase에서 해당 action_id의 데이터 가져오기
    const { data: existingData, error } = await supabase
      .from("individual_green_actions")
      .select()
      .eq("id", action_id)
      .single();

    if (error) {
      throw error;
    }

    // 기존 데이터와 새 데이터 비교하여 변경된 부분 업데이트 (덮어쓰기)
    const updatedData = { ...existingData, ...nextData };

    // supabase에서 업데이트
    const { error: updateError } = await supabase
      .from("individual_green_actions")
      .update(updatedData)
      .eq("id", action_id);

    if (updateError) {
      throw updateError;
    }

    return action_id;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

// 2. 스토리지의 action_id 폴더에 이미지 추가 + 방금 추가한 이미지들 url배열 반환
// (기존에 없던 새롭게 추가한 이미지들이 스토리지에 저장됨)
export const uploadFilesAndGetUrls = async ({
  files,
  action_id,
}: FileUpload) => {
  try {
    const imgUrlsArray = await Promise.all(
      // map으로 (파일 스토리지에 업로드 + url 반환) 반복
      files.map(async (file) => {
        if (file) {
          const fileName = `${(file.name, crypto.randomUUID())}`;
          // 'action_id' 폴더 생성, 파일이름은 uuid
          const filePath = `${action_id}/${fileName}`;
          const { error } = await supabase.storage
            // 'green_action' 버켓에 이미지 업로드
            .from("green_action")
            .upload(filePath, file, {
              cacheControl: "3600",
              upsert: true,
            });

          if (error) {
            console.error("Error uploading file:", error);
            return null;
          }

          // url 가져오기
          const imgUrl = await supabase.storage
            .from("green_action")
            .getPublicUrl(`${action_id}/${fileName}`);

          if (!imgUrl || !imgUrl.data) {
            console.error("Error getting public URL for file:", imgUrl);
            throw new Error("Error getting public URL for file");
          }

          return imgUrl.data.publicUrl;
        }
      }),
    );
    // null 또는 undefined 값 제거 후 string 배열로 변환
    const TypeFilteredUrls = imgUrlsArray.filter(
      (url) => url !== null && url !== undefined,
    ) as string[];

    return TypeFilteredUrls;
  } catch (error) {
    console.error("Error uploading files and getting URLs:", error);
    return [];
  }
};

// 3. 이미지url들 table에 넣기
export const insertImgUrls = async ({
  action_id,
  imgUrlsArray,
}: InsertImgUrls) => {
  try {
    const response = await Promise.all(
      imgUrlsArray.map(async (url: string) => {
        const { data, error } = await supabase
          .from("green_action_images")
          .insert({
            action_id,
            img_url: url,
          });

        if (error) {
          throw error;
        }
        return data;
      }),
    );
    return response;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

// 4. deleteFileIds 배열에 있는 id가 테이블에 있으면 해당 행 삭제
export const deleteImagesByIds = async (deleteFileIds: string[]) => {
  try {
    // deleteFileIds에 포함된 각 id에 대한 삭제 요청
    await Promise.all(
      deleteFileIds.map(async (id) => {
        const { error } = await supabase
          .from("green_action_images")
          .delete()
          .eq("id", id);
        if (error) {
          throw error;
        }
      }),
    );
    console.log("Images deleted successfully.");
  } catch (error) {
    console.error("Error deleting images:", error);
    throw new Error("Error deleting images");
  }
};
