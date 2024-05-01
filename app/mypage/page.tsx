"use client";

import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useFetchUserInfo } from "../_hooks/useQueries/mypage";
import { useResponsive } from "../_hooks/responsive";
import MyProfile from "../_components/mypage/MyProfile";
import TopButton from "../_components/TopButton";
import MyActionCardMobile from "../_components/mypage/MyActionCardMobile";
import MyPageList from "../_components/mypage/MyPageList";
import SoomLoading from "/app/_assets/image/loading/SOOM_gif.gif";

import type { User } from "../_types";
import type { UserInfoProps } from "../_types/mypage/mypage";

const MyPage = () => {
  const session = useSession();
  const user_uid = session.data?.user.user_uid as string;

  const { isDesktop, isLaptop, isMobile } = useResponsive();

  // 유저 정보 조회
  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    isError: isUserInfoError,
  } = useFetchUserInfo(user_uid);

  if (isUserInfoLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-[500px]">
        <Image
          src={SoomLoading}
          alt="SoomLoading"
          unoptimized
          className="w-[100px]"
        />
      </div>
    );
  }

  if (isUserInfoError) {
    return (
      <div className="flex justify-center items-center w-screen h-[500px]">
        ❌ ERROR : 이 페이지를 표시하는 도중 문제가 발생했습니다. 다른 페이지로
        이동하시거나 다시 방문해주세요.
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center top-0 min-h-[500px] desktop:w-[1920px] laptop:w-[1020px] mx-auto">
        <TopButton />

        <div className="flex desktop:w-[1540px] laptop:w-[1020px] phone:w-[294px] desktop:mb-[100px] laptop:mb-[50px] ">
          {(isDesktop || isLaptop) && (
            <MyProfile userInfo={userInfo as User["userInfo"]} />
          )}

          <div className="flex flex-col desktop:pl-[82px] laptop:pl-[30px] desktop:pt-1 laptop:pt-[30px] w-full">
            {isMobile && <MyProfile userInfo={userInfo as User["userInfo"]} />}
            {(isDesktop || isLaptop) && (
              <MyPageList userInfo={userInfo as UserInfoProps} />
            )}
            {isMobile && <MyActionCardMobile />}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
