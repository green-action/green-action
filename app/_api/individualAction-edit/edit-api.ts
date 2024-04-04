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
