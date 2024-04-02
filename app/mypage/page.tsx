"use client";
// 되면 ssr로 두고 client 컴포는 따로 빼보기

import { supabase } from "@/utils/supabase/client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CircularProgress,
  Tooltip,
} from "@nextui-org/react";
import pointQuestion from "@/app/_assets/Group 32.png";
import React, { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  formatToLocaleDateString,
  formatToLocaleDateTimeString,
} from "@/utils/date/date";

const MyPage = () => {
  const userUId = "6f971b1e-abaf-49d5-90e7-f8c6bfe4bd58"; // 임시 유저 아이디 설정
  // 6f971b1e-abaf-49d5-90e7-f8c6bfe4bd58  55e7ec4c-473f-4754-af5e-9eae5c587b81

  // 클릭된 상태 버튼 색깔 다르게하기
  const [clicked, setClicked] = useState<string>("myGreenAction");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedIntro, setEditedIntro] = useState<string>(""); // 초기값 기존 intro

  const handleEditIntroClick = () => {
    setIsEditing(!isEditing);
  };

  const handleEditedIntroChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEditedIntro(e.target.value);
  };

  // TODO: 리스트 순서? - created at 기준
  // TODO: 이미지 여러장일 경우? - 첫 한 장만
  // TODO: myActions 없는 경우 처리
  // TODO: 리액트 아이콘 사용?
  // 상태변경할거라 리액트쿼리 사용?
  const fetchMyGreenActions = async () => {
    try {
      // 나중에 따로 분리하기?
      const { data, error } = await supabase
        .from("individual_green_actions")
        .select(
          // TODO 모두 가져올필요있는지 체크하기 *
          "*, actionImgUrls: green_action_images(img_url), actionBookmarks: bookmarks(id)",
        )
        .eq("user_uid", userUId);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMyCommunityPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("community_posts")
        .select("*, communityLikes:likes(id)")
        .eq("user_uid", userUId);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBookmarkedActions = async () => {
    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .select(
          "bookmarkedAction:individual_green_actions(*, actionImgUrls:green_action_images(img_url), actionBookmarks:bookmarks(id))",
          // TODO 북마크된 action의 이미지, 북마크수 가져오기 (외래키사용)
          // bookmarkedActions:individual_green_actions(*)  actionImgUrls:green_action_images(img_url), actionBookmarks:bookmarks(id)
        )
        .eq("user_uid", userUId);
      if (error) throw error;
      console.log("bk data : ", data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // TODO hook, key 등 분리하기
  const { data: myActions, isLoading: isActionsLoading } = useQuery({
    queryKey: ["my_green_actions"],
    queryFn: fetchMyGreenActions,
  });

  const { data: myPosts, isLoading: isPostsLoading } = useQuery({
    queryKey: ["my_community_posts"],
    queryFn: fetchMyCommunityPosts,
  });

  const { data: myBookmarks, isLoading: isBookmarksLoading } = useQuery({
    queryKey: ["my_bookmarked_actions"],
    queryFn: fetchBookmarkedActions,
  });

  const handleMyGreenActionClick = () => {
    setClicked("myGreenAction");
  };

  const handleMyCommunityPostsClick = () => {
    setClicked("myCommunityPosts");
  };

  const handleBookmarkedActionClick = () => {
    setClicked("bookmarkedActions");
  };

  if (isActionsLoading || isPostsLoading || isBookmarksLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="success" label="Loading..." />
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="flex w-[1400px] ">
        <div className="flex flex-col gap-3 min-h-[43rem] ">
          <div className="flex gap-3 items-center p-2">
            <Avatar showFallback src="" className="w-[4rem] h-[4rem]" />
            {/* size="lg"  */}
            {/* getUser 등으로 메타데이터에서 가져와야 - 우선 임시로*/}
            <div className="flex flex-col">
              <p className="font-bold">스파르타</p>
              <p>Greener</p>
            </div>
          </div>
          <Card className="w-[18rem] min-h-[18rem] p-[0.5rem]">
            <CardHeader className="font-bold">
              <p>My Profile</p>
            </CardHeader>
            <CardBody>
              {isEditing ? (
                <textarea
                  value={editedIntro}
                  onChange={(e) => {
                    handleEditedIntroChange(e);
                  }}
                  className="resize-none rounded-xl w-full h-full p-2 text-sm bg-gray-200/50"
                >
                  자기 소개를 아직 작성하지 않았어요.
                </textarea>
              ) : (
                <p className="text-sm">자기 소개를 아직 작성하지 않았어요.</p>
              )}
            </CardBody>
            <CardFooter className="flex justify-end">
              <button onClick={handleEditIntroClick} className="text-2xl">
                +
              </button>
            </CardFooter>
          </Card>
          <Card className="">
            <CardHeader className="mb-[-1.5rem]">
              <p>Points</p>
            </CardHeader>
            <CardBody className="flex">
              <div className="font-bold w-[10rem]">1000 P</div>
            </CardBody>
            <CardFooter className="flex justify-end">
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
                      A. 'Goods'에 있는 친환경 굿즈들을 <br /> 구매하실 수
                      있어요!
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
                <Image src={pointQuestion} alt="questionMark" width={17} />
              </Tooltip>
            </CardFooter>
          </Card>
        </div>
        {/* --------------- */}
        <div className="flex flex-col gap-10 px-10 pt-1  w-full">
          {/* bg-pink-300 */}
          <div className="flex gap-12 ml-5">
            <Button radius="full" size="md" onClick={handleMyGreenActionClick}>
              My Green-Action
            </Button>
            <Button
              radius="full"
              size="md"
              onClick={handleMyCommunityPostsClick}
            >
              작성 게시물
            </Button>
            <Button
              radius="full"
              size="md"
              onClick={handleBookmarkedActionClick}
            >
              찜한 Green-Action
            </Button>
          </div>
          <div className="flex flex-wrap gap-7">
            {/* My Green Action */}
            {clicked === "myGreenAction" &&
              myActions?.map((action) => {
                const formattedStartDate = formatToLocaleDateString(
                  action.start_date || "",
                );
                const formattedEndDate = formatToLocaleDateString(
                  action.end_date || "",
                );
                return (
                  <div
                    key={action.id}
                    className="w-[20.3rem] h-[23rem] flex flex-wrap gap-3 cursor-pointer "
                    // bg-yellow-200
                  >
                    {/* TODO 누르면 해당 상세페이지로 이동 */}
                    {/* <CardHeader> */}
                    {/* 이미지 없는 경우 기본? */}
                    {action.actionImgUrls[0] ? (
                      <img
                        src={action.actionImgUrls[0]?.img_url}
                        alt="action-img"
                        width={`full`}
                        height={230}
                        className="rounded-3xl"
                      />
                    ) : (
                      <div className="bg-gray-300 w-full h-[230px] rounded-3xl"></div>
                    )}
                    {/* <img
                      src={action.actionImgUrls[0]?.img_url}
                      alt="action-img"
                      width={320}
                      height={150}
                      className="rounded-3xl"
                    /> */}
                    {/* </CardHeader> */}
                    {/* <CardBody> */}
                    <div className="p-2">
                      <div className="flex gap-3">
                        <p className="font-bold">{action.title}</p>
                        <Chip size="sm">
                          {action.is_recruiting ? "모집중" : "모집마감"}
                        </Chip>
                      </div>
                      <div className="flex gap-2">
                        <p>모집인원 : {action.recruit_number}</p>
                        <p>북마크 : {action.actionBookmarks.length}</p>
                      </div>
                      <p>
                        {formattedStartDate} - {formattedEndDate}
                      </p>
                      <hr className="text-gray-700 w-[14rem]" />
                      <p>{action.location}</p>
                    </div>
                    {/* </CardBody> */}
                  </div>
                );
              })}
            {/* 내가 쓴 커뮤니티 글 */}
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
            {/* 찜한 Green Action */}
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
                          bookmark.bookmarkedAction?.actionImgUrls[0].img_url
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
