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

// 로그인 안 한 상태에서 접근 차단할 것
const MyPage = () => {
  // TODO props 타입등 재설정
  // FIXME 유저닉네임 수정 다시 봐야
  // FIXME 찜한 action 다시 안뜨는 문제
  // const user_uid = "2c81257f-e4d9-41d8-ad65-3745da3d3b2f";
  // 임시 유저 아이디 설정
  const router = useRouter();
  const session = useSession();
  const isLoggedIn = !!session.data;
  const user_uid = session?.data?.user.user_uid || "";
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
    if (!isLoggedIn) {
      alert("로그인 해주세요!");
      router.replace("/");
    }
    return user_uid;
  };

  // 안됨
  useEffect(() => {
    checkUserLogin();
  }, [isLoggedIn]);

  // const user_uid = fetchSession();

  const [activeTab, setActiveTab] = useState("My Green-Action");

  // TODO: 리스트 순서? - created at 기준
  // TODO: 이미지 여러장일 경우? - 첫 한 장만
  // TODO: myActions 없는 경우 처리

  const { data: myActions, isLoading: isActionsLoading } =
    useFetchMyGreenActions(user_uid);

  const [filteredActions, setFilteredActions] = useState(myActions);

  const { data: myPosts, isLoading: isPostsLoading } =
    usefetchMyCommunityPosts(user_uid);

  const { data: myBookmarks, isLoading: isBookmarksLoading } =
    usefetchBookmarkedActions(user_uid);

  // 처음에 데이터 렌더링 안되는 문제 -> 해결 : activeTab은 의존성배열 필요 x
  // 의존성 배열 myActions (리쿼로 초기에 가져오는 데이터) 넣는게 중요!
  useEffect(() => {
    setFilteredActions(myActions);
  }, [myActions]);

  const handleActiveTabClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const target = e.target as HTMLLIElement;
    const textContent = target.textContent;
    if (textContent) {
      setActiveTab(textContent);
    }
  };

  const handleAllRecruitingCategory = () => {
    setFilteredActions(myActions);
  };

  const handleRecruitingCategory = () => {
    setFilteredActions(myActions?.filter((action) => action.is_recruiting));
  };

  const handleNotRecruitingCategory = () => {
    setFilteredActions(myActions?.filter((action) => !action.is_recruiting));
  };

  if (isActionsLoading || isPostsLoading || isBookmarksLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="success" label="Loading..." />
      </div>
    );
  }

  return (
    <div className="flex justify-center pt-12">
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
                // || clicked === "bookmarkedActions")  - 찜한 action 분류는 보류
                <Select
                  aria-label="Select a state of recruiting"
                  defaultSelectedKeys={["전체"]}
                  size="md"
                  radius="full"
                  className="w-[8rem] "
                  variant="bordered"
                >
                  <SelectItem
                    key="전체"
                    value="전체"
                    className="rounded-xl"
                    onClick={handleAllRecruitingCategory}
                  >
                    전체
                  </SelectItem>
                  <SelectItem
                    key="모집중"
                    value="모집중"
                    className="rounded-xl"
                    onClick={handleRecruitingCategory}
                  >
                    모집 중
                  </SelectItem>
                  <SelectItem
                    key="모집마감"
                    value="모집마감"
                    className="rounded-xl"
                    onClick={handleNotRecruitingCategory}
                  >
                    모집 마감
                  </SelectItem>
                </Select>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-7">
            {/* LINK My Green Action */}
            {activeTab === "My Green-Action" &&
              filteredActions?.map((action) => {
                return <MyActionCard action={action} mode="mypost" />;
              })}
            {/* LINK 내가 쓴 커뮤니티 글 */}
            {activeTab === "작성 게시물" &&
              myPosts?.map((post) => {
                return (
                  <Card key={post.id} className="w-[20rem]">
                    <CardHeader>
                      <img
                        src={post.img_url || ""}
                        alt="post-img"
                        width={250}
                        height={250}
                      />
                    </CardHeader>
                    <CardBody>
                      <p>{post.title}</p>
                      <p>{post.content}</p>
                      <p>{post.action_type}</p>
                      <p>좋아요 : {post.communityLikes.length}</p>
                    </CardBody>
                  </Card>
                );
              })}
            {/* LINK 찜한 Green Action */}
            {activeTab === "찜한 Green-Action" &&
              myBookmarks?.map((bookmark) => {
                return <MyActionCard action={bookmark} mode="bookmark" />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
