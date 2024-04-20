"use client";

import { useResponsive } from "@/app/_hooks/responsive";
import { useGroupAction } from "@/app/_hooks/useQueries/groupAction";
import { Card, Image } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import TopButton from "../TopButton";
import GroupModal from "./GroupModal";
import GroupSkeleton from "./GroupSkeleton";

const GroupContent = () => {
  const { data: groupAction, isLoading, isError } = useGroupAction();
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const [activeTabs, setActiveTabs] = useState("단체와 함께해요");

  if (isLoading || !groupAction) {
    return (
      <div
        className={`grid gap-[50px] m-auto mt-14 mx-auto ${
          isDesktop
            ? "grid-cols-4 w-[1500px]"
            : isLaptop
            ? "grid-cols-3 w-[910px]"
            : isMobile
            ? "grid-cols-a w-[282px]"
            : ""
        }`}
      >
        {[...Array(8)].map((_, index) => (
          <GroupSkeleton key={index} />
        ))}
      </div>
    );
  }
  const { groupGreenActions } = groupAction;
  if (isError) {
    return (
      <div className="w-[300px] h-auto mx-auto">
        Error fetching ActionGroup...
      </div>
    );
  }

  return (
    <div
      className={`grid gap-[50px] m-auto  desktop:mt-14 laptop:mt-14 mx-auto ${
        isDesktop
          ? "grid-cols-4 w-[1500px]"
          : isLaptop
          ? "grid-cols-3 w-[910px]"
          : isMobile
          ? "grid w-[282px]"
          : ""
      }`}
    >
      <TopButton />
      {isMobile && (
        <div className="flex items-center justify-center w-[100%] mx-auto gap-16 border-b-2 border-[#EDEDED] text-[#989898]">
          <Link
            href="/individualAction"
            className="cursor-pointer text-[13px] font-bold mt-3"
          >
            개인과 함께해요
          </Link>
          <Link
            href="/groupAction"
            className={`cursor-pointer text-[13px] font-bold p-3 ${
              activeTabs === "단체와 함께해요"
                ? "text-black border-b-2 border-black mt-3"
                : ""
            }`}
          >
            단체와 함께해요
          </Link>
        </div>
      )}
      {groupGreenActions.map((action) => {
        return (
          <div
            className={`flex flex-col ${
              isDesktop ? "mb-[100px]" : isLaptop ? "mb-[180px]" : "mb-[80px]"
            }`}
            key={action.id}
          >
            <Card
              className={`m-auto brightness-90 ${
                isDesktop
                  ? "w-[365px] h-[550px]"
                  : isLaptop
                  ? "w-[289px] h-[433px]"
                  : isMobile
                  ? "w-[278px] h-[415px]"
                  : ""
              } `}
            >
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                className="w-full object-cover desktop:h-[550px] laptop:h-[433px] phone:h-[415px]"
                src={action.img_url as string}
                alt="campaign Img"
              />
            </Card>
            <section
              className={`flex flex-row justify-between items-center pl-[5%] ${
                isMobile ? "pl-[12%]" : ""
              } `}
            >
              <h2 className="font-bold mt-[30px] text-[14px]  whitespace-nowrap w-[48%]">
                {action.title}
              </h2>
              <GroupModal action={action} />
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default GroupContent;
