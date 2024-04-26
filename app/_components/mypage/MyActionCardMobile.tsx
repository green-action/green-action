import { useResponsive } from "@/app/_hooks/responsive";
import {
  useFetchMyGreenActions,
  useFetchUserInfo,
  usefetchBookmarkedActions,
  usefetchMyCommunityPosts,
} from "@/app/_hooks/useQueries/mypage";
import { User } from "@/app/_types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CommunityListPost from "../community/CommunityListPost";
import MyActionCard from "./MyActionCard";
import RecruitSelectTab from "./RecruitSelectTab";
import SoomLoading from "/app/_assets/image/loading/SOOM_gif.gif";

const MyActionCardMobile = () => {
  // TODO props 타입등 재설정
  const router = useRouter();
  const session = useSession();
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  const isLoggedIn = !!session.data;
  const user_uid = session.data?.user.user_uid as string;

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

  // 유저 정보 조회
  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    isError: isUserInfoError,
  } = useFetchUserInfo(user_uid);

  const { display_name, profile_img } = (userInfo as User["userInfo"]) || ""; // as User["userInfo"] 외에도 || '' 처리해줘야 에러안뜸

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
    if ("나의 Green-Action") {
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
    if ("즐겨찾는 Green-Action") {
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
        <Image
          src={SoomLoading}
          alt="SoomLoading"
          unoptimized
          className="w-[100px]"
        />
      </div>
    );
  }

  if (isActionsError || isPostsError || isBookmarksError || isUserInfoError) {
    return (
      <div className="flex justify-center items-center w-screen h-[500px]">
        ❌ ERROR : 이 페이지를 표시하는 도중 문제가 발생했습니다. 다른 페이지로
        이동하시거나 다시 방문해주세요.
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col justify-between mt-[50px] w-full">
        <div className="text-[13pt] font-bold">나의 Green-Action</div>
        <div className="ml-auto mt-3">
          <RecruitSelectTab
            selected={myRecruitClicked}
            setSelected={setMyRecruitClicked}
          />
        </div>

        <div className="mt-10 gap-5 grid p-2 phone:grid-cols-2">
          {/* LINK My Green Action */}
          {filteredActions?.map((action) => {
            return (
              <MyActionCard key={action.id} action={action} mode="myPosts" />
            );
          })}
        </div>
      </div>

      <div className="flex flex-col justify-between mt-[50px] w-full">
        <div className="flex text-[13pt] font-bold">즐겨찾는 Green-Action</div>
        <div className="ml-auto mt-3">
          <RecruitSelectTab
            selected={bookmarkedRecruitClicked}
            setSelected={setBookmarkedRecruitClicked}
          />
        </div>
        {/* LINK 찜한 Green Action */}
        <div className="mt-10 gap-5 grid p-2 phone:grid-cols-2">
          {filteredBookmarkedActions?.map((bookmark) => {
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
      <div className="flex flex-col justify-between mt-[40px] w-full">
        <div className="h-[30px] text-[13pt] font-bold">
          나의 Community
          {/* LINK 내가 쓴 커뮤니티 글 */}
          <div className="mt-10 gap-5 grid p-2 phone:grid-cols-2">
            {myPosts?.map((post) => {
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
        </div>
      </div>
    </>
  );
};

export default MyActionCardMobile;
