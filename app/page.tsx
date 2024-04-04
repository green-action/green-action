"use client";
import { Button, Card, Chip } from "@nextui-org/react";
import React from "react";
import CommunityListPost from "./_components/community/CommunityListPost";
import {
  useFetchCommunityPostsLikes,
  useFetchIndivActionsBookmarks,
} from "./_hooks/useQueries/main";
import { GoPerson } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { IoIosCalendar } from "react-icons/io";
import { GrLocation } from "react-icons/gr";
import { formatToLocaleDateString } from "@/utils/date/date";

const MainPage = () => {
  const { data: communityPostsLikes, isLoading } =
    useFetchCommunityPostsLikes();

  const communityPostsByLikes = communityPostsLikes?.sort(
    (a, b) => b.communityLikes.length - a.communityLikes.length,
  );

  const { data: indivActionsBookmarks, isLoading: isActionsLoading } =
    useFetchIndivActionsBookmarks();

  const indivActionsByBookmarks = indivActionsBookmarks?.sort(
    (a, b) => b.actionBookmarks.length - a.actionBookmarks.length,
  );

  console.log("🐰 ~ data : ", indivActionsBookmarks);

  return (
    <div className="flex flex-col min-h-[600px]">
      <section className="flex w-full h-[600px] justify-center items-end">
        <p className="text-[4rem] w-[1000px] m-10">
          {/* bg-lime-300 */}
          EXPERIENCE A NEW WAY <br />
          OF GREEN LIFE
        </p>
      </section>
      {/* <p className="">
        EXPERIENCE A NEW WAY OF GREEN LIFEEXPERIENCE A NEW WAY OF GREEN
        LIFEEXPERIENCE A NEW WAY OF GREEN LIFEEXPERIENCE A NEW WAY OF GREEN
        LIFEEXPERIENCE A NEW{" "}
      </p> */}
      <section className="flex flex-col gap-[10rem] m-10 mt-[20rem] ">
        <div className="flex flex-col items-center gap-[5rem]">
          <Chip size="lg">Community Hot Posts</Chip>
          <div className="flex flex-wrap gap-8">
            {/* nextUI 카드 */}
            {communityPostsByLikes?.map((communityPost) => (
              <CommunityListPost
                key={communityPost.id}
                communityPost={communityPost}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-[5rem]">
          <Chip size="lg">Green-Action Hot Posts</Chip>
          <p>{`전체보기 > `}</p>
          <div className="flex">
            {indivActionsByBookmarks?.map((action) => {
              const formattedStartDate = formatToLocaleDateString(
                action.start_date || "",
              );
              const formattedEndDate = formatToLocaleDateString(
                action.end_date || "",
              );
              return (
                <Card className="w-[21rem] h-[25rem] flex flex-wrap gap-3 cursor-pointer p-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {/* TODO 누르면 해당 상세페이지로 이동 */}
                  {action.actionImgUrls[0] ? (
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
                      <Button size="sm" radius="full">
                        {action.is_recruiting ? "모집중" : "모집마감"}
                      </Button>
                    </div>
                    <div className="flex gap-1">
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
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
