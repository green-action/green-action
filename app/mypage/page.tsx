"use client";
// 되면 ssr로 두고 client 컴포는 따로 빼보기

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  CircularProgress,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import MyProfile from "../_components/mypage/MyProfile";
import {
  useFetchMyGreenActions,
  usefetchBookmarkedActions,
  usefetchMyCommunityPosts,
} from "../_hooks/useQueries/mypage";
import CustomConfirm from "../_components/customConfirm/CustomConfirm";
import MyActionCard from "../_components/mypage/MyActionCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RecruitSelectTab from "../_components/mypage/RecruitSelectTab";
import CommunityListPost from "../_components/community/CommunityListPost";

// 로그인 안 한 상태에서 접근 차단할 것 -
// FIXME My green action, 찜한 action 초기 다시 안뜨는 문제, 모집상태별 분류 다시 안됨
const MyPage = () => {
  // TODO props 타입등 재설정
  // FIXME 유저닉네임 수정 다시 봐야
  const user_uid = "2c81257f-e4d9-41d8-ad65-3745da3d3b2f";
  // 임시 유저 아이디 설정
  const router = useRouter();
  const session = useSession();

  const isLoggedIn = !!session.data;
  // const user_uid = session.data?.user.user_uid as string;
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
    return user_uid; // uid를 리턴해줘야만 됨. why? 쓰지않는데도
  };

  // const user_uid = fetchSession();

  // TODO: 리스트 순서? - created at 기준
  // TODO: 이미지 여러장일 경우? - 첫 한 장만
  // TODO: myActions 없는 경우 처리

  const { data: myActions, isLoading: isActionsLoading } =
    useFetchMyGreenActions(user_uid);

  const { data: myPosts, isLoading: isPostsLoading } =
    usefetchMyCommunityPosts(user_uid);

  const { data: myBookmarks, isLoading: isBookmarksLoading } =
    usefetchBookmarkedActions(user_uid);

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
    myPosts,
    myBookmarks,
    activeTab,
    myRecruitClicked,
    bookmarkedRecruitClicked,
  ]);

  useEffect(() => {
    checkUserLogin(); // 안됨 -> 이걸해줘야 처음 렌더링시 유저확인되고 데이터가 뜬다
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

  if (isActionsLoading || isPostsLoading || isBookmarksLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="success" label="Loading..." />
      </div>
    );
  }

  return (
    <div className="flex justify-center pt-12 mb-[100px]">
      {/* <CustomConfirm
        text="안녕"
        buttonName="버튼"
        okFunction={() => setFilteredActions}
      /> */}
      <div className="flex w-[1400px]">
        <MyProfile user_uid={user_uid} />
        <div className="flex flex-col gap-10 pl-10 pt-1 w-full">
          <div className="flex justify-between">
            <div className="flex gap-12 ml-5">
              <Button
                radius="full"
                size="md"
                onClick={handleActiveTabClick}
                className={
                  activeTab === "My Green-Action" ? "bg-green-700/30" : ""
                }
              >
                My Green-Action
              </Button>
              <Button
                radius="full"
                size="md"
                onClick={handleActiveTabClick}
                className={activeTab === "작성 게시물" ? "bg-green-700/30" : ""}
              >
                작성 게시물
              </Button>
              <Button
                radius="full"
                size="md"
                onClick={handleActiveTabClick}
                className={
                  activeTab === "찜한 Green-Action" ? "bg-green-700/30" : ""
                }
              >
                찜한 Green-Action
              </Button>
            </div>
            <div className="mr-5">
              {activeTab === "My Green-Action" && (
                <RecruitSelectTab setSelected={setMyRecruitClicked} />
              )}
              {activeTab === "찜한 Green-Action" && (
                <RecruitSelectTab setSelected={setBookmarkedRecruitClicked} />
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-7">
            {/* LINK My Green Action */}
            {activeTab === "My Green-Action" &&
              filteredActions?.map((action) => {
                return (
                  <MyActionCard key={action.id} action={action} mode="mypost" />
                );
              })}
            {/* LINK 내가 쓴 커뮤니티 글 */}
            {activeTab === "작성 게시물" &&
              myPosts?.map((post) => {
                return <CommunityListPost mode="mypost" communityPost={post} />;
              })}
            {/* LINK 찜한 Green Action */}
            {activeTab === "찜한 Green-Action" &&
              filteredBookmarkedActions?.map((bookmark) => {
                return (
                  <MyActionCard
                    key={bookmark?.bookmarkedAction?.id || ""}
                    action={bookmark}
                    mode="bookmark"
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
