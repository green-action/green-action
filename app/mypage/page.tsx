"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { User } from "../_types";

import {
  useFetchMyGreenActions,
  useFetchUserInfo,
  usefetchBookmarkedActions,
  usefetchMyCommunityPosts,
} from "../_hooks/useQueries/mypage";

import MyProfile from "../_components/mypage/MyProfile";
import RecruitSelectTab from "../_components/mypage/RecruitSelectTab";
import MyActionCard from "../_components/mypage/MyActionCard";
import CommunityListPost from "../_components/community/CommunityListPost";

import { Button } from "@nextui-org/react";

import SoomLoading from "/app/_assets/image/loading/SOOM_gif.gif";
import TopButton from "../_components/TopButton";

// 로그인 안 한 상태에서 접근 차단할 것 -
const MyPage = () => {
  // TODO props 타입등 재설정
  // FIXME 유저닉네임 수정 다시 봐야
  // const user_uid = "9da3ec56-3796-4f4f-aa99-06517955400b";
  // 임시 유저 아이디 설정
  const router = useRouter();
  const session = useSession();

  // FIXME 로그인 해도 session.data null로 뜨는 문제
  const isLoggedIn = !!session.data;
  const user_uid = session.data?.user.user_uid as string;
  // let user_uid = "";
  // 새로고침 시 로그인이 잠시 풀림
  // if (!isLoggedIn) {
  //   alert("로그인 해주세요!");
  //   router.replace("/");
  // }
  // const session = useSession();
  // console.log("🐰 ~ MyPage ~ session : ", session);
  // const user_uid = session?.data?.user.user_uid || "";

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     // const session = useSession(); // 여기에 쓰면 invalid hook call
  //     const isLoggedIn = await !!session.data;
  //     user_uid = session?.data?.user.user_uid || "";
  //     if (!isLoggedIn) {
  //       alert("로그인 해주세요!");
  //       router.replace("/");
  //     }
  //   };
  //   fetchSession();
  // }, [user_uid]);

  // FIXME 새로고침 시 로그인 풀리는 문제
  const checkUserLogin = () => {
    const isLoggedIn = !!session.data;
    const user_uid = session?.data?.user.user_uid || "";
    // if (!isLoggedIn) {
    //   alert("로그인 해주세요!");
    //   router.replace("/");
    // }
    return user_uid; // uid를 리턴해줘야만 됨.? why? 쓰지않는데도
  };

  const { data: myActions, isLoading: isActionsLoading } =
    useFetchMyGreenActions(user_uid);

  const { data: myPosts, isLoading: isPostsLoading } =
    usefetchMyCommunityPosts(user_uid);

  const { data: myBookmarks, isLoading: isBookmarksLoading } =
    usefetchBookmarkedActions(user_uid);

  // 유저 정보 조회
  const { data: userInfo, isLoading: isUserInfoLoading } =
    useFetchUserInfo(user_uid);

  const { display_name, profile_img } = (userInfo as User) || ""; // as User 외에도 || '' 처리해줘야 에러안뜸

  // my action - created_at (작성일) 기준으로 정렬하기
  const sortedMyActions = myActions?.slice().sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  // 찜한 action - created_at (작성일) 기준으로 정렬하기
  const sortedMyBookmarks = myBookmarks?.slice().sort((a, b) => {
    return (
      new Date(a?.bookmarkedAction?.created_at || "").getTime() -
      new Date(b?.bookmarkedAction?.created_at || "").getTime()
    );
  });

  const [activeTab, setActiveTab] = useState("My Green-Action");
  const [myRecruitClicked, setMyRecruitClicked] = useState("전체");
  const [bookmarkedRecruitClicked, setBookmarkedRecruitClicked] =
    useState("전체");

  const [filteredActions, setFilteredActions] = useState(sortedMyActions);
  const [filteredBookmarkedActions, setFilteredBookmarkedActions] =
    useState(sortedMyBookmarks);

  useEffect(() => {
    filterByRecruiting();
  }, [
    myActions,
    myBookmarks,
    activeTab,
    myRecruitClicked,
    bookmarkedRecruitClicked,
  ]);

  useEffect(() => {
    checkUserLogin(); // 안됨 -> 이걸해줘야 처음 렌더링시 유저확인되고 데이터가 뜬다?
  }, [isLoggedIn]);

  // My Action, 작성 커뮤니티 글, 찜한 Action 탭 선택시
  const handleActiveTabClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const target = e.target as HTMLButtonElement;
    const textContent = target.textContent;
    if (textContent) {
      setActiveTab(textContent);
    }
  };

  const filterByRecruiting = () => {
    if (activeTab === "My Green-Action") {
      if (myRecruitClicked === "전체") {
        setFilteredActions(sortedMyActions);
      }
      if (myRecruitClicked === "모집 중") {
        setFilteredActions(
          sortedMyActions?.filter((action) => action.is_recruiting),
        );
      } else if (myRecruitClicked === "모집 마감") {
        setFilteredActions(
          sortedMyActions?.filter((action) => !action.is_recruiting),
        );
      }
    }
    if (activeTab === "찜한 Green-Action") {
      if (bookmarkedRecruitClicked === "전체") {
        setFilteredBookmarkedActions(sortedMyBookmarks);
      }
      if (bookmarkedRecruitClicked === "모집 중") {
        setFilteredBookmarkedActions(
          sortedMyBookmarks?.filter(
            (action) => action.bookmarkedAction?.is_recruiting,
          ),
        );
      } else if (bookmarkedRecruitClicked === "모집 마감") {
        setFilteredBookmarkedActions(
          sortedMyBookmarks?.filter(
            (action) => !action.bookmarkedAction?.is_recruiting,
          ),
        );
      }
    }
  };

  if (
    isActionsLoading ||
    isPostsLoading ||
    isBookmarksLoading ||
    isUserInfoLoading
  ) {
    return (
      <div className="flex justify-center items-center w-screen h-[500px]">
        <Image src={SoomLoading} alt="SoomLoading" className="w-[100px]" />
      </div>
    );
  }

  return (
    <>
      {/* 닉넴수정 후 메인페이지 -> 마이페이지 이동시 : 임포트한 헤더 컴포넌트에서만 닉넴 수정 반영됨 */}
      {/* <DynamicHeader /> */}
      <div className="flex justify-center desktop:mb-[100px] laptop:mb-[50px]">
        <TopButton />
        <div className="flex desktop:w-[1540px] laptop:w-[1020px]">
          <MyProfile userInfo={userInfo as User} />
          <div className="flex flex-col desktop:gap-10 desktop:pl-[82px] laptop:pl-[30px] desktop:pt-1 laptop:pt-[30px] w-full">
            <div className="flex justify-between laptop:mb-[30px]">
              <div className="flex desktop:gap-[45px] laptop:gap-[30px] desktop:ml-5 desktop:text-[12pt]">
                <Button
                  radius="full"
                  size="md"
                  onClick={handleActiveTabClick}
                  className={` bg-transparent  desktop:text-[12pt] laptop:text-[11pt]
                     ${activeTab === "My Green-Action" && "bg-[#F1F1F1]"}`}
                >
                  My Green-Action
                </Button>
                <Button
                  radius="full"
                  size="md"
                  onClick={handleActiveTabClick}
                  className={`bg-transparent  desktop:text-[12pt] laptop:text-[11pt]
                    ${activeTab === "작성 게시물" && "bg-[#F1F1F1]"}`}
                >
                  작성 게시물
                </Button>
                <Button
                  radius="full"
                  size="md"
                  onClick={handleActiveTabClick}
                  className={`bg-transparent  desktop:text-[12pt] laptop:text-[11pt]
                     ${activeTab === "찜한 Green-Action" && "bg-[#F1F1F1]"}`}
                >
                  찜한 Green-Action
                </Button>
              </div>
              <div className="mr-[80px]">
                {activeTab === "My Green-Action" && (
                  <RecruitSelectTab
                    selected={myRecruitClicked}
                    setSelected={setMyRecruitClicked}
                  />
                )}
                {activeTab === "찜한 Green-Action" && (
                  <RecruitSelectTab
                    selected={bookmarkedRecruitClicked}
                    setSelected={setBookmarkedRecruitClicked}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-[20px]">
              {/* LINK My Green Action */}
              {activeTab === "My Green-Action" &&
                filteredActions?.map((action) => {
                  return (
                    <MyActionCard
                      key={action.id}
                      action={action}
                      mode="myPosts"
                    />
                  );
                })}
            </div>
            {/* LINK 내가 쓴 커뮤니티 글 */}
            <div className="flex flex-wrap gap-[20px]">
              {activeTab === "작성 게시물" &&
                myPosts?.map((post) => {
                  return (
                    <CommunityListPost
                      key={post.id}
                      mode="myPosts"
                      communityPost={post}
                      my_display_name={display_name}
                      my_profile_img={profile_img || null}
                    />
                  );
                })}
            </div>
            <div className="flex flex-wrap gap-[20px]">
              {/* LINK 찜한 Green Action */}
              {activeTab === "찜한 Green-Action" &&
                filteredBookmarkedActions?.map((bookmark) => {
                  return (
                    <MyActionCard
                      key={bookmark?.bookmarkedAction?.id || ""}
                      action={bookmark}
                      mode="myBookmarks"
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
