"use client";

import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";

import {
  insertActionTextForm,
  insertImgUrls,
  updateUserPoint,
  uploadFilesAndGetUrls,
} from "@/app/_api/individualAction-add/add-api";

import AlertModal from "@/app/_components/community/AlertModal";
import PointModal from "@/app/_components/community/PointModal";
import FirstInputBox from "@/app/_components/individualAction-add/FirstInputBox";
import ImgUpload from "@/app/_components/individualAction-add/ImgUpload";
import SecondInputBox from "@/app/_components/individualAction-add/SecondInputBox";
import ThirdInputBox from "@/app/_components/individualAction-add/ThirdInputBox";
import { Button, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import SearchAddressModal from "@/app/_components/daumPostCode/SearchAddressModal";

const AddActionPage = () => {
  const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<(File | undefined)[]>([]);

  // 상세 주소 등으로 나누기 - 보류
  // const [address, setAddress] = useState({
  //   roadAddress: "",
  //   jibunAddress: "",
  //   extraAddress: "",
  // });

  const [activityLocation, setActivityLocation] = useState<string>(""); // 주소검색통해 set하기 위해 추가

  const handleActivityLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setActivityLocation(e.target.value);
  };

  // 카카오맵 지도
  // const mapRef = useRef<HTMLDivElement>(null);
  // window.kakao.maps.load(() => {
  //   const mapOption = {
  //     center: new window.kakao.maps.LatLng(37.537187, 127.005476), // 지도의 중심좌표
  //     level: 5, // 지도의 확대 레벨
  //   };

  //   //지도를 미리 생성
  //   var map = new window.kakao.maps.Map(mapRef.current, mapOption);
  //   //주소-좌표 변환 객체를 생성
  //   var geocoder = new window.kakao.maps.services.Geocoder();
  //   //마커를 미리 생성
  //   var marker = new window.kakao.maps.Marker({
  //     position: new window.kakao.maps.LatLng(37.537187, 127.005476),
  //     map: map,
  //   });
  // });

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
    setModal((state) => ({ ...state, showPoint: true }));
    // 오픈카톡방 링크 유효성검사
    // 올바른 링크 양식 : https://open.kakao.com/o/{채팅방 ID}
    const openKakaoLink = formData.get("openKakaoLink") as string;
    const kakaoLinkPattern = /^https:\/\/open\.kakao\.com\/o\//;

    if (!kakaoLinkPattern.test(openKakaoLink)) {
      // alert("카카오톡 오픈채팅방 링크가 올바르지 않습니다.");
      setMessage("카카오톡 오픈채팅방 링크가 올바르지 않습니다.");
      setModal((state) => ({ ...state, isOpenAlert: true }));
      return;
    }

    if (!files.length) {
      // alert("사진은 필수값입니다.");
      setMessage("사진은 필수값입니다.");
      setModal((state) => ({ ...state, isOpenAlert: true }));
      return;
    }

    try {
      // 확인창 표시
      const isConfirmed = window.confirm("등록하시겠습니까?");
      if (isConfirmed) {
        // 1. user_uid와 텍스트 formData insert -> action_id 반환받기
        const action_id = await insertActionTextForm({
          formData,
          activityLocation,
          loggedInUserUid,
        });
        setActionId(action_id);
        // 2. 500point 업데이트
        await updateUserPoint(loggedInUserUid, { mode: "addAction" });

        // 3. 이미지 스토리지에 저장하기 + 이미지 url 배열 반환받기
        const imgUrlsArray = await uploadFilesAndGetUrls({ files, action_id });

        // 4. 이미지url들 table에 넣기 - action_id에 id사용
        await insertImgUrls({ action_id, imgUrlsArray });

        // 입력값 초기화
        const target = event.target as HTMLFormElement;
        target.reset();
      }
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  return (
    <div className="desktop:w-[1920px] laptop:w-[1020px] mx-auto">
      {/* 전체 Wrapper */}
      <form onSubmit={handleSubmit}>
        {/* <div className="flex flex-col w-[809px] h-[826px] border-1.5 border-gray-300 rounded-3xl mx-auto mb-12 mt-8"> */}
        <div className="flex flex-col w-[809px] h-[826px] border-1.5 border-gray-300 rounded-3xl mx-auto mb-12 mt-0">
          {/* new green-action 타이틀 */}
          <div className="ml-8 my-[16px] ">
            <span className="font-black text-[15px]">New Green-Action</span>
          </div>
          <hr className="border-t-1.5 border-gray-300" />
          {/* 타이틀 아래 Wrapper */}
          <div className="w-full h-full mt-[31px] mb-[26px] mx-[44px]">
            {/* 이미지 4장 자리*/}
            <ImgUpload
              uploadedFileUrls={uploadedFileUrls}
              setUploadedFileUrls={setUploadedFileUrls}
              setFiles={setFiles}
            />
            {/* 이미지아래 첫번째 박스(날짜, 장소, 인원, 링크) */}
            <FirstInputBox
              activityLocation={activityLocation}
              setActivityLocation={setActivityLocation}
              handleActivityLocationChange={handleActivityLocationChange}
            />
            {/* -- 주소검색 test 추가 */}
            {/* <SearchAddressModal
              activityLocation={activityLocation}
              setActivityLocation={setActivityLocation}
            /> */}
            {/* <div
              id="map"
              // ref={mapRef}
              className="w-[300px] h-[200px] border-2"
            ></div> */}
            {/* -- 주소검색 test 추가 */}
            {/* 이미지아래 두번째 박스(활동 제목) */}
            <SecondInputBox />
            {/* 이미지 아래 세번째 박스(활동 소개) */}
            <ThirdInputBox />
            {/* 등록, 취소 버튼 */}
            <div className="w-[724px] flex justify-center gap-4">
              <button
                type="submit"
                className="bg-gray-200 w-[170px] h-[40px] rounded-full border-1.5 border-gray-300 text-sm font-medium text-gray-500"
              >
                <span className="font-extrabold">등록완료</span>
              </button>
              <button className="bg-gray-100 w-[170px] h-[40px] rounded-full border-1.5 border-gray-300 text-sm font-medium text-gray-500">
                <span className="font-extrabold">취소하기</span>
              </button>
            </div>
          </div>
        </div>
        {Modal.showPoint && (
          <PointModal
            isOpen={Modal.showPoint}
            point={300}
            mod={"add"}
            onClose={() =>
              setModal((state) => ({ ...state, showPoint: false }))
            }
            handleClick={() => {
              router.push(`/individualAction/detail/${actionId}`);
            }}
          />
        )}
      </form>
      {Modal.isOpenAlert && (
        <AlertModal
          isOpen={Modal.isOpenAlert}
          onClose={() => setModal((state) => ({ ...state, isOpenAlert: true }))}
          message={message}
        />
      )}
    </div>
  );
};

export default AddActionPage;
