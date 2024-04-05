"use client";

import {
  insertImgUrls,
  uploadFilesAndGetUrls,
} from "@/app/_api/individualAction-add/add-api";
import {
  deleteImagesByIds,
  getActionForEdit,
  updateActionTextForm,
} from "@/app/_api/individualAction-edit/edit-api";
import { QUERY_KEY_INDIVIDUALACTION_FOR_EDIT } from "@/app/_api/queryKeys";
import ImgEdit from "@/app/_components/individualAction-edit/ImgEdit";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EditActionPage = ({ params }: { params: { id: string } }) => {
  const [uploadedFileUrls, setUploadedFileUrls] = useState<
    { id: string; img_url: string }[]
  >([]);
  const [deleteFileIds, setDeleteFileIds] = useState<string[]>([]);
  const [files, setFiles] = useState<(File | undefined)[]>([]);
  const router = useRouter();
  const { id: action_id } = params;

  // 페이지 접근시 action_id의 기존 데이터 가져오기
  const {
    data: originalActionData,
    isLoading: isOriginalDataLoading,
    isError: isOriginalDataError,
  } = useQuery({
    queryKey: [QUERY_KEY_INDIVIDUALACTION_FOR_EDIT],
    // 데이터 가져오면서 동시에 {id: 이미지id, img_url: 이미지url} 객체 배열을 uploadedFileUrls에 set
    // (이미지 삭제 시 이미지id가 필요하기 때문)
    queryFn: async () => {
      try {
        // getActionForEdit 함수 호출하여 데이터 가져오기
        const data = await getActionForEdit(action_id);

        // uploadedFileUrls에 {id: img_id, img_url: img_url} 객체 배열을 set하기
        const idsAndUrlsObjArray = [...data.green_action_images];
        setUploadedFileUrls(idsAndUrlsObjArray);

        // 가져온 데이터 반환
        return data;
      } catch (error) {
        throw new Error("Error fetching data");
      }
    },
  });

  if (isOriginalDataLoading) {
    return <div>Loading...</div>;
  }
  if (isOriginalDataError) {
    return <div>Error</div>;
  }

  // '수정완료' 클릭시
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      // 확인창 표시
      const isConfirmed = window.confirm("수정하시겠습니까?");
      if (isConfirmed) {
        // 1. action_id와 텍스트 formData 보내서 update
        await updateActionTextForm({
          action_id,
          formData,
        });

        // 2. 이미지 스토리지에 저장하기 + 이미지 url 배열 반환받기
        // 기존에 있던 이미지 외에, 새롭게 업로드한 이미지들이 file저장 + url반환됨
        const imgUrlsArray = await uploadFilesAndGetUrls({ files, action_id });

        // 3. 반환받은 url배열을 테이블에 insert
        await insertImgUrls({ action_id, imgUrlsArray });

        // 4. deleteFileIds 참고, 테이블에 해당 id 있으면 행 삭제
        // 기존에 스토리지에 있던 이미지를 삭제 요청한 경우 테이블에서 삭제해주는 로직
        await deleteImagesByIds(deleteFileIds);

        // 입력값 초기화
        const target = event.target as HTMLFormElement;
        target.reset();

        // 확인을 클릭하면 action_id의 상세페이지로 이동
        router.push(`/individualAction/detail/${action_id}`);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      {/* 전체 박스 */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-[900px] h-auto border-2 border-gray-300 rounded-3xl mx-auto mb-12 mt-8">
          {/* new green-action 타이틀 */}
          <div className="m-4 ml-8 text-md font-semibold">New Green-Action</div>
          <hr className="border-t-2 border-gray-300" />
          {/* 안쪽 박스 */}
          <div className="p-10 w-full h-full">
            {/* 이미지 4장 자리*/}
            <ImgEdit
              uploadedFileUrls={uploadedFileUrls}
              setUploadedFileUrls={setUploadedFileUrls}
              deleteFileIds={deleteFileIds}
              setDeleteFileIds={setDeleteFileIds}
              files={files}
              setFiles={setFiles}
            />
            {/* 이미지아래 첫번째 박스 */}
            <div className="flex justify-between w-full h-auto border-2 border-gray-300 rounded-3xl mb-4">
              {/* 왼 */}
              <div className="flex flex-col justify-center w-1/2 h-[230px] gap-2 p-4 pl-6 pr-12">
                <div className="mb-4">
                  <p className="font-semibold mb-2">활동 날짜</p>
                  <div className="flex w-full gap-4 justify-between">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="startDate"
                        className="text-xs text-gray-400"
                      >
                        시작일
                      </label>
                      <input
                        id="startDate"
                        name="startDate"
                        defaultValue={originalActionData?.start_date || ""}
                        required
                        type="date"
                        className="h-[40px] p-4 border-2 border-gray-300 rounded-full bg-inherit  text-xs text-gray-400"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="endDate"
                        className="text-xs text-gray-400"
                      >
                        종료일
                      </label>
                      <input
                        id="endDate"
                        name="endDate"
                        defaultValue={originalActionData?.end_date || ""}
                        required
                        type="date"
                        className="h-[40px] p-4 border-2 border-gray-300 rounded-full bg-inherit  text-xs text-gray-400"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="maxParticipants"
                    className="font-semibold mb-2"
                  >
                    모집 인원
                  </label>
                  <div className="border-2 border-gray-300 rounded-full text-xs text-gray-400 pl-4">
                    최대
                    <input
                      id="maxParticipants"
                      name="maxParticipants"
                      defaultValue={originalActionData?.recruit_number || ""}
                      required
                      className="w-1/4 h-[35px] text-right mx-4 pr-4  bg-inherit focus:outline-none"
                    />
                    명
                  </div>
                </div>
              </div>
              {/* 오 */}
              <div className="flex flex-col justify-center w-1/2 h-[230px] gap-2 p-4 pl-6 pr-12">
                <div className="mb-7">
                  <div>
                    <label
                      htmlFor="activityLocation"
                      className="font-semibold mb-2"
                    >
                      활동 장소
                    </label>
                    <div className="border-2 border-gray-300 rounded-full text-sm text-gray-400 pl-4">
                      <input
                        type="text"
                        id="activityLocation"
                        name="activityLocation"
                        defaultValue={originalActionData?.location || ""}
                        required
                        className="w-10/12 h-[35px] mx-4 pr-4 bg-inherit focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="openKakaoLink" className="font-semibold mb-2">
                    오픈 채팅방 링크
                  </label>
                  <div className="border-2 border-gray-300 rounded-full text-sm text-gray-400 pl-4">
                    <input
                      type="url"
                      id="openKakaoLink"
                      name="openKakaoLink"
                      defaultValue={originalActionData?.kakao_link || ""}
                      required
                      className="w-10/12 h-[35px] mx-4 pr-4 bg-inherit focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 이미지아래 두번째 박스(활동 제목) */}
            <div className="flex w-full h-auto items-center pl-8 border-2 border-gray-300 rounded-3xl mb-4">
              <label htmlFor="activityTitle" className="font-semibold mr-8">
                활동 제목
              </label>
              <input
                type="text"
                id="activityTitle"
                name="activityTitle"
                defaultValue={originalActionData?.title || ""}
                required
                className="w-10/12 h-[50px] mx-4 pr-4 bg-inherit focus:outline-none text-sm text-gray-400"
              />
            </div>
            {/* 이미지 아래 세번째 박스(활동 소개) */}
            <div className="flex items-start w-full h-auto pl-8 border-2 border-gray-300 rounded-3xl mb-8">
              <label
                htmlFor="activityDescription"
                className="font-semibold mr-8 mt-4"
              >
                활동 소개
              </label>
              <textarea
                id="activityDescription"
                name="activityDescription"
                defaultValue={originalActionData?.content || ""}
                required
                className="resize-none w-10/12 h-[100px] mx-4 mt-4 pr-4 bg-inherit focus:outline-none text-sm text-gray-400"
              />
            </div>
            {/* 수정, 취소 버튼 */}
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="bg-gray-100 w-40 h-10 rounded-full border-2 border-gray-300 text-sm font-medium text-gray-500"
              >
                수정완료
              </button>
              <button className="bg-gray-100 w-40 h-10 rounded-full border-2 border-gray-300 text-sm font-medium text-gray-500">
                취소하기
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditActionPage;
