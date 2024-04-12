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
    <div className="flex flex-col gap-5 desktop:w-[347px] min-h-[43rem] ">
      <Card>
        <div className="flex pl-5">
          <div className="flex gap-4 items-center h-[102px]">
            <Avatar
              showFallback
              src={profile_img || ""}
              className="w-[58px] h-[58px]"
            />
            <div className="flex flex-col gap-[0.1rem] w-[9rem] overflow-hidden whitespace-nowrap overflow-ellipsis">
              <p className="font-bold text-sm">{display_name}</p>
              <p className="text-[0.7rem]">{email}</p>
              <p className="text-sm font-bold">Greener</p>
            </div>
          </div>
          <div className="flex items-end pb-5">
            <MyProfileEditModal
              user_uid={user_uid}
              display_name={display_name}
              profile_img={profile_img || ""}
            />
          </div>
        </div>
      </Card>
      <Card className="w-full min-h-[276px] p-[0.5rem]">
        <CardHeader className="font-bold">
          <p>My Profile</p>
        </CardHeader>
        <CardBody>
          {/* SECTION - 자기소개 등록 */}
          {isIntroEditing ? (
            <form onSubmit={handleEditIntroSubmit}>
              <textarea
                value={editedIntro}
                onChange={(e) => {
                  handleEditedIntroChange(e);
                }}
                className="resize-none rounded-xl w-full min-h-[150px] p-2 text-sm bg-gray-200/50"
                placeholder="100자 이내로 작성해주세요."
                maxLength={100}
              />
              <div className="flex justify-end gap-[10px] text-sm">
                <Button
                  onClick={handleCancelEditIntroClick}
                  className="h-[30px]"
                >
                  작성취소
                </Button>
                <Button type="submit" className="h-[30px]">
                  작성완료
                </Button>
              </div>
            </form>
          ) : (
            <>
              <p className="text-sm min-h-[170px]">{introduction}</p>
              <div className="flex justify-end">
                <button onClick={handleEditIntroClick}>
                  <HiOutlinePlus className="cursor-pointer" />
                </button>
              </div>
            </>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="mb-[-1.5rem]">
          {/* text-[15pt] */}
          <p>Points</p>
        </CardHeader>
        <CardBody className="flex flex-row">
          <div className="font-bold w-[235px]">{point} P</div>

          {/* <CardFooter className="flex justify-end"> */}
          {/* mt-[-2.7rem] - hover 안됨*/}
          <Tooltip
            showArrow={true}
            key="bottom"
            placement="bottom"
            content={
              <div className="text-gray-500 p-2 text-center  text-[0.8rem]">
                {/* text-[0.8rem] */}
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
    </div>
  );
};

export default MyProfile;
