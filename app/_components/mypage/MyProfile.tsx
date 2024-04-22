"use client";

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
} from "@nextui-org/react";
import { HiOutlinePlus } from "react-icons/hi2";
import pointQuestion from "@/app/_assets/image/mainpage/question_circle.png";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUpdateUserIntro } from "@/app/_hooks/useMutations/mypage";
import { User } from "@/app/_types";
import MyProfileEditModal from "./MyProfileEditModal";
import coin from "@/app/_assets/image/logo_icon/icon/mypage/akar-icons_coin.svg";
import { useResponsive } from "@/app/_hooks/responsive";

const MyProfile = ({ userInfo }: { userInfo: User }) => {
  const {
    id: user_uid,
    display_name,
    email,
    introduction,
    point,
    profile_img,
  } = (userInfo as User) || "";

  const [isIntroEditing, setIsIntroEditing] = useState<boolean>(false);
  const [editedIntro, setEditedIntro] = useState<string>(introduction); // 초기값 기존 intro
  const [profileImg, setProfileImg] = useState<string>(profile_img || ""); // 프로필 이미지 업로드 시 mutation 활용해도 바로 렌더링 안되는 문제로  useState 사용해보기
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const { updateIntro } = useUpdateUserIntro(user_uid, editedIntro);

  const handleEditIntroClick = () => {
    setIsIntroEditing(true);
  };

  // 자기소개 등록 취소
  const handleCancelEditIntroClick = () => {
    setIsIntroEditing(false);
    setEditedIntro(introduction);
  };

  // 자기소개 등록 완료
  const handleEditIntroSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateIntro();
    setIsIntroEditing(false);
  };

  const handleEditedIntroChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEditedIntro(e.target.value);
  };

  return (
    <div className="flex flex-col gap-5 desktop:w-[347px] laptop:w-[206px] phone:w-[294px] desktop:min-h-[43rem] laptop:ml-[55px]">
      {(isDesktop || isLaptop) && (
        <Card>
          <div className="flex desktop:pl-5 laptop:pl-3">
            <div className="flex desktop:gap-4 laptop:gap-3 items-center desktop:h-[102px] laptop:h-[83px]">
              <Avatar
                showFallback
                src={profileImg || ""}
                className="desktop:w-[58px] desktop:h-[58px] laptop:w-[35px] laptop:h-[35px]"
              />
              <div className="flex flex-col desktop:gap-[0.1rem] laptop:gap-[0rem] desktop:w-[9rem] laptop:w-[115px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                <p className="font-bold desktop:text-[15px] laptop:text-[13px]">
                  {display_name}
                </p>
                <p className="desktop:text-[0.7rem] laptop:text-[10px]">
                  {email}
                </p>
                <p className="desktop:text-sm font-bold laptop:text-[11px]">
                  Greener
                </p>
              </div>
            </div>
            <div className="flex items-end desktop:pb-5 laptop:pb-4">
              <MyProfileEditModal
                user_uid={user_uid}
                display_name={display_name}
                profile_img={profile_img || ""}
                setProfileImg={setProfileImg}
              />
            </div>
          </div>
        </Card>
      )}

      {isMobile && (
        <Card className="shadow-none bg-[#F3F4F3] mt-6">
          <div className="flex desktop:pl-5 laptop:pl-3">
            <div className="flex gap-3 items-center h-[73px]">
              <Avatar
                showFallback
                src={profileImg || ""}
                className="w-[37px] h-[37px] ml-6"
              />
              <div className="flex flex-col desktop:gap-[0.1rem] laptop:gap-[0rem] desktop:w-[9rem] laptop:w-[115px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                <p className="font-bold text-[13px]">{display_name}</p>
                <p className="text-[10px]">Greener</p>
                <p className="text-[10px]">{email}</p>
              </div>
            </div>
            <div className="flex items-end pb-6 ml-24">
              <MyProfileEditModal
                user_uid={user_uid}
                display_name={display_name}
                profile_img={profile_img || ""}
                setProfileImg={setProfileImg}
              />
            </div>
          </div>
        </Card>
      )}
      {(isDesktop || isLaptop) && (
        <Card className="w-full min-h-[276px] p-[0.5rem]">
          <CardHeader className="font-bold desktop:text-[13pt] laptop:text-[10pt] ">
            <p>My Profile</p>
          </CardHeader>
          <CardBody className="desktop:text-[15px] laptop:text-[12.5px]">
            {/* SECTION - 자기소개 등록 */}
            {isIntroEditing ? (
              <form onSubmit={handleEditIntroSubmit}>
                <textarea
                  value={editedIntro}
                  onChange={(e) => {
                    handleEditedIntroChange(e);
                  }}
                  className="resize-none rounded-xl w-full min-h-[150px] p-2 bg-gray-200/50"
                  placeholder="100자 이내로 작성해주세요."
                  maxLength={100}
                />
                <div className="flex justify-end gap-[10px] ">
                  <Button
                    onClick={handleCancelEditIntroClick}
                    className="desktop:h-[30px] laptop:h-[25px] desktop:text-sm laptop:text-[12px]"
                  >
                    작성취소
                  </Button>
                  <Button
                    type="submit"
                    className="desktop:h-[30px] laptop:h-[25px] desktop:text-sm laptop:text-[12px]"
                  >
                    작성완료
                  </Button>
                </div>
              </form>
            ) : (
              <>
                <p className="min-h-[170px]">{introduction}</p>
                <div className="flex justify-end">
                  <button onClick={handleEditIntroClick}>
                    <HiOutlinePlus className="cursor-pointer" />
                  </button>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      )}
      {isMobile && (
        <Card className="w-full min-h-[150px] p-[0.5rem] shadow-none bg-[#EFF2EF]">
          <CardHeader className="font-bold text-[10pt] ">
            <p>My Profile</p>
          </CardHeader>
          <CardBody className="text-[11px] text-[#393939]">
            {/* SECTION - 자기소개 등록 */}
            {isIntroEditing ? (
              <form onSubmit={handleEditIntroSubmit}>
                <textarea
                  value={editedIntro}
                  onChange={(e) => {
                    handleEditedIntroChange(e);
                  }}
                  className="resize-none rounded-xl w-full min-h-[150px] p-2 bg-gray-200/50"
                  placeholder="100자 이내로 작성해주세요."
                  maxLength={100}
                />
                <div className="flex justify-end gap-[10px] ">
                  <Button
                    onClick={handleCancelEditIntroClick}
                    className="desktop:h-[30px] laptop:h-[25px] desktop:text-sm laptop:text-[12px]"
                  >
                    작성취소
                  </Button>
                  <Button
                    type="submit"
                    className="desktop:h-[30px] laptop:h-[25px] desktop:text-sm laptop:text-[12px]"
                  >
                    작성완료
                  </Button>
                </div>
              </form>
            ) : (
              <>
                <p className="min-h-[170px]">{introduction}</p>
                <div className="flex justify-end">
                  <button onClick={handleEditIntroClick}>
                    <HiOutlinePlus className="cursor-pointer w-[15px] h-[15px]" />
                  </button>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      )}
      {(isDesktop || isLaptop) && (
        <Card>
          <CardHeader className="mb-[-1.5rem]">
            {/* text-[15pt] */}
            <p className="font-bold desktop:text-[13pt] laptop:text-[10pt]">
              Points
            </p>
          </CardHeader>

          <CardBody className="flex flex-row gap-3">
            <Image src={coin} alt="코인" />
            <div className="font-bold w-[235px] desktop:text-[13pt] laptop:text-[11pt]">
              {point} P
            </div>
            <Tooltip
              showArrow={true}
              key="bottom"
              placement="bottom"
              content={
                <div className="text-gray-500 p-2 text-center text-[0.8rem]">
                  <p>Q. 포인트는 어디에 사용하나요?</p>
                  <p>
                    A. 'Goods'에 있는 친환경 굿즈들을 <br /> 구매하실 수 있어요!
                  </p>
                  <br />
                  <p>Q. 포인트는 어떻게 얻을 수 있나요?</p>
                  <p>
                    A. 'Green Action' - '개인과 함께해요'에서 <br />
                    개인 Green Action에 참여하고
                    <br /> 'Community'에 인증샷을 올려주시면
                    <br /> 포인트 획득이 가능해요!
                  </p>
                </div>
              }
              className="w-[19rem]"
            >
              <Image
                src={pointQuestion}
                alt="questionMark"
                className="w-[17px] h-[17px]"
              />
            </Tooltip>
          </CardBody>
          {/* </CardFooter> */}
        </Card>
      )}
      {isMobile && (
        <Card className=" shadow-none bg-[#D2DED0]">
          <CardHeader className="mb-[-1.5rem] ml-4">
            {/* text-[15pt] */}
            <p className="font-bold text-[10pt]">Points</p>
          </CardHeader>

          <CardBody className="flex flex-row gap-3 ml-3">
            <Image src={coin} alt="코인" />
            <div className="font-bold w-[235px] text-[17pt] ">{point} P</div>
            <Tooltip
              showArrow={true}
              key="bottom"
              placement="bottom"
              content={
                <div className="text-gray-500 p-2 text-center text-[0.8rem]">
                  <p>Q. 포인트는 어디에 사용하나요?</p>
                  <p>
                    A. 'Goods'에 있는 친환경 굿즈들을 <br /> 구매하실 수 있어요!
                  </p>
                  <br />
                  <p>Q. 포인트는 어떻게 얻을 수 있나요?</p>
                  <p>
                    A. 'Green Action' - '개인과 함께해요'에서 <br />
                    개인 Green Action에 참여하고
                    <br /> 'Community'에 인증샷을 올려주시면
                    <br /> 포인트 획득이 가능해요!
                  </p>
                </div>
              }
              className="w-[15rem]"
            >
              <Image
                src={pointQuestion}
                alt="questionMark"
                className="w-[17px] h-[17px] mr-7"
              />
            </Tooltip>
          </CardBody>
          {/* </CardFooter> */}
        </Card>
      )}
    </div>
  );
};

export default MyProfile;
