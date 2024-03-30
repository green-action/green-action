import { supabase } from "@/utils/supabase/client";

// interface FormDataType {
//   user_uid: string;
//   title: string;
//   content: string;
//   start_date: string;
//   end_date: string;
//   location: string;
//   recruit_number: number;
//   kakao_link: string;
// }

// 데이터 삽입 함수
export async function insertAction(formData: FormData) {
  const userUid: string = "55e7ec4c-473f-4754-af5e-9eae5c587b81"; // 임시로 정한 사용자 UID

  try {
    // Supabase에 데이터 삽입
    const { data, error } = await supabase
      .from("individual_green_actions")
      .insert({
        user_uid: userUid,
        title: formData.get("activityTitle"),
        content: formData.get("activityDescription"),
        start_date: formData.get("startDate"),
        end_date: formData.get("endDate"),
        location: formData.get("activityLocation"),
        recruit_number: formData.get("maxParticipants"),
        kakao_link: formData.get("openKakaoLink"),
      });

    if (error) {
      throw error;
    }

    console.log("Data inserted successfully:", data);
    return data;
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}
