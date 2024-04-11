"use client";

import { useFetchIndivActionsBookmarks } from "@/app/_hooks/useQueries/main";
import { Card, Chip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { MdDateRange } from "react-icons/md";
import Bookmark from "../bookmark/Bookmark";

import arrow from "../../_assets/image/individualAction/Group89.png";
import person from "../../_assets/image/individualAction/image166.png";
import location from "../../_assets/image/individualAction/image35.png";
import date from "../../_assets/image/individualAction/image170.png";

import type { Index } from "@/app/_types";
import Image from "next/image";

interface ChildProps {
  filteredActions: Index;
}

const PageList: React.FC<ChildProps> = ({ filteredActions }) => {
  const router = useRouter();

  // const { data: indivActionsBookmarks, isLoading: isActionsLoading } =
  //   useFetchIndivActionsBookmarks();

  const handleClick = (id: any) =>
    router.push(`/individualAction/detail/${id}`);
  // 데이터불러올때 (로딩중일때) 스켈레톤 UI 적용해보기

  return (
    <div className="mt-10 gap-10 grid grid-cols-1 p-2 desktop:grid-cols-4 laptop:grid-cols-3">
      {filteredActions?.map((post) => (
        <>
          <article key={post.id} className="w-[356px] mb-unit-3xl">
            <Card
              isFooterBlurred
              radius="lg"
              className="border-none w-[356px] h-[311px] mb-3 brightness-90 items-center shadow-none"
            >
              {post.actionImgUrls[0] ? (
                <img
                  alt="Post Image"
                  className=" w-full h-full object-cover cursor-pointer"
                  src={post.actionImgUrls[0].img_url}
                  onClick={() => handleClick(post.id)}
                />
              ) : (
                <div
                  className="bg-gray-300 w-full h-full rounded cursor-pointer"
                  onClick={() => handleClick(post.id)}
                />
              )}
            </Card>
            {/* bg-gray-200 rounded-lg */}
            <div className=" w-[356px] relative p-2 rounded-2xl bg-[#F9F9F9]">
              <div className="flex gap-4 mt-4 max-w-[70%] ml-6">
                <h4 className="font-bold text-[15px] text-black mt-[-4px]">
                  {(post.title?.length as any) > 12
                    ? `${post.title?.substring(0, 12)}...`
                    : post.title}
                  {/* {post.title} */}
                </h4>
                <Chip
                  radius="sm"
                  className={`${
                    post.is_recruiting ? "bg-[#B3C8A1]" : "bg-[#5F5F5F]"
                  } text-white w-[41px] h-[15px] text-[10px]`}
                >
                  {post.is_recruiting ? "모집중" : "마감됨"}
                </Chip>
              </div>
              <div className="flex items-center gap-3 mt-4 border-b border-gray-300  max-w-[60%] ml-6 ">
                <Image
                  src={date}
                  alt="날짜"
                  className="w-[13px] h-[13px] mb-1.5"
                />
                <small className="text-default-[#1E1E1E] mb-1.5">
                  {post.start_date} - {post.end_date}
                </small>
              </div>
              <div className="flex items-center gap-2  mt-2 ml-6">
                <Image
                  src={location}
                  alt="장소"
                  className="w-[16px] h-[16px]"
                />
                <small className="text-default-[#1E1E1E] ">
                  {post.location}
                </small>
              </div>
              <div className="flex justify-end absolute top-5 right-4 gap-3">
                <div className="flex items-center">
                  <Image
                    src={person}
                    alt="모집인원"
                    className="w-[22px] h-[22px]"
                  />
                  <span className="ml-1 text-sm"> {post.recruit_number} </span>
                </div>
                <Bookmark action_id={post.id} mode="individualAction" />
              </div>
              <Image
                src={arrow}
                alt="화살표?"
                className="w-[24px] h-[12px] ml-auto mr-2 mb-4 cursor-pointer"
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
