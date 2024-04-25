"use client";

import {
  MODE_ADD_ACTION,
  MODE_INDIVIDUAL_ACTION_ADD,
} from "@/app/_api/constant";
import {
  insertActionTextForm,
  insertGroupChatRoom,
  insertImgUrls,
  updateUserPoint,
  uploadFilesAndGetUrls,
} from "@/app/_api/individualAction-add/add-api";
import AlertModal from "@/app/_components/community/AlertModal";
import PointModal from "@/app/_components/community/PointModal";
import CustomConfirm from "@/app/_components/customConfirm/CustomConfirm";
import FirstInputBox from "@/app/_components/individualAction-add/FirstInputBox";
import ImgUpload from "@/app/_components/individualAction-add/ImgUpload";
import SecondInputBox from "@/app/_components/individualAction-add/SecondInputBox";
import ThirdInputBox from "@/app/_components/individualAction-add/ThirdInputBox";
import { useResponsive } from "@/app/_hooks/responsive";
import { placeCoordinateType } from "@/app/_types/individualAction-detail/individualAction-detail";
import { useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";

const AddActionPage = () => {
  const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<(File | undefined)[]>([]);
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  const [activityLocation, setActivityLocation] = useState<string>(""); // 주소검색통해 set하기 위해 추가
  const [activityLocationMap, setActivityLocationMap] = useState<string>(""); // 지도 검색 완료 후 뜰 장소명 (렌더링 위해 useState 사용)
  const locationMapRef = useRef<placeCoordinateType | null>(null); // 지도 검색으로 장소 선택 시 해당 장소의 좌표 담을 useRef

  const handleActivityLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setActivityLocation(e.target.value);
  };

  // PointModal을 위한 상태관리 / alert 대체 모달창을 위한 상태관리
  const [Modal, setModal] = useState({
    showPoint: false,
    isOpenAlert: false,
  });

  const [actionId, setActionId] = useState("");
  const [message, setMessage] = useState("");
  const { onClose } = useDisclosure();

  // 현재 로그인한 유저 uid
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  const router = useRouter();

  // '등록완료' 클릭시
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (!files.length) {
      setMessage("사진은 필수값입니다.");
      setModal((state) => ({ ...state, isOpenAlert: true }));
      return;
    }

    try {
      // 1. user_uid와 텍스트 formData insert -> action_id 반환받기
      const activityLocationMap = locationMapRef.current || null; // 지도 장소정보 - 장소 좌표, 장소명, 장소 id
      const action_id = await insertActionTextForm({
        formData,
        activityLocation,
        activityLocationMap,
        loggedInUserUid,
      });
      setActionId(action_id);
      // 2. 500point 업데이트
      await updateUserPoint(loggedInUserUid, { mode: MODE_ADD_ACTION });

      // 3. 이미지 스토리지에 저장하기 + 이미지 url 배열 반환받기
      const imgUrlsArray = await uploadFilesAndGetUrls({ files, action_id });

      // 4. 이미지url들 table에 넣기 - action_id에 id사용
      await insertImgUrls({ action_id, imgUrlsArray });

      // 5. 단체 채팅방 생성
      await insertGroupChatRoom({ loggedInUserUid, action_id });

      setModal((state) => ({ ...state, showPoint: true })); // 포인트 휙득 모달창

      // 입력값 초기화 - 혹은 그냥 바로 green action list 페이지로 이동시키기
      const target = event.target as HTMLFormElement;
      target.reset();
      setUploadedFileUrls([]);
      setActivityLocation("");
      setActivityLocationMap("");
      locationMapRef.current = null;

      // router.push(`/individualAction`); // 그냥 이동시키면 modal창 제대로 확인하기 전에 이동됨 / but 모달창 x나 close해야만 이동하는 것도 문제
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const handleCancelPost = () => {
    if (window.confirm("정말 등록을 취소하시겠습니까?")) {
      // TODO 커스텀컨펌창으로 변경하기
      router.push(`/individualAction`);
    } else return;
  };

  return (
    <div className="desktop:w-[1920px] laptop:w-[1020px] phone:w-[360px] mx-auto">
      {/* 전체 Wrapper */}
      {/* 이중 form태그라 id/form 속성으로 연결시키기 (mainForm, subForm)*/}
      <form onSubmit={handleSubmit} id="mainForm" method="post" />
      <div
        className={`flex flex-col desktop:w-[809px] 
      laptop:w-[809px] h-[1000px] 
      phone:w-[291px] desktop:border-1.5 laptop:border-1.5
       desktop:border-gray-300 laptop:border-gray-300 phone:border-0 rounded-3xl mx-auto mb-12 mt-0
       ${
         (isDesktop || isLaptop) &&
         (locationMapRef.current ? "h-[1025px]" : "h-[830px]")
       }`}
      >
        {/* new green-action 타이틀 */}
        <div className="ml-8 my-[16px] phone:text-center">
          <span className="font-black text-[15px]">New Green-Action</span>
        </div>
        {isMobile && (
          <div className="flex flex-col mb-3">
            <FaChevronLeft
              className="relative bottom-8 left-4 cursor-pointer"
              onClick={() => router.push("/individualAction")}
            />
          </div>
        )}
        <hr className="border-t-1.5 desktop:border-gray-300 laptop:border-gray-300 phone:border-[#EDEDED]" />
        {/* 타이틀 아래 Wrapper */}
        <div className="w-full h-full mt-[31px] mb-[26px] desktop:mx-[44px] laptop:mx-[44px] phone:ml-auto">
          {/* 이미지 4장 자리*/}
          <ImgUpload
            uploadedFileUrls={uploadedFileUrls}
            setUploadedFileUrls={setUploadedFileUrls}
            setFiles={setFiles}
          />
          {/* 이미지아래 첫번째 박스(날짜, 장소, 인원, 링크) */}
          {/* 도로명주소 검색 추가 - 보류 */}
          <FirstInputBox
            activityLocation={activityLocation}
            setActivityLocation={setActivityLocation}
            handleActivityLocationChange={handleActivityLocationChange}
            locationMapRef={locationMapRef}
            activityLocationMap={activityLocationMap}
            setActivityLocationMap={setActivityLocationMap}
          />
          {/* 이미지아래 두번째 박스(활동 제목) */}
          {/* 지도에서 검색 - 추후 '활동장소'와 함께 UI 따로 뺄 예정  */}
          {/* <div className="flex gap-5  w-[724px] h-[100px] border-1.5 border-gray-300 rounded-3xl pt-[21px] px-[28px] pb-[28px] mb-4 ">
            <SearchMapModal
              setActivityLocationMap={setActivityLocationMap}
              locationMapRef={locationMapRef}
            />
            <input
              id="activityLocationMap"
              name="activityLocationMap"
              value={activityLocationMap}
              type="text"
              form="mainForm"
              placeholder="지도에서 검색해주세요"
              className="h-[40px] p-4 border-1.5 border-gray-300 rounded-full bg-inherit  text-xs text-gray-400"
            />
          </div> */}
          {/* {(isDesktop || isLaptop) && (
            <div className="flex gap-5 desktop:w-[724px] laptop:w-[724px] phone:w-[291px] h-[100px] border-1.5 border-gray-300 rounded-3xl pt-[21px] px-[28px] pb-[28px] mb-4">
              <SearchMapModal
                setActivityLocationMap={setActivityLocationMap}
                locationMapRef={locationMapRef}
              />
              <input
                id="activityLocationMap"
                name="activityLocationMap"
                value={activityLocationMap}
                type="text"
                form="mainForm"
                placeholder="지도에서 검색해주세요"
                className="h-[40px] p-4 border-1.5 border-gray-300 rounded-full bg-inherit  text-xs text-gray-400"
              />
            </div>
          )} */}

          <SecondInputBox />
          {/* 이미지 아래 세번째 박스(활동 소개) */}
          <ThirdInputBox />
          {/* 등록, 취소 버튼 */}
          {(isDesktop || isLaptop) && (
            <div className="w-[724px] flex justify-center gap-4">
              {/* <button
                type="submit"
                form="mainForm"
                className="bg-gray-200 w-[170px] h-[40px] rounded-full border-1.5 border-gray-300 text-sm font-medium text-gray-500"
              >
                <span className="font-extrabold">등록완료</span>
              </button> */}
              <CustomConfirm
                text="등록하시겠습니까?"
                buttonName="등록완료"
                okFunction={() => handleSubmit}
                mode={MODE_INDIVIDUAL_ACTION_ADD}
              />
              <button
                onClick={handleCancelPost}
                className="bg-gray-100 w-[170px] h-[40px] rounded-full border-1.5 border-gray-300 text-sm font-medium text-gray-500"
              >
                <span className="font-extrabold">취소하기</span>
              </button>
            </div>
          )}

          {isMobile && (
            <div className="w-[291px] flex justify-center gap-4 mt-3">
              {/* 커스텀컨펌창으로 다시 변경 */}
              <CustomConfirm
                text="등록하시겠습니까?"
                buttonName="등록완료"
                okFunction={() => handleSubmit}
                mode={MODE_INDIVIDUAL_ACTION_ADD}
              />
              {/* <button
                type="submit"
                form="mainForm"
                className="bg-black w-[170px] h-[40px] rounded-full border-1.5  text-sm font-medium text-white"
              >
                <span className="font-extrabold">등록완료</span>
              </button> */}
            </div>
          )}
        </div>
      </div>

      {Modal.showPoint && (
        <PointModal
          isOpen={Modal.showPoint}
          point={300}
          mod={"add"}
          onCloseFn={() =>
            setModal((state) => ({ ...state, showPoint: false }))
          } // 여기서는 onCloseFn 필요가 없음
          handleClick={() => {
            router.push(`/individualAction/detail/${actionId}`);
          }}
        />
      )}
      {/* </form> */}
      {Modal.isOpenAlert && (
        <AlertModal
          isOpen={Modal.isOpenAlert}
          onClose={() =>
            setModal((state) => ({ ...state, isOpenAlert: false }))
          }
          message={message}
        />
      )}
    </div>
  );
};

export default AddActionPage;
