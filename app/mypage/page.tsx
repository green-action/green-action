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

  // 처음에 데이터 렌더링 안되는 문제 -> 해결 : activeTab은 의존성배열 필요 x
  // 의존성 배열 myActions (리쿼로 초기에 가져오는 데이터) 넣는게 중요!
  useEffect(() => {
    filterRecruit();
    setFilteredActions(sortedMyActions); // useEffect 안 setState 경고 - 이걸 없애줘야 데이터 모집상태별 잘 렌더링됨 / 그랬다가 또 넣어줘야 데이터 초기 잘 뜸
  }, [myActions, activeTab, myRecruitClicked]); // myActions 를 꼭 넣어야? sorted말고 리쿼데이터 ?  -> 그래도 안될때가
  // 둘다 넣어야? = 됐다가 안될 떄가

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

  // action - 모집상태에 따라 분류하기 (Select)
  //  같이 한꺼번에 해서인지 두번눌러줘야 제대로 뜨는 버그 -> 따로한다고 되지않음
  // 눌렀을떄 바로 set clicked해서 인가..
  // 콘솔찍었을때. 이전게 뜨기도 함. 다시누르면 되지만.  prev=> 처리무의미
  const handleCategorizeByRecruiting = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    activeTab: string,
  ) => {
    // // setClicked(e.currentTarget.textContent as string);
    const clickedTarget = e.target as HTMLLIElement;
    const clickedText = clickedTarget.textContent as string;
    // // console.log("🐰 ~ MyPage ~ clickedText : ", clickedText);
    // // setClicked(clickedText);
    // // activeTab === "My Green-Action"
    // setMyRecruitClicked((prev) => clickedText);
    // // : setBookmarkedRecruitClicked((prev) => clickedText);
    // console.log(myRecruitClicked);

    // activeTab === "My Green-Action"
    //   ? setFilteredActions(
    //       sortedMyActions?.filter((action) => action.is_recruiting),
    //     )
    //   : setFilteredBookmarkedActions(
    //       sortedMyBookmarks?.filter(
    //         (action) => action.bookmarkedAction?.is_recruiting,
    //       ),
    //     );
    activeTab === "My Green-Action"
      ? setMyRecruitClicked(clickedText)
      : setBookmarkedRecruitClicked(clickedText);
    filterRecruit();
    // console.log(myRecruitClicked);
  };

  // console.log(activeTab);

  const filterRecruit = () => {
    // if (clicked === "전체") {
    if (activeTab === "My Green-Action") {
      if (myRecruitClicked === "전체") {
        setFilteredActions(sortedMyActions);
      }
      if (myRecruitClicked === "모집 중") {
        setFilteredActions(
          sortedMyActions?.filter((action) => action.is_recruiting),
        );
      }
    }
  };

  //       ? setFilteredActions(sortedMyActions)
  //       : setFilteredBookmarkedActions(sortedMyBookmarks);
  //   }
  //   if (clicked === "모집 중") {
  //     activeTab === "My Green-Action"
  //       ? setFilteredActions(
  //           sortedMyActions?.filter((action) => action.is_recruiting),
  //         )
  //       : setFilteredBookmarkedActions(
  //           sortedMyBookmarks?.filter(
  //             (action) => action.bookmarkedAction?.is_recruiting,
  //           ),
  //         );
  //   } else if (clicked === "모집 마감") {
  //     activeTab === "My Green-Action"
  //       ? setFilteredActions(
  //           sortedMyActions?.filter((action) => !action.is_recruiting),
  //         )
  //       : setFilteredBookmarkedActions(
  //           sortedMyBookmarks?.filter(
  //             (action) => !action.bookmarkedAction?.is_recruiting,
  //           ),
  //         );
  //   }
  // };

  // if (clicked == "전체") {
  //   setFilteredActions(sortedMyActions);
  // }
  // if (clicked == "모집중") {
  //   setFilteredActions(
  //     sortedMyActions?.filter((action) => action.is_recruiting),
  //   );
  //   // 모집마감을 눌렀는데 이게 실행안됨
  //   // clicked 는 분명 다 맞게 들어옴 그런데   전체를 눌렀는데 모집마감 콘솔이 뜸
  // } else if (clicked == "모집마감") {
  //   setFilteredActions(
  //     sortedMyActions?.filter((action) => !action.is_recruiting),
  //   );
  //   console.log(filteredActions); // 잘찍힘
  // }
  //  같이 한꺼번에 해서인지 두번눌러줘야 제대로 뜸
  // if (clicked === "전체") {
  //   activeTab === "My Green-Action"
  //     ? setFilteredActions(sortedMyActions)
  //     : setFilteredBookmarkedActions(sortedMyBookmarks);
  // }
  // if (clicked === "모집 중") {
  //   activeTab === "My Green-Action"
  //     ? setFilteredActions(
  //         sortedMyActions?.filter((action) => action.is_recruiting),
  //       )
  //     : setFilteredBookmarkedActions(
  //         sortedMyBookmarks?.filter(
  //           (action) => action.bookmarkedAction?.is_recruiting,
  //         ),
  //       );
  // } else if (clicked === "모집 마감") {
  //   activeTab === "My Green-Action"
  //     ? setFilteredActions(
  //         sortedMyActions?.filter((action) => !action.is_recruiting),
  //       )
  //     : setFilteredBookmarkedActions(
  //         sortedMyBookmarks?.filter(
  //           (action) => !action.bookmarkedAction?.is_recruiting,
  //         ),
  //       );
  // }

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
              {(activeTab === "My Green-Action" ||
                activeTab === "찜한 Green-Action") && (
                <Select
                  aria-label="Select a state of recruiting"
                  defaultSelectedKeys={["전체"]}
                  size="md"
                  radius="full"
                  className="w-[8rem] "
                  variant="bordered"
                  disallowEmptySelection
                  selectionMode="single"
                >
                  <SelectItem
                    key="전체"
                    value="전체"
                    className="rounded-xl"
                    onClick={(e) => handleCategorizeByRecruiting(e, activeTab)}
                  >
                    전체
                  </SelectItem>
                  <SelectItem
                    key="모집 중"
                    value="모집 중"
                    className="rounded-xl"
                    onClick={(e) => handleCategorizeByRecruiting(e, activeTab)}
                    // onClick={handleCategorizeByRecruiting}
                  >
                    모집 중
                  </SelectItem>
                  <SelectItem
                    key="모집 마감"
                    value="모집 마감"
                    className="rounded-xl"
                    onClick={(e) => handleCategorizeByRecruiting(e, activeTab)}
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
                return (
                  <MyActionCard key={action.id} action={action} mode="mypost" />
                );
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
