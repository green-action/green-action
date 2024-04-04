import {
  FileUpload,
  FormDataType,
  InsertImgUrls,
} from "@/app/_types/individualAction-add/individualAction-add";
import { supabase } from "@/utils/supabase/client";

// individual_green_actions 테이블에서 수정할 정보 가져오기
// 외래키 연결된 green_action_images 테이블에서 이미지 url도 함께 가져오기
export const getActionForEdit = async (action_id: string) => {
  try {
    const { data, error } = await supabase
      .from("individual_green_actions")
      .select(`*, green_action_images(img_url)`)
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

// TODO 개인액션 수정
// 수정한 내용이 있으면 그것만 업데이트 해야하는데... (스토리지도 그렇고, 이미지테이블, action테이블 다...)
// 수정한게 이미지 뿐이면 그것만 업데이트하고... 텍스트만이면 텍스트만 업데이트하고...
// 이걸 어떻게 체크해야하지?

export interface FormDataTypeEdit {
  title: string;
  content: string;
  start_date: string;
  end_date: string;
  location: string;
  recruit_number: number;
  kakao_link: string;
}

// 1. 텍스트 formData 업데이트 함수
export const updateActionTextForm = async ({
  action_id,
  formData,
}: {
  action_id: string;
  formData: FormData;
}) => {
  try {
    // 업데이트할 텍스트 데이터
    const nextData: FormDataTypeEdit = {
      title: String(formData.get("activityTitle")),
      content: String(formData.get("activityDescription")),
      start_date: String(formData.get("startDate")),
      end_date: String(formData.get("endDate")),
      location: String(formData.get("activityLocation")),
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

    // 기존 데이터와 새 데이터 비교하여 변경된 부분 업데이트
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
