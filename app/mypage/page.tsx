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
import { HiOutlinePlus } from "react-icons/hi2";
import { TfiPencil } from "react-icons/tfi";
import { GoPerson } from "react-icons/go";
import { BsPerson } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { IoIosCalendar } from "react-icons/io";
import { GrLocation } from "react-icons/gr";
import pointQuestion from "@/app/_assets/question_circle.png";
import React, { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { formatToLocaleDateString } from "@/utils/date/date";
import { useAuthStore } from "../_store/authStore";
import MyProfile from "../_components/mypage/MyProfile";

const MyPage = () => {
  // const userUid = "6f971b1e-abaf-49d5-90e7-f8c6bfe4bd58"; // 임시 유저 아이디 설정
  // 6f971b1e-abaf-49d5-90e7-f8c6bfe4bd58  55e7ec4c-473f-4754-af5e-9eae5c587b81

  const { user } = useAuthStore();
  const userUid = user?.sub || "";

  // 클릭된 상태 버튼 색깔 다르게하기
  const [clicked, setClicked] = useState<string>("myGreenAction");

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
        .eq("user_uid", userUid);
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
        .eq("user_uid", userUid);
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
        .eq("user_uid", userUid);
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
      <div className="flex w-[1400px]">
        <MyProfile />
        <div className="flex flex-col gap-10 pl-10 pt-1 w-full">
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
            {/* LINK My Green Action */}
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
                    className="w-[21rem] h-[23rem] flex flex-wrap gap-3 cursor-pointer "
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
                      <div className="flex gap-1">
                        {/* <BsPerson size="20" /> 아이콘 보류 */}
                        <GoPerson size="20" />
                        <p>{action.recruit_number}</p>
                        <FaRegStar size="20" />
                        <p>{action.actionBookmarks.length}</p>
                      </div>
                      <div className="flex gap-1">
                        <IoIosCalendar size="18" />
                        <p>
                          {formattedStartDate} - {formattedEndDate}
                        </p>
                      </div>
                      <hr className="text-gray-700 w-[14rem]" />
                      <div className="flex gap-1">
                        <GrLocation size="18" />
                        <p>{action.location}</p>
                      </div>
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
