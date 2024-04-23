"use client";
import { useResponsive } from "@/app/_hooks/responsive";
import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

const IndividualSkeleton = () => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  return (
    <Card
      className="desktop:w-[356px]  laptop:w-[291px] phone:w-[140px] h-auto"
      radius="lg"
    >
      <Skeleton className="rounded-lg">
        <div className="desktop:w-[356px] desktop:h-[311px] laptop:w-[291px] laptop:h-[255px] phone:w-[140px] phone:h-[98px]"></div>
      </Skeleton>
      <div className="space-y-3 mt-3 p-2 phone:h-[91.75px]">
        {isDesktop ||
          (isLaptop && (
            <div className="w-full flex flex-row justify-between">
              <div className="w-1/2 flex flex-row gap-2">
                <Skeleton className="w-3/6 rounded-lg">
                  <div className="h-3 w-3/6 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-3/6 rounded-lg">
                  <div className="h-3 w-3/6 rounded-lg bg-default-200"></div>
                </Skeleton>
              </div>
              <div className="w-1/2 flex flex-row justify-end gap-2">
                <Skeleton className="w-3/12 rounded-lg">
                  <div className="h-3 w-3/12 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-3/12 rounded-lg">
                  <div className="h-3 w-3/12 rounded-lg bg-default-200"></div>
                </Skeleton>
              </div>
            </div>
          ))}
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div>
          {isMobile && (
            <>
              <div className="w-full flex flex-row justify-start gap-2">
                <Skeleton className="w-3/12 rounded-lg">
                  <div className="!h-3 w-3/12 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-3/12 rounded-lg">
                  <div className="!h-3 w-3/12 rounded-lg bg-default-200"></div>
                </Skeleton>
              </div>
              <div>
                <Skeleton className="flex rounded-full w-8 h-8 float-right bottom-4" />
              </div>
            </>
          )}
          {isDesktop ||
            (isLaptop && (
              <Skeleton className="flex rounded-full w-10 h-10 float-right" />
            ))}
        </div>
      </div>
    </Card>
  );
};

export default React.memo(IndividualSkeleton);
