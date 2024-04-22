"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { User } from "../_types";

import {
  useFetchMyGreenActions,
  useFetchUserInfo,
  usefetchBookmarkedActions,
  usefetchMyCommunityPosts,
} from "../_hooks/useQueries/mypage";

import CommunityListPost from "../_components/community/CommunityListPost";
import MyActionCard from "../_components/mypage/MyActionCard";
import MyProfile from "../_components/mypage/MyProfile";
import RecruitSelectTab from "../_components/mypage/RecruitSelectTab";

import { MODE_MY_BOOKMARKS, MODE_MY_POSTS } from "../_api/constant";
import TopButton from "../_components/TopButton";
import SoomLoading from "/app/_assets/image/loading/SOOM_gif.gif";

const MyPage = () => {
  // TODO props 타입등 재설정
  const router = useRouter();
  const session = useSession();

  const isLoggedIn = !!session.data;
  const user_uid = session.data?.user.user_uid as string;

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

  const [activeTab, setActiveTab] = useState("나의 Green-Action");
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

  // My Action, 작성 커뮤니티 글, 찜한 Action 탭 선택시
  const handleActiveTabClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    // e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const target = e.target as HTMLButtonElement;
    const textContent = target.textContent;
    if (textContent) {
      setActiveTab(textContent);
    }
  };

  const filterByRecruiting = () => {
    if (activeTab === "나의 Green-Action") {
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
    if (activeTab === "즐겨찾는 Green-Action") {
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
      <div className="flex justify-center desktop:mb-[100px] laptop:mb-[50px]">
        <TopButton />
        <div className="flex desktop:w-[1540px] laptop:w-[1020px]">
          <MyProfile userInfo={userInfo as User} />
          <div className="flex flex-col desktop:gap-10 desktop:pl-[82px] laptop:pl-[30px] desktop:pt-1 laptop:pt-[30px] w-full">
            <div className="flex justify-between laptop:mb-[30px]">
              <div className="flex desktop:gap-[45px] laptop:gap-[30px] desktop:ml-5 desktop:text-[12pt]">
                {/* <Tabs 탭은 보류
                  aria-label="Options"
                  color="primary"
                  variant="underlined"
                  classNames={{
                    tabList:
                      "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-[#22d3ee]",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-[#6f979e]",
                  }}
                >
                  <Tab key="photos" onClick={handleActiveTabClick}>
                    My Green-Action
                  </Tab>
                  <Tab key="photos" onClick={handleActiveTabClick}>
                    작성 게시물
                  </Tab>
                </Tabs> 

                <Button
                  onClick={handleActiveTabClick}
                  className={`bg-transparent cursor-pointer h-[30px] desktop:text-[12pt] laptop:text-[11pt] p-[20px] rounded-none 로도 클릭문제 해결 X*/}
                <div
                  onClick={handleActiveTabClick}
                  className={`cursor-pointer h-[30px] desktop:text-[12pt] laptop:text-[11pt] 
                     ${
                       activeTab === "나의 Green-Action" &&
                       "border-b-2 border-[#979797] transition duration-400 ease-in-out"
                     }`}
                >
                  나의 Green-Action
                </div>
                <div
                  onClick={handleActiveTabClick}
                  className={`cursor-pointer h-[30px] desktop:text-[12pt] laptop:text-[11pt]
                     ${
                       activeTab === "즐겨찾는 Green-Action" &&
                       "border-b-2 border-[#979797] transition duration-400 ease-in-out"
                     }`}
                >
                  즐겨찾는 Green-Action
                </div>
                <div
                  onClick={handleActiveTabClick}
                  className={`cursor-pointer h-[30px] desktop:text-[12pt] laptop:text-[11pt]
                    ${
                      activeTab === "나의 Community" &&
                      "border-b-2 border-[#979797] transition duration-400 ease-in-out"
                    }`}
                >
                  나의 Community
                </div>
              </div>
              <div className="mr-[80px]">
                {activeTab === "나의 Green-Action" && (
                  <RecruitSelectTab
                    selected={myRecruitClicked}
                    setSelected={setMyRecruitClicked}
                  />
                )}
                {activeTab === "즐겨찾는 Green-Action" && (
                  <RecruitSelectTab
                    selected={bookmarkedRecruitClicked}
                    setSelected={setBookmarkedRecruitClicked}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-[20px]">
              {/* LINK My Green Action */}
              {activeTab === "나의 Green-Action" &&
                filteredActions?.map((action) => {
                  return (
                    <MyActionCard
                      key={action.id}
                      action={action}
                      mode={MODE_MY_POSTS}
                    />
                  );
                })}
            </div>
            {/* LINK 찜한 Green Action */}
            <div className="flex flex-wrap gap-[20px]">
              {activeTab === "즐겨찾는 Green-Action" &&
                filteredBookmarkedActions?.map((bookmark) => {
                  return (
                    <MyActionCard
                      key={bookmark?.bookmarkedAction?.id || ""}
                      action={bookmark}
                      mode={MODE_MY_BOOKMARKS}
                    />
                  );
                })}
            </div>
            {/* LINK 내가 쓴 커뮤니티 글 */}
            <div className="flex flex-wrap gap-[20px]">
              {activeTab === "나의 Community" &&
                myPosts?.map((post) => {
                  return (
                    <CommunityListPost
                      key={post.id}
                      mode={MODE_MY_POSTS}
                      communityPost={post}
                      my_display_name={display_name}
                      my_profile_img={profile_img || null}
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
