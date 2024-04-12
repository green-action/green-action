import { supabase } from "@/utils/supabase/client";

import type {
  FileUpload,
  FormDataType,
  InsertImgUrls,
} from "@/app/_types/individualAction-add/individualAction-add";

// 1. 텍스트 formData 삽입 함수
export const insertActionTextForm = async ({
  formData,
  loggedInUserUid,
}: {
  formData: FormData;
  loggedInUserUid: string;
}) => {
  try {
    // insert할 텍스트 데이터
    const inputData: FormDataType = {
      user_uid: loggedInUserUid,
      title: String(formData.get("activityTitle")),
      content: String(formData.get("activityDescription")),
      start_date: String(formData.get("startDate")),
      end_date: String(formData.get("endDate")),
      location: String(formData.get("activityLocation")),
      recruit_number: Number(formData.get("maxParticipants")),
      kakao_link: String(formData.get("openKakaoLink")),
    };

    // supabase에 insert하기
    const { data, error } = await supabase
      .from("individual_green_actions")
      .insert(inputData)
      .select("id");

    if (error) {
      throw error;
    }
    const action_id = data[0].id;

    return action_id;
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

// 2. 500 point 업데이트해주기
// (다른 컴포넌트에서도 사용 예정이라 로직 분리)
export const updateUserPoint = async (loggedInUserUid: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("point")
      .eq("id", loggedInUserUid);

    if (error) {
      throw error;
    }

    const point = data[0].point;
    if (point) {
      const updatedPoint = point + 500;
      await supabase
        .from("users")
        .update({ point: updatedPoint })
        .eq("id", loggedInUserUid);
    }
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

// 3. 스토리지에 이미지 저장하기 + url 반환하기
// (저장한 이미지의 파일명을 알아야 url을 가져올수 있어서 둘을 함께 작성)
export const uploadFilesAndGetUrls = async ({
  files,
  action_id,
}: FileUpload) => {
  try {
    const imgUrlsArray = await Promise.all(
      // map으로 (파일 스토리지에 업로드 + url 반환) 반복
      files.map(async (file) => {
        if (file) {
          const fileName = `${file.name}_${crypto.randomUUID()}`;
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
            .getPublicUrl(filePath);

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

// 4. 이미지url들 table에 넣기 - action_id도 함께 넣어야 함
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
