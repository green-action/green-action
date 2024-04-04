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
  Modal,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Tooltip,
  useDisclosure,
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
import { useQueryUserMetadata } from "../_hooks/useQueries/user";
import {
  useFetchMyGreenActions,
  usefetchBookmarkedActions,
  usefetchMyCommunityPosts,
} from "../_hooks/useQueries/mypage";
import CustomConfirm from "../_components/customConfirm/CustomConfirm";

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

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

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

  const handleRecruitingChange = () => {
    onOpen();
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
      <div className="flex w-[1400px]">
        {/* SECTION - 모달 => 커스텀 alert 창 사용하기 */}
        <Modal
          isOpen={isOpen}
          // onClose={handleModalClose}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              //   NOTE 모달
              <ModalHeader>
                <p className="text-lg">Profile</p>
              </ModalHeader>
            )}
          </ModalContent>
        </Modal>
        <CustomConfirm
          text=".."
          buttonName=".."
          okFunction={handleRecruitingChange}
        />
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
                const formattedStartDate = formatToLocaleDateString(
                  action.start_date || "",
                );
                const formattedEndDate = formatToLocaleDateString(
                  action.end_date || "",
                );
                return (
                  // <div
                  //   key={action.id}
                  //   className="w-[21rem] h-[23rem] flex flex-wrap gap-3 cursor-pointer "
                  // >
                  <Card className="w-[21rem] h-[25rem] flex flex-wrap gap-3 cursor-pointer p-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {/* TODO 누르면 해당 상세페이지로 이동 */}
                    {/* <CardHeader> */}
                    {/* 이미지 없는 경우 기본? */}
                    {action.actionImgUrls[0] ? (
                      // <Card className="h-[230px]">
                      <img
                        src={action.actionImgUrls[0]?.img_url}
                        alt="Green Action Image"
                        width={350}
                        height={230}
                        className="rounded-3xl p-3"
                      />
                    ) : (
                      // </Card>
                      <div className="bg-gray-300 width-[100px] h-[230px] rounded-3xl" />
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
                        <Button
                          size="sm"
                          radius="full"
                          onClick={handleRecruitingChange}
                        >
                          {action.is_recruiting ? "모집중" : "모집마감"}
                        </Button>
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
                  </Card>
                  // </div>
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
