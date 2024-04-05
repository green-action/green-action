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
import React, { useState } from "react";
import { useAuthStore } from "../_store/authStore";
import MyProfile from "../_components/mypage/MyProfile";
import { useQueryUserMetadata } from "../_hooks/useQueries/user";
import {
  useFetchMyGreenActions,
  usefetchBookmarkedActions,
  usefetchMyCommunityPosts,
} from "../_hooks/useQueries/mypage";
import CustomConfirm from "../_components/customConfirm/CustomConfirm";
import MyActionCard from "../_components/mypage/MyActionCard";

// 로그인 안 한 상태에서 접근 차단할 것
const MyPage = () => {
  const user_uid = "ed71fea7-2892-4769-b7d0-1f8ba330c213";
  // 임시 유저 아이디 설정

  // FIXME 새로고침 시 로그인상태에서도 userUid가 사라지는 문제
  // const { user } = useAuthStore();
  // const user_uid = user?.id || "";
  // console.log(user_uid);

  // NOTE zustand 말고 로그인상태관리, uid - localstroage 사용해보기,
  const { userMetadata, isLoading } = useQueryUserMetadata();
  // const user_uid = userMetadata?.id;

  const [clicked, setClicked] = useState<string>("myGreenAction");

  // TODO: 리스트 순서? - created at 기준
  // TODO: 이미지 여러장일 경우? - 첫 한 장만
  // TODO: myActions 없는 경우 처리

  const { data: myActions, isLoading: isActionsLoading } =
    useFetchMyGreenActions(user_uid);

  // 처음에 myActons 전체 안뜨는 문제
  const [filteredActions, setFilteredActions] = useState(myActions);

  const { data: myPosts, isLoading: isPostsLoading } =
    usefetchMyCommunityPosts(user_uid);

  const { data: myBookmarks, isLoading: isBookmarksLoading } =
    usefetchBookmarkedActions(user_uid);

  const handleMyGreenActionClick = () => {
    setClicked("myGreenAction");
  };

  const handleMyCommunityPostsClick = () => {
    setClicked("myCommunityPosts");
  };

  const handleBookmarkedActionClick = () => {
    setClicked("bookmarkedActions");
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

  if (isLoading || isActionsLoading || isPostsLoading || isBookmarksLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="success" label="Loading..." />
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10">
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
                onClick={handleMyGreenActionClick}
                className={clicked === "myGreenAction" ? "bg-green-700/30" : ""}
              >
                My Green-Action
              </Button>
              <Button
                radius="full"
                size="md"
                onClick={handleMyCommunityPostsClick}
                className={
                  clicked === "myCommunityPosts" ? "bg-green-700/30" : ""
                }
              >
                작성 게시물
              </Button>
              <Button
                radius="full"
                size="md"
                onClick={handleBookmarkedActionClick}
                className={
                  clicked === "bookmarkedActions" ? "bg-green-700/30" : ""
                }
              >
                찜한 Green-Action
              </Button>
            </div>
            <div className="mr-5">
              {clicked === "myGreenAction" && (
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
            {clicked === "myGreenAction" &&
              filteredActions?.map((action) => {
                return <MyActionCard action={action} />;
              })}
            {/* LINK 내가 쓴 커뮤니티 글 */}
            {clicked === "myCommunityPosts" &&
              myPosts?.map((post) => {
                return (
                  <Card key={post.id} className="w-[20rem]">
                    <CardHeader>
                      <img
                        src={post.img_url || ""}
                        alt="post-img"
                        width={250}
                        height={250}
                      ></img>
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
            {clicked === "bookmarkedActions" &&
              myBookmarks?.map((bookmark) => {
                return (
                  <Card
                    key={bookmark.bookmarkedAction?.id}
                    className="w-[20rem]"
                  >
                    <CardHeader>
                      <img
                        src={
                          bookmark.bookmarkedAction?.actionImgUrls[0]
                            ?.img_url || ""
                        }
                        alt="action-img"
                        width={250}
                        height={250}
                      ></img>
                    </CardHeader>
                    <CardBody>
                      <p>{bookmark.bookmarkedAction?.title}</p>
                      <p>{bookmark.bookmarkedAction?.location}</p>
                      <p>
                        모집인원 : {bookmark.bookmarkedAction?.recruit_number}
                      </p>
                      <p>
                        북마크 :
                        {bookmark.bookmarkedAction?.actionBookmarks.length}
                      </p>
                      <Chip>
                        {bookmark.bookmarkedAction?.is_recruiting
                          ? "모집중"
                          : "모집마감"}
                      </Chip>
                    </CardBody>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
