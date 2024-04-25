"use client";

import { Card, Chip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Bookmark from "../bookmark/Bookmark";

import arrow from "../../_assets/image/individualAction/Group89.png";
import date from "../../_assets/image/individualAction/image170.png";
import person from "../../_assets/image/individualAction/person.png";
import location from "../../_assets/image/individualAction/image35.png";

import { MODE_INDIVIDUAL_ACTION } from "@/app/_api/constant";
import { useResponsive } from "@/app/_hooks/responsive";
import type { Index } from "@/app/_types";
import Image from "next/image";
import IndividualSkeleton from "./IndividualSkeleton";
import { GoArrowRight } from "react-icons/go";

interface ChildProps {
  filteredActions: Index;
  isActionsLoading: boolean;
}

const PageList: React.FC<ChildProps> = ({
  filteredActions,
  isActionsLoading,
}) => {
  const router = useRouter();
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  const handleClick = (id: any) =>
    router.push(`/individualAction/detail/${id}`);

  if (isActionsLoading) {
    return (
      <div className="mt-10 gap-5 grid p-2 desktop:grid-cols-4 laptop:grid-cols-3 desktop:w-[1510px] laptop:w-[920px] phone:w-[292px] mx-auto phone:grid-cols-2">
        {[...Array(12)].map((_, index) => (
          <IndividualSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-20 gap-5 grid p-2 desktop:grid-cols-4 laptop:grid-cols-3  phone:grid-cols-2 desktop:w-[1510px] laptop:w-[920px]  phone:w-[292px] mx-auto ">
      {filteredActions?.map((post) => (
        <>
          <article
            key={post.id}
            className="desktop:w-[356px] mb-unit-3xl laptop:w-[291px]"
          >
            <Card
              isFooterBlurred
              radius="lg"
              className="border-none desktop:w-[356px] desktop:h-[311px] brightness-90 items-center shadow-none laptop:w-[291px] laptop:h-[255px] phone:w-[140px] phone:h-[98px]"
            >
              {post.actionImgUrls[0] ? (
                <img
                  alt="PostImage"
                  className=" w-full h-full object-cover cursor-pointer"
                  src={post.actionImgUrls[0].img_url}
                  onClick={() => handleClick(post.id)}
                />
              ) : (
                <div
                  className="bg-gray-300 desktop:w-[356px] desktop:h-[311px] rounded cursor-pointer phone:w-[140px]"
                  onClick={() => handleClick(post.id)}
                />
              )}
            </Card>

            <div className="desktop:w-[356px] laptop:w-[291px] phone:w-[140px] desktop:mt-3 laptop:mt-3 relative p-2 rounded-2xl desktop:bg-[#F9F9F9] laptop:bg-[#F9F9F9] phone:bg-none">
              {isDesktop && (
                <Chip
                  radius="sm"
                  className={`${
                    post.is_recruiting ? "bg-[#B3C8A1]" : "bg-[#5F5F5F]"
                  } text-white w-[41px] h-[15px] laptop:w-[36px] text-[10px] ml-2 mt-4`}
                >
                  {post.is_recruiting ? "모집중" : "모집마감"}
                </Chip>
              )}
              {isLaptop && (
                <Chip
                  radius="sm"
                  className={`${
                    post.is_recruiting ? "bg-[#B3C8A1]" : "bg-[#5F5F5F]"
                  } text-white w-[41px] h-[15px] laptop:w-[36px] text-[10px] ml-2 mt-4`}
                >
                  {post.is_recruiting ? "모집중" : "모집마감"}
                </Chip>
              )}

              {isMobile && (
                <Chip
                  radius="sm"
                  className={`${
                    post.is_recruiting ? "bg-[#8FB089]" : "bg-[#5F5F5F]"
                  } text-white w-[37px] h-[15px] text-[9px] ml-2 mt-4 relative bottom-[47px]`}
                >
                  {post.is_recruiting ? "모집중" : "모집마감"}
                </Chip>
              )}
              {isDesktop && (
                <div className="flex gap-4 mt-4 dekstop:w-full laptop:w-[70%] ml-7 laptop:ml-3">
                  <h4 className="font-bold  desktop:text-[15px] laptop:text-[15px] text-black mt-[-4px] phone:text-[11px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {/* {(post.title?.length as any) > 17
                      ? `${post.title?.substring(0, 17)}...`
                      : post.title} */}
                    {post.title}
                  </h4>
                </div>
              )}
              {isLaptop && (
                <div className="flex gap-4 mt-4  desktop:max-w-[70%] laptop:w-[70%] ml-7 laptop:ml-3">
                  <h4 className="font-bold  desktop:text-[15px] laptop:text-[15px] text-black mt-[-4px] phone:text-[11px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {/* {(post.title?.length as any) > 17
                      ? `${post.title?.substring(0, 17)}...`
                      : post.title} */}
                    {post.title}
                  </h4>
                </div>
              )}
              {isMobile && (
                <div className="flex ml-1">
                  <h4 className="font-bold text-black mt-[-20px] text-[11px]">
                    {(post.title?.length as any) > 17
                      ? `${post.title?.substring(0, 17)}...`
                      : post.title}
                  </h4>
                </div>
              )}

              {isDesktop && (
                <div className="flex items-center gap-3 mt-4 border-b border-gray-300 max-w-[60%] ml-6 laptop:ml-3 laptop:max-w-[67%] ">
                  <Image
                    src={date}
                    alt="날짜"
                    className="w-[13px] h-[13px] mb-2"
                  />
                  <small className="text-default-[#1E1E1E] mb-2 laptop:text-[13px]">
                    {post.start_date} - {post.end_date}
                  </small>
                </div>
              )}
              {isLaptop && (
                <div className="flex items-center gap-3 mt-4 border-b border-gray-300 max-w-[60%] ml-6 laptop:ml-3 laptop:max-w-[67%] ">
                  <Image
                    src={date}
                    alt="날짜"
                    className="w-[13px] h-[13px] mb-2"
                  />
                  <small className="text-default-[#1E1E1E] mb-2 laptop:text-[13px]">
                    {post.start_date} - {post.end_date}
                  </small>
                </div>
              )}
              {isMobile && (
                <div className="flex items-center gap-2 mt-1 ml-1 ">
                  <Image
                    src={date}
                    alt="날짜"
                    className="w-[9px] h-[10px] mb-2"
                  />
                  <small className="text-default-[#1E1E1E] mb-2 text-[10px]">
                    {post.start_date?.substring(5)} /{" "}
                    {post.end_date?.substring(5)}
                  </small>
                </div>
              )}

              {(isDesktop || isLaptop) && (
                <div className="flex items-center gap-2  mt-2 ml-6 laptop:ml-3">
                  <Image
                    src={location}
                    alt="장소"
                    className="w-[16px] h-[16px]"
                  />
                  <small className="text-default-[#1E1E1E] ">
                    {post.location}
                  </small>
                </div>
              )}

              <div className="flex justify-end absolute  desktop:top-5  desktop:right-5 laptop:top-5 gap-3 laptop:right-5 laptop:gap-2">
                <div className="flex items-center">
                  <Image
                    src={person}
                    alt="모집인원"
                    className="desktop:w-[19px] laptop:w-[17px] phone:w-[18px]"
                  />
                  <span className="ml-1 desktop:text-sm  laptop:text-[11px] phone:text-[11px] phone:text-[#848484] desktop:text-black laptop:text-black">
                    {post.recruit_number}
                  </span>
                </div>
                <Bookmark action_id={post.id} mode={MODE_INDIVIDUAL_ACTION} />
              </div>
              {/* <Image
                src={arrow}
                alt="화살표"
                className="w-[24px] h-[12px] ml-auto mr-2  desktop:mb-4 laptop:mb-4 phone:mb-1 cursor-pointer"
                onClick={() => handleClick(post.id)}
              /> */}
              <GoArrowRight
                color="#9e9d9d"
                className="cursor-pointer ml-auto mr-2 desktop:mb-2 desktop:size-[33px] laptop:mb-1 laptop:size-[28px] phone:mb-1 phone:size-[20px]"
                onClick={() => handleClick(post.id)}
              />
            </div>
          </article>
        </>
      ))}
    </div>
  );
};

export default PageList;
