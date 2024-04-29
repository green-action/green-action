import React, { useEffect, useState } from "react";
import MyActionCard from "./MyActionCard";
import CommunityListPost from "../community/CommunityListPost";
import RecruitSelectTab from "./RecruitSelectTab";
import { useSession } from "next-auth/react";
import {
  useFetchMyGreenActions,
  usefetchBookmarkedActions,
  usefetchMyCommunityPosts,
} from "@/app/_hooks/useQueries/mypage";
import Image from "next/image";
import SoomLoading from "/app/_assets/image/loading/SOOM_gif.gif";

import type { userInfoProps } from "@/app/_types/mypage/mypage";
import type { User } from "@/app/_types";
import {
  ACTIVE_TAB_BOOKMARKED_ACTION,
  ACTIVE_TAB_MY_ACTION,
  ACTIVE_TAB_MY_COMMUNITY,
} from "@/app/_api/constant";

const MyPageList = ({ userInfo }: { userInfo: userInfoProps }) => {
  const session = useSession();
  const user_uid = session.data?.user.user_uid as string;

  const { display_name, profile_img } = (userInfo as User["userInfo"]) || ""; // as User["userInfo"] 외에도 || '' 처리해줘야 에러안뜸

  const {
    data: myActions,
    isLoading: isActionsLoading,
    isError: isActionsError,
  } = useFetchMyGreenActions(user_uid);

  const {
    data: myPosts,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = usefetchMyCommunityPosts(user_uid);

  const {
    data: myBookmarks,
    isLoading: isBookmarksLoading,
    isError: isBookmarksError,
  } = usefetchBookmarkedActions(user_uid);

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

  const [activeTab, setActiveTab] = useState(ACTIVE_TAB_MY_ACTION);
  const [myRecruitClicked, setMyRecruitClicked] = useState("전체");
  const [bookmarkedRecruitClicked, setBookmarkedRecruitClicked] =
    useState("전체");
  const [filteredActions, setFilteredActions] = useState(sortedMyActions);
  const [filteredBookmarkedActions, setFilteredBookmarkedActions] =
    useState(sortedMyBookmarks);

  const filterByRecruiting = () => {
    if (activeTab === ACTIVE_TAB_MY_ACTION) {
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
    if (activeTab === ACTIVE_TAB_BOOKMARKED_ACTION) {
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

  useEffect(() => {
    filterByRecruiting();
  }, [
    myActions,
    myBookmarks,
    activeTab,
    myRecruitClicked,
    bookmarkedRecruitClicked,
  ]);

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

  if (isActionsLoading || isPostsLoading || isBookmarksLoading) {
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

  if (isActionsError || isPostsError || isBookmarksError) {
    return (
      <div className="flex justify-center items-center w-screen h-[500px]">
        ❌ ERROR : 이 페이지를 표시하는 도중 문제가 발생했습니다. 다른 페이지로
        이동하시거나 다시 방문해주세요.
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between laptop:mb-[30px] vh-auto">
        <div className="flex desktop:gap-[45px] laptop:gap-[30px] desktop:ml-5 desktop:text-[12pt]">
          <div
            onClick={handleActiveTabClick}
            className={`cursor-pointer h-[30px] desktop:text-[12pt] laptop:text-[11pt] 
                    ${
                      activeTab === ACTIVE_TAB_MY_ACTION &&
                      "border-b-2 border-[#979797] transition duration-400 ease-in-out"
                    }`}
          >
            나의 Green-Action
          </div>
          <div
            onClick={handleActiveTabClick}
            className={`cursor-pointer h-[30px] desktop:text-[12pt] laptop:text-[11pt]
                    ${
                      activeTab === ACTIVE_TAB_BOOKMARKED_ACTION &&
                      "border-b-2 border-[#979797] transition duration-400 ease-in-out"
                    }`}
          >
            즐겨찾는 Green-Action
          </div>
          <div
            onClick={handleActiveTabClick}
            className={`cursor-pointer h-[30px] desktop:text-[12pt] laptop:text-[11pt]
                   ${
                     activeTab === ACTIVE_TAB_MY_COMMUNITY &&
                     "border-b-2 border-[#979797] transition duration-400 ease-in-out"
                   }`}
          >
            나의 Community
          </div>
        </div>
        <div className="mr-[80px]">
          {activeTab === ACTIVE_TAB_MY_ACTION && (
            <RecruitSelectTab
              selected={myRecruitClicked}
              setSelected={setMyRecruitClicked}
            />
          )}
          {activeTab === ACTIVE_TAB_BOOKMARKED_ACTION && (
            <RecruitSelectTab
              selected={bookmarkedRecruitClicked}
              setSelected={setBookmarkedRecruitClicked}
            />
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-[20px]">
        {/* LINK My Green Action */}
        {activeTab === ACTIVE_TAB_MY_ACTION &&
          filteredActions?.map((action) => {
            return (
              <MyActionCard
                key={action.id}
                action={action as any} // NOTE any 해결하기
                mode="myPosts"
              />
            );
          })}
      </div>
      {/* LINK 찜한 Green Action */}
      <div className="flex flex-wrap gap-[20px]">
        {activeTab === ACTIVE_TAB_BOOKMARKED_ACTION &&
          filteredBookmarkedActions?.map((bookmark) => {
            return (
              <MyActionCard
                key={bookmark?.bookmarkedAction?.id || ""}
                action={bookmark as any} // NOTE any 해결하기
                mode="myBookmarks"
              />
            );
          })}
      </div>
      {/* LINK 내가 쓴 커뮤니티 글 */}
      <div className="flex flex-wrap gap-[20px]">
        {activeTab === ACTIVE_TAB_MY_COMMUNITY &&
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
    </>
  );
};

export default MyPageList;
