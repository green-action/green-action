"use client";

import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useResponsive } from "@/app/_hooks/responsive";
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
import { FaChevronLeft } from "react-icons/fa6";

import type { PlaceCoordinateType } from "@/app/_types/individualAction-detail/individualAction-detail";

const AddActionPage = () => {
  const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<(File | undefined)[]>([]);
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  const [activityLocation, setActivityLocation] = useState<string>("");
  const [activityLocationMap, setActivityLocationMap] = useState<string>("");
  const locationMapRef = useRef<PlaceCoordinateType | null>(null);

  const handleActivityLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setActivityLocation(e.target.value);
  };

  const [Modal, setModal] = useState({
    showPoint: false,
    isOpenAlert: false,
  });

  const [actionId, setActionId] = useState("");
  const [message, setMessage] = useState("");

  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (!files.length) {
      setMessage("사진은 필수값입니다.");
      setModal((state) => ({ ...state, isOpenAlert: true }));
      return;
    }

    try {
      const activityLocationMap = locationMapRef.current || null;
      const action_id = await insertActionTextForm({
        formData,
        activityLocation,
        activityLocationMap,
        loggedInUserUid,
      });
      setActionId(action_id);
      await updateUserPoint(loggedInUserUid, { mode: MODE_ADD_ACTION });

      const imgUrlsArray = await uploadFilesAndGetUrls({ files, action_id });

      await insertImgUrls({ action_id, imgUrlsArray });
      await insertGroupChatRoom({ loggedInUserUid, action_id });

      setModal((state) => ({ ...state, showPoint: true }));

      const target = event.target as HTMLFormElement;
      target.reset();
      setUploadedFileUrls([]);
      setActivityLocation("");
      setActivityLocationMap("");
      locationMapRef.current = null;
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const handleCancelPost = () => {
    if (window.confirm("정말 등록을 취소하시겠습니까?")) {
      router.push(`/individualAction`);
    } else return;
  };

  return (
    <div className="desktop:w-[1920px] laptop:w-[1020px] phone:w-[360px] mx-auto">
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
        <div className="w-full h-full mt-[31px] mb-[26px] desktop:mx-[44px] laptop:mx-[44px] phone:ml-auto">
          <ImgUpload
            uploadedFileUrls={uploadedFileUrls}
            setUploadedFileUrls={setUploadedFileUrls}
            setFiles={setFiles}
          />
          <FirstInputBox
            activityLocation={activityLocation}
            setActivityLocation={setActivityLocation}
            handleActivityLocationChange={handleActivityLocationChange}
            locationMapRef={locationMapRef}
            activityLocationMap={activityLocationMap}
            setActivityLocationMap={setActivityLocationMap}
          />
          <SecondInputBox />
          <ThirdInputBox />
          {(isDesktop || isLaptop) && (
            <div className="w-[724px] flex justify-center gap-4">
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
              <CustomConfirm
                text="등록하시겠습니까?"
                buttonName="등록완료"
                okFunction={() => handleSubmit}
                mode={MODE_INDIVIDUAL_ACTION_ADD}
              />
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
          }
          handleClick={() => {
            router.push(`/individualAction/detail/${actionId}`);
          }}
        />
      )}
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
