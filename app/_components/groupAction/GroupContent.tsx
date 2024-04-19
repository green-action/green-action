"use client";
import { useResponsive } from "@/app/_hooks/responsive";
import { useGroupAction } from "@/app/_hooks/useQueries/groupAction";
import { Card, Image } from "@nextui-org/react";
import React from "react";
import TopButton from "../TopButton";
import GroupModal from "./GroupModal";
import GroupSkeleton from "./GroupSkeleton";

const GroupContent = () => {
  const { data: groupAction, isLoading, isError } = useGroupAction();
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  if (isLoading || !groupAction) {
    return (
      <div
        className={`grid gap-[50px] m-auto mt-14 mx-auto ${
          isDesktop
            ? "grid-cols-4 w-[1500px] "
            : isLaptop
            ? "grid-cols-3 w-[910px]"
            : "w-[1500px]"
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
      className={`grid gap-[50px] m-auto mt-14 mx-auto ${
        isDesktop
          ? "grid-cols-4 w-[1500px]"
          : isLaptop
          ? "grid-cols-3 w-[910px]"
          : ""
      }`}
    >
      <TopButton />
      {groupGreenActions.map((action) => {
        return (
          <div
            className={`flex flex-col ${
              isDesktop ? "mb-[100px]" : isLaptop ? "mb-[180px]" : "mb-[100px]"
            }`}
            key={action.id}
          >
            <Card
              className={`m-auto brightness-90 ${
                isDesktop
                  ? "w-[365px] h-[550px]"
                  : isLaptop
                  ? "w-[289px] h-[433px]"
                  : ""
              } `}
            >
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                className="w-full object-cover desktop:h-[550px] laptop:h-[433px]"
                src={action.img_url as string}
                alt="campaign Img"
              />
            </Card>
            <section className="flex flex-row justify-between items-center pl-[4%]">
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

export default React.memo(GroupContent);
