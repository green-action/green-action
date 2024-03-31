import { FileUpload } from "@/app/_types/individualAction-add/individualAction-add";
import { supabase } from "@/utils/supabase/client";

// 1. 텍스트 formData 삽입 함수
export const insertAction = async ({
  formData,
  currentUserUId,
}: {
  formData: FormData;
  currentUserUId: string;
}) => {
  try {
    // insert할 텍스트 데이터
    const inputData = {
      user_uid: currentUserUId,
      title: formData.get("activityTitle"),
      content: formData.get("activityDescription"),
      start_date: formData.get("startDate"),
      end_date: formData.get("endDate"),
      location: formData.get("activityLocation"),
      recruit_number: formData.get("maxParticipants"),
      kakao_link: formData.get("openKakaoLink"),
    };

    // supabase에 insert하기
    const { data, error } = await supabase
      .from("individual_green_actions")
      .insert(inputData);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

// 2. insert한 값의 action_id 가져오기
export const getActionId = async (currentUserUId: string) => {
  try {
    // 삽입된 데이터의 Primary Key 값을 가져오기 위해 쿼리 실행
    const { data: insertedData, error: selectError } = await supabase
      .from("individual_green_actions")
      .select("id")
      .eq("user_uid", currentUserUId)
      .order("created_at", { ascending: false }) // 해당 user가 등록한 데이터중 가장 최신데이터의 id 가져오기(방금 올린것)
      .limit(1);

    if (selectError) {
      throw selectError;
    }

    // 삽입된 데이터의 Primary Key 값을 반환
    const primaryKey = insertedData[0]?.id;
    return primaryKey;
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

// 3. 스토리지에 이미지 저장하기
export const uploadFilesAndGetUrls = async ({
  files,
  action_id,
}: FileUpload) => {
  try {
    const uploadFiles = await Promise.all(
      // map으로 배열의 각 파일 업로드
      files.map(async (file) => {
        if (file) {
          const uuid = crypto.randomUUID();
          // 'action_id' 폴더 생성, 파일이름은 uuid
          const filePath = `${action_id}/${uuid}`;
          const { data, error } = await supabase.storage
            // 'green_action' 버켓에 업로드
            .from("green_action")
            .upload(filePath, file, {
              cacheControl: "3600",
              upsert: true,
            });

          if (error) {
            console.error("Error uploading file:", error);
            return null;
          }
          return data;
        }
      }),
    );
    console.log("uploadFiles", uploadFiles);
    return uploadFiles;
  } catch (error) {
    console.error("Error uploading files and getting URLs:", error);
    return [];
  }
};

// 4. 스토리지에 저장한 이미지의 url 가져와서 images table에 넣기
