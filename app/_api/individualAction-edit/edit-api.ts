import { FileUpload } from "@/app/_types/individualAction-add/individualAction-add";
import { supabase } from "@/utils/supabase/client";

// individual_green_actions 테이블에서 수정할 정보 가져오기
// 외래키 연결된 green_action_images 테이블에서 이미지 url도 함께 가져오기
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

// 개인액션 수정
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

// 2. 스토리지의 action_id 폴더에 이미지 추가 + 방금 추가한 이미지들만 url배열 반환
export const uploadFilesAndGetUrls = async ({
  files,
  action_id,
}: FileUpload) => {
  try {
    const imgUrlsArray = await Promise.all(
      // map으로 (파일 스토리지에 업로드 + url 반환) 반복
      files.map(async (file) => {
        if (file) {
          console.log("file.name", file.name);
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

// 3. 테이블에 url이 있으면 넣지말고, 없으면 추가하기
// 4. deleteFileIds 배열에 있는 id가 테이블에 있으면 해당열 삭제

// export const updateStorageImages = async ({
//   files,
//   action_id,
//   existingFiles,
// }: {
//   files: File[];
//   action_id: string;
//   existingFiles: string[];
// }) => {
//   try {
//     // 기존 파일들과 유저가 업로드한 파일들을 비교하여 추가할 파일들과 삭제할 파일들을 구분합니다.
//     const filesToAdd = files.filter(
//       (file) => !existingFiles.includes(file.name),
//     );
//     const filesToDelete = existingFiles.filter(
//       (existingFile) => !files.some((file) => file.name === existingFile),
//     );

//     // 스토리지에서 삭제할 파일들을 삭제합니다.
//     await Promise.all(
//       filesToDelete.map(async (fileName) => {
//         const filePath = `${action_id}/${fileName}`;
//         const { error } = await supabase.storage
//           .from("green_action")
//           .remove([filePath]);
//         if (error) {
//           console.error("Error deleting file from storage:", error);
//         }
//       }),
//     );

//     // 스토리지에 추가할 파일들을 업로드합니다.
//     const uploadedUrls = await Promise.all(
//       filesToAdd.map(async (file) => {
//         const fileName = `${crypto.randomUUID()}`;
//         const filePath = `${action_id}/${fileName}`;
//         const { error } = await supabase.storage
//           .from("green_action")
//           .upload(filePath, file, {
//             cacheControl: "3600",
//             upsert: true,
//           });
//         if (error) {
//           console.error("Error uploading file to storage:", error);
//           return null;
//         }
//         return filePath;
//       }),
//     );

//     // 추가된 파일들의 경로를 반환합니다.
//     return uploadedUrls.filter((url) => url !== null) as string[];
//   } catch (error) {
//     console.error("Error updating storage images:", error);
//     return [];
//   }
// };

// 스토리지에서 파일을 업데이트하고 URL을 반환하는 함수
// export const updateStorageImages = async ({
//   action_id,
//   files,
// }: {
//   action_id: string;
//   files: (File | undefined)[];
// }): Promise<string[]> => {
//   try {
//     // 1. 스토리지에서 action_id에 해당하는 폴더에 있는 파일들을 가져옵니다.
//     const { data: originFiles, error } = await supabase.storage
//       .from("green_action")
//       .list(action_id);

//     if (error) {
//       console.error("Error fetching original files:", error);
//       throw new Error("Error fetching original files");
//     }

//     // 기존 파일들의 이름 목록을 저장합니다.
//     const originalFileNames = originFiles?.map((file: any) => file.name) || [];

//     // (파일들을 합치는 함수)
//     const mergeFiles = (
//       originFiles: File[],
//       files: (File | undefined)[],
//     ): File[] => {
//       // 새로운 파일들과 기존 파일들을 하나의 배열로 합쳐서 반환합니다.
//       return [...originFiles, ...files];
//     };

//     // 2. 가져온 파일들과 새로운 파일들을 합칩니다.
//     const mergedFiles = mergeFiles(originalFileNames, files);

//     // (파일을 스토리지에 업로드하는 함수)
//     const uploadFiles = async (
//       action_id: string,
//       files: File[],
//     ): Promise<void> => {
//       // 파일들을 스토리지에 업로드합니다.
//       // 파일 이름은 action_id와 파일명을 조합하여 설정합니다.
//       await Promise.all(
//         files.map(async (file) => {
//           const fileName = `${action_id}/${file.name}`;
//           const { error } = await supabase.storage
//             .from("green_action")
//             .upload(fileName, file, {
//               cacheControl: "3600",
//               upsert: true,
//             });

//           if (error) {
//             console.error("Error uploading file:", error);
//             throw new Error("Error uploading file");
//           }
//         }),
//       );
//     };

//     // 3. 합친 파일들을 해당 폴더에 업데이트합니다.
//     await uploadFiles(action_id, mergedFiles);

//     // 4. 업데이트된 파일들의 URL을 반환합니다.
//     // *** 중요 : 업데이트된 파일들의 url이 아니라, files의 url을 반환해야함
//     const updatedFileUrls = await getUpdatedFileUrls(action_id, files);
//     // console.log("updatedFileUrls", updatedFileUrls);
//     return updatedFileUrls;
//   } catch (error) {
//     console.error("Error updating storage images:", error);
//     throw new Error("Error updating storage images");
//   }
// };

// (이미지 전체의 url을 반환함)
// 업데이트된 파일들의 URL을 가져오는 함수
// const getUpdatedFileUrls = async (
//   action_id: string,
//   files: File[],
// ): Promise<string[]> => {
//   // 업데이트된 파일들의 URL을 반환합니다.
//   const fileUrls = files.map((file) => {
//     const fileName = `${action_id}/${file.name}`;
//     return supabase.storage.from("green_action").getPublicUrl(fileName);
//   });

//   const resolvedUrls = await Promise.all(fileUrls);

//   return resolvedUrls.map((url: any) => url?.data?.publicUrl || "");
// };

// (새로 업로드한 이미지의 url만 반환함)
// 업데이트된 파일들의 URL을 가져오는 함수
// const getUpdatedFileUrls = async (
//   action_id: string,
//   files: File[],
// ): Promise<string[]> => {
//   // 새로운 파일들의 URL을 반환합니다.
//   const fileUrls = files.map((file) => {
//     const fileName = `${action_id}/${file.name}`;
//     return supabase.storage.from("green_action").getPublicUrl(fileName);
//   });

//   const resolvedUrls = await Promise.all(fileUrls);

//   return resolvedUrls.map((url: any) => url?.data?.publicUrl || "");
// };

// // 페이지 렌더링시 스토리지에서 파일들 가져오기 (렌더링시 setFiles 하려고)
// export const fetchStorageFiles = async (action_id: string): Promise<any[]> => {
//   try {
//     // 스토리지에서 action_id에 해당하는 폴더에 있는 파일들을 가져옵니다.
//     const { data: files, error } = await supabase.storage
//       .from("green_action")
//       .list(action_id);

//     if (error) {
//       console.error("Error fetching files from storage:", error);
//       throw new Error("Error fetching files from storage");
//     }

//     // 가져온 파일들의 정보를 반환합니다.
//     return files || [];
//   } catch (error) {
//     console.error("Error fetching files:", error);
//     throw new Error("Error fetching files");
//   }
// };
